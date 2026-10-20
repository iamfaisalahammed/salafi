
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

const pillars = [
  {
    id: "shahadah",
    title: "Shahadah",
    subtitle: "শাহাদাহ",
    description: "ইসলামের সাক্ষ্য ও ঈমানের ঘোষণা",
    icon: FaMosque,
    color: "emerald",
    text:
      "لَا إِلَٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ",
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
    color: "text-red-600 bg-red-50",
  },
  hadith: {
    label: "হাদিস",
    icon: FaBookOpen,
    color: "text-emerald-700 bg-emerald-50",
  },
  dua: {
    label: "দোয়া",
    icon: FaPrayingHands,
    color: "text-violet-700 bg-violet-50",
  },
};

export default function PillarsOfIslam() {
  const [expanded, setExpanded] = useState("salah");

  return (
    <section className="min-h-screen bg-gradient-to-b from-emerald-50/60 via-white to-white px-3 py-10 text-slate-800 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-9 text-center sm:mb-12">
          

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            ইসলামের পাঁচ স্তম্ভ
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            শাহাদাহ, সালাত, যাকাত, সাওম ও হজ সম্পর্কে জানুন।
            কুরআন, হাদিস, ভিডিও ও নির্ভরযোগ্য শিক্ষামূলক রিসোর্সের
            মাধ্যমে ইসলামের মৌলিক বিষয়গুলো শিখুন।
          </p>
        </div>

       {/* Five Pillars */}
<div className="mb-8 flex flex-wrap justify-center gap-2.5">
  {pillars
    .filter((pillar) => pillar.id !== "dua")
    .map((pillar) => {
      const Icon = pillar.icon;
      const isActive = expanded === pillar.id;
      return (
        <button
          key={pillar.id}
          type="button"
          onClick={() => setExpanded(isActive ? "" : pillar.id)}
          aria-expanded={isActive}
          className={`group flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-4 text-left transition-all duration-200 ${
            isActive
              ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
          }`}
        >
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm transition-colors ${
              isActive
                ? "bg-white/20 text-white"
                : "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100"
            }`}
          >
            <Icon />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">{pillar.title}</span>
            <span
              className={`text-[11px] ${
                isActive ? "text-emerald-100" : "text-slate-400"
              }`}
            >
              {pillar.subtitle}
            </span>
          </span>
          <span
            className={`ml-1 text-[10px] ${
              isActive ? "text-white" : "text-slate-400"
            }`}
          >
            {isActive ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </button>
      );
    })}
</div>

        {/* Shahadah */}
        {expanded === "shahadah" && (
          <article className="mb-6 rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-8">
            <p className="mb-3 text-sm font-semibold text-emerald-700">
              শাহাদাহ · ঈমানের সাক্ষ্য
            </p>

            <p
              dir="rtl"
              className="text-center text-2xl font-bold leading-loose text-emerald-800 sm:text-3xl"
            >
              {pillars[0].text}
            </p>

            <p className="mt-4 text-center text-sm leading-7 text-slate-600 sm:text-base">
              {pillars[0].meaning}
            </p>
          </article>
        )}

        {/* Resources */}
        {pillars.filter((pillar) => pillar.id !== "dua").map((pillar) => {
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
              className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="border-b border-slate-100 bg-emerald-50/60 px-5 py-5 sm:px-7">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-xl text-white">
                    <Icon />
                  </span>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                      {pillar.title}
                      <span className="ml-2 text-sm font-medium text-emerald-700">
                        {pillar.subtitle}
                      </span>
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                {videos.length > 0 && (
                  <div className="mb-7">
                    <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900">
                      <FaPlayCircle className="text-red-600" />
                      ভিডিও রিসোর্স
                      <span className="text-xs font-medium text-slate-400">
                        ({videos.length})
                      </span>
                    </h3>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {videos.map((resource, index) => (
                        <a
                          key={resource.url}
                          href={resource.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition-colors hover:border-emerald-300 hover:bg-emerald-50/50"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                            <FaPlayCircle className="text-lg" />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold leading-6 text-slate-800 group-hover:text-emerald-800">
                              {resource.title}
                            </span>
                            <span className="mt-1 block text-xs text-slate-500">
                              ভিডিও {index + 1}
                            </span>
                          </span>

                          <FaExternalLinkAlt className="shrink-0 text-xs text-slate-400" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {otherResources.length > 0 && (
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900">
                      <FaBookOpen className="text-emerald-700" />
                      হাদিস ও অন্যান্য রিসোর্স
                    </h3>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {otherResources.map((resource) => {
                        const style = resourceStyles[resource.type];
                        const ResourceIcon = style.icon;

                        return (
                          <a
                            key={resource.url}
                            href={resource.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition-colors hover:border-emerald-300 hover:bg-emerald-50/50"
                          >
                            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${style.color}`}>
                              <ResourceIcon className="text-lg" />
                            </span>

                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-semibold leading-6 text-slate-800 group-hover:text-emerald-800">
                                {resource.title}
                              </span>
                              <span className="mt-1 block text-xs text-slate-500">
                                {style.label}
                              </span>
                            </span>

                            <FaExternalLinkAlt className="shrink-0 text-xs text-slate-400" />
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
