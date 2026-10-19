
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

  // Modal keyboard and scroll handling
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
    <section className="min-h-screen bg-stone-50 text-gray-800">
      {/* Hero section */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 px-4 pb-20 pt-12 text-white sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur">
            <FaBookOpen />
            হিকমাহ লাইব্রেরি
          </div>

          <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            ইসলামিক স্কলারগণ
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-50/90 sm:text-base">
            অভিজ্ঞ ইসলামিক স্কলারদের পরিচিতি জানুন এবং তাঁদের
            আলোচনা ও শিক্ষামূলক কনটেন্ট থেকে উপকারী জ্ঞান অর্জন করুন।
          </p>

          {!loading && !error && (
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-emerald-50">
              <FaUserGraduate />
              মোট {scholars.length} জন স্কলার
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto -mt-8 max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-lg shadow-gray-900/5">
          <div className="relative min-w-0 flex-1">
            <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="স্কলারের নাম লিখে খুঁজুন..."
              aria-label="স্কলারের নাম দিয়ে খুঁজুন"
              className="w-full rounded-xl border border-transparent bg-stone-50 py-3 pl-10 pr-10 text-sm outline-none transition focus:border-emerald-200 focus:bg-white focus:ring-4 focus:ring-emerald-50"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="সার্চ মুছুন"
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {!loading && !error && (
            <div className="hidden shrink-0 items-center gap-2 rounded-xl bg-emerald-50 px-3 py-3 text-sm font-medium text-emerald-800 sm:flex">
              <FaUserGraduate />
              {filteredScholars.length} জন
            </div>
          )}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex animate-pulse items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4"
              >
                <div className="h-[68px] w-[68px] shrink-0 rounded-2xl bg-gray-200 sm:h-20 sm:w-20" />
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="mt-6 rounded-2xl border border-red-100 bg-white px-5 py-12 text-center">
            <FaBookOpen className="mx-auto text-3xl text-red-500" />

            <h2 className="mt-4 text-lg font-bold text-gray-900">
              স্কলারদের তথ্য লোড করা যায়নি
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
            </p>

            <button
              type="button"
              onClick={() => setRetry((value) => value + 1)}
              className="mt-5 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredScholars.length === 0 && (
          <div className="mt-6 rounded-2xl border border-gray-100 bg-white px-5 py-12 text-center">
            <FaSearch className="mx-auto text-3xl text-gray-300" />

            <h2 className="mt-4 text-lg font-bold text-gray-900">
              কোনো স্কলার পাওয়া যায়নি
            </h2>

            <p className="mt-2 break-words text-sm leading-6 text-gray-500">
              {query
                ? `"${query}" নামে কোনো ফলাফল নেই। অন্য নাম দিয়ে খুঁজুন।`
                : "এখনো কোনো স্কলারের তথ্য যোগ করা হয়নি।"}
            </p>

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-4 rounded-lg px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
              >
                সার্চ মুছে ফেলুন
              </button>
            )}
          </div>
        )}

        {/* Scholar list */}
        {!loading && !error && filteredScholars.length > 0 && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {filteredScholars.map((scholar) => (
              <button
                key={scholar.id ?? scholar.name}
                type="button"
                onClick={() => setSelected(scholar)}
                aria-label={`${scholar.name || "স্কলার"} সম্পর্কে জানুন`}
                className="group flex min-w-0 items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3.5 text-left transition duration-200 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-950/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 sm:gap-4 sm:p-4"
              >
                <img
                  src={scholar.image || FALLBACK_IMAGE}
                  alt={scholar.name || "Islamic Scholar"}
                  loading="lazy"
                  onError={handleImageError}
                  className="h-[68px] w-[68px] shrink-0 rounded-xl bg-emerald-50 object-cover sm:h-20 sm:w-20 sm:rounded-2xl"
                />

                <div className="min-w-0 flex-1">
                  <h2 className="break-words text-sm font-bold leading-6 text-gray-900 transition group-hover:text-emerald-800 sm:text-base">
                    {scholar.name || "নাম উল্লেখ নেই"}
                  </h2>

                  <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 sm:text-sm">
                    <FaGraduationCap className="shrink-0 text-emerald-700" />
                    ইসলামিক স্কলার
                  </p>

                  <span className="mt-2 inline-block text-xs font-semibold text-emerald-700">
                    বিস্তারিত দেখুন
                  </span>
                </div>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
                  <FaChevronRight className="text-xs" />
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Responsive scholar modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-gray-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
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
            className="relative flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[88dvh] sm:max-w-xl sm:rounded-3xl lg:max-w-2xl"
          >
            {/* Modal header */}
            <div className="relative shrink-0 bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 px-5 pb-14 pt-5 text-white sm:px-7 sm:pt-6">
              <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full border-[24px] border-white/5" />
              <div className="absolute -bottom-10 right-20 h-24 w-24 rounded-full bg-white/5" />

              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-100 sm:text-sm">
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
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div
              className="-mt-8 min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 sm:px-7"
              style={{ scrollbarGutter: "stable" }}
            >
              {/* Profile */}
              <div className="relative rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex min-w-0 items-center gap-4">
                  <img
                    src={selected.image || FALLBACK_IMAGE}
                    alt={selected.name || "Islamic Scholar"}
                    onError={handleImageError}
                    className="h-20 w-20 shrink-0 rounded-2xl border border-gray-100 bg-emerald-50 object-cover sm:h-24 sm:w-24"
                  />

                  <div className="min-w-0 flex-1">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 sm:text-xs">
                      <FaUserGraduate />
                      ইসলামিক স্কলার
                    </span>

                    <h3
                      id="scholar-modal-title"
                      className="mt-2 break-words text-lg font-bold leading-snug text-gray-900 sm:text-2xl"
                    >
                      {selected.name || "নাম উল্লেখ নেই"}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                      ইসলামিক জ্ঞান ও শিক্ষামূলক আলোচনা
                    </p>
                  </div>
                </div>
              </div>

              {/* Information */}
              <div className="mt-5">
                <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 sm:text-lg">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <FaBookOpen />
                  </span>
                  স্কলার সম্পর্কে
                </h3>

                <div className="mt-3 rounded-2xl border border-gray-100 bg-stone-50 p-4 sm:p-5">
                  <p className="whitespace-pre-line break-words text-sm leading-7 text-gray-600 sm:text-[15px] sm:leading-8">
                    {selected.information?.trim() ||
                      "এই স্কলারের আলোচনা ও শিক্ষামূলক কনটেন্ট থেকে ইসলাম সম্পর্কে জানুন।"}
                  </p>
                </div>
              </div>

              {/* YouTube action */}
              {selected.youtube && (
                <div className="mt-5">
                  <h3 className="text-sm font-bold text-gray-900">
                    আরও জানুন
                  </h3>

                  <a
                    href={selected.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex min-w-0 items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-3.5 transition hover:border-red-200 hover:bg-red-100/70 sm:p-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
                      <FaYoutube className="text-2xl" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-gray-900">
                        YouTube-এ আলোচনা দেখুন
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-gray-500">
                        ভিডিও ও শিক্ষামূলক আলোচনা দেখুন
                      </span>
                    </span>

                    <FaExternalLinkAlt className="shrink-0 text-sm text-red-600" />
                  </a>
                </div>
              )}
            </div>

            {/* Fixed modal footer */}
            <div className="shrink-0 border-t border-gray-100 bg-white px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-7 sm:py-4">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
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
