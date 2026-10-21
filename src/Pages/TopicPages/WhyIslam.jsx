
import { useMemo, useState } from "react";
import {
  FaPlay,
  FaBookOpen,
  FaSearch,
  FaArrowRight,
  FaExternalLinkAlt,
  FaYoutube,
  FaGlobe,
  FaQuestionCircle,
  FaCheckCircle,
  FaCompass,
} from "react-icons/fa";

const categories = [
  { id: "all", label: "সব রিসোর্স", icon: FaCompass },
  { id: "God Exist", label: "ডাজ গড এগজিস্ট?", icon: FaGlobe },
  { id: "proofs", label: "ইসলামের প্রমাণ", icon: FaCheckCircle },
  { id: "questions", label: "সাধারণ প্রশ্ন", icon: FaQuestionCircle },
];

const videos = [
 {
  id: 1,
  title: "Does God Exist? — স্রষ্টা কি আছেন?",
  category: "God Exist",
  videoId: "pythOMyPcHw",
  link: "https://www.youtube.com/live/pythOMyPcHw?si=NsaSPnZ72TRmNBbJ",
  type: "video",
},
{
  id: 2,
  title: "Does God Exist? — স্রষ্টার অস্তিত্ব",
  category: "God Exist",
  videoId: "Ir7utAdXYNg",
  link: "https://www.youtube.com/watch?v=Ir7utAdXYNg",
  type: "video",
},
{
  id: 3,
  title: "Does God Exist? — স্রষ্টার অস্তিত্বের প্রমাণ",
  category: "God Exist",
  videoId: "8ZG2-0sRFVA",
  link: "https://youtu.be/8ZG2-0sRFVA?si=HJEb__6XZynWLms8",
  type: "video",
},
  {
    id: 4,
    title: "৪৩০০ ধর্মের মাঝে শুধু ইসলামই কেন সত্য ধর্ম?",
    category: "proofs",
    videoId: "G8sUpM8EH4k",
    link: "https://youtu.be/G8sUpM8EH4k?si=TE2O-_I83M9S3iEN",
    type: "video",
  },
  {
    id: 5,
    title: "Is the Quran God's Word?",
    category: "proofs",
    videoId: "o3E8g6mYmkE",
    link: "https://youtu.be/o3E8g6mYmkE?si=ea5y0bwyFgyNFjdM",
    type: "video",
  },
  {
    id: 6,
    title: "Qur'an and Modern Science",
    category: "proofs",
    videoId: "cPkDQvmDviQ",
    link: "https://youtu.be/cPkDQvmDviQ?si=6wV3Nbx9J5Y72ZS-",
    type: "video",
  },
  {
    id: 7,
    title: "মুসলিম হওয়ার গল্প",
    category: "proofs",
    videoId: "vqVU7aAk8Tg",
    link: "https://www.youtube.com/watch?v=vqVU7aAk8Tg&list=PLuzIsIPzt7fki4XK9PogjEWkTHWVBCRjE",
    type: "playlist",
  },
  {
    id: 8,
    title: "ইসলাম সম্পর্কে অমুসলিমদের সাধারণ প্রশ্নের জবাব",
    category: "questions",
    videoId: "sp3q6foNMtY",
    link: "https://www.youtube.com/playlist?list=PLHun7ABvrklVdiOEIxhI5_Q-EYoNKeGKB",
    type: "playlist",
    speaker: "ড. জাকির নায়েক",
  },
];

const books = [
  {
    id: 1,
    title: "ইসলাম সম্পর্কে অমুসলিমদের সাধারণ প্রশ্নের জবাব",
    author: "ড. জাকির নায়েক",
    category: "অমুসলিমদের প্রশ্নের জবাব",
    fileId:
      "https://drive.google.com/file/d/1GgKuCZqhbqzfCyj-JrqhOd4lPgrhxiUG/view?usp=drivesdk",
  },
];

const categoryLabels = {
  "God Exist": "ডাজ গড এগজিস্ট?",
  proofs: "ইসলামের প্রমাণ",
  questions: "প্রশ্ন ও উত্তর",
};

