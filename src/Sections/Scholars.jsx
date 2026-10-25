import { useEffect, useMemo, useState } from "react";
import {
  FaYoutube,
  FaTimes,
  FaSearch,
  FaChevronRight,
  FaBookOpen,
  FaUserGraduate,
  FaExternalLinkAlt,
  FaGraduationCap,
} from "react-icons/fa";

const FALLBACK_IMAGE =
  "https://placehold.co/300x300/f0fdf4/166534?text=Scholar";

const FONT = { fontFamily: "'Hind Siliguri', sans-serif" };

export default function Scholars() {
  const [scholars, setScholars] = useState([]);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);

  // Load scholar data
  useEffect(() => {
    const controller = new AbortController();

    async function fetchScholars() {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch("/data/scholars.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load scholars");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid scholars data");
        }

        setScholars(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchScholars();

    return () => controller.abort();
  }, [retry]);

  // Modal keyboard and background scroll handling
  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelected(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  // Search scholars
  const filteredScholars = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return scholars;

    return scholars.filter((scholar) =>
      String(scholar.name || "").toLowerCase().includes(search)
    );
  }, [scholars, query]);

  // Image fallback
  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#081b22] text-slate-100"
      style={FONT}
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-emerald-400/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-96 h-80 w-80 rounded-full bg-[#d6aa62]/[0.05] blur-3xl" />

      {/* Hero section */}
      <div className="relative border-b border-white/[0.06] px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/[0.07] px-3 py-1.5 text-xs font-semibold text-emerald-300 sm:text-sm">
            <FaBookOpen />
            <span>হিকমাহ লাইব্রেরি</span>
          </div>

          <div className="mt-5 max-w-3xl">
            <h1 className="text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              ইসলামিক স্কলারগণ
              <span className="text-[#d6aa62]"> ও তাঁদের জ্ঞান</span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              ইসলামিক স্কলারদের পরিচিতি, জ্ঞানগর্ভ আলোচনা ও শিক্ষামূলক
              কনটেন্টের মাধ্যমে ইসলামের বিভিন্ন বিষয় সম্পর্কে জানুন।
            </p>
          </div>

          {!loading && !error && (
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              <div className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-slate-300">
                <FaUserGraduate className="text-emerald-300" />
                <span>
                  মোট{" "}
                  <span className="font-bold text-[#d6aa62]">
                    {scholars.length}
                  </span>{" "}
                  জন স্কলার
                </span>
              </div>

              {query.trim() && (
                <span className="text-slate-400">
                  পাওয়া গেছে {filteredScholars.length} জন
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-3 pb-14 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:px-8">
        {/* Search */}
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#10252d] p-2.5 sm:p-3">
          <div className="relative min-w-0 flex-1">
            <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="স্কলারের নাম লিখে খুঁজুন..."
              aria-label="স্কলারের নাম দিয়ে খুঁজুন"
              className="min-h-11 w-full rounded-xl border border-transparent bg-[#081b22] py-3 pl-10 pr-10 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40 focus:bg-[#0b2028] focus:ring-2 focus:ring-emerald-400/10"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="সার্চ মুছুন"
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {!loading && !error && (
            <div className="hidden shrink-0 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-3 text-sm text-slate-300 sm:flex">
              <FaUserGraduate className="text-emerald-300" />
              <span>{filteredScholars.length} জন</span>
            </div>
          )}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex animate-pulse items-center gap-3 rounded-2xl border border-white/[0.07] bg-[#10252d] p-3.5 sm:gap-4 sm:p-4"
              >
                <div className="h-[68px] w-[68px] shrink-0 rounded-xl bg-white/[0.07] sm:h-20 sm:w-20 sm:rounded-2xl" />

                <div className="min-w-0 flex-1 space-y-3">
                  <div className="h-4 w-3/4 rounded bg-white/[0.09]" />
                  <div className="h-3 w-1/2 rounded bg-white/[0.05]" />
                  <div className="h-3 w-1/3 rounded bg-white/[0.05]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-300/15 bg-[#10252d] px-4 py-12 text-center sm:px-6">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-300/10 bg-red-400/[0.08] text-red-300">
              <FaBookOpen className="text-2xl" />
            </div>

            <h2 className="mt-4 text-lg font-bold text-white">
              স্কলারদের তথ্য লোড করা যায়নি
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-400">
              ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
            </p>

            <button
              type="button"
              onClick={() => setRetry((value) => value + 1)}
              className="mt-5 min-h-11 rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-[#081b22] transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredScholars.length === 0 && (
          <div className="rounded-2xl border border-white/[0.07] bg-[#10252d] px-4 py-12 text-center sm:px-6">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] text-slate-500">
              <FaSearch className="text-xl" />
            </div>

            <h2 className="mt-4 text-lg font-bold text-white">
              কোনো স্কলার পাওয়া যায়নি
            </h2>

            <p className="mt-2 break-words text-sm leading-7 text-slate-400">
              {query
                ? `"${query}" নামে কোনো ফলাফল নেই। অন্য নাম দিয়ে খুঁজুন।`
                : "এখনো কোনো স্কলারের তথ্য যোগ করা হয়নি।"}
            </p>

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-4 rounded-xl border border-emerald-300/15 bg-emerald-400/[0.07] px-4 py-2.5 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/[0.12]"
              >
                সার্চ মুছে ফেলুন
              </button>
            )}
          </div>
        )}

        {/* Scholar list */}
        {!loading && !error && filteredScholars.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {filteredScholars.map((scholar) => (
              <button
                key={scholar.id ?? scholar.name}
                type="button"
                onClick={() => setSelected(scholar)}
                aria-label={`${scholar.name || "স্কলার"} সম্পর্কে জানুন`}
                className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.07] bg-[#10252d] p-3.5 text-left transition duration-200 hover:border-emerald-300/25 hover:bg-[#142d35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 sm:gap-4 sm:p-4"
              >
                <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-xl border border-white/[0.07] bg-[#0b2028] sm:h-20 sm:w-20 sm:rounded-2xl">
                  <img
                    src={scholar.image || FALLBACK_IMAGE}
                    alt={scholar.name || "Islamic Scholar"}
                    loading="lazy"
                    onError={handleImageError}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="break-words text-sm font-bold leading-6 text-slate-100 transition group-hover:text-emerald-300 sm:text-base">
                    {scholar.name || "নাম উল্লেখ নেই"}
                  </h2>

                  <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400 sm:text-sm">
                    <FaGraduationCap className="shrink-0 text-emerald-300" />
                    ইসলামিক স্কলার
                  </p>

                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#d6aa62]">
                    বিস্তারিত দেখুন
                    <FaChevronRight className="text-[10px] transition-transform group-hover:translate-x-1" />
                  </span>
                </div>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-slate-400 transition group-hover:border-emerald-300/20 group-hover:bg-emerald-400/10 group-hover:text-emerald-300">
                  <FaChevronRight className="text-xs" />
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Footer note */}
        {!loading && !error && scholars.length > 0 && (
          <div className="mt-6 border-t border-white/[0.07] pt-4">
            <p className="flex items-start gap-2 text-xs leading-6 text-slate-500 sm:text-sm">
              <FaBookOpen className="mt-1 shrink-0 text-emerald-300" />
              <span>
                স্কলারের পরিচিতি ও তাঁদের শিক্ষামূলক আলোচনা দেখতে যেকোনো
                প্রোফাইলে ক্লিক করুন।
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Responsive scholar modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-[#02090c]/80 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelected(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="scholar-modal-title"
            className="relative flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-white/[0.08] bg-[#0b2028] shadow-2xl sm:max-h-[88dvh] sm:max-w-xl sm:rounded-3xl lg:max-w-2xl"
          >
            {/* Modal header */}
            <div className="relative shrink-0 overflow-hidden border-b border-white/[0.07] bg-[#102a32] px-5 pb-12 pt-5 text-white sm:px-7 sm:pt-6">
              <div className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full border-[24px] border-emerald-300/[0.05]" />
              <div className="pointer-events-none absolute -bottom-10 right-20 h-24 w-24 rounded-full bg-[#d6aa62]/[0.05]" />

              <div className="relative flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 sm:text-sm">
                    <FaBookOpen />
                    হিকমাহ লাইব্রেরি
                  </div>

                  <h2 className="mt-2 text-lg font-bold sm:text-xl">
                    স্কলারের পরিচিতি
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="প্রোফাইল বন্ধ করুন"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-emerald-300/20 hover:bg-emerald-400/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div
              className="-mt-7 min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6 sm:px-7"
              style={{ scrollbarGutter: "stable" }}
            >
              {/* Profile */}
              <div className="relative rounded-2xl border border-white/[0.08] bg-[#10252d] p-4 sm:p-5">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <img
                    src={selected.image || FALLBACK_IMAGE}
                    alt={selected.name || "Islamic Scholar"}
                    onError={handleImageError}
                    className="h-20 w-20 shrink-0 rounded-2xl border border-white/[0.08] bg-[#0b2028] object-cover sm:h-24 sm:w-24"
                  />

                  <div className="min-w-0 flex-1">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/15 bg-emerald-400/[0.07] px-2.5 py-1 text-[11px] font-semibold text-emerald-300 sm:text-xs">
                      <FaUserGraduate />
                      ইসলামিক স্কলার
                    </span>

                    <h3
                      id="scholar-modal-title"
                      className="mt-2 break-words text-lg font-bold leading-snug text-white sm:text-2xl"
                    >
                      {selected.name || "নাম উল্লেখ নেই"}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
                      ইসলামিক জ্ঞান ও শিক্ষামূলক আলোচনা
                    </p>
                  </div>
                </div>
              </div>

              {/* Scholar information */}
              <div className="mt-5">
                <h3 className="flex items-center gap-2 text-base font-bold text-white sm:text-lg">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-300/10 bg-emerald-400/[0.07] text-emerald-300">
                    <FaBookOpen />
                  </span>
                  স্কলার সম্পর্কে
                </h3>

                <div className="mt-3 rounded-2xl border border-white/[0.07] bg-[#10252d] p-4 sm:p-5">
                  <p className="whitespace-pre-line break-words text-sm leading-7 text-slate-300 sm:text-[15px] sm:leading-8">
                    {selected.information?.trim() ||
                      "এই স্কলারের আলোচনা ও শিক্ষামূলক কনটেন্ট থেকে ইসলাম সম্পর্কে জানুন।"}
                  </p>
                </div>
              </div>

              {/* YouTube action */}
              {selected.youtube && (
                <div className="mt-5">
                  <h3 className="text-sm font-bold text-white">
                    আরও জানুন
                  </h3>

                  <a
                    href={selected.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex min-w-0 items-center gap-3 rounded-2xl border border-red-400/15 bg-red-500/[0.06] p-3.5 transition hover:border-red-400/30 hover:bg-red-500/[0.10] sm:p-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
                      <FaYoutube className="text-2xl" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-slate-100">
                        YouTube-এ আলোচনা দেখুন
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-slate-400">
                        ভিডিও ও শিক্ষামূলক আলোচনা দেখুন
                      </span>
                    </span>

                    <FaExternalLinkAlt className="shrink-0 text-sm text-red-400" />
                  </a>
                </div>
              )}
            </div>

            {/* Fixed modal footer */}
            <div className="shrink-0 border-t border-white/[0.07] bg-[#0b2028] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-7 sm:py-4">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="w-full rounded-xl border border-white/[0.10] bg-white/[0.03] px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-emerald-300/20 hover:bg-emerald-400/[0.07] hover:text-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              >
                বন্ধ করুন
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}