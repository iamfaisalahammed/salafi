
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaClockRotateLeft,
  FaYoutube,
  FaMapLocationDot,
  FaArrowUpRightFromSquare,
  FaChevronDown,
  FaLandmark,
 
  FaXmark,
  FaPlay,
} from "react-icons/fa6";

const periods = [
  {
    id: "rashidun",
    title: "খুলাফায়ে রাশেদীন",
    subtitle: "The Rashidun Caliphate",
    period: "৬৩২–৬৬১ খ্রি.",
    icon: "01",
    description:
      "রাসুলুল্লাহ ﷺ-এর ইন্তেকালের পর পরামর্শভিত্তিক সুপথপ্রাপ্ত চার খলিফা ও হাসান (রা.)-এর শাসনকাল।",
    rulers: [
      {
        name: "আবু বকর আস-সিদ্দিক (রা.)",
        date: "৬৩২–৬৩৪ খ্রি.",
        detail:
          "প্রথম খলিফা। রিদ্দার যুদ্ধ পরিচালনা করে উম্মাহর ঐক্য রক্ষা করেন এবং কুরআনের প্রথম সার্বিক পাণ্ডুলিপি সংকলন শুরু করেন।"
      },
      {
        name: "উমর ইবনুল খাত্তাব (রা.)",
        date: "৬৩৪–৬৪৪ খ্রি.",
        detail:
          "দ্বিতীয় খলিফা। পারস্য ও বাইজেন্টাইন ভূখণ্ড জয় করে রাষ্ট্রের সীমা বৃদ্ধি করেন, দেওয়ানি প্রশাসনিক ব্যবস্থা ও হিজরী সন চালু করেন।"
      },
      {
        name: "উসমান ইবনু আফফান (রা.)",
        date: "৬৪৪–৬৫৬ খ্রি.",
        detail:
          "তৃতীয় খলিফা। প্রথম মুসলিম নৌবাহিনী গঠন করেন এবং পবিত্র কুরআনের প্রমিত সংস্করণ (মুসহাফে উসমানী) তৈরি করে বিভিন্ন অঞ্চলে বিতরণ করেন।"
      },
      {
        name: "আলী ইবনু আবি তালিব (রা.)",
        date: "৬৫৬–৬৬১ খ্রি.",
        detail:
          "চতুর্থ খলিফা। রাজধানী কূফায় স্থানান্তর করেন এবং প্রথম ফিটনার সময়কালের জটিল রাজনৈতিক পরিস্থিতি সামাল দেন।"
      },
      {
        name: "হাসান ইবনু আলী (রা.)",
        date: "৬৬১ খ্রি.",
        detail:
          "পঞ্চম রাশেদ খলিফা। গৃহযুদ্ধ অবসানের লক্ষ্যে মুয়াবিয়া (রা.)-এর সাথে শান্তিচুক্তি করে স্বেচ্ছায় ক্ষমতা হস্তান্তর করেন।"
      }
    ]
  },
  {
    id: "umayyad",
    title: "উমাইয়া খেলাফত",
    subtitle: "The Umayyad Caliphate",
    period: "৬৬১–৭৫০ খ্রি.",
    icon: "02",
    description:
      "দামেস্ককে কেন্দ্র করে পরিচালিত রাজতান্ত্রিক খেলাফত। এ সময় প্রশাসনিক আরবীকরণ ঘটে এবং শাসন স্পেন থেকে সিন্ধু পর্যন্ত বিস্তৃত হয়।",
    rulers: [
      {
        name: "মুয়াবিয়া ইবনু আবি সুফিয়ান",
        date: "৬৬১–৬৮০ খ্রি.",
        detail:
          "উমাইয়া শাসনব্যবস্থার প্রতিষ্ঠাতা। তিনি দামেস্ককে রাজনৈতিক কেন্দ্রে পরিণত করেন এবং ডাক ও গোয়েন্দা ব্যবস্থা (বারীদ) প্রবর্তন করেন।"
      },
      {
        name: "আবদুল মালিক ইবনু মারওয়ান",
        date: "৬৮৫–৭০৫ খ্রি.",
        detail:
          "প্রশাসনিক কাজের ভাষা আরবীকরণ করেন, প্রথম স্বতন্ত্র ইসলামী দিনার ও দিরহাম মুদ্রা চালু করেন এবং কুব্বাতুস সাখরা নির্মাণ করেন।"
      },
      {
        name: "আল-ওয়ালিদ ইবনু আবদুল মালিক",
        date: "৭০৫–৭১৫ খ্রি.",
        detail:
          "তাঁর শাসনামলে স্পেন (আল-আন্দালুস), সিন্ধু ও মধ্য এশিয়া বিজয়ের মাধ্যমে উমাইয়া রাষ্ট্রের ভৌগোলিক বিস্তার সর্বোচ্চ শিখরে পৌঁছায়।"
      },
      {
        name: "উমর ইবনু আবদুল আজিজ",
        date: "৭১৭–৭২০ খ্রি.",
        detail:
          "পঞ্চম রাশেদ খলিফা হিসেবে পরিচিত। মাওয়ালীদের উপর কর তুলে নেন, অপচয় বন্ধ করেন এবং ন্যায়বিচার পুনঃপ্রতিষ্ঠা করেন।"
      },
      {
        name: "হিশাম ইবনু আবদুল মালিক",
        date: "৭২৪–৭৪৩ খ্রি.",
        detail:
          "দীর্ঘমেয়াদী সুশাসক যিনি উমাইয়া বংশের অর্থনৈতিক স্থায়িত্ব রক্ষা করেন এবং অভ্যন্তরীণ বিদ্রোহ নিয়ন্ত্রণ করেন।"
      },
      {
        name: "মারওয়ান ইবনু মুহাম্মদ (মারওয়ান ২য়)",
        date: "৭৪৪–৭৫০ খ্রি.",
        detail:
          "শেষ উমাইয়া খলিফা। জাব নদীর যুদ্ধে আব্বাসীয় বিপ্লবী বাহিনীর কাছে পরাজিত হলে উমাইয়া শাসনের পতন ঘটে।"
      }
    ]
  },
  {
    id: "abbasid",
    title: "আব্বাসীয় খেলাফত",
    subtitle: "The Abbasid Caliphate",
    period: "৭৫০–১২৫৮ খ্রি.",
    icon: "03",
    description:
      "বাগদাদকেন্দ্রিক আব্বাসীয় যুগ জ্ঞানচর্চা, বিজ্ঞান, দর্শন ও অনুবাদ শিল্পের বৈশ্বিক বিকাশ এবং 'ইসলামী স্বর্ণযুগ'-এর জন্য পরিচিত।",
    rulers: [
      {
        name: "আবুল আব্বাস আস-সাফফাহ",
        date: "৭৫০–৭৫৪ খ্রি.",
        detail:
          "আব্বাসীয় খেলাফতের প্রথম খলিফা যিনি উমাইয়া শাসনের অবসান ঘটিয়ে নতুন বংশের পত্তন করেন।"
      },
      {
        name: "আবু জাফর আল-মানসুর",
        date: "৭৫৪–৭৭৫ খ্রি.",
        detail:
          "আব্বাসীয় সাম্রাজ্যের মূল স্থপতি। তিনি ৭৬২ খ্রিস্টাব্দে ঐতিহাসিক গোলাকার নগরী বাগদাদ (মদিনাতুস সালাম) প্রতিষ্ঠা করেন।"
      },
      {
        name: "হারুনুর রশীদ",
        date: "৭৮৬–৮০৯ খ্রি.",
        detail:
          "আব্বাসীয় ইতিহাসের স্বর্ণযুগের খলিফা। তাঁর সময়ে বাগদাদ বিশ্বের ধনসম্পদ, জ্ঞান ও বাণিজ্যের কেন্দ্রে পরিণত হয়।"
      },
      {
        name: "আল-মামুন",
        date: "৮১৩–৮৩৩ খ্রি.",
        detail:
          "বাইতুল হিকমাহ-র ব্যাপক বিস্তার ঘটিয়ে বিজ্ঞান, দর্শন ও বিদেশি পাণ্ডুলিপি অনুবাদের ক্ষেত্রে অসামান্য অবদান রাখেন।"
      },
      {
        name: "আল-মু'তাসিম",
        date: "৮৩৩–৮৪২ খ্রি.",
        detail:
          "তুর্কি মামলুক সৈন্য সমন্বয়ে বাহিনী গঠন করেন এবং সামাররা নগরী প্রতিষ্ঠা করে সেখানে রাজধানী স্থানান্তর করেন।"
      },
      {
        name: "আল-মুতাওয়াক্কিল",
        date: "৮৪৭–৮৬১ খ্রি.",
        detail:
          "রাষ্ট্রীয় মিহনা পরীক্ষা নীতির অবসান ঘটিয়ে অর্থোডক্স সুন্নি আলেম ও মতবাদকে রাষ্ট্রীয়ভাবে পুনর্বাসিত করেন।"
      },
      {
        name: "আন-নাসির লি-দ্বীনিল্লাহ",
        date: "১১৮০–১২২৫ খ্রি.",
        detail:
          "সেলজুকদের পতনের পর দীর্ঘ ৪৫ বছরের শাসনে আব্বাসীয় রাজনৈতিক কর্তৃত্ব পুনরুজ্জীবিত করেন।"
      },
      {
        name: "আল-মুস্তা'সিম বিল্লাহ",
        date: "১২৪২–১২৫৮ খ্রি.",
        detail:
          "বাগদাদের শেষ আব্বাসীয় খলিফা। ১২৫৮ সালে মঙ্গোল সেনাপতি হালাকু খানের আক্রমণে বাগদাদ ধ্বংসের সাথে তিনি নিহত হন।"
      }
    ]
  },
  {
    id: "ottoman",
    title: "উসমানীয় খেলাফত",
    subtitle: "The Ottoman Empire",
    period: "১২৯৯–১৯২৪ খ্রি.",
    icon: "04",
    description:
      "তিন মহাদেশ জুড়ে বিস্তৃত উসমানীয় সাম্রাজ্য। ১৫১৭ সালে কায়রো জয়ের পর এটি সুন্নি বিশ্বের প্রধান প্রাতিষ্ঠানিক খেলাফতে রূপান্তরিত হয়।",
    rulers: [
      {
        name: "উসমান গাজী",
        date: "১২৯৯–১৩২৬ খ্রি.",
        detail:
          "উত্তর-পশ্চিম আনাটোলিয়ায় উসমানীয় বংশ ও স্বাধীন বেয়লিকের প্রতিষ্ঠাতা।"
      },
      {
        name: "দ্বিতীয় মুহাম্মদ (আল-ফাতিহ)",
        date: "১৪৫১–১৪৮১ খ্রি.",
        detail:
          "১৪৫৩ সালে বিজয়ী বেশে কনস্টান্টিনোপল জয় করে বাইজেন্টাইন সাম্রাজ্যের অবসান ঘটান এবং শহরটির নাম ইস্তাম্বুল রাখেন।"
      },
      {
        name: "প্রথম সোলিম (ইয়াভুজ)",
        date: "১৫১২–১৫২০ খ্রি.",
        detail:
          "১৫১৭ সালে মিসর জয় করে উসমানীয় সুলতানদের জন্য আনুষ্ঠানিকভাবে সর্বজনীন খেলাফতের মর্যাদা অর্জন করেন।"
      },
      {
        name: "সুলতান সুলায়মান (আল-কানুনী)",
        date: "১৫২০–১৫৬৬ খ্রি.",
        detail:
          "উসমানীয় সাম্রাজ্যের সুবর্ণ যুগ। ইউরোপে সামরিক বিস্তার এবং পুরো সাম্রাজ্যের জন্য সুনির্দিষ্ট কানুন সংহিতা তৈরি করেন।"
      },
      {
        name: "দ্বিতীয় আবদুল হামিদ",
        date: "১৮৭৬–১৯০৯ খ্রি.",
        detail:
          "প্রথম উসমানীয় সংবিধান চালু করেন, প্যান-ইসলামিক নীতি গ্রহণ করেন এবং বিখ্যাত হিজাজ রেলওয়ে প্রকল্প পরিচালনা করেন।"
      },
      {
        name: "দ্বিতীয় আবদুল মজিদ",
        date: "১৯২২–১৯২৪ খ্রি.",
        detail:
          "সুলতানাত বিলুপ্তির পর নির্বাচিত শেষ ধর্মীয় খলিফা। ১৯২৪ সালের ৩ মার্চ তুরস্কে খেলাফত বিলুপ্ত করা হয়।"
      }
    ]
  }
];

