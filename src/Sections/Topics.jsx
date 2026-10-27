
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBookOpen,
  FaCompass,
  FaHistory,
  FaLandmark,
  FaMosque,
  FaScroll,
  FaHands,
} from "react-icons/fa";

const topics = [
  {
    title: "ঈমান ও আকিদা",
    subtitle: "ঈমান ও ইসলামী বিশ্বাস সম্পর্কে জানুন",
    path: "/topics/iman-aqeedah",
    icon: FaCompass,
    number: "01",
  },
  {
    title: "ইসলামের মূল ভিত্তি",
    subtitle: "ইসলামের পাঁচটি স্তম্ভ সম্পর্কে জানুন",
    path: "/topics/pillars-of-islam",
    icon: FaMosque,
    number: "02",
  },
  {
    title: "কুরআন ও তাফসির",
    subtitle: "কুরআনের অর্থ ও ব্যাখ্যা অন্বেষণ করুন",
    path: "/topics/quran-tafsir",
    icon: FaBookOpen,
    number: "03",
  },
  {
    title: "হাদিস ও সুন্নাহ",
    subtitle: "রাসুলুল্লাহ ﷺ-এর শিক্ষা সম্পর্কে জানুন",
    path: "/topics/hadith-sunnah",
    icon: FaScroll,
    number: "04",
  },
  {
    title: "সিরাত ও ইসলামের ইতিহাস",
    subtitle: "ইসলামের ইতিহাস ও ঐতিহ্য জানুন",
    path: "/topics/seerah-history",
    icon: FaHistory,
    number: "05",
  },
  {
    title: "দোয়া ও জিকির",
    subtitle: "দৈনন্দিন দোয়া, সকাল-সন্ধ্যার জিকির ও আমল",
    path: "/topics/dua-dhikr",
    icon: FaHands,
    number: "06",
  },
  {
    title: "ইসলাম কেন?",
    subtitle: "ইসলামের বার্তা ও সৌন্দর্য সম্পর্কে জানুন",
    path: "/topics/why-islam",
    icon: FaLandmark,
    number: "07",
  },
];

export default function Topics() {
  return (
    <section
      className="relative overflow-hidden bg-[#081b22] px-4 py-12 text-white sm:px-6 sm:py-16 lg:py-20"
      id="topics"
    >
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-500/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-amber-400/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="mb-8 sm:mb-10">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
              <FaBookOpen className="text-base" />
            </span>

            <span
              className="text-sm font-semibold tracking-wide text-emerald-400"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              ইসলামিক জ্ঞানচর্চা
            </span>
          </div>

          <h2
            className="text-2xl font-bold leading-snug text-white sm:text-3xl md:text-4xl"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            ইসলামের গুরুত্বপূর্ণ
            <span className="text-emerald-400"> বিষয়সমূহ</span>
          </h2>

          <p
            className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            ঈমান, কুরআন, হাদিস ও ইসলামের ইতিহাস সম্পর্কে জানুন।
            আপনার পছন্দের বিষয়টি নির্বাচন করে জ্ঞানচর্চা শুরু করুন।
          </p>

          <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-emerald-400 to-amber-400" />
        </div>

        {/* Topic List */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {topics.map((topic) => {
            const Icon = topic.icon;

            return (
              <Link
                key={topic.path}
                to={topic.path}
                className="group flex min-w-0 items-center gap-3 rounded-xl border border-white/[0.09] bg-white/[0.035] p-4 transition-all duration-200 hover:border-emerald-400/40 hover:bg-emerald-400/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 sm:gap-4 sm:p-5"
              >
                {/* Topic Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/10 text-emerald-400 transition-colors group-hover:border-emerald-400/30 group-hover:bg-emerald-400/15 sm:h-12 sm:w-12">
                  <Icon className="text-lg" />
                </div>

                {/* Topic Information */}
                <div className="min-w-0 flex-1">
                  <h3
                    className="text-base font-semibold leading-6 text-slate-100 transition-colors group-hover:text-emerald-300 sm:text-lg"
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                  >
                    {topic.title}
                  </h3>

                  <p
                    className="mt-1 text-xs leading-6 text-slate-400 sm:text-sm"
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                  >
                    {topic.subtitle}
                  </p>
                </div>

                {/* Topic Number and Arrow */}
                <div className="flex shrink-0 items-center gap-2">
                  <span className="hidden text-xs font-medium tabular-nums text-slate-500 sm:inline">
                    {topic.number}
                  </span>

                  <FaArrowRight className="text-sm text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-emerald-400" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
