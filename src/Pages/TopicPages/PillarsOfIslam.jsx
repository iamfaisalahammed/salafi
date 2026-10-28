import { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaPlayCircle,
  FaExternalLinkAlt,
  FaMosque,
  FaHandHoldingHeart,
  FaMoon,
  FaKaaba,
  FaPrayingHands,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaYoutube,
  FaArrowRight,
  FaCompass,
} from "react-icons/fa";

const FONT = { fontFamily: "'Hind Siliguri', sans-serif" };
const GOLD = "#dfbd7b";
const YOUTUBE_RED = "#FF0000";

const pillars = [
  {
    id: "shahadah",
    title: "Shahadah",
    subtitle: "শাহাদাহ",
    description: "ইসলামের সাক্ষ্য ও ঈমানের ঘোষণা",
    icon: FaMosque,
    text: "لَا إِلَٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ",
    meaning:
      "আল্লাহ ছাড়া সত্য কোনো উপাস্য নেই। মুহাম্মাদ (সা.) আল্লাহর রাসূল।",
    resources: [],
  },
  {
    id: "salah",
    title: "Salah",
    subtitle: "সালাত / নামাজ",
    description: "নামাজ শিক্ষা, আদায়ের নিয়ম ও হাদিস",
    icon: FaMosque,
    resources: [
      {
        title: "সালাত বিষয়ক হাদিস",
        type: "hadith",
        url: "https://ihadis.com/subjectwise-hadith/salah",
      },
      {
        title: "নামাজ শিক্ষা — ভিডিও ১",
        type: "video",
        url: "https://youtu.be/L8U0kJZSytQ?si=SXCLKh7MYokB18aj",
      },
      {
        title: "নামাজ শিক্ষা — ভিডিও ২",
        type: "video",
        url: "https://youtu.be/azZQERu2ZqM?si=8j9h9xlousN8wy8G",
      },
      {
        title: "নামাজ শিক্ষা — ভিডিও ৩",
        type: "video",
        url: "https://youtu.be/DTqT90LDLlM?si=tc1GwSvx3FQ6bUJt",
      },
      {
        title: "নামাজ শিক্ষা — ভিডিও ৪",
        type: "video",
        url: "https://youtu.be/2ZEmsdEOpbk?si=j3aiN30haa43cbEg",
      },
    ],
  },
  {
    id: "zakat",
    title: "Zakat",
    subtitle: "যাকাত",
    description: "যাকাতের বিধান, হিসাব ও হাদিস",
    icon: FaHandHoldingHeart,
    resources: [
      {
        title: "যাকাত শিক্ষা — ভিডিও",
        type: "video",
        url: "https://youtu.be/liri3_Ktivo?si=BJ_HOrbJMV5TPXlp",
      },
      {
        title: "যাকাত ও দান-সদকা বিষয়ক হাদিস",
        type: "hadith",
        url: "https://ihadis.com/subjectwise-hadith/zakat-and-charity",
      },
    ],
  },
  {
    id: "sawm",
    title: "Sawm",
    subtitle: "সাওম / রোজা",
    description: "রমজানের রোজা ও এর বিধিবিধান",
    icon: FaMoon,
    resources: [
      {
        title: "রমজান বিষয়ক ভিডিও প্লেলিস্ট",
        type: "video",
        url: "https://www.youtube.com/watch?v=JwgaeMV40so&list=PLLy9xTYtFm4Qq4qrXRFzlV_Se5I4yvpQY",
      },
      {
        title: "রমজান বিষয়ক হাদিস",
        type: "hadith",
        url: "https://ihadis.com/subjectwise-hadith/ramadan",
      },
    ],
  },
  {
    id: "hajj",
    title: "Hajj & Umrah",
    subtitle: "হজ ও উমরাহ",
    description: "হজ, উমরাহ ও সংশ্লিষ্ট আমল",
    icon: FaKaaba,
    resources: [
      {
        title: "হজ শিক্ষা — ভিডিও ১",
        type: "video",
        url: "https://www.youtube.com/watch?v=4sl0Bm4wf9g&t=1168s",
      },
      {
        title: "হজ ও উমরাহ — ভিডিও ২",
        type: "video",
        url: "https://youtu.be/aWPIgNT_tM0?si=zOz8wb5s3yua9Uqs",
      },
      {
        title: "হজ ও উমরাহ — ভিডিও ৩",
        type: "video",
        url: "https://youtu.be/M7b27yW7FHU?si=983GYGhaPbPGsNpl",
      },
      {
        title: "হজ ও উমরাহ — ভিডিও ৪",
        type: "video",
        url: "https://youtu.be/JY4WZZ2Gn7E?si=vFfjmulUKeHU39tE",
      },
      {
        title: "হজ ও উমরাহ — ভিডিও ৫",
        type: "video",
        url: "https://youtu.be/ShzClNycIbo?si=RNMffIi_c9cjzf2w",
      },
      {
        title: "হজ ও উমরাহ — ভিডিও ৬",
        type: "video",
        url: "https://youtu.be/2II7opWjFqI?si=-UCtOozSHzIr79C0",
      },
      {
        title: "হজ ও উমরাহ বিষয়ক হাদিস",
        type: "hadith",
        url: "https://ihadis.com/subjectwise-hadith/hajj-and-umrah",
      },
    ],
  },
];

