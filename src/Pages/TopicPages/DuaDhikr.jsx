import { useMemo, useState } from "react";
import {
  FaBookOpen,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaMosque,
  FaSearch,
} from "react-icons/fa";
import { FaHands, FaHand, FaMoon, FaStarAndCrescent } from "react-icons/fa6";

const FONT = { fontFamily: "'Hind Siliguri', sans-serif" };

// ছোট বাটনের কমন স্টাইল
const compactButton =
  "inline-flex min-h-9 shrink-0 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b]";

const resources = [
  {
    title: "সালাত, দুআ ও যিকর",
    author: "ড. খোন্দকার আব্দুল্লাহ জাহাঙ্গীর (রহ.)",
    url: "https://drive.google.com/file/d/16lAUKqSdwY0c8kDc4ZCxqqjfmsDVuus7/view?usp=drivesdk",
    type: "book",
    category: "দোয়া ও যিকর",
    description: "সালাত, দুআ ও যিকর সম্পর্কিত বই",
  },
  {
    title: "রাহে বেলায়েত",
    author: "ড. খোন্দকার আব্দুল্লাহ জাহাঙ্গীর (রহ.)",
    url: "https://drive.google.com/file/d/11ZapxgMnYY8b3Hn87zgW_riI-F2RPg0P/view?usp=drivesdk",
    type: "book",
    category: "ইসলামী আমল ও আত্মশুদ্ধি",
    description: "ইসলামী আমল ও আত্মশুদ্ধি বিষয়ক বই",
  },
  {
    title: "দোয়া ও যিকর বিষয়ভিত্তিক হাদিস",
    author: "iHadis",
    url: "https://ihadis.com/subjectwise-hadith/supplications-and-dhikr",
    type: "hadith",
    category: "দোয়া ও যিকর",
    description: "বিষয়ভিত্তিক হাদিস থেকে দোয়া ও যিকর পড়ুন",
  },
  {
    title: "হিসনুল মুসলিম",
    author: "শাইখ সাঈদ ইবন আলী ইবন ওয়াহফ আল-কাহতানী (রহ.)।",
    url: "https://dua.gtaf.org/bn",
    type: "dua",
    category: "দোয়া ও যিকর",
    description: "দৈনন্দিন জীবনের দোয়াগুলো পড়ুন",
  },
];

const filters = [
  { id: "all", label: "সব রিসোর্স" },
  { id: "dua", label: "দোয়া ও যিকর" },
  { id: "hadith", label: "হাদিস" },
  { id: "book", label: "বই" },
];

const typeLabels = {
  dua: "দৈনন্দিন দোয়া",
  hadith: "হাদিস",
  book: "ইসলামী বই",
};

const typeIcons = {
  dua: FaMosque,
  hadith: FaCheckCircle,
  book: FaBookOpen,
};

