
import { useEffect, useMemo, useState } from "react";
import {
  FaYoutube,
  FaTimes,
  FaSearch,
  FaArrowRight,
  FaGraduationCap,
  FaBookOpen,
  FaUserGraduate,
 
} from "react-icons/fa";

export default function Scholars() {
  const [scholars, setScholars] = useState([]);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/data/scholars.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load scholars");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid data");
        setScholars(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selected) return;

    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    return scholars.filter((scholar) =>
      scholar.name?.toLowerCase().includes(search)
    );
  }, [scholars, query]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#06140e] via-[#0a2118] to-[#07131b] px-4 py-16 text-white sm:px-6 md:py-20 lg:px-10">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-amber-400/[0.07] blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">

      
{/* Header */}
<div className="mb-10 border-b border-white/10 pb-8 text-left sm:mb-12 sm:pb-10">
  <div className="mb-5 flex items-center gap-3">
    <span className="h-px w-8 bg-amber-400" />

    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
      Knowledge • Wisdom • Guidance
    </span>
  </div>

  <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
    <div>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
        Learn From Islamic
        <span className="mt-1 block text-emerald-300">
          Scholars.
        </span>
      </h2>
    </div>

    <p className="max-w-md text-sm leading-7 text-gray-400 sm:text-base">
      Explore Islamic teachings, listen to lectures, and gain
      beneficial knowledge from Islamic scholars and their educational content.
    </p>
  </div>

  {/* Search */}
  <div className="mt-8 flex max-w-lg items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 shadow-lg backdrop-blur-md transition focus-within:border-emerald-400/50 focus-within:bg-white/[0.07]">
    <FaSearch className="shrink-0 text-emerald-300" />

    <input
      type="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search scholars by name..."
      aria-label="Search scholars"
      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
    />

    {query && (
      <button
        type="button"
        onClick={() => setQuery("")}
        aria-label="Clear search"
        className="shrink-0 rounded-full p-1 text-gray-400 transition hover:bg-white/10 hover:text-white"
      >
        <FaTimes />
      </button>
    )}
  </div>

  {!loading && !error && (
    <p className="mt-4 text-xs text-gray-500">
      Showing {filtered.length} of {scholars.length} scholars
    </p>
  )}
</div>


        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 sm:p-6"
              >
                <div className="mx-auto h-24 w-24 rounded-full bg-white/10 sm:h-28 sm:w-28" />
                <div className="mx-auto mt-5 h-4 w-3/4 rounded bg-white/10" />
                <div className="mx-auto mt-3 h-3 w-1/2 rounded bg-white/[0.06]" />
                <div className="mt-6 h-9 rounded-xl bg-white/[0.06]" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="mx-auto max-w-md rounded-2xl border border-red-400/20 bg-red-500/[0.06] px-6 py-10 text-center">
            <FaBookOpen className="mx-auto text-3xl text-red-300" />
            <h3 className="mt-4 text-lg font-semibold">
              Unable to Load Scholars
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Please refresh the page and try again.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400 hover:text-gray-950"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filtered.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-14 text-center">
            <FaSearch className="mx-auto text-3xl text-gray-500" />
            <h3 className="mt-4 text-xl font-semibold">
              No Scholars Found
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              No results for "{query}". Try another name.
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-5 rounded-xl border border-emerald-400/30 px-5 py-2.5 text-sm font-medium text-emerald-300 transition hover:bg-emerald-400/10"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Scholars Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">

            {filtered.map((scholar, index) => (
              <button
                key={scholar.name}
                type="button"
                onClick={() => setSelected(scholar)}
                aria-label={`View details for ${scholar.name}`}
                className="group relative flex min-w-0 flex-col items-center overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.035] p-4 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400/40 hover:bg-emerald-400/[0.06] hover:shadow-xl hover:shadow-emerald-950/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400 sm:p-6"
              >
                {/* Card Number */}
                <span className="absolute right-3 top-3 text-xs font-semibold tracking-widest text-white/20">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Scholar Image */}
                <div className="relative mt-3">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-emerald-400/60 to-amber-300/40 opacity-50 blur-sm transition duration-300 group-hover:opacity-100" />

                  <img
                    src={scholar.image}
                    alt={scholar.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://placehold.co/200x200/10251c/d1fae5?text=Scholar";
                    }}
                    className="relative h-20 w-20 rounded-full border-2 border-[#17392a] object-cover transition duration-300 group-hover:scale-105 sm:h-28 sm:w-28"
                  />
                </div>

                {/* Name */}
                <h3 className="mt-5 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-white transition-colors group-hover:text-emerald-300 sm:text-base">
                  {scholar.name}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                  <FaUserGraduate className="text-emerald-400" />
                  Islamic Scholar
                </div>

                {/* Action */}
                <div className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-2 py-2.5 text-xs font-semibold text-emerald-300 transition group-hover:border-emerald-400/30 group-hover:bg-emerald-400/10 sm:text-sm">
                  View Profile
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </div>

                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-400 to-amber-300 transition-all duration-500 group-hover:w-full" />
              </button>
            ))}

          </div>
        )}

        {/* Bottom Note */}
        {!loading && !error && scholars.length > 0 && (
          <div className="mt-12 flex items-center justify-center gap-2 text-center text-xs leading-6 text-gray-500 sm:text-sm">
            <FaBookOpen className="shrink-0 text-emerald-400" />
            Explore lectures and educational resources from Islamic scholars.
          </div>
        )}
      </div>

      {/* Scholar Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="scholar-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/10 bg-gradient-to-b from-[#10271c] to-[#09151b] p-5 shadow-2xl shadow-black/50 sm:p-8"
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close scholar profile"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-gray-300 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
            >
              <FaTimes />
            </button>

            {/* Profile Header */}
            <div className="pt-3 text-center">
              <div className="relative mx-auto h-28 w-28 sm:h-32 sm:w-32">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-emerald-400 to-amber-300 opacity-60 blur-sm" />

                <img
                  src={selected.image}
                  alt={selected.name}
                  className="relative h-full w-full rounded-full border-4 border-[#153b29] object-cover"
                />
              </div>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5 text-xs font-medium text-emerald-300">
                <FaGraduationCap />
                Scholar Profile
              </div>

              <h2
                id="scholar-modal-title"
                className="mt-4 px-6 text-xl font-bold leading-snug text-white sm:text-2xl"
              >
                {selected.name}
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                Islamic Knowledge & Education
              </p>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />

            {/* Information */}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 sm:p-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-300">
                <FaBookOpen />
                About the Scholar
              </h3>

              <p className="whitespace-pre-line text-sm leading-7 text-gray-300">
                {selected.information ||
                  "Explore this scholar's lectures and educational content."}
              </p>
            </div>

            {/* YouTube CTA */}
            {selected.youtube && (
              <a
                href={selected.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-red-950/20 transition hover:bg-red-500"
              >
                <FaYoutube size={23} />
                Watch Lectures on YouTube
                <FaArrowRight className="text-sm" />
              </a>
            )}

            <p className="mt-4 text-center text-xs leading-5 text-gray-500">
              Continue learning through available educational resources.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
