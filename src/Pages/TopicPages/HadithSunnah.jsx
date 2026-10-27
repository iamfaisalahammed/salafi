import { useEffect, useState } from "react";
import {
  FaPlayCircle,
  FaBook,
  FaBookOpen,
  FaYoutube,
  FaUserTie,
  FaExternalLinkAlt,
  FaArrowRight,
  FaDatabase,
  FaTimes,
} from "react-icons/fa";

const FONT = { fontFamily: "'Hind Siliguri', sans-serif" };

const tabs = [
  { id: "collections", name: "হাদিসের সংকলন", icon: FaDatabase },
  { id: "videos", name: "ভিডিও", icon: FaPlayCircle },
  { id: "books", name: "বই", icon: FaBook },
];

const collections = [
  {
    id: 1,
    title: "হাদিসের গ্রন্থসমূহ",
    description:
      "বিভিন্ন হাদিসগ্রন্থ থেকে হাদিস পড়ুন এবং হাদিসের মূল সূত্র সম্পর্কে জানুন।",
    link: "https://ihadis.com/hadith-books",
  },
  {
    id: 2,
    title: "বিষয়ভিত্তিক হাদিস",
    description: "বিভিন্ন বিষয় অনুযায়ী হাদিস খুঁজুন ও অধ্যয়ন করুন।",
    link: "https://ihadis.com/subjectwise-hadith",
  },
];

const videos = [
  {
    id: 1,
    title: "সুন্নাহ ও বিদআত",
    speaker: "ইসলামি আলোচনা",
    videoId: "LQxzb_k5AWQ",
    link: "https://youtu.be/LQxzb_k5AWQ?si=H8ScEUy1EXhmG8nV",
    tag: "Sunnah & Bidah",
  },
  {
    id: 2,
    title: "সুন্নাহ ও বিদআত বিষয়ক ভিডিও",
    speaker: "ভিডিও প্লেলিস্ট",
    videoId: "gJ1hpVBDIfI",
    link: "https://www.youtube.com/watch?v=gJ1hpVBDIfI&list=PLfhT5TWRtAvw",
    tag: "Full Playlist",
  },
];

const books = [
  {
    id: 1,
    title: "আহইয়াউস সুনান",
    author: "ড. খোন্দকার আব্দুল্লাহ জাহাঙ্গীর (রহ.)",
    category: "সুন্নতের পুনরুজ্জীবন ও বিদআতের বিসর্জন",
    link: "https://drive.google.com/file/d/1_qWQFzL2TNchjVGk26uLwzeyXySGZEbR/view?usp=drivesdk",
    type: "সুন্নাহ ও বিদআত",
  },
  {
    id: 2,
    title: "আল মাউযূআত",
    author: "ড. খোন্দকার আব্দুল্লাহ জাহাঙ্গীর (রহ.)",
    category: "জাল হাদিস সমূহ",
    link: "https://drive.google.com/file/d/1GNbi9xhAcR8ddSxb1TCUUW8YRYFFf3Ko/view?usp=drivesdk",
    type: "জাল হাদিস গবেষণা",
  },
  {
    id: 3,
    title: "হাদিসের নামে জালিয়াতি",
    author: "ড. খোন্দকার আব্দুল্লাহ জাহাঙ্গীর (রহ.)",
    category: "জাল হাদিস ও হাদিসের নামে অপপ্রচার",
    link: "https://drive.google.com/file/d/1I5jib7dm8FDJdeVy80-THMmejN_Vq-IB/view?usp=drivesdk",
    type: "জাল হাদিস গবেষণা",
  },
];

// ছোট বাটনের কমন স্টাইল (গোল্ড ফিলড)
const compactButton =
  "inline-flex min-h-9 items-center justify-center gap-2 rounded-xl bg-[#dfbd7b] px-3 py-2 text-xs font-semibold text-[#081b22] transition-colors hover:bg-[#e8cd96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b]";

