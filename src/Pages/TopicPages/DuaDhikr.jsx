
import { useMemo, useState } from "react";
import {
  FaBookOpen,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaMosque,
  FaSearch,
} from "react-icons/fa";

const FONT = { fontFamily: "'Hind Siliguri', sans-serif" };

const compactButton =
  "inline-flex min-h-9 shrink-0 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400";

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
            দৈনন্দিন দোয়া, সালাতের যিকর, বিষয়ভিত্তিক হাদিস এবং
            নির্ভরযোগ্য ইসলামী বইয়ের মাধ্যমে কুরআন ও সুন্নাহর আলোকে
            দোয়া ও যিকর সম্পর্কে জানুন।
          </p>
        </header>

        <section id="dua-resources" className="scroll-mt-6">
          {/* Section heading */}
          <div className="mb-5">
            <p className="text-xs font-semibold tracking-wide text-emerald-400">
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
          <div className="mb-4 rounded-xl border border-emerald-400/15 bg-[#10252d] p-3 sm:p-4">
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
                className="min-h-10 w-full rounded-lg border border-emerald-400/15 bg-[#081b22] py-2.5 pl-10 pr-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/10"
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
                      ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-300"
                      : "border-emerald-400/15 bg-[#10252d] text-slate-300 hover:border-emerald-400/35 hover:text-emerald-300"
                  }`}
                >
                  {filter.label}
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  )}
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
                    className="group relative flex min-w-0 items-center gap-3 overflow-hidden rounded-xl border border-emerald-400/15 bg-[#10252d] p-3 transition-colors hover:border-emerald-400/35 sm:gap-4 sm:p-4"
                  >
                    <div className="absolute bottom-3 left-0 top-3 w-0.5 rounded-r-full bg-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />

                    {/* Resource icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/10 text-base text-emerald-300 sm:h-11 sm:w-11">
                      <Icon aria-hidden="true" />
                    </div>

                    {/* Resource details */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <span className="rounded-md border border-emerald-400/15 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300 sm:text-xs">
                          {typeLabels[resource.type]}
                        </span>

                        <span className="text-[10px] text-slate-500">
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
                      className="inline-flex min-h-8 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-2 py-2 text-[10px] font-semibold text-emerald-300 transition hover:bg-emerald-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 sm:px-3 sm:text-xs"
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
            <div className="rounded-xl border border-dashed border-emerald-400/20 bg-[#10252d] px-4 py-10 text-center">
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
                className={`${compactButton} mt-3 border-emerald-400/20 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20`}
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
      </div>
    </main>
  );
}
