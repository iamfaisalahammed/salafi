import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import {
  FaYoutube,
  FaArrowRight,
  FaRotateRight,
  FaBookOpen,
  FaXmark,
  FaChevronLeft,
  FaChevronRight,
  FaArrowsLeftRight,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

import "swiper/css";
import "swiper/css/free-mode";

const FALLBACK_IMAGE =
  "https://placehold.co/200x200/10252d/34d399?text=Channel";

const FONT = { fontFamily: "'Hind Siliguri', sans-serif" };

const Channel = () => {
  const [data, setData] = useState({
    sectionTitle: "",
    channels: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [selected, setSelected] = useState(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchChannels = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch("/data/channels.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load channels");
        }

        const result = await response.json();

        setData({
          sectionTitle: result.sectionTitle || "ইসলামিক ইউটিউব চ্যানেল",
          channels: Array.isArray(result.channels)
            ? result.channels
            : [],
        });
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

    fetchChannels();

    return () => controller.abort();
  }, [retry]);

  // Modal: Esc to close + body scroll lock
  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelected(null);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  const hasChannels = !loading && !error && data.channels.length > 0;

  return (
    <section
      className="relative overflow-hidden bg-[#081b22] px-3 py-10 text-slate-100 sm:px-6 sm:py-14 lg:py-16"
      style={FONT}
    >
      <style>{`
        @keyframes chFadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes chPopIn {
          from { opacity: 0; transform: translateY(16px) scale(.96) }
          to { opacity: 1; transform: translateY(0) scale(1) }
        }
        @keyframes chNudge {
          0%, 100% { transform: translateX(0) }
          50% { transform: translateX(6px) }
        }
      `}</style>

      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-emerald-400/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#d6aa62]/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-7 border-b border-white/[0.08] pb-6 sm:mb-9 sm:pb-7">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/[0.07] px-3 py-1.5 text-xs font-semibold text-emerald-300 sm:text-sm">
            <FaBookOpen />
            <span>হিকমাহ লাইব্রেরি</span>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="min-w-0">
              <h2 className="text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl lg:text-4xl">
                {data.sectionTitle || "ইসলামিক ইউটিউব চ্যানেল"}
                <span className="text-[#d6aa62]"> ও উপকারী আলোচনা</span>
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                উপকারী ইসলামিক জ্ঞান অর্জনে বিশ্বস্ত চ্যানেলগুলোর আলোচনা
                ও শিক্ষামূলক ভিডিও দেখুন।
              </p>
            </div>

            <div className="flex w-fit shrink-0 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-xs font-medium text-slate-300 sm:text-sm">
              <FaYoutube className="text-base text-red-400" />
              <span>YouTube Channels</span>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-white/[0.07] bg-[#10252d] p-4 sm:p-5"
              >
                <div className="mx-auto h-[72px] w-[72px] rounded-full bg-white/[0.07] sm:h-20 sm:w-20" />
                <div className="mx-auto mt-4 h-3 w-4/5 rounded bg-white/[0.08]" />
                <div className="mx-auto mt-3 h-3 w-2/5 rounded bg-white/[0.05]" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-300/15 bg-[#10252d] px-4 py-10 text-center sm:px-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-400/[0.08] text-red-300">
              <FaYoutube className="text-2xl" />
            </div>

            <h3 className="mt-4 text-base font-bold text-white">
              চ্যানেলগুলো লোড করা যায়নি
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
            </p>

            <button
              type="button"
              onClick={() => setRetry((value) => value + 1)}
              className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-[#081b22] transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              <FaRotateRight />
              আবার চেষ্টা করুন
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && data.channels.length === 0 && (
          <div className="rounded-2xl border border-white/[0.07] bg-[#10252d] px-4 py-10 text-center">
            <FaYoutube className="mx-auto text-3xl text-slate-500" />

            <p className="mt-3 text-sm leading-6 text-slate-400">
              এই মুহূর্তে কোনো চ্যানেল পাওয়া যায়নি।
            </p>
          </div>
        )}

        {/* Slider controls: swipe hint + arrows */}
        {hasChannels && (
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 sm:text-sm">
              <FaArrowsLeftRight
                className="text-emerald-300"
                style={{ animation: "chNudge 1.6s ease-in-out infinite" }}
              />
              <span>
                <span className="sm:hidden">ডানে-বামে সোয়াইপ করুন</span>
                <span className="hidden sm:inline">
                  আরও চ্যানেল দেখতে স্লাইড করুন
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="আগের চ্যানেল"
                onClick={() => swiperRef.current?.slidePrev()}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.04] text-sm text-slate-200 transition hover:border-emerald-300/30 hover:bg-emerald-400/10 hover:text-emerald-300 active:scale-95"
              >
                <FaChevronLeft />
              </button>
              <button
                type="button"
                aria-label="পরের চ্যানেল"
                onClick={() => swiperRef.current?.slideNext()}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.04] text-sm text-slate-200 transition hover:border-emerald-300/30 hover:bg-emerald-400/10 hover:text-emerald-300 active:scale-95"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}

        {/* Channel Slider */}
        {hasChannels && (
          <div className="relative">
            <Swiper
              modules={[Autoplay, FreeMode]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              spaceBetween={12}
              slidesPerView={2.3}
              freeMode={{
                enabled: true,
                momentum: true,
              }}
              loop={data.channels.length >= 5}
              speed={600}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                480: {
                  slidesPerView: 3,
                  spaceBetween: 14,
                },
                640: {
                  slidesPerView: 4,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 18,
                },
                1280: {
                  slidesPerView: 6,
                  spaceBetween: 20,
                },
              }}
              className="!pb-2"
            >
              {data.channels.map((channel, index) => (
                <SwiperSlide key={channel.id ?? channel.youtube ?? index}>
                  <button
                    type="button"
                    onClick={() => setSelected(channel)}
                    aria-label={`${channel.name || "ইসলামিক চ্যানেল"} বিস্তারিত দেখুন`}
                    className="group flex h-full min-h-[205px] w-full flex-col items-center rounded-2xl border border-white/[0.07] bg-[#10252d] px-3 py-5 text-center transition duration-200 hover:border-emerald-300/25 hover:bg-[#142d35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300 sm:min-h-[225px] sm:px-4 sm:py-6"
                  >
                    {/* Channel Image */}
                    <div className="relative shrink-0">
                      <img
                        src={channel.image || FALLBACK_IMAGE}
                        alt={channel.name || "ইসলামিক চ্যানেল"}
                        loading="lazy"
                        onError={handleImageError}
                        className="h-[72px] w-[72px] rounded-full border border-white/[0.10] bg-[#0b2028] object-cover transition duration-300 group-hover:border-emerald-300/30 sm:h-20 sm:w-20"
                      />

                      <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#10252d] bg-red-600 text-xs text-white">
                        <FaYoutube />
                      </span>
                    </div>

                    {/* Channel Name */}
                    <h3 className="mt-4 line-clamp-2 min-h-10 w-full break-words text-sm font-semibold leading-5 text-slate-100 transition-colors group-hover:text-emerald-300 sm:text-base">
                      {channel.name || "ইসলামিক চ্যানেল"}
                    </h3>

                    {/* Visit Link */}
                    <div className="mt-auto flex items-center gap-1.5 pt-3 text-xs font-medium text-[#d6aa62] sm:text-sm">
                      চ্যানেল দেখুন
                      <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Edge fade: shows more cards continue */}
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#081b22] to-transparent sm:w-16" />
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-[#081b22] to-transparent sm:w-10" />
          </div>
        )}

        {/* Footer Note */}
        {hasChannels && (
          <p className="mt-5 border-t border-white/[0.07] pt-4 text-xs leading-6 text-slate-400 sm:mt-6 sm:text-sm">
            উপকারী জ্ঞান অর্জন করুন এবং বিশ্বস্ত উৎস থেকে ইসলাম শিখুন।
          </p>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          style={{ ...FONT, animation: "chFadeIn .2s ease-out" }}
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.name || "ইসলামিক চ্যানেল"}
        >
          <div
            className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/[0.10] bg-[#10252d] p-6 text-center shadow-2xl shadow-black/50 sm:p-8"
            style={{ animation: "chPopIn .25s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow */}
            <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />

            {/* Close (X) */}
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="বন্ধ করুন"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.05] text-slate-300 transition hover:bg-red-400/15 hover:text-red-300 active:scale-95"
            >
              <FaXmark />
            </button>

            <div className="relative mx-auto w-fit">
              <img
                src={selected.image || FALLBACK_IMAGE}
                alt={selected.name || "ইসলামিক চ্যানেল"}
                onError={handleImageError}
                className="h-28 w-28 rounded-full border-2 border-emerald-300/25 bg-[#0b2028] object-cover sm:h-32 sm:w-32"
              />
              <span className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-[#10252d] bg-red-600 text-base text-white">
                <FaYoutube />
              </span>
            </div>

            <h3 className="relative mt-5 break-words text-lg font-bold leading-7 text-white sm:text-xl">
              {selected.name || "ইসলামিক চ্যানেল"}
            </h3>

            <p className="relative mt-1.5 text-sm leading-6 text-slate-400">
              ইউটিউবে গিয়ে চ্যানেলটির আলোচনা ও ভিডিও দেখতে চান?
            </p>

            <a
              href={selected.youtube}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setSelected(null)}
              className="relative mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300 sm:text-base"
            >
              <FaYoutube className="text-lg" />
              ইউটিউবে যান
              <FaArrowUpRightFromSquare className="text-xs" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default Channel;