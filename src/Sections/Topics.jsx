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
    <section className="relative overflow-hidden bg-[#07130f] px-4  text-white sm:px-6 ">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-emerald-500/[0.07] blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-amber-400/[0.05] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-14 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                Knowledge & Guidance
              </span>
            </div>

            <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Explore the Path to
              <span className="mt-2 block font-serif italic text-emerald-300">
                Islamic Knowledge
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-gray-400 sm:text-base md:pb-1">
            A journey of learning begins with understanding. Discover
            authentic teachings and build a stronger connection with Islam.
          </p>
        </div>

        {/* Topics */}
        <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
          {topics.map((topic) => {
            const Icon = topic.icon;

            return (
              <Link
                key={topic.path}
                to={topic.path}
                className="group relative flex gap-5 border-t border-white/10 py-7 transition-colors duration-300 hover:border-emerald-400/50 sm:gap-7 sm:py-9"
              >
                {/* Number */}
                <div className="w-10 shrink-0 pt-1 sm:w-12">
                  <span className="font-mono text-sm tracking-wider text-amber-400/80 transition-colors duration-300 group-hover:text-amber-300">
                    {topic.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/[0.045] text-lg text-emerald-300 transition-all duration-300 group-hover:bg-emerald-400 group-hover:text-[#07130f] sm:h-14 sm:w-14">
                  <Icon />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-300 sm:text-xl">
                    {topic.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {topic.subtitle}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300/80 transition-colors group-hover:text-emerald-200">
                    Discover More
                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </div>

                {/* Right Arrow */}
                <div className="flex shrink-0 items-center self-center text-gray-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-300">
                  <FaArrowRight className="text-sm" />
                </div>
              </Link>
            );
          })}
        </div>

       
      </div>
    </section>
  );
}