export default function DuaDhikr() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showTasbih, setShowTasbih] = useState(false);

  const filteredResources = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return resources.filter((resource) => {
      const matchesFilter =
        activeFilter === "all" || resource.type === activeFilter;

      const searchableText = [
        resource.title,
        resource.author,
        resource.category,
        resource.description,
      ]
        .join(" ")
        .toLowerCase();

      return matchesFilter && searchableText.includes(query);
    });
  }, [activeFilter, searchTerm]);

  const resetFilters = () => {
    setSearchTerm("");
    setActiveFilter("all");
  };

  return (
    <main
      className="min-h-screen overflow-x-clip bg-[#081b22] px-3 py-8 text-slate-200 sm:px-6 sm:py-12"
      style={FONT}
    >
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <header className="mb-8 text-center sm:mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl md:text-4xl">
            দোয়া ও যিকর
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            দৈনন্দিন দোয়া, সালাতের যিকর, বিষয়ভিত্তিক হাদিস এবং নির্ভরযোগ্য
            ইসলামী বইয়ের মাধ্যমে কুরআন ও সুন্নাহর আলোকে দোয়া ও যিকর সম্পর্কে
            জানুন।
          </p>
        </header>

        {/* তাসবীহ বাটন: একই পেজে তাসবীহ দেখাবে */}
        <div className="mb-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowTasbih((current) => !current)}
            aria-expanded={showTasbih}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#dfbd7b]/40 bg-[#10252d] px-5 py-3 text-sm font-semibold text-[#dfbd7b] transition hover:border-[#dfbd7b] hover:bg-[#15313a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b]"
          >
            <FaHand aria-hidden="true" />
            {showTasbih ? "দোয়া ও যিকরে ফিরে যান" : "তাসবীহ গণনা"}
          </button>
        </div>

        {showTasbih ? (
          <Tasbih />
        ) : (
          <section id="dua-resources" className="scroll-mt-6">
          {/* Section heading */}
          <div className="mb-5">
            <p className="text-xs font-semibold tracking-wide text-[#dfbd7b]">
              শেখার উপকরণ
            </p>

            <h2 className="mt-1.5 text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">
              প্রয়োজনীয় রিসোর্স
            </h2>

            <p className="mt-1.5 text-sm leading-6 text-slate-400">
              বই, হাদিস ও দৈনন্দিন দোয়া থেকে পছন্দের বিষয়টি বেছে নিন।
            </p>
          </div>

          {/* Search */}
          <div className="mb-4 rounded-xl border border-[#dfbd7b]/15 bg-[#10252d] p-3 sm:p-4">
            <label
              htmlFor="dua-search"
              className="mb-2 block text-sm font-semibold text-slate-200"
            >
              রিসোর্স খুঁজুন
            </label>

            <div className="relative">
              <FaSearch
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-500"
              />

              <input
                id="dua-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="বই, লেখক বা বিষয় লিখুন..."
                className="min-h-10 w-full rounded-lg border border-[#dfbd7b]/15 bg-[#081b22] py-2.5 pl-10 pr-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-[#dfbd7b]/60 focus:ring-2 focus:ring-[#dfbd7b]/10"
              />
            </div>
          </div>

          {/* Compact filters */}
          <div
            className="mb-5 flex gap-2 overflow-x-auto pb-1"
            role="group"
            aria-label="রিসোর্সের ধরন নির্বাচন করুন"
          >
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={isActive}
                  className={`${compactButton} ${
                    isActive
                      ? "border-[#dfbd7b] bg-[#dfbd7b] text-[#081b22]"
                      : "border-[#dfbd7b]/15 bg-[#10252d] text-slate-300 hover:border-[#dfbd7b]/40 hover:text-[#dfbd7b]"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Resource list */}
          {filteredResources.length > 0 ? (
            <div className="space-y-2.5 sm:space-y-3">
              {filteredResources.map((resource, index) => {
                const Icon = typeIcons[resource.type];

                return (
                  <article
                    key={resource.url}
                    className="group relative flex min-w-0 items-center gap-3 overflow-hidden rounded-xl border border-[#dfbd7b]/15 bg-[#10252d] p-3 transition-colors hover:border-[#dfbd7b]/40 sm:gap-4 sm:p-4"
                  >
                    <div className="absolute bottom-3 left-0 top-3 w-0.5 rounded-r-full bg-[#dfbd7b] opacity-0 transition-opacity group-hover:opacity-100" />

                    {/* Resource icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#dfbd7b]/20 bg-[#dfbd7b]/10 text-base text-[#dfbd7b] sm:h-11 sm:w-11">
                      <Icon aria-hidden="true" />
                    </div>

                    {/* Resource details */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <span className="rounded-md border border-[#dfbd7b]/20 bg-[#dfbd7b]/10 px-2 py-0.5 text-[10px] font-medium text-[#dfbd7b] sm:text-xs">
                          {typeLabels[resource.type]}
                        </span>

                        <span className="text-[10px] text-[#dfbd7b]/60">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="break-words text-sm font-bold leading-6 text-slate-100 sm:text-base">
                        {resource.title}
                      </h3>

                      <p className="mt-0.5 break-words text-[11px] leading-5 text-slate-400 sm:text-xs">
                        {resource.author}
                      </p>

                      <p className="mt-1 hidden text-xs leading-5 text-slate-400 sm:block">
                        {resource.description}
                      </p>

                      <div className="mt-2">
                        <span className="inline-flex max-w-full break-words rounded-md border border-white/5 bg-[#0b2027] px-2 py-1 text-[10px] leading-4 text-slate-400 sm:text-xs">
                          {resource.category}
                        </span>
                      </div>
                    </div>

                    {/* Read button */}
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${resource.title} পড়ুন`}
                      className="inline-flex min-h-8 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#dfbd7b] px-2 py-2 text-[10px] font-semibold text-[#081b22] transition hover:bg-[#e8cd96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b] sm:px-3 sm:text-xs"
                    >
                      <span>
                        {resource.type === "book"
                          ? "পড়ুন"
                          : resource.type === "hadith"
                            ? "হাদিস"
                            : "দোয়া"}
                      </span>
                      <FaExternalLinkAlt
                        aria-hidden="true"
                        className="text-[9px]"
                      />
                    </a>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-[#dfbd7b]/25 bg-[#10252d] px-4 py-10 text-center">
              <FaSearch
                aria-hidden="true"
                className="mx-auto text-2xl text-slate-500"
              />

              <h3 className="mt-3 text-sm font-bold text-slate-100">
                কোনো রিসোর্স পাওয়া যায়নি
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                অন্য কোনো শব্দ দিয়ে খুঁজে দেখুন।
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className={`${compactButton} mt-3 border-[#dfbd7b] bg-[#dfbd7b] text-[#081b22] hover:bg-[#e8cd96]`}
              >
                সব রিসোর্স দেখুন
              </button>
            </div>
          )}

          {/* Results count */}
          {filteredResources.length > 0 && (
            <p className="mt-3 text-right text-xs text-slate-500">
              মোট {filteredResources.length}টি রিসোর্স
            </p>
          )}
          </section>
        )}
      </div>

      {!showTasbih && (
      /* Hisnul Muslim app link */
      <div className="mb-5 mt-6 flex justify-center">
        <a
          href="https://play.google.com/store/apps/details?id=com.greentech.hisnulmuslimbn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-[#dfbd7b]"
        >
          <FaHands className="shrink-0 text-base text-[#dfbd7b]" />
          <span>দোয়া ও জিকিরের জন্য Hisnul Muslim অ্যাপ ডাউনলোড করুন</span>
          <FaExternalLinkAlt className="shrink-0 text-[10px]" />
        </a>
      </div>
      )}
    </main>
  );
}