const videoTopics = [
  {
    title: "শরিয়া শাসন নিয়ে ভুল ধারণা",
    description: "সিরিয়ার শাসনব্যবস্থা নিয়ে প্রচলিত ধারণা ও আলোচনা।",
    url: "https://youtu.be/HtyJKPQcHps",
  },
  {
    title: "গণতন্ত্রের মাধ্যমে কি ইসলামী শাসন প্রতিষ্ঠা সম্ভব?",
    description: "গণতন্ত্র ও ইসলামী শাসনব্যবস্থা নিয়ে আলোচনা।",
    url: "https://youtu.be/ZArJIkjk198",
  },
  {
    title: "গণতন্ত্রের চেয়ে ইসলামী শাসনব্যবস্থা কেন উত্তম?",
    description:
      "গণতন্ত্র ও ইসলামী শাসনব্যবস্থার মূলনীতি, পার্থক্য এবং এ বিষয়ে ইসলামী দৃষ্টিভঙ্গি নিয়ে আলোচনা।",
    url: "https://youtu.be/esuw7afEcbA",
  },
  {
    title: "ইসলামী খেলাফত ব্যবস্থার মূলনীতি",
    description: "ইসলামী খেলাফত ব্যবস্থার মূলনীতি নিয়ে আলোচনা।",
    url: "https://youtu.be/Hx-q_lPqIzE",
  },
  {
    title: "খেলাফত বিষয়ক আলোচনা",
    description: "খেলাফত সম্পর্কে আরও একটি ভিডিও আলোচনা।",
    url: "https://youtu.be/vxp1uKGM_nE",
  },
  {
    title: "খেলাফত কীভাবে প্রতিষ্ঠিত হবে?",
    description: "খেলাফত প্রতিষ্ঠার ধারণা ও পদ্ধতি নিয়ে আলোচনা।",
    url: "https://youtu.be/Aef1-D_WTQs",
  },
  {
    title: "আবু বকর (রা.)-এর খেলাফত",
    description:
      "প্রথম খলিফা আবু বকর (রা.)-এর জীবন ও খেলাফত সম্পর্কে আলোচনা।",
    url: "https://youtu.be/xTxZsR8WUbk",
  },
  {
    title: "উমর (রা.)-এর খেলাফত",
    description:
      "দ্বিতীয় খলিফা উমর ইবনুল খাত্তাব (রা.)-এর শাসনকাল ও ইতিহাস।",
    url: "https://youtu.be/0d3Tl87M5pQ",
  },
  {
    title: "উসমান (রা.)-এর খেলাফত",
    description:
      "তৃতীয় খলিফা উসমান ইবনু আফফান (রা.)-এর খেলাফত নিয়ে আলোচনা।",
    url: "https://youtu.be/z_HBdXa1FC8",
  },
  {
    title: "আলী (রা.)-এর খেলাফত",
    description:
      "চতুর্থ খলিফা আলী ইবনু আবি তালিব (রা.)-এর শাসনকাল ও ঐতিহাসিক ঘটনা।",
    url: "https://youtu.be/xESGtMNIhls",
  },
  {
    title: "মুয়াবিয়া থেকে উসমানীয় যুগ",
    description:
      "মুয়াবিয়া (রা.)-এর সময় থেকে উসমানীয় যুগ পর্যন্ত ইতিহাসের ধারাবাহিকতা।",
    url: "https://youtu.be/Fn2pjjHoeuY",
  },
  {
    title: "ইসলামের খেলাফতের ইতিহাস",
    description:
      "ইসলামী খেলাফতের বিভিন্ন যুগ ও ঐতিহাসিক ধারাবাহিকতা।",
    url: "https://youtu.be/61a99BKT9r8",
  },
];

