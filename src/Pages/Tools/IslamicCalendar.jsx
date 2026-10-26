
import { useEffect, useMemo, useState } from "react";
import {
  FaCalendarDays,
  FaChevronLeft,
  FaChevronRight,
  FaMoon,
  FaRotate,
  FaStarAndCrescent,
} from "react-icons/fa6";

const API_URL = "https://api.aladhan.com/v1";

const WEEKDAYS = [
  "রবি",
  "সোম",
  "মঙ্গল",
  "বুধ",
  "বৃহঃ",
  "শুক্র",
  "শনি",
];

const HIJRI_MONTHS = [
  "মুহাররম",
  "সফর",
  "রবিউল আউয়াল",
  "রবিউস সানি",
  "জমাদিউল আউয়াল",
  "জমাদিউস সানি",
  "রজব",
  "শাবান",
  "রমজান",
  "শাওয়াল",
  "জিলকদ",
  "জিলহজ",
];

const EVENTS = {
  "1-1": "ইসলামি নববর্ষ",
  "1-10": "আশুরা",
  "3-12": "ঈদে মিলাদুন্নবী",
  "7-27": "শবে মেরাজ",
  "8-15": "শবে বরাত",
  "9-1": "রমজানের শুরু",
  "9-27": "লাইলাতুল কদর (প্রচলিত)",
  "10-1": "ঈদুল ফিতর",
  "12-9": "আরাফার দিন",
  "12-10": "ঈদুল আজহা",
};

const getToday = () => {
  const now = new Date();

  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
};

const getDateKey = (date) =>
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

const getEvent = (item) => {
  if (!item?.hijri) return "";

  const month = Number(item.hijri.month.number);
  const day = Number(item.hijri.day);

  return EVENTS[`${month}-${day}`] || "";
};

const getHijriDate = (item) => {
  if (!item?.hijri) return "";

  const day = item.hijri.day;
  const month = HIJRI_MONTHS[
    Number(item.hijri.month.number) - 1
  ];
  const year = item.hijri.year;

  return `${day} ${month} ${year} হিজরি`;
};

