
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
    desc: "আরবি আয়াতের সাথে সহজ বাংলা অনুবাদ",
    infoA: { label: "ভাষা", value: "আরবি ও বাংলা" },
    infoB: { label: "ধরন", value: "তিলাওয়াত" },
    primary: {
      text: "কুরআন পড়ুন",
      to: "https://quran.com/bn/al-fatihah",
    },
    secondary: {
      text: "বিস্তারিত দেখুন",
      to: "https://quran.com/bn/al-fatihah",
    },
  },
  {
    title: "তাফসির ও ব্যাখ্যা",
    desc: "আয়াতের প্রেক্ষাপট ও অর্থ গভীরভাবে বুঝুন",
    infoA: { label: "ভাষা", value: "বাংলা" },
    infoB: { label: "ধরন", value: "তাফসির" },
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
    desc: "প্রিয় ক্বারীদের সুমধুর তিলাওয়াত শুনুন",
    infoA: { label: "ভাষা", value: "আরবি" },
    infoB: { label: "ধরন", value: "অডিও" },
    primary: {
      text: "শুনুন",
      to: "https://quranicaudio.com/",
    },
    secondary: {
      text: "বিস্তারিত দেখুন",
      to: "https://quranicaudio.com/",
    },
  },
];

const Sparkle = ({
  className,
  delay = "0s",
  color = "#e0b875",
}) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={`q-twinkle pointer-events-none absolute ${className}`}
    style={{ animationDelay: delay }}
    fill={color}
  >
    <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5Z" />
  </svg>
);

const QuranArt = () => (
  <div className="relative mx-auto flex h-44 w-full max-w-xs items-center justify-center sm:h-52">
    <div className="q-glow absolute h-40 w-40 rounded-full bg-emerald-400/25 blur-3xl" />

    <Sparkle className="left-4 top-3 h-4 w-4" />
    <Sparkle
      className="right-6 top-8 h-3 w-3"
      delay="0.8s"
      color="#6ee7b7"
    />
    <Sparkle
      className="bottom-4 left-10 h-3 w-3"
      delay="1.5s"
      color="#6ee7b7"
    />
    <Sparkle
      className="bottom-6 right-8 h-4 w-4"
      delay="2.1s"
    />

    <svg
      viewBox="0 0 320 200"
      className="q-float relative h-full w-full"
      role="img"
      aria-label="খোলা কুরআন"
    >
      <defs>
        <linearGradient id="qPage" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset="1" stopColor="#ecdcb8" />
        </linearGradient>

        <linearGradient id="qCover" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f5b46" />
          <stop offset="1" stopColor="#073528" />
        </linearGradient>

        <linearGradient id="qStand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a3b2e" />
          <stop offset="1" stopColor="#4a1f19" />
        </linearGradient>
      </defs>

      {/* Stand */}
      <path
        d="M112 150 L160 188 L208 150 L198 146 L160 174 L122 146 Z"
        fill="url(#qStand)"
      />
      <path
        d="M96 152 L160 196 L224 152 L218 148 L160 186 L102 148 Z"
        fill="#4a1f19"
        opacity="0.7"
      />

      {/* Cover */}
      <polygon
        points="22,90 160,148 298,90 298,102 160,162 22,102"
        fill="url(#qCover)"
      />

      {/* Left page */}
      <polygon
        points="30,60 160,112 160,148 30,92"
        fill="url(#qPage)"
      />

      {/* Right page */}
      <g
        className="q-page"
        style={{
          transformOrigin: "160px 112px",
          transformBox: "view-box",
        }}
      >
        <polygon
          points="290,60 160,112 160,148 290,92"
          fill="url(#qPage)"
        />
        <polygon
          points="290,60 160,112 160,148 290,92"
          fill="#000"
          opacity="0.04"
        />
      </g>

      {/* Text lines */}
      <g
        stroke="#6b5a3a"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      >
        {[8, 14, 20, 26].map((off, i) => (
          <g key={off}>
            <line
              className="q-line"
              style={{ animationDelay: `${i * 0.3}s` }}
              x1="44"
              y1={65 + off}
              x2="148"
              y2={107 + off}
            />
            <line
              className="q-line"
              style={{ animationDelay: `${i * 0.3 + 0.15}s` }}
              x1="276"
              y1={65 + off}
              x2="172"
              y2={107 + off}
            />
          </g>
        ))}
      </g>

      {/* Spine */}
      <path
        d="M160 112 L160 148"
        stroke="#b9a273"
        strokeWidth="2"
      />

      {/* Ribbon */}
      <path
        d="M160 128 L152 176 L160 170 L168 176 L164 128 Z"
        fill="#e0b875"
      />
    </svg>
  </div>
);