const getVideoId = (url) => {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1);
    }

    if (
      parsedUrl.hostname.includes("youtube.com") ||
      parsedUrl.hostname.includes("youtube-nocookie.com")
    ) {
      if (parsedUrl.pathname === "/watch") {
        return parsedUrl.searchParams.get("v");
      }

      const match = parsedUrl.pathname.match(
        /^\/(?:embed|shorts)\/([^/]+)/
      );

      return match?.[1] || null;
    }

    return null;
  } catch {
    return null;
  }
};

const mapLinks = [
  {
    title: "Muslim Map",
    description: "বিশ্বের মুসলিম জনসংখ্যা ও দেশভিত্তিক মানচিত্র দেখুন।",
    path: "/tools/muslim-map",
    icon: FaMapLocationDot,
  },
  {
    title: "Khilafah Atlas",
    description: "ইসলামী খেলাফতের ইতিহাস ও ভৌগোলিক বিস্তার ম্যাপে দেখুন।",
    path: "/tools/khilafah-atlas",
    icon: FaLandmark,
  },
];

const tabs = [
  { id: "timeline", label: "Timeline", icon: FaClockRotateLeft },
  { id: "video", label: "Video", icon: FaYoutube },
  { id: "map", label: " Map", icon: FaMapLocationDot },
];