export default function WhyIslam() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesCategory =
        activeCategory === "all" ||
        video.category === activeCategory;

      const matchesSearch = video.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-emerald-50/70 via-white to-white px-3 py-10 text-slate-800 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className="relative mb-8 overflow-hidden rounded-2xl  px-5 py-7 text-center shadow-sm sm:px-8">
  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full " />

  <div className="relative">
   

 

    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
      Why Islam?
    </h1>

    <p className="mt-1 text-base font-semibold text-emerald-800">
      কেন ইসলাম?
    </p>

    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
      ইসলাম, কুরআনের সত্যতা ও বিভিন্ন প্রশ্নের উত্তর জানুন
      নির্ভরযোগ্য জ্ঞান ও তথ্যের আলোকে।
    </p>

   
  </div>
</div>

        {/* Video section heading */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-emerald-700">
              Explore & Learn
            </p>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              ভিডিও লাইব্রেরি
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              বিষয় নির্বাচন করে ভিডিও ও প্লেলিস্ট দেখুন।
            </p>
          </div>

          <div className="text-sm font-medium text-slate-500">
            {filteredVideos.length} টি রিসোর্স
          </div>
        </div>

        {/* Category filters */}
        <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={isActive}
                className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                  isActive
                    ? "border-emerald-700 bg-emerald-700 text-white shadow-md shadow-emerald-700/15"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                }`}
              >
                <Icon />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="ভিডিও বা বিষয় খুঁজুন..."
            aria-label="ভিডিও খুঁজুন"
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* Videos grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video) => (
              <a
                key={video.id}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/10"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  {video.videoId ? (
                    <img
                      src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                      alt={video.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-50">
                      <FaYoutube className="text-6xl text-emerald-700/70" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-lg text-white shadow-xl transition-transform group-hover:scale-110 sm:h-14 sm:w-14">
                      <FaPlay className="ml-1" />
                    </span>
                  </div>

                  <span className="absolute bottom-3 left-3 rounded-md bg-black/70 px-2.5 py-1 text-xs font-semibold text-white">
                    {video.type === "playlist" ? "Playlist" : "Video"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <span className="mb-2 w-fit rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                    {categoryLabels[video.category]}
                  </span>

                  <h3 className="text-base font-bold leading-7 text-slate-900 transition-colors group-hover:text-emerald-800">
                    {video.title}
                  </h3>

                  {video.speaker && (
                    <p className="mt-2 text-sm text-slate-500">
                      {video.speaker}
                    </p>
                  )}

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                    {video.type === "playlist"
                      ? "প্লেলিস্ট দেখুন"
                      : "ভিডিও দেখুন"}
                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
            <FaSearch className="mx-auto mb-3 text-2xl text-slate-400" />
            <p className="font-semibold text-slate-700">
              কোনো রিসোর্স পাওয়া যায়নি
            </p>
            <p className="mt-1 text-sm text-slate-500">
              অন্য কোনো শব্দ দিয়ে খুঁজে দেখুন।
            </p>
          </div>
        )}

        {/* Books section */}
        <div className="mb-6 mt-16 border-t border-slate-200 pt-10 sm:mt-20">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-emerald-700">
            Read & Understand
          </p>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xl text-emerald-800">
              <FaBookOpen />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                বই ও পাঠ্যসামগ্রী
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                ইসলাম সম্পর্কে আরও জানতে নির্বাচিত বই পড়ুন।
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book, index) => (
            <article
              key={book.id}
              className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-900/10 sm:p-6"
            >
              <span className="absolute right-4 top-4 text-sm font-bold text-slate-200">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-700 transition-colors group-hover:bg-emerald-700 group-hover:text-white">
                <FaBookOpen />
              </div>

              <span className="mb-2 w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {book.category}
              </span>

              <h3 className="pr-5 text-lg font-bold leading-7 text-slate-900">
                {book.title}
              </h3>

              
              <a
                href={book.fileId}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
              >
                বই পড়ুন
                <FaExternalLinkAlt className="text-xs" />
              </a>
            </article>
          ))}
        </div>
      
      </div>
    </section>
  );
}