const IslamicCalendar = () => {
  const [date, setDate] = useState(getToday);
  const [calendar, setCalendar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCalendar = async () => {
      setLoading(true);
      setError("");

      try {
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const response = await fetch(
          `${API_URL}/gToHCalendar/${month}/${year}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("ক্যালেন্ডার লোড করা যায়নি।");
        }

        const result = await response.json();

        if (result.code !== 200 || !result.data?.length) {
          throw new Error("ক্যালেন্ডারের তথ্য পাওয়া যায়নি।");
        }

        setCalendar(result.data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setCalendar([]);
          setError(
            "ক্যালেন্ডার লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।"
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCalendar();

    return () => controller.abort();
  }, [date, refreshKey]);

  const today = getToday();

  const displayedMonth = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const calendarMap = useMemo(
    () =>
      new Map(
        calendar.map((item) => [
          Number(item.gregorian.day),
          item,
        ])
      ),
    [calendar]
  );

  const selectedItem = calendarMap.get(date.getDate());

  const changeMonth = (offset) => {
    setDate(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() + offset,
          1
        )
    );
  };

  const goToToday = () => setDate(getToday());

  const refreshCalendar = () => {
    setRefreshKey((current) => current + 1);
  };

  const firstDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay();

  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

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
            <FaCalendarDays className="text-2xl" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            ইসলামিক ক্যালেন্ডার
          </h1>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-400 sm:text-base">
            হিজরি তারিখ, ইসলামিক দিবস ও গুরুত্বপূর্ণ দিনগুলো
            সম্পর্কে জানুন।
          </p>
        </header>

        {/* Hijri Date Banner */}
        <section className="relative mb-5 overflow-hidden rounded-2xl border border-[#c99a54]/30 bg-gradient-to-br from-[#c99a54]/15 via-[#10252d] to-emerald-400/10 p-5 shadow-xl shadow-black/20 sm:mb-6 sm:rounded-3xl sm:p-7">
          <FaStarAndCrescent className="absolute -right-3 -top-3 text-7xl text-[#c99a54]/10 sm:text-9xl" />

          <div className="relative">
            <p className="flex items-center gap-2 text-sm text-slate-400">
              <FaMoon className="text-[#e0b875]" />
              আজকের হিজরি তারিখ
            </p>

            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              {getDateKey(date) === getDateKey(today)
                ? getHijriDate(
                    calendarMap.get(today.getDate())
                  ) || (loading ? "লোড হচ্ছে..." : "তারিখ পাওয়া যায়নি")
                : getHijriDate(selectedItem) ||
                  (loading ? "লোড হচ্ছে..." : "তারিখ পাওয়া যায়নি")}
            </h2>

            <p className="mt-2 text-sm text-slate-300">
              {date.toLocaleDateString("bn-BD", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </section>

        {/* Calendar */}
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#10252d] shadow-xl shadow-black/20 sm:rounded-3xl">
          {/* Month Navigation */}
          <div className="flex items-center justify-between gap-3 border-b border-white/10 p-4 sm:p-6">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              aria-label="আগের মাস"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0b2027] text-slate-300 transition hover:border-emerald-300/30 hover:text-emerald-300"
            >
              <FaChevronLeft />
            </button>

            <div className="min-w-0 text-center">
              <h2 className="text-lg font-bold text-white sm:text-2xl">
                {displayedMonth}
              </h2>

              <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                {selectedItem
                  ? `${selectedItem.hijri.month.en} ${selectedItem.hijri.year} AH`
                  : "হিজরি ক্যালেন্ডার"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => changeMonth(1)}
              aria-label="পরের মাস"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0b2027] text-slate-300 transition hover:border-emerald-300/30 hover:text-emerald-300"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-3 py-3 sm:px-5">
            <div className="min-w-0">
              <p className="text-xs text-slate-400 sm:text-sm">
                ইংরেজি ও হিজরি তারিখ
              </p>
              <p className="mt-1 text-xs text-emerald-300">
                {calendar.length > 0
                  ? "ক্যালেন্ডার প্রস্তুত"
                  : loading
                    ? "তথ্য সংগ্রহ করা হচ্ছে..."
                    : "তথ্য পাওয়া যায়নি"}
              </p>
            </div>

            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={refreshCalendar}
                disabled={loading}
                aria-label="ক্যালেন্ডার রিফ্রেশ করুন"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-emerald-300 transition hover:bg-emerald-300/5 disabled:opacity-50"
              >
                <FaRotate className={loading ? "animate-spin" : ""} />
              </button>

              <button
                type="button"
                onClick={goToToday}
                className="min-h-10 rounded-xl bg-[#c99a54] px-4 text-sm font-semibold text-[#102127] transition hover:bg-[#ddb36f]"
              >
                আজ
              </button>
            </div>
          </div>

          {/* Calendar Content */}
          {loading && calendar.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-4 text-center">
              <span
                role="status"
                aria-label="লোড হচ্ছে"
                className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-300/20 border-t-emerald-300"
              />
              <p className="mt-4 text-sm text-slate-400">
                ইসলামিক ক্যালেন্ডার লোড হচ্ছে...
              </p>
            </div>
          ) : error && calendar.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <FaCalendarDays className="mx-auto text-3xl text-slate-500" />

              <p className="mt-4 text-sm leading-6 text-slate-300">
                {error}
              </p>

              <button
                type="button"
                onClick={refreshCalendar}
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#c99a54] px-5 py-3 text-sm font-semibold text-[#102127] transition hover:bg-[#ddb36f]"
              >
                <FaRotate />
                আবার চেষ্টা করুন
              </button>
            </div>
          ) : (
            <div className="p-2 pt-3 sm:p-5 sm:pt-4">
              {/* Weekdays */}
              <div className="grid grid-cols-7 border-b border-white/10 pb-2">
                {WEEKDAYS.map((day, index) => (
                  <div
                    key={day}
                    className={`py-2 text-center text-[11px] font-semibold sm:text-sm ${
                      index === 5
                        ? "text-emerald-300"
                        : "text-slate-400"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-7 gap-1 pt-2 sm:gap-2">
                {Array.from({ length: firstDay }, (_, index) => (
                  <div key={`empty-${index}`} />
                ))}

                {Array.from(
                  { length: daysInMonth },
                  (_, index) => index + 1
                ).map((day) => {
                  const item = calendarMap.get(day);
                  const isToday =
                    getDateKey(
                      new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        day
                      )
                    ) === getDateKey(today);

                  const event = getEvent(item);
                  const weekday = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    day
                  ).getDay();

                  return (
                    <div
                      key={day}
                      title={event || getHijriDate(item)}
                      className={`relative flex min-h-[67px] min-w-0 flex-col items-center rounded-xl border px-0.5 py-2 text-center transition sm:min-h-[96px] sm:rounded-2xl sm:px-1 sm:py-3 ${
                        isToday
                          ? "border-emerald-300/50 bg-emerald-400/10 ring-1 ring-emerald-300/20"
                          : event
                            ? "border-[#c99a54]/30 bg-[#c99a54]/[0.07]"
                            : "border-white/[0.06] bg-[#0b2027] hover:border-white/20"
                      }`}
                    >
                      {isToday && (
                        <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-emerald-300 sm:h-2 sm:w-2" />
                      )}

                      <span
                        className={`text-sm font-bold tabular-nums sm:text-lg ${
                          isToday
                            ? "text-emerald-300"
                            : weekday === 5
                              ? "text-emerald-300"
                              : "text-white"
                        }`}
                      >
                        {day}
                      </span>

                      <span className="mt-1 text-[10px] tabular-nums text-slate-400 sm:text-xs">
                        {item?.hijri?.day || "—"}
                      </span>

                      {event && (
                        <span className="mt-1 line-clamp-2 w-full text-[8px] font-medium leading-3 text-[#e0b875] sm:text-[10px] sm:leading-4">
                          {event}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/10 pt-4 text-[11px] text-slate-400 sm:text-xs">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm border border-emerald-300/50 bg-emerald-400/10" />
                  আজ
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm border border-[#c99a54]/40 bg-[#c99a54]/10" />
                  ইসলামিক দিবস
                </span>

                <span>বড় সংখ্যা: ইংরেজি তারিখ</span>
                <span>ছোট সংখ্যা: হিজরি তারিখ</span>
              </div>
            </div>
          )}
        </section>

        {/* Important Notice */}
        <div className="mt-5 rounded-2xl border border-white/10 bg-[#10252d]/80 p-4 sm:mt-6 sm:p-5">
          <div className="flex items-start gap-3">
            <FaMoon className="mt-1 shrink-0 text-[#d6aa62]" />

            <div>
              <h3 className="text-sm font-semibold text-white">
                গুরুত্বপূর্ণ তথ্য
              </h3>
              <p className="mt-2 text-xs leading-6 text-slate-400 sm:text-sm">
                হিজরি তারিখ চাঁদ দেখা ও স্থানীয় ঘোষণার কারণে
                এক দিন আগে বা পরে হতে পারে। ইসলামিক দিবসের
                তারিখগুলো সম্ভাব্য; বাংলাদেশের নির্ভরযোগ্য
                ঘোষণার সঙ্গে মিলিয়ে নিন।
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default IslamicCalendar;