const Banner = () => {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  const goPrev = () => {
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  };

  const goNext = () => {
    setIndex((i) => (i + 1) % SLIDES.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-[#081b22] px-3 py-7 text-slate-100 sm:px-6 sm:py-12 lg:py-16">
      <style>{`
        @keyframes qFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes qGlow {
          0%, 100% { opacity: .5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes qTwinkle {
          0%, 100% { opacity: .2; transform: scale(.6) rotate(0); }
          50% { opacity: 1; transform: scale(1.15) rotate(45deg); }
        }

        @keyframes qPage {
          0%, 100% { transform: scaleX(1) skewY(0); }
          50% { transform: scaleX(.95) skewY(-1.5deg); }
        }

        @keyframes qLine {
          0%, 100% { opacity: .35; }
          50% { opacity: 1; }
        }

        @keyframes qFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .q-float { animation: qFloat 4s ease-in-out infinite; }
        .q-glow { animation: qGlow 4s ease-in-out infinite; }
        .q-twinkle { animation: qTwinkle 3s ease-in-out infinite; }
        .q-page { animation: qPage 5s ease-in-out infinite; }
        .q-line { animation: qLine 3s ease-in-out infinite; }
        .q-fade { animation: qFade .45s ease both; }

        @media (prefers-reduced-motion: reduce) {
          .q-float,
          .q-glow,
          .q-twinkle,
          .q-page,
          .q-line,
          .q-fade {
            animation: none;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 -z-10 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl"
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-7 lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* Introduction */}
          <div className="min-w-0 text-center lg:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-medium text-emerald-300 sm:text-sm">
              <FaMosque />
              <span>ইসলামি জ্ঞান ও রিসোর্সের ঠিকানা</span>
            </div>

            <h1 className="mx-auto max-w-xl text-3xl font-bold leading-[1.35] tracking-tight text-white sm:text-4xl lg:mx-0 lg:text-5xl">
              জ্ঞান অর্জন করুন,
              <span className="mt-1 block text-[#d6aa62]">
                সুন্নাহর পথে চলুন
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8 lg:mx-0">
              কুরআন, হাদিস, আলেমদের আলোচনা, ইসলামি অ্যাপ, বই ও
              প্রয়োজনীয় ওয়েবসাইট—সবকিছু খুঁজে নিন এক জায়গায়,
              সহজেই।
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 min-[380px]:flex-row lg:mt-7 lg:justify-start">
              <a
                href="/ExploreLibrary"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#c99a54] px-5 py-3 text-sm font-semibold text-[#102127] shadow-sm transition-colors hover:bg-[#ddb36f] focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-[#081b22] sm:px-6"
              >
                <FaBookOpen className="text-base" />
                ডিজিটাল লাইব্রেরি
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <p className="mt-4 text-xs leading-6 text-slate-400 sm:text-sm">
              আপনার প্রয়োজনীয় ইসলামি রিসোর্স, সহজে এক জায়গায়।
            </p>
          </div>

          {/* Quran Card */}
          <div id="quran" className="relative min-w-0 scroll-mt-5">
            <button
              type="button"
              onClick={goPrev}
              aria-label="আগের স্লাইড"
              className="absolute left-2 top-24 z-10 flex h-9 w-10 items-center justify-center rounded-md bg-white text-[#102127] shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300 sm:-left-5 sm:top-28 sm:w-12"
            >
              <IoArrowBack className="text-lg" />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="পরের স্লাইড"
              className="absolute right-2 top-24 z-10 flex h-9 w-10 items-center justify-center rounded-md bg-[#e0b875] text-[#102127] shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-300 sm:-right-5 sm:top-28 sm:w-12"
            >
              <IoArrowForward className="text-lg" />
            </button>

            <div className="overflow-hidden rounded-3xl border border-white/15 bg-[#10252d] p-5 shadow-xl shadow-black/20 sm:p-7">
              <QuranArt />

              <div key={index} className="q-fade mt-4">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  {slide.title}
                </h2>

                <p className="mt-2 text-sm leading-7 text-slate-300 sm:text-base">
                  {slide.desc}
                </p>

                <div className="mt-5 grid grid-cols-2 divide-x divide-white/10 rounded-xl border border-white/15 bg-white/[0.03]">
                  <div className="flex items-center gap-3 p-3">
                    <IoLanguageOutline className="shrink-0 text-xl text-slate-400" />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">
                        {slide.infoA.label}
                      </p>
                      <p className="truncate text-sm font-semibold text-[#e0b875]">
                        {slide.infoA.value}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3">
                    <IoBookOutline className="shrink-0 text-xl text-slate-400" />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">
                        {slide.infoB.label}
                      </p>
                      <p className="truncate text-sm font-semibold text-[#e0b875]">
                        {slide.infoB.value}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 min-[380px]:flex-row">
                  <a
                    href={slide.primary.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-[#071b20] transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  >
                    <FaQuran />
                    {slide.primary.text}
                  </a>

                  <a
                    href={slide.secondary.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-emerald-300/60 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  >
                    {slide.secondary.text}
                  </a>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-1.5">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`স্লাইড ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index
                        ? "w-6 bg-[#c99a54]"
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
