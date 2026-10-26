import { useEffect, useMemo, useState } from "react";
import {
 
  FaChevronLeft,
  FaChevronRight,
  FaMoon,
  FaStarAndCrescent,
} from "react-icons/fa6";

/* ------------------------------------------------------------------ */
/* কনফিগারেশন                                                          */
/* ------------------------------------------------------------------ */

const API_URL = "https://api.aladhan.com/v1";

// মাগরিবের সময় বের করার জন্য ঢাকার অবস্থান (বাংলাদেশের জন্য যথেষ্ট কাছাকাছি)
const LATITUDE = 23.8103;
const LONGITUDE = 90.4125;

// সৌদি (উম্মুল কুরা) ক্যালেন্ডার সাধারণত বাংলাদেশের চেয়ে ১ দিন এগিয়ে থাকে।
// তাই বাংলাদেশের চাঁদ দেখার সঙ্গে মেলাতে ১ দিন পিছিয়ে নেওয়া হয়েছে।
// কোনো মাসে ১ দিন বা ২ দিনের তফাৎ হলে শুধু এই সংখ্যাটি বদলালেই হবে
// (যেমন: 0 = সৌদির সমান, -1 = বাংলাদেশ, -2 = আরও এক দিন পিছনে)।
const BD_OFFSET = -1;

// মাগরিবের সময় আনা না গেলে এই সময় ধরা হবে (ঘণ্টা, মিনিট)
const FALLBACK_MAGHRIB = { hour: 18, minute: 0 };

const WEEKDAYS = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"];

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

// শুধু দুটি উৎসব: ঈদুল ফিতর ও ঈদুল আজহা (কোরবানির ঈদ)
const EVENTS = {
  "10-1": "ঈদুল ফিতর",
  "12-10": "ঈদুল আজহা (কোরবানি)",
};


/* হেল্পার ফাংশন                                                       */


const toBn = (value) => Number(value).toLocaleString("bn-BD", { useGrouping: false });

const getToday = (now = new Date()) =>
  new Date(now.getFullYear(), now.getMonth(), now.getDate());

const getDateKey = (date) =>
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

const hijriFormatter = new Intl.DateTimeFormat(
  "en-u-ca-islamic-umalqura-nu-latn",
  { day: "numeric", month: "numeric", year: "numeric" }
);

// ইংরেজি তারিখ থেকে হিজরি তারিখ বের করে। shift = কত দিন আগে/পরে ধরা হবে।
const getHijri = (date, shift = 0) => {
  const target = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + shift,
    12
  );

  const parts = hijriFormatter.formatToParts(target);
  const pick = (type) =>
    parseInt(parts.find((part) => part.type === type)?.value, 10);

  return { day: pick("day"), month: pick("month"), year: pick("year") };
};

const getEvent = (hijri) => EVENTS[`${hijri.month}-${hijri.day}`] || "";

const formatHijri = (hijri) =>
  `${toBn(hijri.day)} ${HIJRI_MONTHS[hijri.month - 1]} ${toBn(hijri.year)} হিজরি`;

const formatTime = ({ hour, minute }) =>
  new Date(2000, 0, 1, hour, minute).toLocaleTimeString("bn-BD", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });



