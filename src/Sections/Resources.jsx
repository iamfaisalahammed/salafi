  
import { useEffect, useState } from "react";
import {
  FaGlobe,
  FaArrowUpRightFromSquare,
  FaBookOpen,
} from "react-icons/fa6";

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
    <section className="relative overflow-hidden bg-[#071710] px-4 py-16 text-white sm:px-6 md:py-20 lg:px-10">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-emerald-500/[0.07] blur-[110px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-amber-400/[0.04] blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">

        {/* Section Heading */}
        <div className="mb-10 border-b border-white/10 pb-8 sm:mb-12 sm:pb-10">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
              The Knowledge Directory
            </span>
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Explore Islamic
                <span className="block mt-1 text-emerald-300">
                  Resources.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-gray-400 sm:text-base">
              A curated collection of Islamic websites and learning
              platforms to help you discover beneficial knowledge.
            </p>
          </div>
        </div>

        {/* Directory Introduction */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <FaBookOpen className="text-emerald-300" />
            <h3 className="text-sm font-semibold text-gray-200">
              Browse the Collection
            </h3>
          </div>

          {!loading && !error && resources.length > 0 && (
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
              {String(resources.length).padStart(2, "0")} Resources
            </span>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex animate-pulse items-center gap-4 border-b border-white/10 py-6"
              >
                <div className="h-12 w-12 rounded-full bg-white/10" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-2/5 rounded bg-white/10" />
                  <div className="h-3 w-4/5 rounded bg-white/[0.06]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-400/20 bg-red-500/[0.05] px-5 py-10 text-center">
            <FaBookOpen className="mx-auto text-3xl text-red-300" />
            <h3 className="mt-4 text-lg font-semibold">
              Unable to Load Resources
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Please check your connection and refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg border border-white/10 px-4 py-2 text-sm transition hover:bg-white/10"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && resources.length === 0 && (
          <div className="rounded-2xl border border-white/10 px-5 py-12 text-center">
            <FaBookOpen className="mx-auto text-3xl text-gray-500" />
            <h3 className="mt-4 text-lg font-semibold">
              No Resources Available
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              New resources will be listed here when available.
            </p>
          </div>
        )}

        {/* Resource Directory */}
        {!loading && !error && resources.length > 0 && (
          <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {resources.map((resource, index) => {
              const content = (
                <>
                  {/* Resource Number */}
                  <span className="w-6 shrink-0 font-mono text-xs text-gray-600 transition-colors group-hover:text-amber-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Resource Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] text-emerald-300 transition-colors group-hover:border-emerald-300/40 group-hover:bg-emerald-400/10">
                    {resource.image ? (
                      <img
                        src={resource.image}
                        alt=""
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.nextElementSibling?.classList.remove("hidden");
                        }}
                        className="h-6 w-6 object-contain"
                      />
                    ) : null}

                    <FaGlobe
                      className={`text-base ${
                        resource.image ? "hidden" : ""
                      }`}
                    />
                  </div>

                  {/* Resource Information */}
                  <div className="min-w-0 flex-1 py-1">
                    <h3 className="text-sm font-semibold leading-6 text-gray-100 transition-colors group-hover:text-emerald-300 sm:text-base">
                      {resource.name}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-500 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden sm:text-sm">
                      {resource.description || "Explore this Islamic resource."}
                    </p>
                  </div>

                  {/* Circular Arrow */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-gray-500 transition-all duration-300 group-hover:border-emerald-300/30 group-hover:bg-emerald-300 group-hover:text-[#071710]">
                    <FaArrowUpRightFromSquare className="text-xs" />
                  </div>
                </>
              );

              const className =
                "group relative flex min-w-0 items-center gap-3 overflow-hidden border-b border-white/[0.09] px-1 py-5 transition-colors duration-300 hover:bg-white/[0.025] sm:gap-4 sm:px-3 sm:py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400";

              return resource.link ? (
                <a
                  key={resource.id}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${resource.name}`}
                  className={className}
                >
                  {content}
                </a>
              ) : (
                <div key={resource.id} className={className}>
                  {content}
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Note */}
        {!loading && !error && resources.length > 0 && (
          <div className="mt-8 flex items-center gap-2 text-xs text-gray-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Select a resource to explore its website.
          </div>
        )}
      </div>
    </section>
  );
};

export default Resources;