export default function IslamicCaliphate() {
  const [activeTab, setActiveTab] = useState("timeline");
  const [expandedPeriod, setExpandedPeriod] = useState("rashidun");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setShowVideoPlayer(false);
  };

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setShowVideoPlayer(false);
  };

  const videoId = selectedVideo
    ? getVideoId(selectedVideo.url)
    : null;

  return (
    <main className="min-h-screen bg-[#081b22] pb-12 text-slate-200">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <header className="mb-7">
         

          <h1 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            ইসলামী খেলাফত
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            ইসলামী খেলাফতের ইতিহাস, গুরুত্বপূর্ণ শাসক, ঐতিহাসিক সময়রেখা
            এবং মুসলিম সভ্যতার বিভিন্ন অধ্যায় সম্পর্কে জানুন।
          </p>
        </header>

        <nav
          aria-label="ইসলামী খেলাফত বিভাগ"
          className="mb-8 grid grid-cols-3 gap-2 rounded-2xl border border-[#dfbd7b]/20 bg-[#10252d] p-2"
        >
          {tabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                aria-pressed={isActive}
                className={`flex min-h-16 flex-col items-center justify-center gap-2 rounded-xl px-1 py-3 text-xs font-semibold transition-colors sm:flex-row sm:text-sm ${
                  isActive
                    ? "bg-[#dfbd7b] text-[#081b22] shadow-sm"
                    : "text-slate-300 hover:bg-[#dfbd7b]/10 hover:text-[#dfbd7b]"
                }`}
              >
                <Icon className="text-base sm:text-lg" />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        {activeTab === "timeline" && (
          <section aria-label="খেলাফতের সময়রেখা">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-100">
                ঐতিহাসিক সময়রেখা
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                প্রতিটি যুগ খুলে শাসক ও উল্লেখযোগ্য ঘটনা দেখুন।
              </p>
            </div>

            <div className="space-y-4">
              {periods.map((period) => {
                const isExpanded = expandedPeriod === period.id;

                return (
                  <article
                    key={period.id}
                    className={`overflow-hidden rounded-2xl border transition-colors ${
                      isExpanded
                        ? "border-[#dfbd7b]/40 bg-[#10252d]"
                        : "border-[#dfbd7b]/15 bg-[#10252d]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedPeriod(isExpanded ? "" : period.id)
                      }
                      aria-expanded={isExpanded}
                      className="flex w-full items-center gap-4 p-4 text-left sm:p-5"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#dfbd7b]/10 text-sm font-bold text-[#dfbd7b]">
                        {period.icon}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block font-bold text-slate-100">
                          {period.title}
                        </span>
                        <span className="mt-1 block text-xs text-slate-400">
                          {period.subtitle}
                        </span>
                        <span className="mt-2 inline-block rounded-md bg-white/5 px-2 py-1 text-xs font-medium text-slate-300">
                          {period.period}
                        </span>
                      </span>

                      <FaChevronDown
                        className={`shrink-0 text-sm text-slate-400 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="border-t border-white/10 px-4 pb-5 pt-4 sm:px-5">
                        <p className="mb-5 text-sm leading-7 text-slate-300">
                          {period.description}
                        </p>

                        <div className="space-y-0">
                          {period.rulers.map((ruler, index) => (
                            <div
                              key={`${period.id}-${ruler.name}`}
                              className="relative flex gap-3 pb-5 last:pb-0"
                            >
                              <div className="flex w-4 shrink-0 flex-col items-center">
                                <span className="mt-1.5 h-3 w-3 rounded-full border-2 border-[#dfbd7b] bg-[#10252d]" />

                                {index !== period.rulers.length - 1 && (
                                  <span className="mt-1 w-px flex-1 bg-[#dfbd7b]/20" />
                                )}
                              </div>

                              <div className="min-w-0 flex-1 pb-1">
                                <p className="font-semibold text-slate-200">
                                  {ruler.name}
                                </p>
                                <p className="mt-1 text-xs font-medium text-[#dfbd7b]">
                                  {ruler.date}
                                </p>
                                <p className="mt-2 text-sm leading-7 text-slate-300">
                                  {ruler.detail}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

           
          </section>
        )}

        {activeTab === "video" && (
          <section aria-label="খেলাফতের ইতিহাসের ভিডিও">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-100">
                ভিডিও লাইব্রেরি
              </h2>
              <p className="mt-1 text-sm leading-7 text-slate-400">
                পছন্দের ভিডিওতে ক্লিক করে মডালের মধ্যে প্রিভিউ দেখুন।
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {videoTopics.map((video) => (
                <button
                  key={video.url}
                  type="button"
                  onClick={() => openVideoModal(video)}
                  className="group flex w-full items-start gap-4 rounded-2xl border border-[#dfbd7b]/20 bg-[#10252d] p-4 text-left transition-colors hover:border-[#dfbd7b]/50 hover:bg-[#dfbd7b]/10 focus:outline-none focus:ring-2 focus:ring-[#dfbd7b]/60 sm:p-5"
                  aria-label={`${video.title} সম্পর্কে বিস্তারিত দেখুন`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#dfbd7b]/10 text-lg text-[#dfbd7b] transition-colors group-hover:bg-[#dfbd7b]/20">
                    <FaYoutube />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-slate-100">
                      {video.title}
                    </span>

                    <span className="mt-2 block text-sm leading-6 text-slate-300">
                      {video.description}
                    </span>

                    <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#dfbd7b]">
                      বিস্তারিত দেখুন
                      <FaArrowUpRightFromSquare />
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-3 backdrop-blur-sm sm:p-4"
            onClick={closeVideoModal}
            role="presentation"
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="video-modal-title"
              className="my-auto w-full max-w-lg rounded-2xl border border-[#dfbd7b]/25 bg-[#10252d] p-4 shadow-2xl sm:p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#dfbd7b]/10 text-xl text-[#dfbd7b]">
                  <FaYoutube />
                </span>

                <div className="min-w-0 flex-1">
                  <h2
                    id="video-modal-title"
                    className="font-bold leading-6 text-slate-100"
                  >
                    {selectedVideo.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {selectedVideo.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeVideoModal}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="মডাল বন্ধ করুন"
                >
                  <FaXmark />
                </button>
              </div>

              {/* YouTube Thumbnail / Player */}
              <div className="mb-4 overflow-hidden rounded-xl border border-white/10 bg-black">
                {videoId ? (
                  !showVideoPlayer ? (
                    <button
                      type="button"
                      onClick={() => setShowVideoPlayer(true)}
                      className="group relative block w-full"
                      aria-label="ভিডিও চালু করুন"
                    >
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt={selectedVideo.title}
                        className="aspect-video w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                        }}
                      />

                      <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition group-hover:bg-black/40">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-xl text-white shadow-lg transition group-hover:scale-110">
                          <FaPlay />
                        </span>
                      </span>
                    </button>
                  ) : (
                    <iframe
                      key={videoId}
                      className="aspect-video w-full"
                      src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
                      title={selectedVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  )
                ) : (
                  <div className="flex aspect-video items-center justify-center p-4 text-center text-sm text-slate-400">
                    এই ভিডিওর লিংকটি সঠিক নয়।
                  </div>
                )}
              </div>

              {!showVideoPlayer && (
                <p className="mb-4 text-sm leading-6 text-slate-400">
                  ভিডিও দেখতে উপরের Play বাটনে ক্লিক করুন।
                </p>
              )}

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeVideoModal}
                  className="min-h-11 rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/5"
                >
                  বন্ধ করুন
                </button>

                <a
                  href={selectedVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#dfbd7b] px-4 py-2 text-sm font-semibold text-[#081b22] transition hover:bg-[#e8cb96]"
                >
                  <FaPlay className="text-xs" />
                  YouTube-এ দেখুন
                  <FaArrowUpRightFromSquare className="text-xs" />
                </a>
              </div>
            </section>
          </div>
        )}

        {activeTab === "map" && (
          <section aria-label="আমার ম্যাপ">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-100"> Map
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-300">
                আপনার তৈরি করা ম্যাপগুলো সরাসরি খুলুন। এখানে নতুন করে
                ম্যাপ তৈরি করা হচ্ছে না।
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {mapLinks.map((map) => {
                const Icon = map.icon;

                return (
                  <div
                    key={map.title}
                    className="rounded-2xl border border-[#dfbd7b]/20 bg-[#10252d] p-5"
                  >
                    <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#dfbd7b]/10 text-xl text-[#dfbd7b]">
                      <Icon />
                    </span>

                    <h3 className="font-bold text-slate-100">
                      {map.title}
                    </h3>

                    <p className="mt-2 min-h-12 text-sm leading-6 text-slate-300">
                      {map.description}
                    </p>

                    <Link
                      to={map.path}
                      className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#dfbd7b] px-4 py-2 text-sm font-semibold text-[#081b22] transition-colors hover:bg-[#e8cb96]"
                    >
                      ম্যাপ খুলুন
                      <FaArrowUpRightFromSquare className="text-xs" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
