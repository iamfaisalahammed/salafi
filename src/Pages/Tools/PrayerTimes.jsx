import { useEffect, useMemo, useState } from "react";
import {
  FaMosque,
  FaSun,
  FaMoon,
  FaCloudSun,
  FaClock,
  FaLocationDot,
  FaRotate,
  FaCalendarDays,
  FaHourglassHalf,
} from "react-icons/fa6";
import { IoSettingsOutline, IoCloseOutline } from "react-icons/io5";

const PRAYERS = [
  { key: "Fajr", name: "ফজর", icon: FaMoon, endKey: "Sunrise" },
  { key: "Dhuhr", name: "যোহর", icon: FaSun, endKey: "Asr" },
  { key: "Asr", name: "আসর", icon: FaCloudSun, endKey: "Maghrib" },
  { key: "Maghrib", name: "মাগরিব", icon: FaSun, endKey: "Isha" },
  { key: "Isha", name: "ইশা", icon: FaMoon, endKey: "Fajr" },
];

const REQUIRED_TIMES = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
const DEFAULT_ZONE = "Asia/Dhaka";

const getSavedSchool = () => {
  try {
    return localStorage.getItem("madhhab") === "0" ? 0 : 1;
  } catch {
    return 1;
  }
};

const safeZone = (zone) => {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: zone });
    return zone;
  } catch {
    return DEFAULT_ZONE;
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
  const date = new Date();
  date.setHours(Math.floor(normalized / 60), normalized % 60, 0, 0);

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

const getDateString = (date) =>
  [
    String(date.getDate()).padStart(2, "0"),
    String(date.getMonth() + 1).padStart(2, "0"),
    date.getFullYear(),
  ].join("-");

const fetchTimings = async (date, latitude, longitude, school, signal) => {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    method: "1",
    school: String(school),
  });

  const response = await fetch(
    `https://api.aladhan.com/v1/timings/${getDateString(date)}?${params}`,
    { signal }
  );

  if (!response.ok) throw new Error("নামাজের সময় সংগ্রহ করা যায়নি।");

  const result = await response.json();

  if (result.code !== 200 || !result.data?.timings) {
    throw new Error("নামাজের সময় পাওয়া যায়নি।");
  }

  return {
    timings: result.data.timings,
    timezone: result.data.meta?.timezone,
  };
};

const getZoneParts = (date, zone) => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: zone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const get = (type) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);

  return { h: get("hour"), m: get("minute"), s: get("second") };
};

const getClock = (date, zone) => ({
  time: new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date),
  date: new Intl.DateTimeFormat("bn-BD", {
    timeZone: zone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date),
});

const pad = (value) => String(value).padStart(2, "0");

