import { Link } from "react-router-dom";
import {
  FaMosque,
  FaCompass,
  FaClock,
  FaKaaba,
  FaCalendarDays,
  FaArrowUpRightFromSquare,
  FaMap,
  FaTimeline,
  FaLandmark,
  FaUsers,
} from "react-icons/fa6";

const tools = [
  {
    title: "Khilafah Atlas",
    icon: FaLandmark,
    path: "/tools/khilafah-atlas",
  },
  {
    title: "Makkah Locator",
    icon: FaCompass,
    path: "/tools/makkah-locator",
  },
  {
    title: "Prayer Times",
    icon: FaClock,
    path: "/tools/prayer-times",
  },
  {
    title: "Islamic Calendar",
    icon: FaCalendarDays,
    path: "/tools/islamic-calendar",
  },
  {
    title: "Sacred Mosques",
    icon: FaKaaba,
    path: "/tools/sacred-mosques",
  },
  {
    title: "Muslim Map",
    icon: FaMap,
    path: "/tools/muslim-map",
  },
  {
    title: "Seerah Timeline",
    icon: FaTimeline,
    path: "/tools/seerah-timeline",
  },
  {
    title: "Prophets",
    icon: FaUsers,
    path: "/tools/prophets",
  },
  {
    title: "Find Mosque",
    icon: FaMosque,
    path: "https://www.google.com/maps/search/?api=1&query=mosque%20near%20me",
    external: true,
  },
];

export default function Tools() {
  return (
    <section
      id="tools"
      className="relative overflow-hidden bg-[#081b22] px-3 py-10 text-slate-100 sm:px-6 sm:py-14 lg:py-16"
      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
    >
      <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-emerald-400/[0.07] blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-7 sm:mb-9">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/[0.07] px-3 py-1.5 text-xs font-semibold text-emerald-300 sm:text-sm">
            <FaCompass />
            <span>ইসলামিক টুলস</span>
          </div>

          <h2 className="text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl lg:text-4xl">
            প্রয়োজনীয় টুলস{" "}
            <span className="text-[#d6aa62]">এক জায়গায়</span>
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            দৈনন্দিন ইসলামিক জীবনকে সহজ করতে দরকারি টুলস ব্যবহার করুন।
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-3 gap-x-2 gap-y-5 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5 lg:gap-6">
          {tools.map(({ title, icon: Icon, path, external }) => {
            const content = (
              <>
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#102d35] transition-colors duration-200 group-hover:bg-[#15313a] sm:h-16 sm:w-16">
                  {/* ধীরে ঘোরা হালকা বর্ডার */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-full border-[1.5px] border-[#d6aa62]/20 border-t-[#d6aa62] border-r-[#d6aa62]/50 transition-colors duration-200 group-hover:border-[#d6aa62]/35 group-hover:border-t-[#d6aa62] group-hover:border-r-[#d6aa62]/70 animate-[spin_4s_linear_infinite] motion-reduce:animate-none"
                  />
                  <Icon
                    className="relative text-xl text-[#d6aa62] sm:text-2xl"
                    aria-hidden="true"
                  />
                </span>

                <span className="mt-3 flex items-center justify-center gap-1 text-center text-xs font-semibold leading-5 text-slate-200 transition-colors group-hover:text-emerald-300 sm:text-sm">
                  <span>{title}</span>
                  {external && (
                    <FaArrowUpRightFromSquare className="shrink-0 text-[9px] text-slate-500" />
                  )}
                </span>
              </>
            );

            const className =
              "group flex min-w-0 flex-col items-center rounded-2xl border border-transparent px-1 py-3 transition-colors duration-200 hover:border-white/[0.08] hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 sm:py-4";

            return external ? (
              <a
                key={title}
                href={path}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Find nearby mosques on Google Maps"
                className={className}
              >
                {content}
              </a>
            ) : (
              <Link key={title} to={path} className={className}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
