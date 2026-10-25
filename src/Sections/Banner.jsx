
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaMosque,
  FaArrowRight,
  FaSun,
} from "react-icons/fa";
import {
  IoLocationOutline,
  IoSettingsOutline,
  IoRefreshOutline,
  IoCloseOutline,
} from "react-icons/io5";

const PRAYERS = [
  { key: "Fajr", name: "ফজর", endKey: "Sunrise" },
  { key: "Dhuhr", name: "যোহর", endKey: "Asr" },
  { key: "Asr", name: "আসর", endKey: "Maghrib" },
  { key: "Maghrib", name: "মাগরিব", endKey: "Isha" },
  { key: "Isha", name: "ইশা", endKey: "Fajr" },
];

const getSavedSchool = () => {
  try {
    return localStorage.getItem("madhhab") === "0" ? 0 : 1;
  } catch {
    return 1;
  }
};

const parseTime = (time) => {
  if (!time) return null;

  const match = String(time).match(/^(\d{1,2}):(\d{2})/);
  if (!match) return null;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (hours > 23 || minutes > 59) return null;

  return hours * 60 + minutes;
};

const formatMinutes = (totalMinutes) => {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const formatTime = (time) => {
  const minutes = parseTime(time);
  return minutes === null ? "--:--" : formatMinutes(minutes);
};

const previousMinute = (time) => {
  const minutes = parseTime(time);
  return minutes === null ? "--:--" : formatMinutes(minutes - 1);
};

const getPlaceName = (address = {}) => {
  const city =
    address.city ||
    address.town ||
    address.village ||
    address.municipality ||
    address.county ||
    address.state ||
    "";

  return [city, address.country].filter(Boolean).join(", ");
};

const getNextDayFajr = async (latitude, longitude, school, signal) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dateString = [
    String(tomorrow.getDate()).padStart(2, "0"),
    String(tomorrow.getMonth() + 1).padStart(2, "0"),
    tomorrow.getFullYear(),
  ].join("-");

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    method: "1",
    school: String(school),
  });

  const response = await fetch(
    `https://api.aladhan.com/v1/timings/${dateString}?${params}`,
    { signal }
  );

  if (!response.ok) {
    throw new Error("পরের দিনের ফজরের সময় পাওয়া যায়নি।");
  }

  const result = await response.json();
  const fajr = result?.data?.timings?.Fajr;

  if (result.code !== 200 || parseTime(fajr) === null) {
    throw new Error("পরের দিনের ফজরের সময় পাওয়া যায়নি।");
  }

  return fajr;
};

