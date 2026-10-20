import { useState } from "react";
import {

  FaPlayCircle,
  FaBook,
  FaStar,
  FaYoutube,
  FaUserTie,
  FaExternalLinkAlt,
  FaArrowRight,
} from "react-icons/fa";

const tabs = [
  { id: "videos", name: "Videos", subtitle: "ভিডিও", icon: FaPlayCircle },
  { id: "books", name: "Books", subtitle: "বই", icon: FaBook },
{ id: "names", name: "Asmaul Husna", subtitle: "আল্লাহর নাম", icon: FaStar },
];

const videos = [
  {
    id: 1,
    title: "আকীদাহ ভিডিও প্লেলিস্ট",
    speaker: "ডক্টর আবু বক্কর মুহাম্মাদ জাকারিয়া",
    videoId: "Q-SWXifqCaA", // thumbnail is generated from this ID
    link: "https://www.youtube.com/watch?v=Q-SWXifqCaA&list=PLJGZ7rO4bSMfzNG1WOgRgBTNKXzVj4tlc",
    tag: "Full Playlist", // optional
  },
  {
    id: 2,
    title: "আকীদাহ ভিডিও প্লেলিস্ট",
    speaker: "ডক্টর  ইমাম হোসাইন",
    videoId: "2XKnypZ7H40", // thumbnail is generated from this ID
    link: "https://www.youtube.com/watch?v=2XKnypZ7H40&list=PLrIXHGCtjCath5_p7NdZgfWDbcL8W3HTY",
    tag: "Full Playlist", // optional
  },
  // Add a new video by adding another object here
];

const books = [
 
  {
    id: 1,
    title: "আল-ফিকহুল আকবার",
    author: "ইমাম আবু হানিফা (রহ.)",
    link: "https://drive.google.com/file/d/1Xvrfps2vIp46DpODeshF5R-FY5SBaB32/view?usp=sharing",
  },
  {
    id: 2,
    title: "ইসলামি আকিদা",
    author: "ড. খোন্দকার আব্দুল্লাহ জাহাঙ্গীর (রহ.)",
    link: "https://drive.google.com/file/d/1WdxHqXuTUou7-QfIc3wp7VycmqTZU8zr/view?usp=drive_link",
  },

];

