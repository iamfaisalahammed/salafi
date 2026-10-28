import { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaMosque,
  FaArrowRight,
  FaQuran,
} from "react-icons/fa";
import {
  IoArrowBack,
  IoArrowForward,
  IoLanguageOutline,
  IoBookOutline,
} from "react-icons/io5";

const SLIDES = [
  {
    title: "কুরআন তিলাওয়াত",
    desc: "আরবি আয়াত পড়ুন এবং সহজ বাংলা অনুবাদ বুঝুন।",
    infoA: { label: "ভাষা", value: "আরবি ও বাংলা" },
    infoB: { label: "বিষয়", value: "তিলাওয়াত" },
    primary: {
      text: "কুরআন পড়ুন",
      to: "https://quran.com/bn/al-fatihah",
    },
    secondary: {
      text: "বিস্তারিত দেখুন",
      to: "https://quran.com/bn",
    },
  },
  {
    title: "তাফসির ও ব্যাখ্যা",
    desc: "কুরআনের আয়াতের অর্থ ও ব্যাখ্যা সম্পর্কে জানুন।",
    infoA: { label: "ভাষা", value: "বাংলাসহ বিভিন্ন ভাষা" },
    infoB: { label: "বিষয়", value: "তাফসির" },
    primary: {
      text: "তাফসির পড়ুন",
      to: "https://quran.com/bn/tafsirs",
    },
    secondary: {
      text: "বিস্তারিত দেখুন",
      to: "https://quran.com/bn/tafsirs",
    },
  },
  {
    title: "অডিও তিলাওয়াত",
    desc: "বিভিন্ন ক্বারীর কণ্ঠে কুরআনের তিলাওয়াত শুনুন।",
    infoA: { label: "ভাষা", value: "আরবি" },
    infoB: { label: "বিষয়", value: "অডিও" },
    primary: {
      text: "তিলাওয়াত ",
      to: "https://quranicaudio.com/",
    },
    secondary: {
      text: "অডিও লাইব্রেরি",
      to: "https://quranicaudio.com/",
    },
  },
];

const Sparkle = ({ className = "", delay = "0s", color = "#dfbd7b" }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={`q-twinkle pointer-events-none absolute ${className}`}
    style={{ animationDelay: delay }}
    fill={color}
  >
    <path d="M12 0 14.5 9.5 24 12 14.5 14.5 12 24 9.5 14.5 0 12 9.5 9.5Z" />
  </svg>
);

const QuranArt = () => (
  <div className="relative mx-auto flex h-44 w-full max-w-sm items-center justify-center sm:h-52">
    <div className="q-glow absolute h-36 w-36 rounded-full bg-emerald-400/20 blur-3xl sm:h-44 sm:w-44" />

    <div
      aria-hidden="true"
      className="absolute h-32 w-32 rounded-full border border-emerald-300/10 sm:h-40 sm:w-40"
    />

    <Sparkle className="left-[13%] top-[15%] h-3 w-3" />
    <Sparkle
      className="right-[15%] top-[20%] h-4 w-4"
      delay="0.8s"
      color="#6ee7b7"
    />
    <Sparkle
      className="bottom-[15%] left-[20%] h-3 w-3"
      delay="1.4s"
      color="#6ee7b7"
    />
    <Sparkle
      className="bottom-[18%] right-[18%] h-3 w-3"
      delay="2s"
    />

    <svg
      viewBox="0 0 320 210"
      className="q-float relative h-full w-full overflow-visible"
      role="img"
      aria-label="রেহালের ওপর রাখা খোলা কুরআনের অলংকরণ"
    >
      <defs>
        <linearGradient id="qPage" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fffdf5" />
          <stop offset="100%" stopColor="#e9d8b1" />
        </linearGradient>

        <linearGradient id="qCover" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#167052" />
          <stop offset="100%" stopColor="#063b2c" />
        </linearGradient>

        <linearGradient id="qStand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#85513a" />
          <stop offset="100%" stopColor="#49271c" />
        </linearGradient>

        <linearGradient id="qGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8e4a8" />
          <stop offset="100%" stopColor="#bd8a3d" />
        </linearGradient>

        <filter id="qShadow" x="-30%" y="-30%" width="160%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* Soft shadow */}
      <ellipse
        cx="160"
        cy="183"
        rx="98"
        ry="10"
        fill="#000"
        opacity="0.28"
        filter="url(#qShadow)"
      />

      {/* Wooden rehal */}
      <path
        d="M113 151 160 183 207 151 198 147 160 171 122 147Z"
        fill="url(#qStand)"
      />
      <path
        d="M96 153 160 199 224 153 217 149 160 187 103 149Z"
        fill="#482419"
      />
      <path
        d="M111 153 160 185 209 153"
        fill="none"
        stroke="#b17b4b"
        strokeWidth="1.2"
        opacity="0.65"
      />

      {/* Quran cover */}
      <path
        d="M22 87 160 143 298 87 298 101 160 160 22 101Z"
        fill="url(#qCover)"
        stroke="#d5ad63"
        strokeWidth="0.8"
      />

      {/* Left page */}
      <path
        d="M30 55 160 108 160 143 30 91Z"
        fill="url(#qPage)"
        stroke="#c5a875"
        strokeWidth="0.6"
      />

      {/* Right page */}
      <g
        className="q-page"
        style={{
          transformOrigin: "160px 108px",
          transformBox: "view-box",
        }}
      >
        <path
          d="M290 55 160 108 160 143 290 91Z"
          fill="url(#qPage)"
          stroke="#c5a875"
          strokeWidth="0.6"
        />
        <path
          d="M290 55 160 108 160 143 290 91Z"
          fill="#8c754c"
          opacity="0.07"
        />
      </g>

      {/* Page borders */}
      <g
        fill="none"
        stroke="#bd9b60"
        strokeWidth="0.8"
        opacity="0.75"
      >
        <path d="M39 62 151 108 151 135 39 89Z" />
        <path d="M281 62 169 108 169 135 281 89Z" />
      </g>

      {/* Decorative page lines */}
      <g
        stroke="#8b744f"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.55"
      >
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <line
              className="q-line"
              style={{ animationDelay: `${i * 0.25}s` }}
              x1="47"
              y1={67 + i * 6}
              x2="145"
              y2={107 + i * 6}
            />
            <line
              className="q-line"
              style={{ animationDelay: `${i * 0.25 + 0.15}s` }}
              x1="273"
              y1={67 + i * 6}
              x2="175"
              y2={107 + i * 6}
            />
          </g>
        ))}
      </g>

      {/* Book spine */}
      <path
        d="M160 108V143"
        stroke="#b38b4c"
        strokeWidth="2"
      />

      {/* Gold ornament */}
      <path
        d="M160 119 164 125 160 131 156 125Z"
        fill="url(#qGold)"
      />

      {/* Bookmark */}
      <path
        d="M160 128 153 174 160 168 167 174 163 128Z"
        fill="url(#qGold)"
      />
    </svg>
  </div>
);