const formatCountdown = (totalSeconds) => {
  const safe = Math.max(0, totalSeconds);
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

export default function PrayerTimes() {
  const [school, setSchool] = useState(getSavedSchool);
  const [now, setNow] = useState(() => new Date());
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [timezone, setTimezone] = useState(DEFAULT_ZONE);
  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Load prayer times
  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const { signal } = controller;

    const fail = (message) => {
      if (!cancelled) {
        setError(message);
        setLoading(false);
      }
    };

    const loadPlaceName = (latitude, longitude) => {
      const params = new URLSearchParams({
        format: "jsonv2",
        lat: String(latitude),
        lon: String(longitude),
        zoom: "10",
        "accept-language": "bn",
      });

      fetch(`https://nominatim.openstreetmap.org/reverse?${params}`, {
        signal,
      })
        .then((response) => {
          if (!response.ok) throw new Error("Location lookup failed");
          return response.json();
        })
        .then((data) => {
          if (!cancelled) {
            setLocationName(
              getPlaceName(data.address) || "আপনার বর্তমান অবস্থান"
            );
          }
        })
        .catch(() => {
          if (!cancelled) setLocationName("আপনার বর্তমান অবস্থান");
        });
    };

    const loadPrayerTimes = async (latitude, longitude) => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const [todayData, tomorrowData] = await Promise.all([
        fetchTimings(today, latitude, longitude, school, signal),
        fetchTimings(tomorrow, latitude, longitude, school, signal),
      ]);

      const valid =
        REQUIRED_TIMES.every(
          (key) => parseTime(todayData.timings[key]) !== null
        ) && parseTime(tomorrowData.timings.Fajr) !== null;

      if (!valid) throw new Error("নামাজের সময়ের তথ্য সঠিক নয়।");

      if (cancelled) return;

      setTimezone(safeZone(todayData.timezone || DEFAULT_ZONE));
      setPrayerTimes({
        ...todayData.timings,
        NextFajr: tomorrowData.timings.Fajr,
      });
      setLoading(false);

      loadPlaceName(latitude, longitude);
    };

    if (!navigator.geolocation) {
      // Deferred so state is not set synchronously inside the effect
      Promise.resolve().then(() =>
        fail("আপনার ব্রাউজারে লোকেশন সুবিধা নেই।")
      );
      return () => {
        cancelled = true;
      };
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        if (cancelled) return;

        try {
          await loadPrayerTimes(coords.latitude, coords.longitude);
        } catch (fetchError) {
          if (fetchError.name !== "AbortError") {
            fail(
              "নামাজের সময় আনা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।"
            );
          }
        }
      },
      (locationError) => {
        if (locationError.code === 1) {
          fail("নামাজের সময় দেখতে ব্রাউজারের লোকেশন অনুমতি দিন।");
        } else if (locationError.code === 3) {
          fail("লোকেশন পেতে দেরি হচ্ছে। আবার চেষ্টা করুন।");
        } else {
          fail("আপনার অবস্থান শনাক্ত করা যায়নি। আবার চেষ্টা করুন।");
        }
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 }
    );

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [school, refreshKey]);

  const resetForReload = () => {
    setLoading(true);
    setError("");
    setPrayerTimes(null);
    setLocationName("");
  };

  const handleRefresh = () => {
    resetForReload();
    setRefreshKey((key) => key + 1);
  };

  const handleSchool = (value) => {
    if (value === school) return;

    try {
      localStorage.setItem("madhhab", String(value));
    } catch {
      /* local storage may be unavailable */
    }

    resetForReload();
    setSchool(value);
  };

  const clock = useMemo(() => getClock(now, timezone), [now, timezone]);

  const { currentPrayer, nextPrayer } = useMemo(() => {
    if (!prayerTimes) return { currentPrayer: null, nextPrayer: null };

    const fajr = parseTime(prayerTimes.Fajr);
    const sunrise = parseTime(prayerTimes.Sunrise);
    const dhuhr = parseTime(prayerTimes.Dhuhr);
    const asr = parseTime(prayerTimes.Asr);
    const maghrib = parseTime(prayerTimes.Maghrib);
    const isha = parseTime(prayerTimes.Isha);
    const nextFajr = parseTime(prayerTimes.NextFajr);

    const { h, m, s } = getZoneParts(now, timezone);
    const nowMinutes = h * 60 + m;
    const nowSeconds = nowMinutes * 60 + s;

    let current = "Isha";
    if (nowMinutes >= fajr && nowMinutes < sunrise) current = "Fajr";
    else if (nowMinutes >= sunrise && nowMinutes < dhuhr) current = "Sunrise";
    else if (nowMinutes >= dhuhr && nowMinutes < asr) current = "Dhuhr";
    else if (nowMinutes >= asr && nowMinutes < maghrib) current = "Asr";
    else if (nowMinutes >= maghrib && nowMinutes < isha) current = "Maghrib";

    const starts = [
      ["Fajr", fajr],
      ["Dhuhr", dhuhr],
      ["Asr", asr],
      ["Maghrib", maghrib],
      ["Isha", isha],
    ];

    const upcoming =
      starts.find(([, minutes]) => minutes * 60 > nowSeconds) ||
      ["Fajr", nextFajr + 1440];

    const prayer = PRAYERS.find((item) => item.key === upcoming[0]);

    return {
      currentPrayer: current,
      nextPrayer: {
        name: prayer?.name ?? "",
        remaining: upcoming[1] * 60 - nowSeconds,
      },
    };
  }, [prayerTimes, now, timezone]);

  const getPrayerEndTime = (prayer) => {
    if (!prayerTimes) return "--:--";
    if (prayer.key === "Fajr") return formatTime(prayerTimes.Sunrise);
    if (prayer.key === "Isha") return previousMinute(prayerTimes.NextFajr);
    return previousMinute(prayerTimes[prayer.endKey]);
  };

  const zoneLabel =
    timezone === DEFAULT_ZONE ? "বাংলাদেশ সময় (BST)" : `সময় অঞ্চল: ${timezone}`;

  const optionClass = (active) =>
    `min-h-11 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
      active
        ? "border-[#c99a54] bg-[#c99a54] text-[#102127]"
        : "border-white/10 bg-[#0b2027] text-slate-300 hover:border-emerald-300/30"
    }`;

  return (
    <main
      className="min-h-screen bg-gradient-to-b from-[#06161c] via-[#081b22] to-[#0a2229] px-4 py-8 text-slate-100 sm:px-6 sm:py-12"
      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
    >
      <style>
        {"@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');"}
      </style>

      <div className="mx-auto max-w-3xl">
        {/* Heading */}
        <header className="mb-8 text-center sm:mb-10">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 shadow-lg shadow-emerald-500/10">
            <FaMosque className="text-2xl" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            নামাজের সময়সূচি
          </h1>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-400 sm:text-base">
            আপনার অবস্থান অনুযায়ী প্রতিদিনের নামাজের সময় ও সময়সীমা
          </p>
        </header>

        {/* Clock + Location */}
        <section className="mb-5 overflow-hidden rounded-2xl border border-white/10 bg-[#10252d] shadow-xl shadow-black/20 sm:mb-6 sm:rounded-3xl">
          <div className="grid gap-5 p-5 sm:grid-cols-2 sm:items-center sm:p-7">
            <div>
              <p className="flex items-center gap-2 text-sm text-slate-400">
                <FaClock className="text-emerald-300" />
                {zoneLabel}
              </p>

              <p
                className="mt-2 text-3xl font-bold tabular-nums tracking-wide text-white sm:text-4xl md:text-5xl"
                aria-live="off"
              >
                {clock.time}
              </p>

              <p className="mt-2 text-sm text-slate-300">{clock.date}</p>
            </div>

            <div className="rounded-xl border border-emerald-300/15 bg-[#0b2027] p-4 sm:p-5">
              <p className="flex items-center gap-2 text-xs text-slate-400 sm:text-sm">
                <FaLocationDot className="text-emerald-300" />
                আপনার অবস্থান
              </p>

              <p className="mt-2 break-words text-base font-semibold text-white sm:text-lg">
                {locationName ||
                  (loading
                    ? "লোকেশন খোঁজা হচ্ছে..."
                    : prayerTimes
                    ? "আপনার বর্তমান অবস্থান"
                    : "লোকেশন পাওয়া যায়নি")}
              </p>

              <button
                type="button"
                onClick={handleRefresh}
                disabled={loading}
                className="mt-3 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-emerald-300 transition hover:border-emerald-300/30 hover:bg-emerald-300/5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaRotate className={loading ? "animate-spin" : ""} />
                লোকেশন ও সময় আপডেট
              </button>
            </div>
          </div>
        </section>

        {/* Next prayer countdown */}
        {nextPrayer && (
          <section className="mb-5 rounded-2xl border border-[#c99a54]/30 bg-gradient-to-r from-[#c99a54]/15 to-emerald-400/10 p-5 sm:mb-6 sm:rounded-3xl sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#c99a54]/15 text-[#e0b875]">
                  <FaHourglassHalf className="text-lg" />
                </span>
                <div>
                  <p className="text-xs text-slate-300 sm:text-sm">
                    পরবর্তী নামাজ
                  </p>
                  <p className="text-lg font-bold text-white sm:text-xl">
                    {nextPrayer.name}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-300 sm:text-sm">বাকি</p>
                <p className="text-xl font-bold tabular-nums text-[#e0b875] sm:text-2xl">
                  {formatCountdown(nextPrayer.remaining)}
                </p>
              </div>
            </div>

            {currentPrayer === "Sunrise" && (
              <p className="mt-3 border-t border-white/10 pt-3 text-xs text-slate-300">
                এখন সূর্যোদয় ও যোহরের ওয়াক্তের মধ্যবর্তী সময়।
              </p>
            )}
          </section>
        )}

        {/* Settings */}
        <section className="mb-5 rounded-2xl border border-white/10 bg-[#10252d] p-4 sm:mb-6 sm:rounded-3xl sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                <IoSettingsOutline className="text-xl" />
              </span>
              <div>
                <h2 className="font-semibold text-white">
                  নামাজের সময় সেটিংস
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  আসরের সময় গণনার পদ্ধতি
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSettings((value) => !value)}
              aria-label="সেটিংস দেখান বা বন্ধ করুন"
              aria-expanded={showSettings}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:text-emerald-300"
            >
              {showSettings ? (
                <IoCloseOutline className="text-xl" />
              ) : (
                <IoSettingsOutline className="text-xl" />
              )}
            </button>
          </div>

          {showSettings && (
            <div className="mt-4 border-t border-white/10 pt-4">
              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => handleSchool(1)}
                  aria-pressed={school === 1}
                  className={optionClass(school === 1)}
                >
                  হানাফি
                </button>

                <button
                  type="button"
                  onClick={() => handleSchool(0)}
                  aria-pressed={school === 0}
                  className={optionClass(school === 0)}
                >
                  শাফেয়ি / মালিকি / হাম্বলী
                </button>
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-400">
                নির্বাচিত পদ্ধতি ব্রাউজারে সংরক্ষিত থাকবে।
              </p>
            </div>
          )}
        </section>

        {/* Prayer Schedule */}
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#10252d] shadow-xl shadow-black/20 sm:rounded-3xl">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 p-4 sm:p-6">
            <div>
              <h2 className="text-lg font-bold text-white sm:text-xl">
                আজকের পাঁচ ওয়াক্ত নামাজ
              </h2>
              <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
                প্রতিটি নামাজের শুরু ও শেষের সময়
              </p>
            </div>

            <FaCalendarDays className="shrink-0 text-xl text-[#d6aa62] sm:text-2xl" />
          </div>

          {loading && !prayerTimes && (
            <div className="flex flex-col items-center justify-center px-4 py-14 text-center">
              <span
                className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-300/20 border-t-emerald-300"
                role="status"
                aria-label="লোড হচ্ছে"
              />
              <p className="mt-4 text-sm text-slate-400">
                নামাজের সময় সংগ্রহ করা হচ্ছে...
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="p-5 sm:p-7">
              <div className="rounded-xl border border-amber-300/20 bg-amber-300/[0.06] p-4">
                <p className="text-sm leading-6 text-amber-200">{error}</p>

                <button
                  type="button"
                  onClick={handleRefresh}
                  className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#c99a54] px-4 py-2 text-sm font-semibold text-[#102127] transition hover:bg-[#ddb36f]"
                >
                  <FaRotate />
                  আবার চেষ্টা করুন
                </button>
              </div>
            </div>
          )}

          {prayerTimes && (
            <div className="space-y-3 p-3 sm:p-5">
              {PRAYERS.map((prayer) => {
                const Icon = prayer.icon;
                const isCurrent = currentPrayer === prayer.key;

                return (
                  <article
                    key={prayer.key}
                    className={`rounded-xl border p-4 transition sm:p-5 ${
                      isCurrent
                        ? "border-emerald-300/40 bg-emerald-400/[0.08] shadow-lg shadow-emerald-500/5"
                        : "border-white/[0.07] bg-[#142b34] hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                            isCurrent
                              ? "bg-emerald-300/10 text-emerald-300"
                              : "bg-white/[0.04] text-[#d6aa62]"
                          }`}
                        >
                          <Icon className="text-lg" />
                        </span>

                        <div className="min-w-0">
                          <h3 className="font-bold text-white sm:text-lg">
                            {prayer.name}
                          </h3>

                          {isCurrent && (
                            <span className="mt-1 inline-flex rounded-full bg-emerald-300/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
                              বর্তমান ওয়াক্ত
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-[11px] text-slate-400 sm:text-xs">
                          শুরু
                        </p>
                        <p className="mt-1 whitespace-nowrap text-base font-bold tabular-nums text-[#e0b875] sm:text-lg">
                          {formatTime(prayerTimes[prayer.key])}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-3">
                      <span className="text-xs text-slate-400 sm:text-sm">
                        {prayer.key === "Fajr"
                          ? "সূর্যোদয় পর্যন্ত"
                          : "শেষ সময়"}
                      </span>
                      <span className="whitespace-nowrap text-sm font-semibold tabular-nums text-slate-200 sm:text-base">
                        {getPrayerEndTime(prayer)}
                      </span>
                    </div>
                  </article>
                );
              })}

          
            </div>
          )}
        </section>
      </div>
    </main>
  );
}