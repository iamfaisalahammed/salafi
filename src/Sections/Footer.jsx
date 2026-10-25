import { useEffect, useState } from "react";
import {
  FaMoon,
  FaHeart,
  FaArrowUp,
  FaHourglassHalf,
  FaClock,
} from "react-icons/fa";

const FONT = { fontFamily: "'Hind Siliguri', sans-serif" };

export default function Footer() {
  const [time, setTime] = useState(new Date());
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={FONT}
      className="border-t border-emerald-400/20 bg-[#081b22] px-4 pb-6 pt-10 text-slate-300 sm:px-6 sm:pt-14"
    >
      <div className="mx-auto max-w-6xl">
        {/* Islamic Reminder and Live Clock */}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          {/* Islamic Reminder */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-emerald-300">
              <FaHourglassHalf className="text-emerald-400" />
              <span className="text-xs font-semibold sm:text-sm">
                প্রতিটি মুহূর্ত মূল্যবান
              </span>
            </div>

            <h2 className="text-2xl font-bold leading-relaxed text-white sm:text-3xl">
              সময় বয়ে যাচ্ছে,
              <span className="text-emerald-300"> ফিরে আসুন </span>
              আপনার রবের দিকে।
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              প্রতিটি মুহূর্তকে কাজে লাগান। আল্লাহর ইবাদত করুন,
              ভালো কাজ করুন এবং আখিরাতের প্রস্তুতি নিন।
              অতিবাহিত সময় আর কখনো ফিরে আসে না।
            </p>

            {/* Quran Reminder */}
            <div className="mt-6 rounded-r-xl border-l-4 border-[#d6aa62] bg-[#10252d] px-4 py-4 sm:px-5">
              <p
                dir="rtl"
                lang="ar"
                className="text-right text-2xl leading-loose text-[#e5c58e] sm:text-3xl"
              >
                كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ
              </p>

              <p className="mt-2 text-sm leading-7 text-slate-300">
                প্রত্যেক প্রাণীকে মৃত্যুর স্বাদ গ্রহণ করতে হবে।
              </p>

              <p className="mt-2 text-xs font-semibold text-[#d6aa62]">
                — সূরা আলে ইমরান, ৩:১৮৫ (আয়াতের অংশ)
              </p>
            </div>
          </div>

          {/* Bangladesh Live Clock */}
          <div className="rounded-2xl border border-emerald-400/20 bg-[#10252d] p-5 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">
                  বাংলাদেশের বর্তমান সময়
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  <span className="text-xs text-emerald-300">
                    লাইভ সময় · ঢাকা
                  </span>
                </div>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                <FaClock size={19} />
              </div>
            </div>

            <div
              className="mt-7 flex flex-wrap items-baseline gap-x-1 font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl"
              aria-label={`বাংলাদেশের বর্তমান সময় ${hours}:${minutes}:${seconds} ${period}`}
            >
              <span>{hours}</span>
              <span className="text-emerald-400">:</span>
              <span>{minutes}</span>
              <span className="text-emerald-400">:</span>
              <span>{seconds}</span>
              <span className="ml-1 text-sm font-semibold text-[#d6aa62]">
                {period}
              </span>
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="text-sm leading-7 text-slate-300">{date}</p>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                আজকের সময়টুকু হোক নেক আমল ও কল্যাণের পথে।
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent sm:my-12" />

        {/* Footer Bottom */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate-500 sm:text-sm">
            © {currentYear}{" "}
            <span className="font-semibold text-emerald-300">Hikmah</span>.
            সর্বস্বত্ব সংরক্ষিত।
          </p>

          <p className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-400 sm:text-sm">
            <span>উম্মাহর জন্য তৈরি</span>
            <FaHeart className="text-rose-400" />
            <FaMoon className="ml-1 text-[#d6aa62]" />
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="উপরে ফিরে যান"
            title="উপরে ফিরে যান"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-400 hover:text-[#081b22] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#081b22]"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}