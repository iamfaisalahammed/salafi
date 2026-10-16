import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBookOpen,
  FaCompass,
  FaHistory,
  FaLandmark,
  FaMosque,
 
  FaScroll,
} from "react-icons/fa";

const topics = [
  {
    title: "Iman & Aqeedah",
    subtitle: "Strengthen your faith and beliefs",
    path: "/topics/iman-aqeedah",
    icon: FaCompass,
    number: "01",
  },
  {
    title: "Pillars of Islam",
    subtitle: "Understand the foundations of Islam",
    path: "/topics/pillars-of-islam",
    icon: FaMosque,
    number: "02",
  },
  {
    title: "Quran & Tafsir",
    subtitle: "Explore the Quran and its meanings",
    path: "/topics/quran-tafsir",
    icon: FaBookOpen,
    number: "03",
  },
  {
    title: "Hadith & Sunnah",
    subtitle: "Learn from the Prophet's teachings",
    path: "/topics/hadith-sunnah",
    icon: FaScroll,
    number: "04",
  },
  {
    title: "Seerah & History",
    subtitle: "Discover Islamic history and heritage",
    path: "/topics/seerah-history",
    icon: FaHistory,
    number: "05",
  },
  {
    title: "Why Islam?",
    subtitle: "Discover the message and beauty of Islam",
    path: "/topics/why-islam",
    icon: FaLandmark,
    number: "06",
  },
];

export default function Topics() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#06140e] via-[#09251a] to-[#06111a] px-4 py-20 text-white sm:px-6 lg:py-24">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-amber-400/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">

        

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Discover the Beauty of{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-amber-300 bg-clip-text text-transparent">
              Islam
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-300 sm:text-base">
            Explore authentic Islamic teachings, deepen your understanding,
            and strengthen your connection with your faith.
          </p>

          <div className="mx-auto mt-7 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-400 to-amber-400" />
        </div>

        {/* Topic Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">

          {topics.map((topic) => {
            const Icon = topic.icon;

            return (
              <Link
                key={topic.path}
                to={topic.path}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-400/40 hover:bg-emerald-400/[0.07] hover:shadow-xl hover:shadow-emerald-950/30 sm:p-7"
              >
                {/* Decorative Number */}
                <span className="absolute right-5 top-4 text-5xl font-bold text-white/[0.045] transition-colors duration-300 group-hover:text-emerald-300/[0.12]">
                  {topic.number}
                </span>

                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/20 to-emerald-900/20 text-2xl text-emerald-300 transition-all duration-300 group-hover:scale-110 group-hover:border-emerald-300/40 group-hover:bg-emerald-400/20">
                  <Icon />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-300">
                  {topic.title}
                </h3>

                <p className="min-h-12 text-sm leading-6 text-gray-400">
                  {topic.subtitle}
                </p>

                {/* Card Footer */}
                <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4">
                  <span className="text-sm font-medium text-emerald-300/90 transition-colors group-hover:text-emerald-200">
                    Explore Topic
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 group-hover:border-emerald-400/40 group-hover:bg-emerald-400/10 group-hover:text-emerald-300">
                    <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-400 to-amber-400 transition-all duration-500 group-hover:w-full" />
              </Link>
            );
          })}

        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">

          <p className="mb-5 text-sm text-gray-400">
            Every step toward knowledge brings you closer to understanding.
          </p>

          <Link
            to="/ExploreLibrary"
            className="group inline-flex items-center justify-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-7 py-3.5 font-semibold text-emerald-200 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-400 hover:text-[#06140e] hover:shadow-lg hover:shadow-emerald-900/30"
          >
            <FaBookOpen />
            Explore Islamic Library
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

        </div>
      </div>
    </section>
  );
}