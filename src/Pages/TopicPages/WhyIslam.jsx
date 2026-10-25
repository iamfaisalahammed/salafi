
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

const FONT = { fontFamily: "'Hind Siliguri', sans-serif" };

const compactButton =
  "inline-flex min-h-9 shrink-0 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400";

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
    const query = search.trim().toLowerCase();

    return videos.filter((video) => {
      const matchesCategory =
        activeCategory === "all" ||
        video.category === activeCategory;

      const matchesSearch =
        `${video.title} ${video.speaker || ""} ${
          categoryLabels[video.category] || ""
        }`
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const resetFilters = () => {
    setActiveCategory("all");
    setSearch("");
  };

  return (
    <section
      className="min-h-screen overflow-x-clip bg-[#081b22] px-3 py-8 text-slate-200 sm:px-6 sm:py-12 lg:px-8"
      style={FONT}
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <header className="mb-8 text-center sm:mb-10">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-100 sm:text-3xl md:text-4xl">
              কেন ইসলাম?
          </h1>

        

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            ইসলাম, কুরআনের সত্যতা ও বিভিন্ন প্রশ্নের উত্তর জানুন
            নির্ভরযোগ্য জ্ঞান ও তথ্যের আলোকে।
          </p>
        </header>

        {/* Video section heading */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-bold tracking-wide text-emerald-400">
              ভিডিও ও প্লেলিস্ট
            </p>
            <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
              ভিডিও লাইব্রেরি
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-slate-400">
              বিষয় নির্বাচন করে ভিডিও ও প্লেলিস্ট দেখুন।
            </p>
          </div>

          <p className="text-xs text-slate-500">
            মোট {filteredVideos.length}টি রিসোর্স
          </p>
        </div>

        {/* Compact category filters */}
        <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={isActive}
                className={`${compactButton} ${
                  isActive
                    ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-300"
                    : "border-emerald-400/15 bg-[#10252d] text-slate-300 hover:border-emerald-400/35 hover:text-emerald-300"
                }`}
              >
                <Icon className="text-xs" />
                {category.label}
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <FaSearch
            aria-hidden="true"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-500"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="ভিডিও বা বিষয় খুঁজুন..."
            aria-label="ভিডিও খুঁজুন"
            className="min-h-10 w-full rounded-xl border border-emerald-400/15 bg-[#10252d] py-2.5 pl-10 pr-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/10"
          />
        </div>

        {/* Videos */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video) => (
              <article
                key={video.id}
                className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-emerald-400/15 bg-[#10252d] transition-colors hover:border-emerald-400/35"
              >
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${video.title} YouTube-এ দেখুন`}
                  className="relative block aspect-video overflow-hidden bg-[#0b2027]"
                >
                  {video.videoId ? (
                    <img
                      src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                      alt={video.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <FaYoutube className="text-5xl text-emerald-400" />
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-transform group-hover:scale-110 sm:h-11 sm:w-11">
                      <FaPlay className="ml-0.5 text-sm" />
                    </span>
                  </div>

                  <span className="absolute bottom-2 left-2 rounded-md border border-white/10 bg-black/70 px-2 py-1 text-[10px] font-semibold text-white">
                    {video.type === "playlist" ? "প্লেলিস্ট" : "ভিডিও"}
                  </span>
                </a>

                <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                  <span className="mb-2 w-fit rounded-md border border-emerald-400/15 bg-emerald-400/10 px-2 py-1 text-[10px] font-medium text-emerald-300">
                    {categoryLabels[video.category]}
                  </span>

                  <h3 className="text-sm font-bold leading-6 text-slate-100 sm:text-base">
                    {video.title}
                  </h3>

                  {video.speaker && (
                    <p className="mt-1.5 text-xs text-slate-400">
                      {video.speaker}
                    </p>
                  )}

                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-8 w-fit items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-2 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-400/20"
                  >
                    {video.type === "playlist"
                      ? "প্লেলিস্ট দেখুন"
                      : "ভিডিও দেখুন"}
                    <FaArrowRight className="text-[10px]" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-emerald-400/20 bg-[#10252d] px-4 py-10 text-center">
            <FaSearch className="mx-auto text-2xl text-slate-500" />
            <p className="mt-3 text-sm font-semibold text-slate-200">
              কোনো রিসোর্স পাওয়া যায়নি
            </p>
            <p className="mt-1 text-xs text-slate-400">
              অন্য কোনো শব্দ দিয়ে খুঁজে দেখুন।
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className={`${compactButton} mt-3 border-emerald-400/20 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20`}
            >
              সব রিসোর্স দেখুন
            </button>
          </div>
        )}

        {/* Books section */}
        <section className="mt-12 border-t border-emerald-400/15 pt-8 sm:mt-16 sm:pt-10">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/10 text-lg text-emerald-300">
              <FaBookOpen />
            </div>

            <div>
              <p className="text-xs font-semibold text-emerald-400">
                পড়ুন ও জানুন
              </p>
              <h2 className="mt-1 text-xl font-bold text-slate-100 sm:text-2xl">
                বই ও পাঠ্যসামগ্রী
              </h2>
              <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
                ইসলাম সম্পর্কে আরও জানতে নির্বাচিত বই পড়ুন।
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book, index) => (
              <article
                key={book.id}
                className="flex min-w-0 flex-col rounded-xl border border-emerald-400/15 bg-[#10252d] p-4 transition-colors hover:border-emerald-400/35 sm:p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <FaBookOpen className="text-xl text-emerald-400" />
                  <span className="text-xs text-slate-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <span className="mb-2 w-fit rounded-md border border-emerald-400/15 bg-emerald-400/10 px-2 py-1 text-[10px] text-emerald-300">
                  {book.category}
                </span>

                <h3 className="text-sm font-bold leading-6 text-slate-100 sm:text-base">
                  {book.title}
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  {book.author}
                </p>

                <a
                  href={book.fileId}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${compactButton} mt-4 w-fit border-emerald-400/20 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20`}
                >
                  বই পড়ুন
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
