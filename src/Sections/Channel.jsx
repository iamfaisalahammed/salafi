
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { FaYoutube, FaArrowRight, FaRotateRight } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/free-mode";

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

  const fallbackImage =
    "https://placehold.co/200x200/f0fdf4/166534?text=Channel";

  return (
    <section className="overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-8 border-b border-gray-100 pb-6 sm:mb-10 sm:pb-8">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1 w-7 rounded-full bg-emerald-600" />
            <span className="text-xs font-semibold tracking-wide text-emerald-700 sm:text-sm">
              হিকমাহ • জ্ঞানের ঠিকানা
            </span>
          </div>

          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
                {data.sectionTitle || "ইসলামিক ইউটিউব চ্যানেল"}
              </h2>

              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                উপকারী ইসলামিক জ্ঞান অর্জনে বিশ্বস্ত চ্যানেলগুলো দেখুন।
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full bg-red-50 px-3 py-2 text-xs font-medium text-red-600 sm:text-sm">
              <FaYoutube className="text-base" />
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
                className="animate-pulse rounded-xl border border-gray-100 p-4 sm:p-5"
              >
                <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 sm:h-20 sm:w-20" />
                <div className="mx-auto mt-4 h-3 w-4/5 rounded bg-gray-100" />
                <div className="mx-auto mt-3 h-3 w-2/5 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-8 text-center">
            <p className="text-sm text-red-600">
              চ্যানেলগুলো লোড করা যায়নি। আবার চেষ্টা করুন।
            </p>

            <button
              type="button"
              onClick={() => setRetry((value) => value + 1)}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800"
            >
              <FaRotateRight />
              আবার চেষ্টা করুন
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && data.channels.length === 0 && (
          <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-10 text-center">
            <FaYoutube className="mx-auto text-3xl text-gray-300" />
            <p className="mt-3 text-sm text-gray-500">
              এই মুহূর্তে কোনো চ্যানেল পাওয়া যায়নি।
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
                  aria-label={`${channel.name} ইউটিউব চ্যানেল দেখুন`}
                  className="group flex h-full min-h-[205px] flex-col items-center rounded-xl border border-gray-100 bg-white px-3 py-5 text-center transition duration-200 hover:border-emerald-200 hover:bg-emerald-50/40 sm:min-h-[225px] sm:px-4 sm:py-6"
                >
                  {/* Channel Image */}
                  <div className="relative">
                    <img
                      src={channel.image || fallbackImage}
                      alt={channel.name || "ইসলামিক চ্যানেল"}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = fallbackImage;
                      }}
                      className="h-[72px] w-[72px] rounded-full border border-gray-100 bg-gray-50 object-cover sm:h-20 sm:w-20"
                    />

                    <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-600 text-xs text-white">
                      <FaYoutube />
                    </span>
                  </div>

                  {/* Channel Name */}
                  <h3 className="mt-4 line-clamp-2 min-h-10 w-full break-words text-sm font-semibold leading-5 text-gray-800 transition-colors group-hover:text-emerald-700 sm:text-base">
                    {channel.name}
                  </h3>

                  {/* Visit Link */}
                  <div className="mt-auto flex items-center gap-1.5 pt-3 text-xs font-medium text-emerald-700 sm:text-sm">
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
          <p className="mt-6 text-center text-xs leading-6 text-gray-400 sm:text-sm">
            উপকারী জ্ঞান অর্জন করুন এবং বিশ্বস্ত উৎস থেকে ইসলাম শিখুন।
          </p>
        )}
      </div>
    </section>
  );
};

export default Channel;
