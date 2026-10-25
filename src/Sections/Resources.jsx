
import { useEffect, useState } from "react";
import {
  FaGlobe,
  FaArrowUpRightFromSquare,
  FaBookOpen,
} from "react-icons/fa6";

const FALLBACK_IMAGE =
  "https://placehold.co/100x100/f0fdf4/166534?text=Web";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);

  // Load resources
  useEffect(() => {
    const controller = new AbortController();

    const fetchResources = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch("/data/resources.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load resources");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid resources data");
        }

        setResources(data);
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

    fetchResources();

    return () => controller.abort();
  }, [retry]);

  // Image fallback
  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <section
      id="resources"
      className="relative overflow-hidden bg-[#081b22] px-3 py-10 text-slate-100 sm:px-6 sm:py-14 lg:py-16"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-emerald-400/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/[0.07] px-3 py-1.5 text-xs font-semibold text-emerald-300 sm:text-sm">
            <FaGlobe className="shrink-0" />
            <span
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              ইসলামিক রিসোর্স ডিরেক্টরি
            </span>
          </div>

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div className="min-w-0">
              <h2
                className="text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl lg:text-4xl"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                ইসলামিক ওয়েবসাইট
                <span className="text-[#d6aa62]"> ও রিসোর্স</span>
              </h2>

              <p
                className="mt-2 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                উপকারী ইসলামিক ওয়েবসাইট ও জ্ঞানচর্চার প্ল্যাটফর্ম
                এক জায়গায় খুঁজে নিন। আপনার প্রয়োজনীয় রিসোর্সে
                যেতে শুধু নামের ওপর ক্লিক করুন।
              </p>
            </div>

            {/* Resource Count */}
            {!loading && !error && resources.length > 0 && (
              <span
                className="w-fit shrink-0 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                মোট{" "}
                <span className="font-bold text-[#d6aa62]">
                  {resources.length}
                </span>
                টি রিসোর্স
              </span>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex animate-pulse items-start gap-3 rounded-xl border border-white/[0.07] bg-[#10252d] p-3.5 sm:p-4"
              >
                <div className="h-11 w-11 shrink-0 rounded-xl bg-white/[0.07]" />

                <div className="min-w-0 flex-1 space-y-2 pt-1">
                  <div className="h-4 w-2/5 rounded bg-white/[0.08]" />
                  <div className="h-3 w-full rounded bg-white/[0.05]" />
                  <div className="h-3 w-4/5 rounded bg-white/[0.05]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-300/15 bg-[#10252d] px-4 py-10 text-center sm:px-5">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-400/10 text-red-300">
              <FaBookOpen className="text-xl" />
            </div>

            <h3
              className="mt-4 font-semibold text-white"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              রিসোর্স লোড করা যায়নি
            </h3>

            <p
              className="mt-2 text-sm leading-6 text-slate-400"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
            </p>

            <button
              type="button"
              onClick={() => setRetry((previous) => previous + 1)}
              className="mt-5 min-h-10 rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-[#081b22] transition-colors hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && resources.length === 0 && (
          <div className="rounded-2xl border border-white/[0.07] bg-[#10252d] px-4 py-10 text-center sm:px-5">
            <FaBookOpen className="mx-auto text-3xl text-slate-500" />

            <h3
              className="mt-4 font-semibold text-white"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              এখনো কোনো রিসোর্স নেই
            </h3>

            <p
              className="mt-2 text-sm leading-6 text-slate-400"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              নতুন রিসোর্স যোগ হলে এখানে দেখতে পাবেন।
            </p>
          </div>
        )}

        {/* Resource List */}
        {!loading && !error && resources.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {resources.map((resource, index) => {
              const content = (
                <>
                  {/* Resource Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-[#0b2028] text-emerald-300 sm:h-12 sm:w-12">
                    {resource.image ? (
                      <img
                        src={resource.image}
                        alt=""
                        loading="lazy"
                        onError={handleImageError}
                        className="h-7 w-7 object-contain sm:h-8 sm:w-8"
                      />
                    ) : (
                      <FaGlobe className="text-lg sm:text-xl" />
                    )}
                  </div>

                  {/* Resource Information */}
                  <div className="min-w-0 flex-1">
                    <h3
                      className="break-words text-sm font-semibold leading-6 text-slate-100 transition-colors group-hover:text-emerald-300 sm:text-base"
                      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                    >
                      {resource.name}
                    </h3>

                    <p
                      className="mt-1 whitespace-pre-line break-words text-[13px] leading-6 text-slate-400 sm:text-sm sm:leading-7"
                      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                    >
                      {resource.description ||
                        "এই রিসোর্স সম্পর্কে জানুন।"}
                    </p>
                  </div>

                  {/* External Link */}
                  {resource.link && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors group-hover:bg-emerald-400/10 group-hover:text-[#d6aa62]">
                      <FaArrowUpRightFromSquare className="text-xs" />
                    </div>
                  )}
                </>
              );

              const className =
                "group flex min-w-0 items-start gap-3 rounded-xl border border-white/[0.07] bg-[#10252d] p-3.5 transition-colors duration-200 hover:border-emerald-300/25 hover:bg-[#142d35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 sm:gap-4 sm:rounded-2xl sm:p-4";

              return resource.link ? (
                <a
                  key={resource.id ?? resource.link}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${resource.name} ওয়েবসাইট খুলুন`}
                  className={className}
                >
                  {content}
                </a>
              ) : (
                <div
                  key={resource.id ?? `${resource.name}-${index}`}
                  className={className}
                >
                  {content}
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Note */}
        {!loading && !error && resources.length > 0 && (
          <p
            className="mt-5 flex items-start gap-2 border-t border-white/[0.08] pt-4 text-xs leading-6 text-slate-400 sm:mt-6"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            <FaGlobe className="mt-1 shrink-0 text-emerald-300" />

            <span>
              বাইরের ওয়েবসাইটে যেতে রিসোর্সের নামের ওপর ক্লিক করুন।
            </span>
          </p>
        )}
      </div>
    </section>
  );
};

export default Resources;