const IslamicCalendar = () => {
  const [date, setDate] = useState(() => getToday());
  const [now, setNow] = useState(() => new Date());
  const [maghrib, setMaghrib] = useState(FALLBACK_MAGHRIB);
  const [maghribLoaded, setMaghribLoaded] = useState(false);

  const today = getToday(now);
  const todayKey = getDateKey(today);

  // প্রতি ৩০ সেকেন্ডে সময় আপডেট, যাতে মাগরিব হলেই তারিখ বদলে যায়
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30 * 1000);
    return () => clearInterval(timer);
  }, []);

  // আজকের মাগরিবের সময় আনা (দিন বদলালে আবার আনা হবে)
  useEffect(() => {
    const controller = new AbortController();

    const fetchMaghrib = async () => {
      try {
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();

        const response = await fetch(
          `${API_URL}/timings/${dd}-${mm}-${yyyy}?latitude=${LATITUDE}&longitude=${LONGITUDE}&method=1&timezonestring=Asia/Dhaka`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error("maghrib");

        const result = await response.json();
        const match = String(result?.data?.timings?.Maghrib || "").match(
          /(\d{1,2}):(\d{2})/
        );

        if (!match) throw new Error("maghrib");

        setMaghrib({ hour: Number(match[1]), minute: Number(match[2]) });
        setMaghribLoaded(true);
      } catch (err) {
        if (err.name !== "AbortError") {
          setMaghrib(FALLBACK_MAGHRIB);
          setMaghribLoaded(false);
        }
      }
    };

    fetchMaghrib();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayKey]);

  const isAfterMaghrib =
    now.getHours() * 60 + now.getMinutes() >=
    maghrib.hour * 60 + maghrib.minute;

  // ইসলামি নিয়মে মাগরিবের পর থেকেই নতুন হিজরি দিন শুরু
  const todayHijri = getHijri(today, BD_OFFSET + (isAfterMaghrib ? 1 : 0));

  const displayedMonth = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  // মাসের প্রতিটি দিনের হিজরি তারিখ (দিনের বেলার হিসাবে)
  const monthDays = useMemo(
    () =>
      Array.from({ length: daysInMonth }, (_, index) => {
        const day = index + 1;
        const current = new Date(date.getFullYear(), date.getMonth(), day);
        return {
          day,
          weekday: current.getDay(),
          key: getDateKey(current),
          hijri: getHijri(current, BD_OFFSET),
        };
      }),
    [date, daysInMonth]
  );

  // হেডারের নিচে হিজরি মাসের নাম (মাসের মাঝে হিজরি মাস বদলালে দুটোই দেখাবে)
  const hijriSubtitle = useMemo(() => {
    const first = monthDays[0].hijri;
    const last = monthDays[monthDays.length - 1].hijri;

    if (first.month === last.month) {
      return `${HIJRI_MONTHS[first.month - 1]} ${toBn(first.year)} হিজরি`;
    }

    return `${HIJRI_MONTHS[first.month - 1]} – ${HIJRI_MONTHS[last.month - 1]} ${toBn(last.year)} হিজরি`;
  }, [monthDays]);

  const changeMonth = (offset) => {
    setDate(
      (current) => new Date(current.getFullYear(), current.getMonth() + offset, 1)
    );
  };

  const goToToday = () => setDate(getToday());

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
         

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            ইসলামিক ক্যালেন্ডার
          </h1>

          
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
              {formatHijri(todayHijri)}
            </h2>

            <p className="mt-2 text-sm text-slate-300">
              {today.toLocaleDateString("bn-BD", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <p className="mt-3 text-xs leading-5 text-slate-400">
              আজকের মাগরিব: {formatTime(maghrib)}
              {maghribLoaded ? "" : " (আনুমানিক)"} —{" "}
              {isAfterMaghrib
                ? "মাগরিব হয়ে গেছে, তাই নতুন হিজরি দিন শুরু হয়েছে।"
                : "মাগরিবের পর থেকে নতুন হিজরি দিন শুরু হবে।"}
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
                {hijriSubtitle}
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
            <p className="text-xs text-slate-400 sm:text-sm">
              ইংরেজি ও হিজরি তারিখ
            </p>

            <button
              type="button"
              onClick={goToToday}
              className="min-h-10 rounded-xl bg-[#c99a54] px-4 text-sm font-semibold text-[#102127] transition hover:bg-[#ddb36f]"
            >
              আজ
            </button>
          </div>

          {/* Calendar Content */}
          <div className="p-2 pt-3 sm:p-5 sm:pt-4">
            {/* Weekdays */}
            <div className="grid grid-cols-7 border-b border-white/10 pb-2">
              {WEEKDAYS.map((day, index) => (
                <div
                  key={day}
                  className={`py-2 text-center text-[11px] font-semibold sm:text-sm ${
                    index === 5 ? "text-emerald-300" : "text-slate-400"
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

              {monthDays.map(({ day, weekday, key, hijri }) => {
                const isToday = key === todayKey;
                const event = getEvent(hijri);

                return (
                  <div
                    key={day}
                    title={event || formatHijri(hijri)}
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
                        isToday || weekday === 5
                          ? "text-emerald-300"
                          : "text-white"
                      }`}
                    >
                      {day}
                    </span>

                    <span className="mt-1 text-[10px] tabular-nums text-slate-400 sm:text-xs">
                      {hijri.day}
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
                ঈদ
              </span>

              <span>বড় সংখ্যা: ইংরেজি তারিখ</span>
              <span>ছোট সংখ্যা: হিজরি তারিখ</span>
            </div>
          </div>
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
  হিজরি তারিখ বাংলাদেশের সাধারণ হিসাব অনুযায়ী দেখানো হয়েছে।
  চাঁদ দেখার ওপর নির্ভর করে তারিখ এক দিন আগে বা পরে হতে পারে।
  ঈদ ও হিজরি মাসের শুরু নিশ্চিত করতে{" "}
  <a
    href="https://islamicfoundation.gov.bd/pages/notices"
    target="_blank"
    rel="noopener noreferrer"
    className="font-medium text-emerald-300 underline underline-offset-2 transition hover:text-emerald-200"
  >
    জাতীয় চাঁদ দেখা কমিটির ঘোষণা
  </a>
  {" "}দেখুন।
</p>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default IslamicCalendar;
