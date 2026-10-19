
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-emerald-100 bg-white px-4 pb-6 pt-12 text-gray-800 sm:px-6 sm:pt-16">
      <div className="mx-auto max-w-6xl">
        {/* Islamic Reminder and Live Clock */}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          {/* Islamic Reminder */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-emerald-800">
              <FaHourglassHalf className="text-emerald-600" />
              <span className="text-xs font-semibold sm:text-sm">
                প্রতিটি মুহূর্ত মূল্যবান
              </span>
            </div>

            <h2 className="text-2xl font-bold leading-relaxed text-gray-900 sm:text-3xl">
              সময় বয়ে যাচ্ছে,
              <span className="text-emerald-700"> ফিরে আসুন </span>
              আপনার রবের দিকে।
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              প্রতিটি মুহূর্তকে কাজে লাগান। আল্লাহর ইবাদত করুন,
              ভালো কাজ করুন এবং আখিরাতের প্রস্তুতি নিন।
              অতিবাহিত সময় আর কখনো ফিরে আসে না।
            </p>

            {/* Quran Reminder */}
            <div className="mt-6 rounded-r-xl border-l-4 border-emerald-600 bg-emerald-50/70 px-4 py-4 sm:px-5">
              <p
                dir="rtl"
                lang="ar"
                className="text-right text-2xl leading-loose text-emerald-900 sm:text-3xl"
              >
                كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ
              </p>

              <p className="mt-2 text-sm leading-7 text-gray-700">
                প্রত্যেক প্রাণীকে মৃত্যুর স্বাদ গ্রহণ করতে হবে।
              </p>

              <p className="mt-2 text-xs font-semibold text-emerald-800">
                — সূরা আলে ইমরান, ৩:১৮৫ (আয়াতের অংশ)
              </p>
            </div>
          </div>

          {/* Bangladesh Live Clock */}
          <div className="rounded-2xl border border-emerald-100 bg-gray-50 p-5 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  বাংলাদেশের বর্তমান সময়
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-emerald-700">
                    লাইভ সময় · ঢাকা
                  </span>
                </div>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <FaClock size={19} />
              </div>
            </div>

            <div
              className="mt-7 flex flex-wrap items-baseline gap-x-1 font-mono text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              aria-label={`বাংলাদেশের বর্তমান সময় ${hours}:${minutes}:${seconds} ${period}`}
            >
              <span>{hours}</span>
              <span className="text-emerald-600">:</span>
              <span>{minutes}</span>
              <span className="text-emerald-600">:</span>
              <span>{seconds}</span>
              <span className="ml-1 text-sm font-semibold text-emerald-700">
                {period}
              </span>
            </div>

            <div className="mt-5 border-t border-gray-200 pt-4">
              <p className="text-sm leading-7 text-gray-700">{date}</p>

              <p className="mt-2 text-xs leading-6 text-gray-500">
                আজকের সময়টুকু হোক নেক আমল ও কল্যাণের পথে।
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gray-100 sm:my-12" />

        {/* Footer Bottom */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-gray-100 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-gray-500 sm:text-sm">
            © {currentYear} Hikmah. সর্বস্বত্ব সংরক্ষিত।
          </p>

          <p className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-gray-500 sm:text-sm">
            <span>উম্মাহর জন্য তৈরি</span>
            <FaHeart className="text-red-500" />
            <FaMoon className="ml-1 text-emerald-700" />
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="উপরে ফিরে যান"
            title="উপরে ফিরে যান"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700 transition-colors hover:border-emerald-600 hover:bg-emerald-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}