/* Original Tasbih component, integrated without removing its content */
const toBn = (n) => String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

// [number, x, y] — viewBox 490 x 640
const counts = [
  // Little finger
  [1, 55, 318],
  [2, 97, 298],
  [3, 50, 268],
  [4, 90, 256],
  [5, 52, 195],
  [6, 88, 188],
  [7, 68, 138],

  // Ring finger
  [8, 122, 290],
  [9, 166, 271],
  [10, 124, 236],
  [11, 158, 228],
  [12, 124, 152],
  [13, 156, 147],
  [14, 144, 58],

  // Middle finger
  [15, 190, 268],
  [16, 230, 271],
  [17, 197, 208],
  [18, 237, 205],
  [19, 207, 118],
  [20, 242, 118],
  [21, 230, 28],

  // Index finger
  [22, 262, 282],
  [23, 298, 294],
  [24, 274, 214],
  [25, 316, 218],
  [26, 289, 143],
  [27, 324, 146],
  [28, 313, 73],

  // Thumb
  [29, 346, 408],
  [30, 374, 425],
  [31, 378, 352],
  [32, 416, 372],
  [33, 446, 299],
];

const fingers = [
  "M45 325 L40 200 Q38 150 60 130 Q80 125 95 150 L105 322 Z",
  "M115 290 L118 110 Q125 62 150 65 Q168 70 168 100 L172 280 Z",
  "M178 280 L185 85 Q192 40 220 38 Q250 42 252 80 L255 280 Z",
  "M250 285 L275 120 Q285 85 310 85 Q335 95 330 125 L312 310 Z",
  "M335 420 L345 380 Q400 310 440 305 Q465 310 455 340 Q420 390 375 430 Z",
];

const joints = [
  [42, 272, 102, 262],
  [40, 200, 98, 196],
  [116, 238, 170, 230],
  [118, 155, 170, 150],
  [182, 210, 254, 208],
  [186, 125, 252, 122],
  [262, 218, 322, 222],
  [280, 145, 332, 148],
  [338, 410, 388, 436],
  [352, 368, 440, 392],
];

