import { useState } from "react";
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
} from "react-icons/fa";

const FONT = { fontFamily: "'Hind Siliguri', sans-serif" };

const pillars = [
  {
    id: "shahadah",
    title: "Shahadah",
    subtitle: "শাহাদাহ",
    description: "ইসলামের সাক্ষ্য ও ঈমানের ঘোষণা",
    icon: FaMosque,
    color: "emerald",
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
    color: "blue",
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
    color: "amber",
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
    color: "indigo",
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
    color: "teal",
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
    icon: FaPlayCircle,
    color: "border-red-400/20 bg-red-400/10 text-red-300",
  },
  hadith: {
    label: "হাদিস",
    icon: FaBookOpen,
    color: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  },
  dua: {
    label: "দোয়া",
    icon: FaPrayingHands,
    color: "border-violet-400/20 bg-violet-400/10 text-violet-300",
  },
};

export default function PillarsOfIslam() {
  const [expanded, setExpanded] = useState("salah");

  return (
    <section
      style={FONT}
      className="min-h-screen bg-[#081b22] px-3 py-8 text-slate-200 sm:px-6 sm:py-12 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-8 text-center sm:mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            ইসলামের পাঁচ স্তম্ভ
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            শাহাদাহ, সালাত, যাকাত, সাওম ও হজ সম্পর্কে জানুন।
            কুরআন, হাদিস, ভিডিও ও নির্ভরযোগ্য শিক্ষামূলক রিসোর্সের
            মাধ্যমে ইসলামের মৌলিক বিষয়গুলো শিখুন।
          </p>
        </div>

      {/* Pillar Selector — Compact Buttons */}
<div className="mb-7 flex flex-wrap justify-center gap-2">
  {pillars.map((pillar) => {
    const Icon = pillar.icon;
    const isActive = expanded === pillar.id;

    return (
      <button
        key={pillar.id}
        type="button"
        onClick={() => setExpanded(isActive ? "" : pillar.id)}
        aria-expanded={isActive}
        className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
          isActive
            ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-300"
            : "border-emerald-400/15 bg-[#10252d] text-slate-300 hover:border-emerald-400/40 hover:text-white"
        }`}
      >
        <Icon className="shrink-0 text-sm" />
        <span>{pillar.subtitle}</span>
        {isActive ? (
          <FaChevronUp className="text-[10px]" />
        ) : (
          <FaChevronDown className="text-[10px]" />
        )}
      </button>
    );
  })}
</div>

        {/* Shahadah */}
        {expanded === "shahadah" && (
          <article className="mb-6 overflow-hidden rounded-2xl border border-emerald-400/20 bg-[#10252d]">
            <div className="border-b border-white/10 px-4 py-4 sm:px-6">
              <p className="text-sm font-semibold text-emerald-300">
                শাহাদাহ · ঈমানের সাক্ষ্য
              </p>
            </div>

            <div className="px-4 py-6 sm:px-7 sm:py-8">
              <p
                dir="rtl"
                lang="ar"
                className="break-words text-center text-2xl font-bold leading-[2.2] text-[#e5c58e] sm:text-3xl"
              >
                {pillars[0].text}
              </p>

              <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-7 text-slate-300 sm:text-base">
                {pillars[0].meaning}
              </p>
            </div>
          </article>
        )}

        {/* Resources */}
        {pillars.map((pillar) => {
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
              className="mb-6 min-w-0 overflow-hidden rounded-2xl border border-emerald-400/20 bg-[#10252d]"
            >
              {/* Section Header */}
              <div className="border-b border-white/10 bg-white/[0.02] px-4 py-4 sm:px-6 sm:py-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-lg text-emerald-300 sm:h-12 sm:w-12">
                    <Icon />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h2 className="break-words text-lg font-bold leading-7 text-white sm:text-xl">
                      {pillar.title}
                    </h2>
                    <p className="text-sm font-medium text-emerald-300">
                      {pillar.subtitle}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-6">
                {/* Video Resources */}
                {videos.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-3 flex items-center gap-2 px-1 text-base font-bold text-white sm:mb-4">
                      <FaPlayCircle className="shrink-0 text-red-400" />
                      ভিডিও রিসোর্স
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs font-medium text-slate-400">
                        {videos.length}
                      </span>
                    </h3>

                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
                      {videos.map((resource, index) => (
                        <a
                          key={resource.url}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex min-h-[76px] min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-[#081b22]/60 p-3 transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 sm:p-4"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-400/20 bg-red-400/10 text-red-300">
                            <FaPlayCircle className="text-lg" />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block break-words text-sm font-semibold leading-6 text-slate-200 transition-colors group-hover:text-emerald-300">
                              {resource.title}
                            </span>
                            <span className="mt-1 block text-xs text-slate-500">
                              ভিডিও {index + 1}
                            </span>
                          </span>

                          <FaExternalLinkAlt className="shrink-0 text-xs text-slate-500 transition-colors group-hover:text-emerald-300" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hadith and Other Resources */}
                {otherResources.length > 0 && (
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 px-1 text-base font-bold text-white sm:mb-4">
                      <FaBookOpen className="shrink-0 text-emerald-300" />
                      হাদিস ও অন্যান্য রিসোর্স
                    </h3>

                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
                      {otherResources.map((resource) => {
                        const style = resourceStyles[resource.type];
                        const ResourceIcon = style.icon;

                        return (
                          <a
                            key={resource.url}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex min-h-[76px] min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-[#081b22]/60 p-3 transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 sm:p-4"
                          >
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${style.color}`}
                            >
                              <ResourceIcon className="text-lg" />
                            </span>

                            <span className="min-w-0 flex-1">
                              <span className="block break-words text-sm font-semibold leading-6 text-slate-200 transition-colors group-hover:text-emerald-300">
                                {resource.title}
                              </span>
                              <span className="mt-1 block text-xs text-slate-500">
                                {style.label}
                              </span>
                            </span>

                            <FaExternalLinkAlt className="shrink-0 text-xs text-slate-500 transition-colors group-hover:text-emerald-300" />
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
      </div>
    </section>
  );
}