const resourceStyles = {
  video: {
    label: "ভিডিও",
    icon: FaYoutube,
    color: "border-red-500/25 bg-red-500/10 text-red-500",
  },
  hadith: {
    label: "হাদিস",
    icon: FaBookOpen,
    color: "border-[#dfbd7b]/25 bg-[#dfbd7b]/10 text-[#dfbd7b]",
  },
  dua: {
    label: "দোয়া",
    icon: FaPrayingHands,
    color: "border-violet-400/20 bg-violet-400/10 text-violet-300",
  },
};

const goldBorder = { borderColor: `${GOLD}30` };
const goldSoft = {
  borderColor: `${GOLD}30`,
  backgroundColor: `${GOLD}12`,
  color: GOLD,
};

function getYouTubeId(url) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1);
    }

    if (parsed.pathname === "/watch") {
      return parsed.searchParams.get("v");
    }

    const match = parsed.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/);

    return match?.[1] || null;
  } catch {
    return null;
  }
}

function VideoModal({ video, onClose }) {
  useEffect(() => {
    if (!video) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [video, onClose]);

  if (!video) return null;

  const videoId = getYouTubeId(video.url);
  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center overscroll-contain bg-black/75 p-0 backdrop-blur-sm animate-in fade-in duration-200 sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
        className="relative w-full max-w-lg max-h-[92dvh] overflow-y-auto overscroll-contain overflow-x-hidden rounded-t-3xl border border-white/10 bg-[#081b22] shadow-2xl animate-in slide-in-from-bottom-4 duration-300 sm:rounded-2xl"
      >
        <div className="flex items-start gap-3 border-b border-white/10 px-4 py-4 sm:px-5">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-lg"
            style={{
              borderColor: `${YOUTUBE_RED}35`,
              backgroundColor: `${YOUTUBE_RED}15`,
              color: YOUTUBE_RED,
            }}
          >
            <FaYoutube />
          </div>

          <div className="min-w-0 flex-1">
            <p
              className="mb-1 text-xs font-semibold uppercase tracking-wider"
              style={{ color: GOLD }}
            >
              Video Preview
            </p>

            <h2
              id="video-modal-title"
              className="break-words text-base font-bold leading-6 text-white sm:text-lg"
            >
              {video.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="বন্ধ করুন"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b]"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-4 sm:p-5">
          <div className="group relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-[#10252d]">
            {thumbnail && (
              <img
                src={thumbnail}
                alt={`${video.title} এর YouTube Thumbnail`}
                className="absolute inset-0 h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            )}

            <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/35" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition duration-200 group-hover:scale-110 sm:h-16 sm:w-16"
                style={{ backgroundColor: YOUTUBE_RED }}
              >
                <FaPlayCircle className="text-3xl sm:text-4xl" />
              </div>
            </div>

            <span className="absolute bottom-3 left-3 rounded-md border border-white/10 bg-black/60 px-2 py-1 text-xs text-white">
              YouTube Preview
            </span>
          </div>

          <div className="py-5">
            <h3 className="text-base font-semibold text-white">
              এই ভিডিওটি দেখতে চান?
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              ভিডিওটি YouTube-এ খুলে সম্পূর্ণ দেখতে পারবেন। আপনার পছন্দের
              ভিডিওটি চালু করতে নিচের বাটনে ক্লিক করুন।
            </p>
          </div>

          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#081b22] active:scale-[0.98]"
            style={{ backgroundColor: YOUTUBE_RED }}
          >
            <FaYoutube className="text-xl" />
            YouTube-এ ভিডিও দেখুন
            <FaArrowRight className="ml-1 text-xs" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="mt-2 min-h-11 w-full rounded-xl px-4 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b]"
          >
            বন্ধ করুন
          </button>
        </div>

        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(to right, transparent, ${GOLD}80, transparent)`,
          }}
        />
      </section>
    </div>
  );
}

export default function PillarsOfIslam() {
  const [expanded, setExpanded] = useState("salah");
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section
      style={FONT}
      className=" relative min-h-screen overflow-x-hidden bg-[#081b22] px-3 py-8 text-slate-200 sm:px-6 sm:py-12 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 text-center sm:mb-10">
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: GOLD }}
          >
            Islamic Knowledge
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            ইসলামের পাঁচ স্তম্ভ
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            শাহাদাহ, সালাত, যাকাত, সাওম ও হজ সম্পর্কে জানুন। কুরআন, হাদিস ও
            শিক্ষামূলক রিসোর্সের মাধ্যমে ইসলামের মৌলিক বিষয়গুলো শিখুন।
          </p>
        </header>

        <div className="-mx-3 mb-7 overflow-x-auto px-3 pb-2 sm:mx-0 sm:px-0">
          <div className="flex min-w-max justify-center gap-2">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const isActive = expanded === pillar.id;

              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setExpanded(isActive ? "" : pillar.id)}
                  aria-expanded={isActive}
                  className={`relative inline-flex min-h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border px-3 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b] ${
                    isActive
                      ? "text-[#dfbd7b]"
                      : "border-white/10 bg-[#10252d] text-slate-300 hover:text-[#dfbd7b]"
                  }`}
                  style={isActive ? goldSoft : undefined}
                >
                  <Icon className="shrink-0" />
                  <span>{pillar.subtitle}</span>

                  {isActive ? (
                    <FaChevronUp className="text-[10px]" />
                  ) : (
                    <FaChevronDown className="text-[10px]" />
                  )}

                  <span className="sr-only">{`স্তম্ভ ${index + 1}`}</span>
                </button>
              );
            })}
          </div>
        </div>

        {expanded === "shahadah" && (
          <article
            className="mb-6 overflow-hidden rounded-2xl border bg-[#10252d]"
            style={goldBorder}
          >
            <div className="border-b border-white/10 px-4 py-4 sm:px-6">
              <p className="text-xs font-semibold" style={{ color: GOLD }}>
                PILLAR 01 / 05
              </p>
              <h2 className="mt-1 text-lg font-bold text-white sm:text-xl">
                শাহাদাহ · ঈমানের সাক্ষ্য
              </h2>
            </div>

            <div className="px-4 py-7 sm:px-7 sm:py-9">
              <p
                dir="rtl"
                lang="ar"
                className="break-words text-center text-2xl font-bold leading-[2.2] text-[#dfbd7b] sm:text-3xl"
              >
                {pillars[0].text}
              </p>

              <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-7 text-slate-300 sm:text-base">
                {pillars[0].meaning}
              </p>
            </div>
          </article>
        )}

        {pillars.map((pillar, pillarIndex) => {
          if (pillar.id === "shahadah" || expanded !== pillar.id) {
            return null;
          }

          const Icon = pillar.icon;
          const videos = pillar.resources.filter(
            (resource) => resource.type === "video"
          );
          const otherResources = pillar.resources.filter(
            (resource) => resource.type !== "video"
          );

          return (
            <article
              key={pillar.id}
              className="mb-6 min-w-0 overflow-hidden rounded-2xl border bg-[#10252d]"
              style={goldBorder}
            >
              <div className="border-b border-white/10 bg-white/[0.02] px-4 py-4 sm:px-6 sm:py-5">
                <div className="flex items-start gap-3">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-lg sm:h-12 sm:w-12"
                    style={goldSoft}
                  >
                    <Icon />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p
                      className="mb-1 text-xs font-semibold"
                      style={{ color: GOLD }}
                    >
                      PILLAR {String(pillarIndex + 1).padStart(2, "0")} / 05
                    </p>

                    <h2 className="break-words text-lg font-bold leading-7 text-white sm:text-xl">
                      {pillar.title}
                    </h2>

                    <p className="text-sm font-medium text-[#dfbd7b]">
                      {pillar.subtitle}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-6">
                {videos.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-3 flex items-center gap-2 px-1 text-base font-bold text-white sm:mb-4">
                      <FaYoutube
                        className="shrink-0"
                        style={{ color: YOUTUBE_RED }}
                      />
                      ভিডিও রিসোর্স
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs font-medium text-slate-400">
                        {videos.length}
                      </span>
                    </h3>

                    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#081b22]/60">
                      {videos.map((resource, index) => (
                        <button
                          key={resource.url}
                          type="button"
                          onClick={() => setActiveVideo(resource)}
                          className="group flex min-h-[72px] w-full min-w-0 items-center gap-3 border-b border-white/[0.07] p-3 text-left transition-colors last:border-b-0 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#dfbd7b] sm:p-4"
                        >
                          <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors group-hover:brightness-125"
                            style={{
                              borderColor: `${YOUTUBE_RED}35`,
                              backgroundColor: `${YOUTUBE_RED}15`,
                              color: YOUTUBE_RED,
                            }}
                          >
                            <FaYoutube className="text-xl" />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block break-words text-sm font-semibold leading-6 text-slate-200 transition-colors group-hover:text-[#dfbd7b]">
                              {resource.title}
                            </span>

                            <span className="mt-1 block text-xs text-slate-500">
                              ভিডিও {index + 1} · দেখতে ক্লিক করুন
                            </span>
                          </span>

                          <FaExternalLinkAlt className="shrink-0 text-xs text-slate-500 transition-colors group-hover:text-[#dfbd7b]" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {otherResources.length > 0 && (
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 px-1 text-base font-bold text-white sm:mb-4">
                      <FaBookOpen
                        className="shrink-0"
                        style={{ color: GOLD }}
                      />
                      হাদিস ও অন্যান্য রিসোর্স
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs font-medium text-slate-400">
                        {otherResources.length}
                      </span>
                    </h3>

                    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#081b22]/60">
                      {otherResources.map((resource) => {
                        const style = resourceStyles[resource.type];
                        const ResourceIcon = style.icon;

                        return (
                          <a
                            key={resource.url}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex min-h-[72px] min-w-0 items-center gap-3 border-b border-white/[0.07] p-3 last:border-b-0 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#dfbd7b] sm:p-4"
                          >
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${style.color}`}
                            >
                              <ResourceIcon className="text-lg" />
                            </span>

                            <span className="min-w-0 flex-1">
                              <span className="block break-words text-sm font-semibold leading-6 text-slate-200 transition-colors group-hover:text-[#dfbd7b]">
                                {resource.title}
                              </span>

                              <span className="mt-1 block text-xs text-slate-500">
                                {style.label}
                              </span>
                            </span>

                            <FaExternalLinkAlt className="shrink-0 text-xs text-slate-500 transition-colors group-hover:text-[#dfbd7b]" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}

        {!expanded && (
          <div
            className="rounded-2xl border bg-[#10252d] px-5 py-10 text-center"
            style={goldBorder}
          >
            <FaBookOpen
              className="mx-auto mb-3 text-3xl"
              style={{ color: GOLD }}
            />

            <h2 className="text-lg font-bold text-white">
              একটি স্তম্ভ নির্বাচন করুন
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              বিস্তারিত জানতে উপরের যেকোনো একটি স্তম্ভে ক্লিক করুন।
            </p>
          </div>
        )}
      </div>

      <div className="mt-5 flex justify-center px-2 pb-5">
        <a
          href="https://play.google.com/store/apps/details?id=zad.com.islamqa"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex max-w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-center text-sm font-medium text-slate-400 transition-colors hover:text-[#dfbd7b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b]"
        >
          <FaCompass className="shrink-0 text-base text-[#dfbd7b]" />
          <span>ইসলাম সম্পর্কে জানতে IslamQA অ্যাপ ডাউনলোড করুন</span>
          <FaExternalLinkAlt className="shrink-0 text-[10px]" />
        </a>
      </div>

      <VideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
}
