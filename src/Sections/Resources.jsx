
import { useEffect, useState } from "react";
import { FaGlobe, FaExternalLinkAlt, FaBookOpen } from "react-icons/fa";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/data/resources.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load resources");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid data");
        setResources(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#06140e] via-[#0a2118] to-[#07131b] px-4 py-16 text-white sm:px-6 md:py-20 lg:px-10">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-amber-400/[0.07] blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">

      

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Islamic{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-amber-300 bg-clip-text text-transparent">
              Resources
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
            Discover useful Islamic websites, educational platforms, and
            trusted resources to expand your knowledge and strengthen your faith.
          </p>

          <div className="mx-auto mt-7 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-400 to-amber-400" />
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
              >
                <div className="h-64 bg-white/[0.07] sm:h-72" />
                <div className="space-y-4 p-6">
                  <div className="h-5 w-3/4 rounded bg-white/10" />
                  <div className="h-3 w-full rounded bg-white/[0.07]" />
                  <div className="h-3 w-5/6 rounded bg-white/[0.07]" />
                  <div className="h-10 rounded-xl bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="mx-auto max-w-md rounded-2xl border border-red-400/20 bg-red-500/[0.06] px-6 py-10 text-center">
            <FaBookOpen className="mx-auto text-3xl text-red-300" />
            <h3 className="mt-4 text-xl font-semibold">
              Unable to Load Resources
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Please check your connection or refresh the page.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && resources.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-14 text-center">
            <FaBookOpen className="mx-auto text-3xl text-gray-500" />
            <h3 className="mt-4 text-xl font-semibold">
              No Resources Available
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Resources will appear here when available.
            </p>
          </div>
        )}

        {/* Resource Cards */}
        {!loading && !error && resources.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">

            {resources.map((r) => (
              <article
                key={r.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.035] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-400/35 hover:bg-white/[0.055] hover:shadow-2xl hover:shadow-emerald-950/30"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden sm:h-72">
                  <img
                    src={r.image}
                    alt={r.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#06140e]/80 via-transparent to-black/10" />

                  <div className="absolute bottom-4 left-5 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-300/25 bg-[#0a2118]/90 text-xl text-emerald-300 shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                    <FaGlobe />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">

                  <h3 className="text-xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-emerald-300">
                    {r.name}
                  </h3>

                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-gray-400">
                    {r.description}
                  </p>

                  {r.link && (
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/[0.08] px-5 py-3.5 text-sm font-semibold text-emerald-200 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-400 hover:text-[#06140e]"
                    >
                      Visit Website
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  )}
                </div>

                {/* Bottom Hover Accent */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-400 to-amber-300 transition-all duration-500 group-hover:w-full" />
              </article>
            ))}

          </div>
        )}

      </div>
    </section>
  );
};

export default Resources;