const Tasbih = () => {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#06161c] via-[#081b22] to-[#0a2229] px-4 py-10 text-slate-100 sm:px-6 sm:py-14"
      style={{
        fontFamily: "'Hind Siliguri', sans-serif",
      }}
    >
      <style>
        {
          "@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700;800&display=swap');"
        }
      </style>

      {/* Background Decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-400/[0.07] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-96 h-80 w-80 rounded-full bg-[#c99a54]/[0.08] blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl">
        {/* Heading */}
        <header className="mb-8 text-center sm:mb-10">
         

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            আঙুলে তাসবীহ গণনা
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">
            সহজভাবে আঙুলে তাসবীহ গণনা করার পদ্ধতি ও গুরুত্বপূর্ণ নির্দেশনা জেনে
            নিন।
          </p>
        </header>

        {/* Main Card */}
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#10252d]/90 shadow-2xl shadow-black/20 backdrop-blur-xl">
          {/* Card Header */}
          <div className="border-b border-white/10 px-5 py-5 sm:px-7 sm:py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#c99a54]/20 bg-[#c99a54]/10 text-[#e0b875]">
                <FaHand className="text-xl" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-white sm:text-xl">
                  তাসবীহ পড়ার সহজ উপায়
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
                  আঙুলের সাহায্যে ৩৩ বার গণনা
                </p>
              </div>
            </div>
          </div>

          {/* Hand Illustration Area */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#102b32] via-[#0d252c] to-[#132b31] px-2 py-5 sm:px-6 sm:py-8">
            {/* Subtle pattern */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, #c99a54 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-white/[0.08] bg-[#071a20]/60 p-2 shadow-inner sm:p-4">
              <div className="mb-1 flex items-center justify-center gap-2 pt-2 text-xs font-medium text-emerald-300/80 sm:text-sm">
                <FaStarAndCrescent />
                <span>আঙুলে তাসবীহ গণনার চিত্র</span>
              </div>

              <svg
                viewBox="0 0 490 640"
                className="h-auto w-full"
                role="img"
                aria-label="আঙুলে ১ থেকে ৩৩ পর্যন্ত তাসবীহ গণনার চিত্র"
              >
                <defs>
                  <linearGradient id="tasbih-skin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f8dfc9" />
                    <stop offset="100%" stopColor="#eab99a" />
                  </linearGradient>

                  <linearGradient id="tasbih-palm" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fbe6d5" />
                    <stop offset="100%" stopColor="#e9b696" />
                  </linearGradient>

                  <filter
                    id="tasbih-shadow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="150%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="8"
                      stdDeviation="8"
                      floodColor="#000000"
                      floodOpacity="0.22"
                    />
                  </filter>
                </defs>

                {/* Decorative beads */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <circle
                    key={i}
                    cx={430 + i * 4}
                    cy={20 + i * 34}
                    r={20 - i * 0.6}
                    fill="#c99a54"
                    opacity="0.38"
                  />
                ))}

                {/* Palm */}
                <path
                  d="M45 325 L105 322 L172 280 L255 280 L312 310 L335 420 L385 440 Q370 520 330 570 Q300 620 290 640 L60 640 Q40 600 45 540 Z"
                  fill="url(#tasbih-palm)"
                  stroke="#d6a383"
                  strokeWidth="2"
                  filter="url(#tasbih-shadow)"
                />

                {/* Fingers */}
                {fingers.map((d, i) => (
                  <path
                    key={i}
                    d={d}
                    fill="url(#tasbih-skin)"
                    stroke="#d6a383"
                    strokeWidth="2"
                  />
                ))}

                {/* Joint Lines */}
                {joints.map(([x1, y1, x2, y2], i) => (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#c58d6b"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                ))}

                {/* Numbers */}
                {counts.map(([n, x, y]) => (
                  <text
                    key={n}
                    x={x}
                    y={y}
                    fontSize="15"
                    fontWeight="700"
                    fill="#ff0000"
                    textAnchor="middle"
                  >
                    {toBn(n)}
                  </text>
                ))}

                {/* Illustration Label */}
                <text
                  x="190"
                  y="410"
                  textAnchor="middle"
                  fontSize="34"
                  fontWeight="800"
                  fill="#b83232"
                >
                  তাসবীহ
                </text>

                <text
                  x="190"
                  y="450"
                  textAnchor="middle"
                  fontSize="24"
                  fontWeight="700"
                  fill="#25343a"
                >
                  পড়ার সহজ উপায়
                </text>

                <text
                  x="190"
                  y="490"
                  textAnchor="middle"
                  fontSize="26"
                  fontWeight="800"
                  fill="#25343a"
                >
                  <tspan fill="#b83232">১</tspan>
                  {" বারেই "}
                  <tspan fill="#b83232">৩৩</tspan>
                </text>
              </svg>
            </div>
          </div>

          {/* Hadith */}
          <div className="p-5 sm:p-7">
            <div className="rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.04] p-4 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-300/10 text-emerald-300">
                  <FaMoon />
                </div>

                <h3 className="text-base font-bold text-white sm:text-lg">
                  হাদিসের নির্দেশনা
                </h3>
              </div>

              <p className="text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                রাসূলুল্লাহ ﷺ আঙুলে তাসবীহ গণনা করার নির্দেশ দিয়েছেন। কারণ
                আঙুলগুলো কিয়ামতের দিন জিজ্ঞাসিত হবে এবং কথা বলবে।
              </p>

              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="text-xs leading-6 text-slate-400 sm:text-sm">
                  সুনান আবু দাউদ, হাদিস ১৫০১;
                  <p> হাদিসের মানঃ হাসান</p>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Caption */}
        <p className="mt-6 text-center text-xs leading-6 text-slate-500">
          Hikmah — জ্ঞান অর্জন করুন, সুন্নাহর পথে চলুন।
        </p>
      </div>
    </main>
  );
};

