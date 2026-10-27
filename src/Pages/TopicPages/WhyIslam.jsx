import { useEffect, useMemo, useState } from "react";
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
  FaTimes,
} from "react-icons/fa";

const FONT = { fontFamily: "'Hind Siliguri', sans-serif" };
const GOLD = "#dfbd7b";
const YOUTUBE_RED = "#FF0000";

const compactButton =
  "inline-flex min-h-9 shrink-0 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300";

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

function VideoModal({ video, onClose }) {
  useEffect(() => {
    if (!video) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#10252d] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 p-4 sm:p-5">
          <div className="min-w-0">
            <span
              className="mb-2 inline-flex items-center gap-2 rounded-lg border px-2.5 py-1 text-[11px] font-semibold"
              style={{
                borderColor: `${YOUTUBE_RED}40`,
                backgroundColor: `${YOUTUBE_RED}18`,
                color: YOUTUBE_RED,
              }}
            >
              <FaYoutube />
              {video.type === "playlist" ? "ভিডিও প্লেলিস্ট" : "ভিডিও"}
            </span>

            <h2
              id="video-modal-title"
              className="text-base font-bold leading-7 text-slate-100 sm:text-lg"
            >
              {video.title}
            </h2>

            {video.speaker && (
              <p className="mt-1 text-xs text-slate-400">{video.speaker}</p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="বন্ধ করুন"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        <div className="relative aspect-video bg-[#081b22]">
          <img
            src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
            alt={video.title}
            className="h-full w-full object-contain"
          />

          <a
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${video.title} YouTube-এ খুলুন`}
            className="absolute inset-0 flex items-center justify-center bg-black/20 transition hover:bg-black/40"
          >
            <span
              className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition hover:scale-110 sm:h-16 sm:w-16"
              style={{ backgroundColor: YOUTUBE_RED }}
            >
              <FaPlay className="ml-1 text-xl" />
            </span>
          </a>
        </div>

        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <p className="text-xs leading-5 text-slate-400">
            YouTube-এ ভিডিওটি দেখতে নিচের বাটনে চাপ দিন।
          </p>

          <a
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${compactButton} border-transparent text-white hover:opacity-90`}
            style={{ backgroundColor: YOUTUBE_RED }}
          >
            <FaYoutube />
            YouTube-এ দেখুন
            <FaExternalLinkAlt className="text-[10px]" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function WhyIslam() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [activeVideo, setActiveVideo] = useState(null);

  const filteredVideos = useMemo(() => {
    const query = search.trim().toLowerCase();

    return videos.filter((video) => {
      const matchesCategory =
        activeCategory === "all" || video.category === activeCategory;

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

  const closeVideoModal = () => setActiveVideo(null);

  return (
    <section
      className="min-h-screen overflow-x-clip bg-[#081b22] px-3 py-8 text-slate-200 sm:px-6 sm:py-12 lg:px-8"
      style={FONT}
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center sm:mb-10">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-100 sm:text-3xl md:text-4xl">
            কেন ইসলাম?
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            ইসলাম, কুরআনের সত্যতা ও বিভিন্ন প্রশ্নের উত্তর জানুন
            নির্ভরযোগ্য জ্ঞান ও তথ্যের আলোকে।
          </p>
        </header>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="mb-1 text-xs font-bold tracking-wide"
              style={{ color: GOLD }}
            >
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
                    ? "text-[#dfbd7b]"
                    : "border-white/10 bg-[#10252d] text-slate-300 hover:text-[#dfbd7b]"
                }`}
                style={
                  isActive
                    ? {
                        borderColor: `${GOLD}70`,
                        backgroundColor: `${GOLD}18`,
                      }
                    : undefined
                }
              >
                <Icon className="text-xs" />
                {category.label}
                {isActive && (
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: GOLD }}
                  />
                )}
              </button>
            );
          })}
        </div>

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
            className="min-h-10 w-full rounded-xl border border-white/10 bg-[#10252d] py-2.5 pl-10 pr-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-[#dfbd7b]/60 focus:ring-2 focus:ring-[#dfbd7b]/10"
          />
        </div>

        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video) => (
              <article
                key={video.id}
                className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#10252d] transition-colors hover:border-[#dfbd7b]/40"
              >
                <button
                  type="button"
                  onClick={() => setActiveVideo(video)}
                  aria-label={`${video.title} দেখুন`}
                  className="relative block aspect-video w-full overflow-hidden bg-[#0b2027] text-left"
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
                      <FaYoutube
                        className="text-5xl"
                        style={{ color: YOUTUBE_RED }}
                      />
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg transition-transform group-hover:scale-110 sm:h-11 sm:w-11"
                      style={{ backgroundColor: YOUTUBE_RED }}
                    >
                      <FaPlay className="ml-0.5 text-sm" />
                    </span>
                  </div>

                  <span className="absolute bottom-2 left-2 rounded-md border border-white/10 bg-black/70 px-2 py-1 text-[10px] font-semibold text-white">
                    {video.type === "playlist" ? "প্লেলিস্ট" : "ভিডিও"}
                  </span>
                </button>

                <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                  <span
                    className="mb-2 w-fit rounded-md border px-2 py-1 text-[10px] font-medium"
                    style={{
                      borderColor: `${GOLD}30`,
                      backgroundColor: `${GOLD}12`,
                      color: GOLD,
                    }}
                  >
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

                  <button
                    type="button"
                    onClick={() => setActiveVideo(video)}
                    className={`${compactButton} mt-4 w-fit border-transparent text-white hover:opacity-90`}
                    style={{ backgroundColor: YOUTUBE_RED }}
                  >
                    <FaYoutube />
                    {video.type === "playlist"
                      ? "প্লেলিস্ট দেখুন"
                      : "ভিডিও দেখুন"}
                    <FaArrowRight className="text-[10px]" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-white/15 bg-[#10252d] px-4 py-10 text-center">
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
              className={`${compactButton} mt-3 border-transparent text-[#081b22] hover:opacity-90`}
              style={{ backgroundColor: GOLD }}
            >
              সব রিসোর্স দেখুন
            </button>
          </div>
        )}

        <section className="mt-12 border-t border-white/10 pt-8 sm:mt-16 sm:pt-10">
          <div className="mb-5 flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-lg"
              style={{
                borderColor: `${GOLD}30`,
                backgroundColor: `${GOLD}12`,
                color: GOLD,
              }}
            >
              <FaBookOpen />
            </div>

            <div>
              <p className="text-xs font-semibold" style={{ color: GOLD }}>
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
                className="flex min-w-0 flex-col rounded-xl border border-white/10 bg-[#10252d] p-4 transition-colors hover:border-[#dfbd7b]/40 sm:p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <FaBookOpen className="text-xl" style={{ color: GOLD }} />
                  <span className="text-xs text-slate-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <span
                  className="mb-2 w-fit rounded-md border px-2 py-1 text-[10px]"
                  style={{
                    borderColor: `${GOLD}30`,
                    backgroundColor: `${GOLD}12`,
                    color: GOLD,
                  }}
                >
                  {book.category}
                </span>

                <h3 className="text-sm font-bold leading-6 text-slate-100 sm:text-base">
                  {book.title}
                </h3>

                <p className="mt-2 text-xs text-slate-400">{book.author}</p>

                <a
                  href={book.fileId}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${compactButton} mt-4 w-fit border-transparent text-[#081b22] hover:opacity-90`}
                  style={{ backgroundColor: GOLD }}
                >
                  <FaBookOpen />
                  বই পড়ুন
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>
              </article>
            ))}
          </div>
        </section>
      </div>

      <VideoModal video={activeVideo} onClose={closeVideoModal} />
    </section>
  );
}