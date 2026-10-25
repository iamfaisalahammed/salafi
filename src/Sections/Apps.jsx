
import { useEffect, useState } from "react";
import { FaMobileAlt, FaExternalLinkAlt } from "react-icons/fa";

const DEFAULT_DESCRIPTION =
  "দৈনন্দিন ও ইসলামিক জীবনে কাজে লাগে এমন মোবাইল অ্যাপ খুঁজে নিন।";

const App = () => {
  const [activeDescription, setActiveDescription] =
    useState(DEFAULT_DESCRIPTION);
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
    <section
      id="apps"
      className="relative overflow-hidden bg-[#081b22] px-3 py-10 text-slate-100 sm:px-6 sm:py-14 lg:py-16"
    >
      <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-emerald-400/[0.07] blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/[0.07] px-3 py-1.5 text-xs font-semibold text-emerald-300 sm:text-sm">
            <FaMobileAlt />
            <span>অ্যাপ ডিরেক্টরি</span>
          </div>

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div className="min-w-0">
              <h2
                className="text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl lg:text-4xl"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                দরকারি অ্যাপস
                <span className="text-[#d6aa62]"> এক জায়গায়</span>
              </h2>

              <p
                className="mt-2 max-w-xl text-sm leading-7 text-slate-400 sm:text-base"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                আপনার প্রয়োজনীয় মোবাইল অ্যাপ খুঁজুন এবং সহজেই
                ডাউনলোড পেজে চলে যান।
              </p>
            </div>

            {!loading && !error && apps.length > 0 && (
              <span className="w-fit rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300">
                মোট{" "}
                <span className="font-bold text-[#d6aa62]">
                  {apps.length}
                </span>{" "}
                টি অ্যাপ
              </span>
            )}
          </div>
        </div>

        {/* App Description */}
        <div
          aria-live="polite"
          className="mb-6 flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-[#10252d] p-3.5 sm:p-4"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-300/15 bg-emerald-400/[0.08] text-emerald-300 sm:h-11 sm:w-11">
            <FaMobileAlt className="text-lg" />
          </div>

          <div className="min-w-0">
            <h3
              className="text-sm font-semibold text-white"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              অ্যাপ সম্পর্কে
            </h3>

            <p
              className="mt-1 text-sm leading-6 text-slate-400"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              {activeDescription}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-white/[0.07] bg-[#10252d] p-3 sm:p-4"
              >
                <div className="h-11 w-11 rounded-xl bg-white/[0.07]" />
                <div className="mt-4 h-4 w-3/4 rounded bg-white/[0.07]" />
                <div className="mt-2 h-3 w-1/2 rounded bg-white/[0.04]" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-300/15 bg-[#10252d] px-5 py-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-400/10 text-red-300">
              <FaMobileAlt className="text-xl" />
            </div>

            <h3
              className="mt-4 font-semibold text-white"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              অ্যাপ লোড করা যায়নি
            </h3>

            <p
              className="mt-2 text-sm leading-6 text-slate-400"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              পেজটি রিফ্রেশ করে আবার চেষ্টা করুন।
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && apps.length === 0 && (
          <div className="rounded-2xl border border-white/[0.07] bg-[#10252d] px-5 py-10 text-center">
            <FaMobileAlt className="mx-auto text-3xl text-slate-500" />

            <h3
              className="mt-4 font-semibold text-white"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              এখনো কোনো অ্যাপ যোগ করা হয়নি
            </h3>

            <p
              className="mt-2 text-sm text-slate-400"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              নতুন অ্যাপ যুক্ত হলে এখানে দেখতে পাবেন।
            </p>
          </div>
        )}

        {/* App Grid */}
        {!loading && !error && apps.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {apps.map((app) => (
              <a
                key={app.id}
                href={app.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() =>
                  setActiveDescription(
                    app.description || `${app.name} সম্পর্কে জানুন।`
                  )
                }
                onMouseLeave={() =>
                  setActiveDescription(DEFAULT_DESCRIPTION)
                }
                onFocus={() =>
                  setActiveDescription(
                    app.description || `${app.name} সম্পর্কে জানুন।`
                  )
                }
                onBlur={() =>
                  setActiveDescription(DEFAULT_DESCRIPTION)
                }
                aria-label={`${app.name} খুলুন`}
                className="group flex min-w-0 items-center gap-2.5 rounded-xl border border-white/[0.08] bg-[#10252d] p-3 transition-colors duration-200 hover:border-emerald-300/30 hover:bg-[#15313a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 sm:gap-3 sm:rounded-2xl sm:p-4"
              >
                {/* App Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/[0.07] bg-[#0b2028] p-1.5 sm:h-12 sm:w-12">
                  <img
                    src={app.image}
                    alt=""
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* App Information */}
                <div className="min-w-0 flex-1">
                  <h3
                    className="truncate text-sm font-semibold text-slate-100 transition-colors group-hover:text-emerald-300 sm:text-base"
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                  >
                    {app.name}
                  </h3>

                  <p
                    className="mt-1 flex items-center gap-1 text-[11px] text-slate-400 sm:text-xs"
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                  >
                    <span className="truncate">ডাউনলোড করুন</span>
                    <FaExternalLinkAlt className="shrink-0 text-[9px] text-[#d6aa62]" />
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default App;
