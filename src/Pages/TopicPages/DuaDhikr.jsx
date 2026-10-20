
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
    title: "দৈহিসনুল মুসলিম",
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
        `${resource.title} ${resource.author} ${resource.category}`
          .toLowerCase()
          .includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm]);

  return (
    <main className="min-h-screen bg-slate-50/70 py-8 text-slate-800 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
     {/* Hero Section */}
<div className="mb-8 text-center sm:mb-10">
  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
    দোয়া ও যিকর
  </h1>

  <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
    দৈনন্দিন দোয়া, সালাতের যিকর, বিষয়ভিত্তিক হাদিস এবং
    নির্ভরযোগ্য ইসলামী বইয়ের মাধ্যমে কুরআন ও সুন্নাহর আলোকে
    দোয়া ও যিকর সম্পর্কে জানুন।
  </p>
</div>

   

        {/* Resources */}
        <section id="dua-resources" className="scroll-mt-6 pt-10 sm:pt-14">
          <div className="mb-6 flex flex-col gap-2 sm:mb-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 sm:text-sm">
              Learning Resources
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              আপনার প্রয়োজনীয় রিসোর্স
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              বই, হাদিস ও দৈনন্দিন দোয়া থেকে আপনার পছন্দের
              বিষয়টি বেছে নিন।
            </p>
          </div>

          {/* Search */}
          <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <label
              htmlFor="dua-search"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              রিসোর্স খুঁজুন
            </label>

            <div className="relative">
              <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="dua-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="বই, লেখক বা বিষয় লিখুন..."
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/10"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={isActive}
                  className={`min-h-10 shrink-0 rounded-xl border px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "border-emerald-800 bg-emerald-800 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-800"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Resource Cards */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-2">
              {filteredResources.map((resource, index) => {
                const Icon = typeIcons[resource.type];

                return (
                  <article
                    key={resource.url}
                    className="group flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md sm:p-6"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-800 transition group-hover:bg-emerald-100 sm:h-14 sm:w-14 sm:text-2xl">
                        <Icon />
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="inline-flex max-w-full rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600 sm:text-xs">
                          {typeLabels[resource.type]}
                        </span>

                        <h3 className="mt-2 break-words text-base font-bold leading-7 text-slate-900 sm:text-lg">
                          {resource.title}
                        </h3>
                      </div>

                      <span className="hidden text-sm font-medium text-slate-300 sm:block">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-500">
                      {resource.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-start gap-2 text-xs leading-5 text-slate-500 sm:text-sm">
                      <FaBookOpen className="mt-1 shrink-0 text-emerald-700" />
                      <span className="min-w-0 break-words">
                        {resource.author}
                      </span>
                    </div>

                    <div className="mt-3">
                      <span className="inline-flex max-w-full rounded-lg bg-emerald-50 px-3 py-1.5 text-xs leading-5 text-emerald-800">
                        {resource.category}
                      </span>
                    </div>

                    <div className="mt-5 flex-1" />

                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-emerald-800 bg-emerald-800 px-4 py-3 text-sm font-semibold text-white transition hover:border-emerald-900 hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                    >
                      {resource.type === "book"
                        ? "বই পড়ুন"
                        : resource.type === "hadith"
                          ? "হাদিস পড়ুন"
                          : "দোয়া পড়ুন"}
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-12 text-center">
              <FaSearch className="mx-auto text-3xl text-slate-300" />
              <h3 className="mt-4 font-bold text-slate-800">
                কোনো রিসোর্স পাওয়া যায়নি
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                অন্য কোনো শব্দ দিয়ে খুঁজে দেখুন।
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("all");
                }}
                className="mt-4 rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900"
              >
                সব রিসোর্স দেখুন
              </button>
            </div>
          )}
        </section>

      
      </div>
    </main>
  );
};

export default DuaDhikr;
