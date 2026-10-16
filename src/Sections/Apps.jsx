
import { useEffect, useState } from "react";
import { FaMobileAlt, FaExternalLinkAlt } from "react-icons/fa";

const App = () => {
  const [activeDescription, setActiveDescription] = useState(
    "Explore useful mobile applications for everyday life."
  );
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/data/apps.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load apps");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid data");
        setApps(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#06140e] via-[#0a2118] to-[#07131b] px-4 py-16 text-white sm:px-6 md:py-20">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-amber-400/[0.07] blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">

      
        <div className="mb-12 text-center">

         
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Mobile{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-amber-300 bg-clip-text text-transparent">
              Applications
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
            Discover useful applications designed to make learning,
            daily tasks, and your digital experience more convenient.
          </p>

          <div className="mx-auto mt-7 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-400 to-amber-400" />
        </div>

        {/* Description Panel */}
        <div className="mb-8 rounded-2xl border border-emerald-400/15 bg-white/[0.035] px-5 py-5 backdrop-blur-md sm:px-7">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08] text-xl text-emerald-300">
              <FaMobileAlt />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-emerald-300">
                Discover Applications
              </h3>

              <p
                aria-live="polite"
                className="mt-1 text-sm leading-6 text-gray-400"
              >
                {activeDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="h-12 w-12 rounded-xl bg-white/10" />
                <div className="mt-4 h-4 w-3/4 rounded bg-white/10" />
                <div className="mt-3 h-3 w-full rounded bg-white/[0.06]" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-400/20 bg-red-500/[0.06] px-5 py-10 text-center">
            <FaMobileAlt className="mx-auto text-3xl text-red-300" />
            <h3 className="mt-4 text-lg font-semibold">
              Unable to Load Applications
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Please refresh the page and try again.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && apps.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-12 text-center">
            <FaMobileAlt className="mx-auto text-3xl text-gray-500" />
            <h3 className="mt-4 text-lg font-semibold">
              No Applications Available
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Applications will appear here when available.
            </p>
          </div>
        )}

        {/* App Grid */}
        {!loading && !error && apps.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">

            {apps.map((app) => (
              <a
                key={app.id}
                href={app.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() =>
                  setActiveDescription(
                    app.description || `Explore ${app.name}.`
                  )
                }
                onMouseLeave={() =>
                  setActiveDescription(
                    "Explore useful mobile applications for everyday life."
                  )
                }
                onFocus={() =>
                  setActiveDescription(
                    app.description || `Explore ${app.name}.`
                  )
                }
                onBlur={() =>
                  setActiveDescription(
                    "Explore useful mobile applications for everyday life."
                  )
                }
                aria-label={`Open ${app.name}`}
                className="group relative flex min-w-0 items-center gap-3 overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.035] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/35 hover:bg-emerald-400/[0.06] hover:shadow-xl hover:shadow-emerald-950/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 sm:gap-4 sm:p-5"
              >
                {/* App Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] p-1.5 transition-all duration-300 group-hover:border-emerald-400/30 group-hover:bg-emerald-400/10 sm:h-12 sm:w-12">
                  <img
                    src={app.image}
                    alt=""
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* App Name */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-gray-200 transition-colors group-hover:text-emerald-300 sm:text-base">
                    {app.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Open application
                  </p>
                </div>

                {/* External Link Icon */}
                <FaExternalLinkAlt className="shrink-0 text-xs text-gray-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-300" />

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-400 to-amber-300 transition-all duration-500 group-hover:w-full" />
              </a>
            ))}

          </div>
        )}

      </div>
    </section>
  );
};

export default App;
