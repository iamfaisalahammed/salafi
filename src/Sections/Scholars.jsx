
import { useEffect, useMemo, useState } from "react";
import {
  FaYoutube,
  FaTimes,
  FaSearch,
  FaArrowRight,
  FaGraduationCap,
  FaBookOpen,
  FaUserGraduate,
  FaExternalLinkAlt,
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

  // Load scholars data
  useEffect(() => {
    const controller = new AbortController();

    const fetchScholars = async () => {
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
    };

    fetchScholars();

    return () => controller.abort();
  }, [retry]);

  // Close modal with Escape key
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
      scholar.name?.toLowerCase().includes(search)
    );
  }, [scholars, query]);

  // Fallback image
  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <section className="bg-[#f8faf8] px-4 py-14 text-gray-800 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <FaBookOpen />
            <span>হিকমাহ লাইব্রেরি</span>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
                ইসলামিক স্কলারগণ
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
                অভিজ্ঞ ইসলামিক স্কলারদের পরিচিতি জানুন এবং তাঁদের
                আলোচনা ও শিক্ষামূলক কনটেন্ট থেকে উপকারী জ্ঞান অর্জন করুন।
              </p>
            </div>

            {!loading && !error && (
              <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-emerald-100 bg-white px-3 py-2 text-sm text-gray-600">
                <FaUserGraduate className="text-emerald-600" />
                <span>
                  মোট{" "}
                  <strong className="text-gray-900">
                    {scholars.length}
                  </strong>{" "}
                  জন
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="স্কলারের নাম লিখে খুঁজুন..."
              aria-label="স্কলারের নাম দিয়ে খুঁজুন"
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-11 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="সার্চ মুছুন"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {!loading && !error && (
            <p className="text-sm text-gray-500">
              {filteredScholars.length} জন স্কলার পাওয়া গেছে
            </p>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-gray-100 bg-white p-4 sm:p-5"
              >
                <div className="mx-auto h-20 w-20 rounded-full bg-gray-200 sm:h-24 sm:w-24" />
                <div className="mx-auto mt-5 h-4 w-3/4 rounded bg-gray-200" />
                <div className="mx-auto mt-3 h-3 w-1/2 rounded bg-gray-100" />
                <div className="mt-5 h-9 rounded-lg bg-gray-100" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-white px-5 py-12 text-center">
            <FaBookOpen className="mx-auto text-3xl text-red-500" />

            <h3 className="mt-4 text-lg font-bold text-gray-900">
              স্কলারদের তথ্য লোড করা যায়নি
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
            </p>

            <button
              type="button"
              onClick={() => setRetry((value) => value + 1)}
              className="mt-5 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filteredScholars.length === 0 && (
          <div className="rounded-2xl border border-gray-100 bg-white px-5 py-12 text-center">
            <FaSearch className="mx-auto text-3xl text-gray-300" />

            <h3 className="mt-4 text-lg font-bold text-gray-900">
              কোনো স্কলার পাওয়া যায়নি
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              {query
                ? `"${query}" নামে কোনো ফলাফল নেই। অন্য নাম দিয়ে খুঁজুন।`
                : "এখনো কোনো স্কলারের তথ্য যোগ করা হয়নি।"}
            </p>

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-4 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
              >
                সার্চ মুছে ফেলুন
              </button>
            )}
          </div>
        )}

        {/* Scholars Grid */}
        {!loading && !error && filteredScholars.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {filteredScholars.map((scholar) => (
              <button
                key={scholar.id ?? scholar.name}
                type="button"
                onClick={() => setSelected(scholar)}
                aria-label={`${scholar.name} সম্পর্কে জানুন`}
                className="group flex min-w-0 flex-col items-center rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:p-5"
              >
                <div className="rounded-full border-2 border-emerald-100 p-1 transition group-hover:border-emerald-400">
                  <img
                    src={scholar.image || FALLBACK_IMAGE}
                    alt={scholar.name || "Islamic Scholar"}
                    loading="lazy"
                    onError={handleImageError}
                    className="h-20 w-20 rounded-full object-cover sm:h-24 sm:w-24"
                  />
                </div>

                <h3 className="mt-4 line-clamp-2 min-h-10 w-full break-words text-sm font-bold leading-5 text-gray-900 transition group-hover:text-emerald-800 sm:text-base">
                  {scholar.name}
                </h3>

                <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                  <FaGraduationCap className="shrink-0 text-emerald-600" />
                  <span>ইসলামিক স্কলার</span>
                </div>

                <span className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-50 px-2 py-2.5 text-xs font-semibold text-emerald-800 transition group-hover:bg-emerald-700 group-hover:text-white sm:text-sm">
                  প্রোফাইল দেখুন
                  <FaArrowRight className="text-[10px] transition group-hover:translate-x-1" />
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Bottom Note */}
        {!loading && !error && scholars.length > 0 && (
          <div className="mt-10 flex items-start justify-center gap-2 border-t border-gray-200 pt-6 text-center text-xs leading-6 text-gray-500 sm:text-sm">
            <FaBookOpen className="mt-1 shrink-0 text-emerald-600" />
            <p>
              ইসলাম সম্পর্কে জানুন, উপকারী জ্ঞান অর্জন করুন এবং নির্ভরযোগ্য
              শিক্ষামূলক কনটেন্ট অনুসরণ করুন।
            </p>
          </div>
        )}
      </div>

      {/* Scholar Profile Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-950/60 p-3 backdrop-blur-sm sm:p-5"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="scholar-modal-title"
            onClick={(event) => event.stopPropagation()}
            className="relative my-auto max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="প্রোফাইল বন্ধ করুন"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-red-50 hover:text-red-600"
            >
              <FaTimes />
            </button>

            {/* Profile Header */}
            <div className="px-5 pt-3 text-center">
              <div className="mx-auto h-24 w-24 rounded-full border-4 border-emerald-100 p-1 sm:h-28 sm:w-28">
                <img
                  src={selected.image || FALLBACK_IMAGE}
                  alt={selected.name || "Islamic Scholar"}
                  onError={handleImageError}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>

              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
                <FaGraduationCap />
                স্কলারের পরিচিতি
              </span>

              <h2
                id="scholar-modal-title"
                className="mt-3 break-words text-xl font-bold leading-snug text-gray-900 sm:text-2xl"
              >
                {selected.name}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                ইসলামিক জ্ঞান ও শিক্ষা
              </p>
            </div>

            <div className="my-6 border-t border-gray-100" />

            {/* Information */}
            <div className="rounded-xl bg-gray-50 p-4 sm:p-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                <FaBookOpen className="text-emerald-700" />
                স্কলার সম্পর্কে
              </h3>

              <p className="whitespace-pre-line break-words text-sm leading-7 text-gray-600">
                {selected.information ||
                  "এই স্কলারের আলোচনা ও শিক্ষামূলক কনটেন্ট থেকে ইসলাম সম্পর্কে জানুন।"}
              </p>
            </div>

            {/* YouTube Button */}
            {selected.youtube && (
              <a
                href={selected.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <FaYoutube className="text-xl" />
                YouTube-এ আলোচনা দেখুন
                <FaExternalLinkAlt className="ml-1 text-xs" />
              </a>
            )}

            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-3 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
