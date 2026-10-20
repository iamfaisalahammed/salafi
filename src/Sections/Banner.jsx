
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
    <section className="relative overflow-hidden bg-white px-4 py-10 text-slate-800 sm:px-6 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Introduction */}
          <div className="text-center lg:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">
              <FaMosque className="text-emerald-700" />
              <span>ইসলামি জ্ঞান ও রিসোর্সের ঠিকানা</span>
            </div>

            <h1 className="text-3xl font-bold leading-snug tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              জ্ঞান অর্জন করুন,
              <span className="mt-1 block text-emerald-700">
                সুন্নাহর পথে চলুন
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0">
              কুরআন, হাদিস, আলেমদের আলোচনা, ইসলামি অ্যাপ,
              বই ও প্রয়োজনীয় ওয়েবসাইট—সবকিছু খুঁজে নিন
              এক জায়গায়, সহজেই।
            </p>

            <div className="mt-7 flex justify-center lg:justify-start">
              <Link
                to="/ExploreLibrary"
                className="group inline-flex min-h-12 items-center justify-center  btn btn-outline gap-3 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
              >
                <FaBookOpen className="text-lg animate-bounce" />
              ডিজিটাল লাইব্রেরি
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              আপনার প্রয়োজনীয় ইসলামি রিসোর্স, সহজে এক জায়গায়।
            </p>
          </div>

          {/* Prayer Times */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <FaMosque className="text-xl" />
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                    নামাজের সময়সূচি
                  </h2>

                  <p className="mt-1 flex items-start gap-1.5 break-words text-sm leading-6 text-slate-500">
                    <IoLocationOutline className="mt-1 shrink-0 text-base" />
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
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {showSettings ? (
                  <IoCloseOutline className="text-xl" />
                ) : (
                  <IoSettingsOutline className="text-xl" />
                )}
              </button>
            </div>

            {showSettings && (
              <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                <p className="mb-3 text-sm font-semibold text-slate-800">
                  আসরের সময় গণনার পদ্ধতি
                </p>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => changeSchool(1)}
                    aria-pressed={school === 1}
                    className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                      school === 1
                        ? "border-emerald-700 bg-emerald-700 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400"
                    }`}
                  >
                    হানাফি
                  </button>

                  <button
                    type="button"
                    onClick={() => changeSchool(0)}
                    aria-pressed={school === 0}
                    className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                      school === 0
                        ? "border-emerald-700 bg-emerald-700 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400"
                    }`}
                  >
                    শাফেয়ি / মালিকি / হাম্বলী
                  </button>
                </div>

                <p className="mt-3 text-xs leading-5 text-slate-500">
                  আপনার অনুসৃত মাযহাব অনুযায়ী আসরের সময়ের হিসাব নির্বাচন করুন।
                </p>
              </div>
            )}

            <div className="my-5 border-t border-slate-100" />

            {error && (
              <div className="mb-4 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                <p>{error}</p>

                {!loadingLocation && (
                  <button
                    type="button"
                    onClick={getLocation}
                    className="mt-3 inline-flex items-center gap-2 font-semibold text-emerald-800 hover:underline"
                  >
                    <IoRefreshOutline className="text-base" />
                    আবার চেষ্টা করুন
                  </button>
                )}
              </div>
            )}

            {loadingLocation && !prayerTimes && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <span
                  className="loading loading-spinner loading-md text-emerald-700"
                  role="status"
                  aria-label="লোড হচ্ছে"
                />
                <p className="mt-3 text-sm text-slate-500">
                  নামাজের সময় সংগ্রহ করা হচ্ছে...
                </p>
              </div>
            )}

            {!loadingLocation && !prayerTimes && !error && (
              <div className="py-8 text-center">
                <FaSun className="mx-auto text-3xl text-emerald-700" />
                <p className="mt-3 text-sm text-slate-500">
                  নামাজের সময় দেখতে আপনার অবস্থান চালু করুন।
                </p>

                <button
                  type="button"
                  onClick={getLocation}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                >
                  <IoLocationOutline className="text-lg" />
                  অবস্থান শনাক্ত করুন
                </button>
              </div>
            )}

            {prayerTimes && (
              <>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-500">
                    আজকের পাঁচ ওয়াক্ত নামাজ
                  </p>

                  <button
                    type="button"
                    onClick={getLocation}
                    disabled={loadingLocation}
                    title="সময় আপডেট করুন"
                    aria-label="নামাজের সময় আপডেট করুন"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-50"
                  >
                    <IoRefreshOutline
                      className={`text-xl ${
                        loadingLocation ? "animate-spin" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className="space-y-2">
                  {PRAYERS.map((prayer, index) => (
                    <div
                      key={prayer.key}
                      className={`rounded-xl border p-3 ${
                        index === 0
                          ? "border-emerald-200 bg-emerald-50"
                          : "border-slate-100 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-sm font-bold text-emerald-800">
                            {index + 1}
                          </span>

                          <span className="font-semibold text-slate-800">
                            {prayer.name}
                          </span>
                        </div>

                        <span className="text-sm font-bold text-emerald-800 sm:text-base">
                          {formatTime(prayerTimes[prayer.key])}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-200/70 pt-3 text-xs sm:text-sm">
                        <span className="text-slate-500">
                          শেষ সময়
                        </span>

                        <span className="font-semibold text-slate-700">
                          {getPrayerEndTime(prayer)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

             
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
