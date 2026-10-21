
import { useMemo, useState } from "react";
import {
  FaBookOpen,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaMosque,
  FaSearch,
} from "react-icons/fa";

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

const DuaDhikr = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResources = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return resources.filter((resource) => {
      const matchesFilter =
        activeFilter === "all" || resource.type === activeFilter;

      const matchesSearch =
        !query ||
        `${resource.title} ${resource.author} ${resource.category} ${resource.description}`
          .toLowerCase()
          .includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm]);

  return (
    <main className="min-h-screen bg-slate-50/70 py-7 text-slate-800 sm:py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <header className="mb-8 text-center sm:mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            দোয়া ও যিকর
          </h1>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
            দৈনন্দিন দোয়া, সালাতের যিকর, বিষয়ভিত্তিক হাদিস এবং
            নির্ভরযোগ্য ইসলামী বইয়ের মাধ্যমে কুরআন ও সুন্নাহর আলোকে
            দোয়া ও যিকর সম্পর্কে জানুন।
          </p>
        </header>

        {/* Resources */}
        <section id="dua-resources" className="scroll-mt-6 pt-3 sm:pt-5">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
              Learning Resources
            </p>

            <h2 className="mt-1.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              আপনার প্রয়োজনীয় রিসোর্স
            </h2>

            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              বই, হাদিস ও দৈনন্দিন দোয়া থেকে আপনার পছন্দের বিষয়টি বেছে নিন।
            </p>
          </div>

          {/* Search */}
          <div className="mb-4">
            <label
              htmlFor="dua-search"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              রিসোর্স খুঁজুন
            </label>

            <div className="mb-4 rounded-xl border border-slate-200/80 bg-white/80 p-3 shadow-sm sm:p-4">
              <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400" />

              <input
                id="dua-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="বই, লেখক বা বিষয় লিখুন..."
                className="min-h-11 w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={isActive}
                  className={`shrink-0 rounded-lg border px-3.5 py-2 text-xs font-semibold transition sm:text-sm ${
                    isActive
                      ? "border-emerald-800 bg-emerald-800 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-800"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

      
         
          {/* Resource List */}
          {filteredResources.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {filteredResources.map((resource, index) => {
                const Icon = typeIcons[resource.type];

                return (
                  <article
                    key={resource.url}
                    className="group relative flex min-w-0 items-center gap-3 overflow-hidden rounded-xl border border-slate-200/80 bg-white/90 p-3 shadow-sm transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-md sm:gap-4 sm:p-4"
                  >
                    {/* Subtle Accent */}
                    <div className="absolute bottom-3 left-0 top-3 w-1 rounded-r-full bg-emerald-600/70 opacity-0 transition-opacity group-hover:opacity-100" />

                    {/* Icon */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-100 text-lg text-emerald-800 sm:h-12 sm:w-12">
                      <Icon />
                    </div>

                    {/* Resource Details */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 sm:text-xs">
                          {typeLabels[resource.type]}
                        </span>

                        <span className="text-[10px] font-medium text-slate-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="break-words text-sm font-bold leading-6 text-slate-900 sm:text-base">
                        {resource.title}
                      </h3>

                      <p className="mt-0.5 break-words text-[11px] leading-5 text-slate-500 sm:text-xs">
                        {resource.author}
                      </p>

                      <p className="mt-1 hidden text-xs leading-5 text-slate-500 sm:block">
                        {resource.description}
                      </p>

                      <div className="mt-2">
                        <span className="inline-flex max-w-full rounded-md border border-slate-200/80 bg-slate-50 px-2 py-1 text-[10px] leading-4 text-slate-600 sm:text-xs">
                          {resource.category}
                        </span>
                      </div>
                    </div>

                    {/* Read Button */}
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${resource.title} পড়ুন`}
                      className="inline-flex min-h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-emerald-800 px-2.5 py-2 text-[11px] font-semibold text-white shadow-sm transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 sm:px-3 sm:text-xs"
                    >
                      <span>
                        {resource.type === "book"
                          ? "পড়ুন"
                          : resource.type === "hadith"
                            ? "হাদিস"
                            : "দোয়া"}
                      </span>
                      <FaExternalLinkAlt className="text-[9px]" />
                    </a>
                  </article>
                );
              })}
            </div>
          ) : (

            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center">
              <FaSearch className="mx-auto text-2xl text-slate-300" />

              <h3 className="mt-3 text-sm font-bold text-slate-800">
                কোনো রিসোর্স পাওয়া যায়নি
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                অন্য কোনো শব্দ দিয়ে খুঁজে দেখুন।
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("all");
                }}
                className="mt-3 rounded-lg bg-emerald-800 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-emerald-900"
              >
                সব রিসোর্স দেখুন
              </button>
            </div>
          )}

          {/* Results Count */}
          {filteredResources.length > 0 && (
            <p className="mt-3 text-right text-xs text-slate-400">
              মোট {filteredResources.length}টি রিসোর্স
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

export default DuaDhikr;