// Video modal
const VideoModal = ({ video, onClose }) => {
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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[#dfbd7b]/20 bg-[#10252d] shadow-2xl shadow-black/40"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-[#dfbd7b]/10 px-4 py-3 sm:px-5">
          <h2
            id="video-modal-title"
            className="text-base font-bold text-white sm:text-lg"
          >
            ভিডিও দেখুন
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="মডাল বন্ধ করুন"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b]"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-4 sm:p-5">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-[#081b22]">
            <img
              src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
              alt={video.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <FaYoutube className="text-5xl text-red-500 drop-shadow-lg sm:text-6xl" />
            </div>
          </div>

          <h3 className="mt-4 text-lg font-bold leading-7 text-white">
            {video.title}
          </h3>

          <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
            <FaUserTie className="text-[#dfbd7b]" />
            {video.speaker}
          </p>

          <a
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            <FaYoutube className="text-lg" />
            YouTube-এ ভিডিও দেখুন
            <FaExternalLinkAlt className="text-xs" />
          </a>
        </div>
      </div>
    </div>
  );
};

const HadithSunnah = () => {
  const [active, setActive] = useState("collections");
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section
      style={FONT}
      className="min-h-screen overflow-x-clip bg-[#081b22] px-3 py-8 text-slate-200 sm:px-6 sm:py-10 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-7 text-center sm:mb-9">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            হাদিস ও সুন্নাহ
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            রাসুলুল্লাহ ﷺ-এর হাদিস অধ্যয়ন করুন, সুন্নাহ সম্পর্কে জানুন
            এবং নির্ভরযোগ্য সূত্রের আলোকে জাল হাদিস ও বিদআত সম্পর্কে
            সচেতন হোন।
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2 sm:mb-9">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                aria-pressed={isActive}
                className={`inline-flex min-h-9 items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b] ${
                  isActive
                    ? "border-[#dfbd7b] bg-[#dfbd7b] text-[#081b22]"
                    : "border-[#dfbd7b]/15 bg-[#10252d] text-slate-300 hover:border-[#dfbd7b]/40 hover:text-[#dfbd7b]"
                }`}
              >
                <Icon className="shrink-0" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Hadith Collections */}
        {active === "collections" && (
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-white">
                হাদিসের সংকলন
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                নির্ভরযোগ্য অনলাইন সূত্র থেকে হাদিস অধ্যয়ন করুন।
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {collections.map((item, index) => (
                <article
                  key={item.id}
                  className="group relative flex min-w-0 flex-col rounded-2xl border border-[#dfbd7b]/15 bg-[#10252d] p-4 transition-colors hover:border-[#dfbd7b]/40 sm:p-5"
                >
                  <span className="absolute right-4 top-3 text-xs font-semibold text-[#dfbd7b]/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfbd7b]/20 bg-[#dfbd7b]/10 text-lg text-[#dfbd7b]">
                    <FaBookOpen />
                  </div>

                  <h3 className="pr-7 text-base font-bold text-white sm:text-lg">
                    {item.title}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${compactButton} mt-4 w-fit`}
                  >
                    অধ্যয়ন করুন
                    <FaExternalLinkAlt className="text-[10px]" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Videos - Icon only until clicked */}
        {active === "videos" && (
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-white">
                সুন্নাহ ও বিদআত বিষয়ক ভিডিও
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                ভিডিওর আইকনে ক্লিক করে বিস্তারিত দেখুন।
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {videos.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => setActiveVideo(video)}
                  aria-label={`${video.title} ভিডিওর বিস্তারিত দেখুন`}
                  className="group flex min-w-0 items-center gap-4 rounded-2xl border border-[#dfbd7b]/15 bg-[#10252d] p-4 text-left transition-colors hover:border-[#dfbd7b]/40 hover:bg-[#142e36] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b] sm:p-5"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#dfbd7b]/20 bg-[#dfbd7b]/10 text-2xl text-[#dfbd7b] transition-colors group-hover:bg-[#dfbd7b]/20">
                    <FaPlayCircle />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-bold leading-6 text-white">
                      {video.title}
                    </span>
                    <span className="mt-1 block text-sm text-slate-400">
                      {video.speaker}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#dfbd7b]">
                      বিস্তারিত দেখুন
                      <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Books */}
        {active === "books" && (
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-white">ইসলামি বই</h2>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                হাদিস, সুন্নাহ ও জাল হাদিস সম্পর্কে বই পড়ুন।
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {books.map((book, index) => (
                <article
                  key={book.id}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#dfbd7b]/15 bg-[#10252d] p-4 transition-colors hover:border-[#dfbd7b]/40 sm:p-5"
                >
                  <span className="absolute right-4 top-3 text-xs font-semibold text-[#dfbd7b]/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfbd7b]/20 bg-[#dfbd7b]/10 text-lg text-[#dfbd7b]">
                    <FaBook />
                  </div>

                  <span className="mb-3 w-fit max-w-full rounded-lg border border-[#dfbd7b]/20 bg-[#dfbd7b]/10 px-2.5 py-1 text-xs font-medium leading-5 text-[#dfbd7b]">
                    {book.type}
                  </span>

                  <h3 className="pr-6 text-base font-bold leading-6 text-white sm:text-lg">
                    {book.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {book.author}
                  </p>

                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">
                    {book.category}
                  </p>

                  {book.link ? (
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${compactButton} mt-4 w-fit`}
                    >
                      পড়ুন / ডাউনলোড
                      <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                  ) : (
                    <span className="mt-4 text-xs text-slate-500">
                      লিংক যোগ করা হয়নি
                    </span>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Hadith App */}
      <div className="mb-5 mt-8 flex justify-center">
        <a
          href="https://play.google.com/store/apps/details?id=com.ihadis.ihadis"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-[#dfbd7b]"
        >
          <FaBookOpen className="shrink-0 text-base text-[#dfbd7b]" />
          <span>হাদিস পড়তে Al Hadith অ্যাপ ডাউনলোড করুন</span>
          <FaExternalLinkAlt className="shrink-0 text-[10px]" />
        </a>
      </div>

      <VideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
};

export default HadithSunnah;