const Banner = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const slide = SLIDES[index];

  const goPrev = () => {
    setIndex((current) => (current - 1 + SLIDES.length) % SLIDES.length);
  };

  const goNext = () => {
    setIndex((current) => (current + 1) % SLIDES.length);
  };

  useEffect(() => {
    if (paused) return undefined;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section
      aria-label="Hikmah ইসলামি রিসোর্স"
      className="relative isolate overflow-hidden bg-[#081b22] px-4 py-9 text-slate-100 sm:px-6 sm:py-12 lg:py-16"
    >
      <style>{`
        @keyframes qFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }

        @keyframes qGlow {
          0%, 100% { opacity: .45; transform: scale(1); }
          50% { opacity: .85; transform: scale(1.12); }
        }

        @keyframes qTwinkle {
          0%, 100% { opacity: .25; transform: scale(.7) rotate(0); }
          50% { opacity: 1; transform: scale(1.1) rotate(35deg); }
        }

        @keyframes qPage {
          0%, 100% { transform: scaleX(1) skewY(0); }
          50% { transform: scaleX(.97) skewY(-.8deg); }
        }

        @keyframes qLine {
          0%, 100% { opacity: .35; }
          50% { opacity: .8; }
        }

        @keyframes qFade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes qOrbit {
          to { transform: rotate(360deg); }
        }

        .q-float { animation: qFloat 5s ease-in-out infinite; }
        .q-glow { animation: qGlow 5s ease-in-out infinite; }
        .q-twinkle { animation: qTwinkle 3.5s ease-in-out infinite; }
        .q-page { animation: qPage 6s ease-in-out infinite; }
        .q-line { animation: qLine 4s ease-in-out infinite; }
        .q-fade { animation: qFade .35s ease both; }

        /* বাটনের চারপাশে ঘোরা গোল্ড বর্ডার */
        .q-orbit {
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 230deg,
            rgba(214, 170, 98, 0.15) 270deg,
            #d6aa62 360deg
          );
          animation: qOrbit 4s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .q-float, .q-glow, .q-twinkle,
          .q-page, .q-line, .q-fade, .q-orbit {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-emerald-500/[0.09] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-24 -z-10 h-72 w-72 rounded-full bg-amber-400/[0.07] blur-3xl"
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-7 lg:grid-cols-2 lg:gap-14">
          {/* Introduction */}
          <div className="min-w-0 text-center lg:text-left">
            <div className="mb-5 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3.5 py-2 text-xs font-medium text-emerald-300 sm:text-sm">
              <FaMosque className="shrink-0" />
              <span>ইসলামি জ্ঞান ও রিসোর্সের ঠিকানা</span>
            </div>

            <h1 className="mx-auto max-w-xl text-3xl font-bold leading-[1.4] tracking-tight text-white sm:text-4xl lg:mx-0 lg:text-5xl">
              জ্ঞান অর্জন করুন,
              <span className="mt-1 block text-[#dfbd7b]">
                সুন্নাহর পথে চলুন
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8 lg:mx-0">
              কুরআন, হাদিস, আলেমদের আলোচনা, ইসলামি অ্যাপ,
              বই ও প্রয়োজনীয় ওয়েবসাইট—সবকিছু খুঁজে নিন
              এক জায়গায়, সহজেই।
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 min-[380px]:flex-row lg:mt-7 lg:justify-start">
              {/* হালকা বাটন + চারপাশে ঘোরা গোল্ড বর্ডার */}
              <a
                href="/ExploreLibrary"
                className="group relative inline-flex overflow-hidden rounded-xl bg-[#d6aa62]/25 p-[1.5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#081b22]"
              >
                <span
                  aria-hidden="true"
                  className="q-orbit pointer-events-none absolute left-1/2 top-1/2 -ml-[200px] -mt-[200px] h-[400px] w-[400px]"
                />

                <span className="relative inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-[10px] bg-[#0c242b] px-5 py-3 text-sm font-semibold text-[#e4c28b] transition-colors group-hover:bg-[#12313a] sm:px-6">
                  <FaBookOpen className="text-base" />
                  ডিজিটাল লাইব্রেরি
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </div>

            <p className="mt-4 text-xs leading-6 text-slate-400 sm:text-sm">
              আপনার প্রয়োজনীয় ইসলামি রিসোর্স, সহজে এক জায়গায়।
            </p>
          </div>

          {/* Quran slider */}
          <div
            id="quran"
            className="relative min-w-0 scroll-mt-5"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setPaused(false);
              }
            }}
          >
            <button
              type="button"
              onClick={goPrev}
              aria-label="আগের স্লাইড"
              className="absolute left-1 top-[5.5rem] z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#17332f] text-white shadow-lg transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:-left-4 sm:top-28"
            >
              <IoArrowBack className="text-lg" />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="পরের স্লাইড"
              className="absolute right-1 top-[5.5rem] z-10 flex h-10 w-10 items-center justify-center rounded-full border border-amber-200/30 bg-[#d2aa69] text-[#102127] shadow-lg transition hover:bg-[#e4c28b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:-right-4 sm:top-28"
            >
              <IoArrowForward className="text-lg" />
            </button>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#122c32] to-[#0d2229] p-5 shadow-xl shadow-black/20 sm:p-7">
              <QuranArt />

              <div
                key={index}
                className="q-fade mt-3"
                aria-live="polite"
                aria-atomic="true"
              >
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  {slide.title}
                </h2>

                <p className="mt-2 min-h-12 text-sm leading-7 text-slate-300 sm:text-base">
                  {slide.desc}
                </p>

                <div className="mt-4 grid grid-cols-2 divide-x divide-white/10 rounded-xl border border-white/10 bg-white/[0.025]">
                  <div className="flex min-w-0 items-center gap-2.5 p-3 sm:gap-3 sm:p-4">
                    <IoLanguageOutline className="shrink-0 text-xl text-emerald-300" />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">
                        {slide.infoA.label}
                      </p>
                      <p className="mt-1 break-words text-sm font-semibold text-[#dfbd7b]">
                        {slide.infoA.value}
                      </p>
                    </div>
                  </div>

                  <div className="flex min-w-0 items-center gap-2.5 p-3 sm:gap-3 sm:p-4">
                    <IoBookOutline className="shrink-0 text-xl text-emerald-300" />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">
                        {slide.infoB.label}
                      </p>
                      <p className="mt-1 break-words text-sm font-semibold text-[#dfbd7b]">
                        {slide.infoB.value}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
                  <a
                    href={slide.primary.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-[#071b20] transition-colors hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                  >
                    <FaQuran />
                    {slide.primary.text}
                  </a>

                  <a
                    href={slide.secondary.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-slate-100 transition-colors hover:border-emerald-300/40 hover:bg-emerald-400/[0.06] hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                  >
                    {slide.secondary.text}
                  </a>
                </div>
              </div>

              {/* Slider controls */}
              <div className="mt-5 flex items-center justify-center gap-2">
                {SLIDES.map((item, i) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`${item.title} স্লাইড দেখুন`}
                    aria-pressed={i === index}
                    className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#10252d] ${
                      i === index
                        ? "w-7 bg-[#dfbd7b]"
                        : "w-2 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <p className="mt-3 text-center text-xs text-slate-500">
                {index + 1} / {SLIDES.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
