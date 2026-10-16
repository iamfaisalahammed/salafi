
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import {
  FaYoutube,
  FaArrowRight,

} from "react-icons/fa";

import "swiper/css";
import "swiper/css/free-mode";

const Channel = () => {
  const [data, setData] = useState({
    sectionTitle: "",
    channels: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/data/channels.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load channels");
        return res.json();
      })
      .then((result) => {
        setData({
          sectionTitle: result.sectionTitle || "Islamic YouTube Channels",
          channels: Array.isArray(result.channels) ? result.channels : [],
        });
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#06140e] via-[#0a2118] to-[#07131b] px-4 py-16 text-white sm:px-6 md:py-20">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-amber-400/[0.07] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-12 text-center">

         

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {data.sectionTitle || "Islamic "}
            {!data.sectionTitle && (
              <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-amber-300 bg-clip-text text-transparent">
                YouTube Channels
              </span>
            )}
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
            Explore beneficial lectures, authentic Islamic knowledge,
            and educational videos from Islamic channels.
          </p>

          <div className="mx-auto mt-7 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-400 to-amber-400" />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex gap-5 overflow-hidden">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="min-w-0 flex-1 animate-pulse rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="mx-auto h-20 w-20 rounded-full bg-white/10 sm:h-24 sm:w-24" />
                <div className="mx-auto mt-4 h-3 w-4/5 rounded bg-white/10" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="rounded-2xl border border-red-400/20 bg-red-500/[0.06] px-4 py-8 text-center text-sm text-red-300">
            Unable to load channels. Please refresh the page and try again.
          </p>
        )}

        {/* Empty State */}
        {!loading && !error && data.channels.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400">
            No channels available right now.
          </p>
        )}

        {/* Channel Slider */}
        {!loading && !error && data.channels.length > 0 && (
          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={16}
            slidesPerView={2}
            freeMode={{
              enabled: true,
              momentum: true,
            }}
            loop={data.channels.length >= 5}
            speed={700}
            autoplay={{
              delay: 2200,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 14,
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 22,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 24,
              },
            }}
            className="!overflow-visible"
          >
            {data.channels.map((channel) => (
              <SwiperSlide key={channel.id} className="h-auto">
                <a
                  href={channel.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${channel.name} YouTube channel`}
                  className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.035] px-3 py-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400/40 hover:bg-emerald-400/[0.06] hover:shadow-xl hover:shadow-emerald-950/30 sm:px-4 sm:py-7"
                >
                  {/* Channel Image */}
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-emerald-400 to-amber-300 opacity-40 blur-sm transition duration-300 group-hover:opacity-100" />

                    <img
                      src={channel.image}
                      alt={channel.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://placehold.co/200x200/10251c/d1fae5?text=Channel";
                      }}
                      className="relative h-20 w-20 rounded-full border-2 border-[#17392a] object-cover transition duration-300 group-hover:scale-105 sm:h-24 sm:w-24"
                    />

                    {/* YouTube Icon */}
                    <span className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0a2118] bg-red-600 text-xs text-white">
                      <FaYoutube />
                    </span>
                  </div>

                  {/* Channel Name */}
                  <h3 className="mt-5 line-clamp-2 min-h-10 w-full break-words text-sm font-semibold leading-5 text-gray-200 transition-colors duration-300 group-hover:text-emerald-300 sm:text-base">
                    {channel.name}
                  </h3>

                  {/* Visit Link */}
                  <div className="mt-4 flex items-center gap-2 text-xs font-medium text-gray-400 transition-colors group-hover:text-emerald-300">
                    Visit Channel
                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-400 to-amber-300 transition-all duration-500 group-hover:w-full" />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

      </div>
    </section>
  );
};

export default Channel;