const names = [
  { ar: "الله", bn: "আল্লাহ", meaning: "আল্লাহ" },
  { ar: "الرحمن", bn: "আর-রাহমান", meaning: "পরম করুণাময়" },
  { ar: "الرحيم", bn: "আর-রাহীম", meaning: "অসীম দয়ালু" },
  { ar: "الملك", bn: "আল-মালিক", meaning: "সর্বময় অধিপতি" },
  { ar: "القدوس", bn: "আল-কুদ্দূস", meaning: "অতি পবিত্র" },
  { ar: "السلام", bn: "আস-সালাম", meaning: "শান্তি ও নিরাপত্তাদানকারী" },
  { ar: "المؤمن", bn: "আল-মু'মিন", meaning: "নিরাপত্তাদানকারী" },
  { ar: "المهيمن", bn: "আল-মুহাইমিন", meaning: "সর্বতত্ত্বাবধায়ক" },
  { ar: "العزيز", bn: "আল-আযীয", meaning: "মহাপরাক্রমশালী" },
  { ar: "الجبار", bn: "আল-জাব্বার", meaning: "মহাপ্রতাপশালী" },
  { ar: "المتكبر", bn: "আল-মুতাকাব্বির", meaning: "মহিমা ও শ্রেষ্ঠত্বের অধিকারী" },
  { ar: "الخالق", bn: "আল-খালিক", meaning: "সৃষ্টিকর্তা" },
  { ar: "البارئ", bn: "আল-বারি", meaning: "সৃষ্টির সূচনাকারী" },
  { ar: "المصور", bn: "আল-মুসাওয়ির", meaning: "আকৃতি দানকারী" },
  { ar: "الغفار", bn: "আল-গাফফার", meaning: "বারবার ক্ষমাকারী" },
  { ar: "القهار", bn: "আল-কাহহার", meaning: "সর্বজয়ী" },
  { ar: "الوهاب", bn: "আল-ওয়াহহাব", meaning: "মহাদাতা" },
  { ar: "الرزاق", bn: "আর-রাজ্জাক", meaning: "রিজিকদাতা" },
  { ar: "الفتاح", bn: "আল-ফাত্তাহ", meaning: "উন্মুক্তকারী ও ফয়সালাকারী" },
  { ar: "العليم", bn: "আল-আলীম", meaning: "সর্বজ্ঞ" },
  { ar: "القابض", bn: "আল-কাবিদ", meaning: "সংকুচিতকারী" },
  { ar: "الباسط", bn: "আল-বাসিত", meaning: "প্রশস্তকারী" },
  { ar: "الخافض", bn: "আল-খাফিদ", meaning: "অবনতকারী" },
  { ar: "الرافع", bn: "আর-রাফি", meaning: "উন্নতকারী" },
  { ar: "المعز", bn: "আল-মুইজ্জ", meaning: "সম্মানদাতা" },
  { ar: "المذل", bn: "আল-মুযিল্ল", meaning: "অবনতকারী" },
  { ar: "السميع", bn: "আস-সামী", meaning: "সর্বশ্রোতা" },
  { ar: "البصير", bn: "আল-বাসীর", meaning: "সর্বদ্রষ্টা" },
  { ar: "الحكم", bn: "আল-হাকাম", meaning: "চূড়ান্ত বিচারক" },
  { ar: "العدل", bn: "আল-আদল", meaning: "পরিপূর্ণ ন্যায়বিচারক" },
  { ar: "اللطيف", bn: "আল-লতীফ", meaning: "সুক্ষ্মদর্শী ও অনুগ্রহশীল" },
  { ar: "الخبير", bn: "আল-খবীর", meaning: "সর্ববিষয়ে অবহিত" },
  { ar: "الحليم", bn: "আল-হালীম", meaning: "পরম সহনশীল" },
  { ar: "العظيم", bn: "আল-আযীম", meaning: "মহামহিম" },
  { ar: "الغفور", bn: "আল-গফূর", meaning: "অত্যন্ত ক্ষমাশীল" },
  { ar: "الشكور", bn: "আশ-শাকূর", meaning: "গুণগ্রাহী ও প্রতিদানদাতা" },
  { ar: "العلي", bn: "আল-আলী", meaning: "সর্বোচ্চ মর্যাদার অধিকারী" },
  { ar: "الكبير", bn: "আল-কবীর", meaning: "সুমহান" },
  { ar: "الحفيظ", bn: "আল-হাফীয", meaning: "মহাসংরক্ষণকারী" },
  { ar: "المقيت", bn: "আল-মুকীত", meaning: "জীবিকা ও শক্তিদানকারী" },
  { ar: "الحسيب", bn: "আল-হাসীব", meaning: "হিসাব গ্রহণকারী" },
  { ar: "الجليل", bn: "আল-জালীল", meaning: "মহিমান্বিত" },
  { ar: "الكريم", bn: "আল-কারীম", meaning: "মহানুভব ও দানশীল" },
  { ar: "الرقيب", bn: "আর-রাকীব", meaning: "সর্বক্ষণ পর্যবেক্ষণকারী" },
  { ar: "المجيب", bn: "আল-মুজীব", meaning: "দোয়া কবুলকারী" },
  { ar: "الواسع", bn: "আল-ওয়াসি", meaning: "অসীম প্রাচুর্যের অধিকারী" },
  { ar: "الحكيم", bn: "আল-হাকীম", meaning: "পরম প্রজ্ঞাময়" },
  { ar: "الودود", bn: "আল-ওয়াদূদ", meaning: "পরম স্নেহশীল" },
  { ar: "المجيد", bn: "আল-মাজীদ", meaning: "মহিমান্বিত" },
  { ar: "الباعث", bn: "আল-বাইস", meaning: "পুনরুত্থানকারী" },
  { ar: "الشهيد", bn: "আশ-শাহীদ", meaning: "সর্বসাক্ষী" },
  { ar: "الحق", bn: "আল-হক", meaning: "পরম সত্য" },
  { ar: "الوكيل", bn: "আল-ওয়াকীল", meaning: "পরম নির্ভরযোগ্য অভিভাবক" },
  { ar: "القوي", bn: "আল-ক্বাওয়ী", meaning: "পরম শক্তিশালী" },
  { ar: "المتين", bn: "আল-মাতীন", meaning: "সুদৃঢ় শক্তির অধিকারী" },
  { ar: "الولي", bn: "আল-ওয়ালিয়্য", meaning: "অভিভাবক ও সাহায্যকারী" },
  { ar: "الحميد", bn: "আল-হামীদ", meaning: "সকল প্রশংসার অধিকারী" },
  { ar: "المحصي", bn: "আল-মুহসী", meaning: "সবকিছুর হিসাব সংরক্ষণকারী" },
  { ar: "المبدئ", bn: "আল-মুবদি", meaning: "প্রথমবার সৃষ্টিকারী" },
  { ar: "المعيد", bn: "আল-মুঈদ", meaning: "পুনরায় সৃষ্টিকারী" },
  { ar: "المحيي", bn: "আল-মুহয়ী", meaning: "জীবনদানকারী" },
  { ar: "المميت", bn: "আল-মুমীত", meaning: "মৃত্যুদানকারী" },
  { ar: "الحي", bn: "আল-হাইয়্য", meaning: "চিরঞ্জীব" },
  { ar: "القيوم", bn: "আল-কাইয়্যূম", meaning: "সর্বসত্তার ধারক ও রক্ষণাবেক্ষণকারী" },
  { ar: "الواجد", bn: "আল-ওয়াজিদ", meaning: "অভাবহীন ও সবকিছুর অধিকারী" },
  { ar: "الماجد", bn: "আল-মাজিদ", meaning: "অতি গৌরবময়" },
  { ar: "الواحد", bn: "আল-ওয়াহিদ", meaning: "এক ও অদ্বিতীয়" },
  { ar: "الصمد", bn: "আস-সামাদ", meaning: "অমুখাপেক্ষী, সকলের আশ্রয়" },
  { ar: "القادر", bn: "আল-কাদির", meaning: "সর্বক্ষমতাবান" },
  { ar: "المقتدر", bn: "আল-মুকতাদির", meaning: "সর্বশক্তির পূর্ণ অধিকারী" },
  { ar: "المقدم", bn: "আল-মুকাদ্দিম", meaning: "অগ্রসরকারী" },
  { ar: "المؤخر", bn: "আল-মুআখখির", meaning: "পিছিয়ে দানকারী" },
  { ar: "الأول", bn: "আল-আউয়াল", meaning: "সর্বপ্রথম" },
  { ar: "الآخر", bn: "আল-আখির", meaning: "সর্বশেষ" },
  { ar: "الظاهر", bn: "আয-যাহির", meaning: "সুস্পষ্ট ও সর্বোপরি" },
  { ar: "الباطن", bn: "আল-বাতিন", meaning: "অদৃশ্য ও অন্তর্নিহিত বিষয়ের জ্ঞাতা" },
  { ar: "الوالي", bn: "আল-ওয়ালী", meaning: "সর্বময় শাসনকর্তা" },
  { ar: "المتعالي", bn: "আল-মুতাআলী", meaning: "সকল কিছুর ঊর্ধ্বে" },
  { ar: "البر", bn: "আল-বার্র", meaning: "পরম কল্যাণকারী" },
  { ar: "التواب", bn: "আত-তাওয়াব", meaning: "তাওবা কবুলকারী" },
  { ar: "المنتقم", bn: "আল-মুনতাকিম", meaning: "ন্যায়সংগত প্রতিফলদানকারী" },
  { ar: "العفو", bn: "আল-আফুউ", meaning: "পরম ক্ষমাশীল" },
  { ar: "الرؤوف", bn: "আর-রউফ", meaning: "পরম স্নেহশীল" },
  { ar: "مالك الملك", bn: "মালিকুল মুলক", meaning: "সমগ্র রাজত্বের মালিক" },
  { ar: "ذو الجلال والإكرام", bn: "যুল-জালালি ওয়াল-ইকরাম", meaning: "মহিমা ও সম্মানের অধিকারী" },
  { ar: "المقسط", bn: "আল-মুকসিত", meaning: "ন্যায়বিচার প্রতিষ্ঠাকারী" },
  { ar: "الجامع", bn: "আল-জামি", meaning: "একত্রকারী" },
  { ar: "الغني", bn: "আল-গনিয়্য", meaning: "অমুখাপেক্ষী ও অভাবহীন" },
  { ar: "المغني", bn: "আল-মুগনী", meaning: "সমৃদ্ধিদানকারী" },
  { ar: "المانع", bn: "আল-মানি", meaning: "প্রতিরোধকারী" },
  { ar: "الضار", bn: "আদ-দার", meaning: "নিজ হিকমত অনুযায়ী ক্ষতি ঘটতে দেওয়ার ক্ষমতার অধিকারী" },
  { ar: "النافع", bn: "আন-নাফি", meaning: "উপকারদানকারী" },
  { ar: "النور", bn: "আন-নূর", meaning: "আলোদাতা" },
  { ar: "الهادي", bn: "আল-হাদী", meaning: "পথপ্রদর্শক" },
  { ar: "البديع", bn: "আল-বাদী", meaning: "অতুলনীয় সৃষ্টির উদ্ভাবক" },
  { ar: "الباقي", bn: "আল-বাকী", meaning: "চিরস্থায়ী" },
  { ar: "الوارث", bn: "আল-ওয়ারিস", meaning: "সবকিছুর চূড়ান্ত উত্তরাধিকারী" },
  { ar: "الرشيد", bn: "আর-রশীদ", meaning: "সঠিক পথনির্দেশক" },
  { ar: "الصبور", bn: "আস-সবূর", meaning: "পরম ধৈর্যশীল" },
];

