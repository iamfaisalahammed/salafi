import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import {
  FaYoutube,
  FaArrowRight,
  FaRotateRight,
  FaBookOpen,
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

  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <section
      className="relative overflow-hidden bg-[#081b22] px-3 py-10 text-slate-100 sm:px-6 sm:py-14 lg:py-16"
      style={FONT}
    >
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

        {/* Channel Slider */}
        {!loading && !error && data.channels.length > 0 && (
          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={12}
            slidesPerView={2}
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
                <a
                  href={channel.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${channel.name || "ইসলামিক চ্যানেল"} ইউটিউব চ্যানেল দেখুন`}
                  className="group flex h-full min-h-[205px] flex-col items-center rounded-2xl border border-white/[0.07] bg-[#10252d] px-3 py-5 text-center transition duration-200 hover:border-emerald-300/25 hover:bg-[#142d35] sm:min-h-[225px] sm:px-4 sm:py-6"
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
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Footer Note */}
        {!loading && !error && data.channels.length > 0 && (
          <p className="mt-5 border-t border-white/[0.07] pt-4 text-xs leading-6 text-slate-400 sm:mt-6 sm:text-sm">
            উপকারী জ্ঞান অর্জন করুন এবং বিশ্বস্ত উৎস থেকে ইসলাম শিখুন।
          </p>
        )}
      </div>
    </section>
  );
};

export default Channel;