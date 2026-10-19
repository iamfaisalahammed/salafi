
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
    <section className="bg-[#f8faf8] px-4 py-12 text-gray-800 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">

        {/* Section Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-emerald-700">
            <FaMobileAlt className="text-lg" />
            <span className="text-sm font-semibold">
              অ্যাপ ডিরেক্টরি
            </span>
          </div>

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2
                className="text-2xl font-bold leading-snug text-gray-900 sm:text-3xl"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                দরকারি অ্যাপস
                <span className="text-emerald-700"> এক জায়গায়</span>
              </h2>

              <p
                className="mt-2 max-w-xl text-sm leading-7 text-gray-600 sm:text-base"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                আপনার প্রয়োজনীয় মোবাইল অ্যাপ খুঁজুন এবং সহজেই
                ডাউনলোড পেজে চলে যান।
              </p>
            </div>

            {!loading && !error && apps.length > 0 && (
              <span className="w-fit rounded-full border border-emerald-100 bg-white px-3 py-1.5 text-xs font-medium text-emerald-800">
                মোট {apps.length}টি অ্যাপ
              </span>
            )}
          </div>
        </div>

        {/* App Description */}
        <div
          aria-live="polite"
          className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-100 bg-white p-4"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
            <FaMobileAlt className="text-lg" />
          </div>

          <div className="min-w-0">
            <h3
              className="text-sm font-semibold text-gray-900"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              অ্যাপ সম্পর্কে
            </h3>

            <p
              className="mt-1 text-sm leading-6 text-gray-600"
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
                className="animate-pulse rounded-xl border border-gray-100 bg-white p-4"
              >
                <div className="h-11 w-11 rounded-xl bg-gray-100" />
                <div className="mt-4 h-4 w-3/4 rounded bg-gray-100" />
                <div className="mt-2 h-3 w-1/2 rounded bg-gray-50" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-xl border border-red-100 bg-white px-5 py-10 text-center">
            <FaMobileAlt className="mx-auto text-3xl text-red-400" />

            <h3
              className="mt-3 font-semibold text-gray-900"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              অ্যাপ লোড করা যায়নি
            </h3>

            <p
              className="mt-2 text-sm text-gray-500"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              পেজটি রিফ্রেশ করে আবার চেষ্টা করুন।
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && apps.length === 0 && (
          <div className="rounded-xl border border-gray-100 bg-white px-5 py-10 text-center">
            <FaMobileAlt className="mx-auto text-3xl text-gray-300" />

            <h3
              className="mt-3 font-semibold text-gray-900"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              এখনো কোনো অ্যাপ যোগ করা হয়নি
            </h3>

            <p
              className="mt-2 text-sm text-gray-500"
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
                className="group flex min-w-0 items-center gap-3 rounded-xl border border-gray-200/80 bg-white p-3 transition-colors hover:border-emerald-300 hover:bg-emerald-50/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:gap-4 sm:p-4"
              >
                {/* App Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-1.5 sm:h-12 sm:w-12">
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
                    className="truncate text-sm font-semibold text-gray-800 transition-colors group-hover:text-emerald-800 sm:text-base"
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                  >
                    {app.name}
                  </h3>

                  <p
                    className="mt-1 flex items-center gap-1 text-xs text-gray-500"
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                  >
                    ডাউনলোড করুন
                    <FaExternalLinkAlt className="text-[9px]" />
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