const Banner = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [error, setError] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [school, setSchool] = useState(getSavedSchool);

  const controllerRef = useRef(null);
  const requestIdRef = useRef(0);

  const fetchPrayerData = useCallback(
    async (latitude, longitude, signal) => {
      const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        method: "1",
        school: String(school),
      });

      const response = await fetch(
        `https://api.aladhan.com/v1/timings?${params}`,
        { signal }
      );

      if (!response.ok) {
        throw new Error("নামাজের সময় আনা যায়নি।");
      }

      const result = await response.json();
      const timings = result?.data?.timings;

      const requiredTimes = [
        "Fajr",
        "Sunrise",
        "Dhuhr",
        "Asr",
        "Maghrib",
        "Isha",
      ];

      if (
        result.code !== 200 ||
        !timings ||
        !requiredTimes.every(
          (key) => parseTime(timings[key]) !== null
        )
      ) {
        throw new Error("নামাজের সময় পাওয়া যায়নি।");
      }

      const nextFajr = await getNextDayFajr(
        latitude,
        longitude,
        school,
        signal
      );

      if (signal.aborted) return;

      setPrayerTimes({
        ...timings,
        NextFajr: nextFajr,
      });

      try {
        const locationResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
          { signal }
        );

        if (locationResponse.ok) {
          const locationData = await locationResponse.json();

          if (!signal.aborted) {
            setLocationName(
              getPlaceName(locationData.address) ||
                "আপনার বর্তমান অবস্থান"
            );
          }
        } else if (!signal.aborted) {
          setLocationName("আপনার বর্তমান অবস্থান");
        }
      } catch (locationError) {
        if (locationError.name === "AbortError") {
          throw locationError;
        }

        if (!signal.aborted) {
          setLocationName("আপনার বর্তমান অবস্থান");
        }
      }
    },
    [school]
  );

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLoadingLocation(false);
      setError("আপনার ব্রাউজারে লোকেশন সুবিধা নেই।");
      return;
    }

    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    const requestId = ++requestIdRef.current;

    setLoadingLocation(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          await fetchPrayerData(
            coords.latitude,
            coords.longitude,
            controller.signal
          );

          if (
            !controller.signal.aborted &&
            requestId === requestIdRef.current
          ) {
            setError("");
          }
        } catch (fetchError) {
          if (
            fetchError.name !== "AbortError" &&
            requestId === requestIdRef.current
          ) {
            setError(
              "নামাজের সময় আনা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।"
            );
          }
        } finally {
          if (requestId === requestIdRef.current) {
            setLoadingLocation(false);
          }
        }
      },
      (locationError) => {
        if (requestId !== requestIdRef.current) return;

        setLoadingLocation(false);

        if (locationError.code === 1) {
          setError("নামাজের সময় জানতে ব্রাউজারের লোকেশন অনুমতি দিন।");
        } else if (locationError.code === 3) {
          setError("লোকেশন পেতে দেরি হচ্ছে। আবার চেষ্টা করুন।");
        } else {
          setError("আপনার অবস্থান শনাক্ত করা যায়নি। আবার চেষ্টা করুন।");
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 300000,
      }
    );
  }, [fetchPrayerData]);

  useEffect(() => {
  try {
    localStorage.setItem("madhhab", String(school));
  } catch {
    // Local storage unavailable.
  }

  let cancelled = false;
  const controller = new AbortController();
  controllerRef.current = controller;

  if (!navigator.geolocation) {
  Promise.resolve().then(() => {
    setLoadingLocation(false);
    setError("আপনার ব্রাউজারে লোকেশন সুবিধা নেই।");
  });

  return () => {
    cancelled = true;
    controller.abort();
  };
}

  navigator.geolocation.getCurrentPosition(
    async ({ coords }) => {
      try {
        await fetchPrayerData(
          coords.latitude,
          coords.longitude,
          controller.signal
        );

        if (!cancelled) {
          setError("");
        }
      } catch (fetchError) {
        if (!cancelled && fetchError.name !== "AbortError") {
          setError(
            "নামাজের সময় আনা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।"
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingLocation(false);
        }
      }
    },
    (locationError) => {
      if (cancelled) return;

      setLoadingLocation(false);

      if (locationError.code === 1) {
        setError("নামাজের সময় জানতে ব্রাউজারের লোকেশন অনুমতি দিন।");
      } else if (locationError.code === 3) {
        setError("লোকেশন পেতে দেরি হচ্ছে। আবার চেষ্টা করুন।");
      } else {
        setError("আপনার অবস্থান শনাক্ত করা যায়নি। আবার চেষ্টা করুন।");
      }
    },
    {
      enableHighAccuracy: false,
      timeout: 15000,
      maximumAge: 300000,
    }
  );

  return () => {
    cancelled = true;
    controller.abort();
  };
}, [school, fetchPrayerData]);

  const changeSchool = (value) => {
    if (value === school) {
      setShowSettings(false);
      return;
    }

    setSchool(value);
    setPrayerTimes(null);
    setLoadingLocation(true);
    setError("");
    setShowSettings(false);
  };

  const getPrayerEndTime = (prayer) => {
    if (!prayerTimes) return "--:--";

    if (prayer.key === "Fajr") {
      return formatTime(prayerTimes.Sunrise);
    }

    if (prayer.key === "Isha") {
      return previousMinute(prayerTimes.NextFajr);
    }

    return previousMinute(prayerTimes[prayer.endKey]);
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#081b22] px-3 py-7 text-slate-100 sm:px-6 sm:py-12 lg:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-20 -z-10 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-7 lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* Introduction */}
          <div className="min-w-0 text-center lg:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-medium text-emerald-300 sm:text-sm">
              <FaMosque />
              <span>ইসলামি জ্ঞান ও রিসোর্সের ঠিকানা</span>
            </div>

            <h1 className="mx-auto max-w-xl text-3xl font-bold leading-[1.35] tracking-tight text-white sm:text-4xl lg:mx-0 lg:text-5xl">
              জ্ঞান অর্জন করুন,
              <span className="mt-1 block text-[#d6aa62]">সুন্নাহর পথে চলুন</span>
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8 lg:mx-0">
              কুরআন, হাদিস, আলেমদের আলোচনা, ইসলামি অ্যাপ, বই ও প্রয়োজনীয় ওয়েবসাইট—সবকিছু খুঁজে নিন এক জায়গায়, সহজেই।
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 min-[380px]:flex-row lg:mt-7 lg:justify-start">
              <Link
                to="/ExploreLibrary"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#c99a54] px-5 py-3 text-sm font-semibold text-[#102127] shadow-sm transition-colors hover:bg-[#ddb36f] focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-[#081b22] sm:px-6"
              >
                <FaBookOpen className="text-base" />
                ডিজিটাল লাইব্রেরি
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <p className="mt-4 text-xs leading-6 text-slate-400 sm:text-sm">
              আপনার প্রয়োজনীয় ইসলামি রিসোর্স, সহজে এক জায়গায়।
            </p>
          </div>

          {/* Prayer Times */}
          <div id="prayer-times" className="min-w-0 scroll-mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#10252d] shadow-xl shadow-black/20 sm:rounded-3xl">
            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-300/15 bg-emerald-400/10 text-emerald-300 sm:h-12 sm:w-12">
                    <FaMosque className="text-xl" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-white sm:text-lg">নামাজের সময়সূচি</h2>
                    <p className="mt-1 flex items-start gap-1.5 break-words text-xs leading-5 text-slate-400 sm:text-sm">
                      <IoLocationOutline className="mt-0.5 shrink-0 text-base text-emerald-300" />
                      <span>
                        {loadingLocation
                          ? "আপনার অবস্থান খোঁজা হচ্ছে..."
                          : locationName || "অবস্থান পাওয়া যায়নি"}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowSettings((previous) => !previous)}
                  aria-label="নামাজের সময়ের সেটিংস"
                  aria-expanded={showSettings}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-emerald-300/30 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  {showSettings ? <IoCloseOutline className="text-xl" /> : <IoSettingsOutline className="text-xl" />}
                </button>
              </div>

              {showSettings && (
                <div className="mt-4 rounded-xl border border-emerald-300/15 bg-[#0b2027] p-3 sm:p-4">
                  <p className="mb-3 text-sm font-semibold text-slate-200">আসরের সময় গণনার পদ্ধতি</p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => changeSchool(1)}
                      aria-pressed={school === 1}
                      className={`min-h-10 rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                        school === 1
                          ? "border-[#c99a54] bg-[#c99a54] text-[#102127]"
                          : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-emerald-300/40"
                      }`}
                    >
                      হানাফি
                    </button>
                    <button
                      type="button"
                      onClick={() => changeSchool(0)}
                      aria-pressed={school === 0}
                      className={`min-h-10 rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                        school === 0
                          ? "border-[#c99a54] bg-[#c99a54] text-[#102127]"
                          : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-emerald-300/40"
                      }`}
                    >
                      শাফেয়ি / মালিকি / হাম্বলী
                    </button>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-slate-400">
                    আপনার অনুসৃত মাযহাব অনুযায়ী আসরের সময়ের হিসাব নির্বাচন করুন।
                  </p>
                </div>
              )}

              <div className="my-4 border-t border-white/[0.08] sm:my-5" />

              {error && (
                <div className="mb-4 rounded-xl border border-amber-300/20 bg-amber-300/[0.07] p-3 text-sm leading-6 text-amber-200">
                  <p>{error}</p>
                  {!loadingLocation && (
                    <button
                      type="button"
                      onClick={getLocation}
                      className="mt-2 inline-flex items-center gap-2 font-semibold text-amber-300 hover:text-amber-200"
                    >
                      <IoRefreshOutline className="text-base" />
                      আবার চেষ্টা করুন
                    </button>
                  )}
                </div>
              )}

              {loadingLocation && !prayerTimes && (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <span className="loading loading-spinner loading-md text-emerald-300" role="status" aria-label="লোড হচ্ছে" />
                  <p className="mt-3 text-sm text-slate-400">নামাজের সময় সংগ্রহ করা হচ্ছে...</p>
                </div>
              )}

              {!loadingLocation && !prayerTimes && !error && (
                <div className="py-8 text-center">
                  <FaSun className="mx-auto text-3xl text-[#d6aa62]" />
                  <p className="mt-3 text-sm leading-6 text-slate-300">নামাজের সময় দেখতে আপনার অবস্থান চালু করুন।</p>
                  <button
                    type="button"
                    onClick={getLocation}
                    className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-[#071b20] transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  >
                    <IoLocationOutline className="text-lg" />
                    অবস্থান শনাক্ত করুন
                  </button>
                </div>
              )}

              {prayerTimes && (
                <>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-200">আজকের পাঁচ ওয়াক্ত নামাজ</p>
                    <button
                      type="button"
                      onClick={getLocation}
                      disabled={loadingLocation}
                      title="সময় আপডেট করুন"
                      aria-label="নামাজের সময় আপডেট করুন"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:border-emerald-300/30 hover:text-emerald-300 disabled:opacity-50"
                    >
                      <IoRefreshOutline className={`text-xl ${loadingLocation ? "animate-spin" : ""}`} />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {PRAYERS.map((prayer, index) => (
                      <div
                        key={prayer.key}
                        className={`rounded-xl border p-3 sm:p-3.5 ${
                          index === 0
                            ? "border-emerald-300/25 bg-emerald-400/[0.08]"
                            : "border-white/[0.07] bg-[#142b34] hover:border-white/15"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${index === 0 ? "bg-emerald-300/10 text-emerald-300" : "bg-white/[0.04] text-slate-300"}`}>
                              {index + 1}
                            </span>
                            <span className="font-semibold text-slate-100">{prayer.name}</span>
                          </div>
                          <span className={`shrink-0 text-sm font-bold tabular-nums sm:text-base ${index === 0 ? "text-emerald-300" : "text-[#e0b875]"}`}>
                            {formatTime(prayerTimes[prayer.key])}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/[0.07] pt-3 text-xs sm:text-sm">
                          <span className="text-slate-400">শেষ সময়</span>
                          <span className="font-semibold tabular-nums text-slate-300">{getPrayerEndTime(prayer)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
