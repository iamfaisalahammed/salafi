
import { useEffect, useState } from "react";
import {
  FaMoon,
  FaHeart,
  FaArrowUp,
  FaHourglassHalf,
  FaClock,
} from "react-icons/fa";

export default function Footer() {
  const [time, setTime] = useState(new Date());
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const clock = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).formatToParts(time);

  const getPart = (type) =>
    clock.find((part) => part.type === type)?.value;

  const hours = getPart("hour");
  const minutes = getPart("minute");
  const seconds = getPart("second");
  const period = getPart("dayPeriod");

  const date = new Intl.DateTimeFormat("bn-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(time);

  return (
    <footer className="relative overflow-hidden border-t border-emerald-400/20 bg-gradient-to-b from-[#0a2118] via-[#071810] to-[#040c08] px-4 pb-6 pt-12 text-white sm:px-6 sm:pt-16">

      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-emerald-500/[0.08] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-amber-400/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-6xl">

        {/* Islamic Reminder + Live Clock */}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">

          {/* Reminder */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.06] px-4 py-2">
              <FaHourglassHalf className="text-amber-300" />
              <span className="text-xs font-semibold tracking-wide text-amber-200 sm:text-sm">
                প্রতিটি মুহূর্ত মূল্যবান
              </span>
            </div>

            <h2 className="text-2xl font-bold leading-relaxed sm:text-3xl">
              সময় বয়ে যাচ্ছে,
              <span className="text-emerald-300"> ফিরে আসুন </span>
              আপনার রবের দিকে।
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
              প্রতিটি মুহূর্তকে কাজে লাগান। আল্লাহর ইবাদত করুন,
              ভালো কাজ করুন এবং আখিরাতের প্রস্তুতি নিন।
              কারণ অতিবাহিত সময় আর কখনো ফিরে আসে না।
            </p>

            {/* Quran Verse */}
            <div className="mt-7 border-l-2 border-amber-400/50 pl-4 sm:pl-5">
              <p
                dir="rtl"
                lang="ar"
                className="text-2xl leading-loose text-amber-300 sm:text-3xl"
              >
                كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ
              </p>

              <p className="mt-2 text-sm leading-7 text-gray-300">
                “প্রত্যেক প্রাণীকে মৃত্যুর স্বাদ গ্রহণ করতে হবে।”
              </p>

              <p className="mt-2 text-xs font-semibold text-amber-300">
                — সূরা আলে ইমরান, আয়াত ১৮৫
              </p>
            </div>
          </div>

          {/* Live Clock Card */}
          <div className="relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-[#0b1b12]/80 p-6 shadow-xl sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  বাংলাদেশের বর্তমান সময়
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  <span className="text-xs text-emerald-300">
                    Live · Asia/Dhaka
                  </span>
                </div>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/[0.08] text-amber-300">
                <FaClock size={19} />
              </div>
            </div>

            <div
              className="mt-7 flex flex-wrap items-baseline gap-x-1 font-mono text-3xl font-bold tracking-tight text-amber-300 sm:text-4xl"
              aria-label={`বাংলাদেশের বর্তমান সময় ${hours}:${minutes}:${seconds} ${period}`}
            >
              <span>{hours}</span>
              <span className="text-emerald-400">:</span>
              <span>{minutes}</span>
              <span className="text-emerald-400">:</span>
              <span>{seconds}</span>
              <span className="ml-1 text-sm font-semibold text-emerald-300">
                {period}
              </span>
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="text-sm leading-7 text-gray-300">
                {date}
              </p>

              <p className="mt-2 text-xs leading-6 text-gray-500">
                আজকের সময়টুকু হোক নেক আমল ও কল্যাণের পথে।
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent sm:my-12" />

     

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-gray-500 sm:text-sm">
            © {currentYear} Hikmah. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-xs text-gray-400 sm:text-sm">
            Built with
            <FaHeart className="animate-pulse text-red-400" />
            for the Ummah
            <FaMoon className="ml-1 text-amber-300" />
          </p>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}