const ImanAqeedah = () => {
  const [active, setActive] = useState("videos");

  return (
    <section className="min-h-screen bg-gradient-to-b from-emerald-50/60 via-white to-white px-3 py-10 text-slate-800 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-6xl">
       {/* Heading */}
<div className="mb-8 text-center sm:mb-10">
  

  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
    আকিদা ও ঈমান
  </h1>

  <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
    ইসলামী বিশ্বাসের মৌলিক বিষয়গুলো জানুন, বিশুদ্ধ আকিদা অর্জন করুন এবং
    কুরআন ও সুন্নাহর আলোকে নিজের ঈমানকে আরও দৃঢ় করুন।
  </p>
</div>

        {/* Tabs */}
        <div className="mx-auto mb-10 flex w-fit max-w-full flex-wrap justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm sm:mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                aria-pressed={isActive}
                className={`flex min-h-11 items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all sm:px-6 ${
                  isActive
                    ? "bg-emerald-700 text-white shadow-md shadow-emerald-700/25"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
                }`}
              >
                <Icon className="text-base" />
                <span>{tab.name}</span>
                <span className="hidden text-xs opacity-75 sm:inline">
                  ({tab.subtitle})
                </span>
              </button>
            );
          })}
        </div>

        {/* Videos */}
        {active === "videos" && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <a
                key={video.id}
                href={video.link}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-700/10"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <img
                    src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                    alt={video.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-2xl text-white shadow-xl transition-transform group-hover:scale-110">
                      <FaYoutube />
                    </span>
                  </div>
                  {video.tag && (
                    <span className="absolute bottom-3 left-3 rounded-md bg-black/70 px-2.5 py-1 text-xs font-semibold text-white">
                      {video.tag}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h2 className="text-base font-bold leading-snug text-slate-900 sm:text-lg">
                    {video.title}
                  </h2>
                  <p className="flex items-center gap-2 text-sm text-slate-600">
                    <FaUserTie className="text-emerald-700" />
                    {video.speaker}
                  </p>
                  <span className="mt-auto inline-flex w-fit items-center gap-2 text-sm font-semibold text-emerald-700 group-hover:text-emerald-900">
                    YouTube-এ দেখুন
                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Books */}
        {active === "books" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {books.map((book, i) => (
              <article
                key={book.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-700/10 sm:p-6"
              >
                <span className="absolute right-4 top-3 text-sm font-semibold text-slate-200">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-700 transition-colors group-hover:bg-emerald-700 group-hover:text-white">
                  <FaBook />
                </div>
                <h2 className="pr-6 text-lg font-bold leading-snug text-slate-900">
                  {book.title}
                </h2>
                <p className="mt-1.5 flex-1 text-sm leading-6 text-slate-600">
                  {book.author}
                </p>
                <a
                  href={book.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-900"
                >
                  পড়ুন / ডাউনলোড
                  <FaExternalLinkAlt className="text-xs" />
                </a>
              </article>
            ))}
          </div>
        )}

        {/* Names of Allah */}
        {active === "names" && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {names.map((name, i) => (
              <div
                key={name.bn}
                className="group relative overflow-hidden rounded-xl  border border-slate-200 bg-white px-3 py-5 text-center transition-all hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-700/20"
              >
                <span className="absolute left-2 top-1.5 text-[10px] font-semibold text-slate-300 group-hover:text-emerald-200">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className="text-2xl font-bold  text-emerald-700 transition-colors group-hover:text-white"
                  dir="rtl"
                >
                  {name.ar}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900 transition-colors group-hover:text-white">
                  {name.bn}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 transition-colors group-hover:text-emerald-100">
                  {name.meaning}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ImanAqeedah;