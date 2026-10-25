
import { useState } from "react";
import {
  FaPlayCircle,
  FaBook,
  FaBookOpen,
  FaYoutube,
  FaUserTie,
  FaExternalLinkAlt,
  FaArrowRight,
  FaDatabase,
} from "react-icons/fa";

const FONT = { fontFamily: "'Hind Siliguri', sans-serif" };

const tabs = [
  {
    id: "collections",
    name: "হাদিসের সংকলন",
    icon: FaDatabase,
  },
  {
    id: "videos",
    name: "ভিডিও",
    icon: FaPlayCircle,
  },
  {
    id: "books",
    name: "বই",
    icon: FaBook,
  },
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
    description:
      "বিভিন্ন বিষয় অনুযায়ী হাদিস খুঁজুন ও অধ্যয়ন করুন।",
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

const compactButton =
  "inline-flex min-h-9 items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-300 transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400";

const HadithSunnah = () => {
  const [active, setActive] = useState("collections");

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

        {/* Compact Tabs */}
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
                className={`inline-flex min-h-9 items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isActive
                    ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                    : "border-emerald-400/15 bg-[#10252d] text-slate-300 hover:border-emerald-400/40 hover:text-white"
                }`}
              >
                <Icon className="shrink-0" />
                <span>{tab.name}</span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                )}
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
                  className="group relative flex min-w-0 flex-col rounded-2xl border border-emerald-400/15 bg-[#10252d] p-4 transition-colors hover:border-emerald-400/35 sm:p-5"
                >
                  <span className="absolute right-4 top-3 text-xs font-semibold text-slate-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-lg text-emerald-300">
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

        {/* Videos */}
        {active === "videos" && (
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-white">
                সুন্নাহ ও বিদআত বিষয়ক ভিডিও
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                ভিডিও ও প্লেলিস্টের মাধ্যমে বিষয়গুলো সম্পর্কে জানুন।
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <a
                  key={video.id}
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-emerald-400/15 bg-[#10252d] transition-colors hover:border-emerald-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <div className="relative aspect-video overflow-hidden bg-[#081b22]">
                    <img
                      src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                      alt={video.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-xl text-white">
                        <FaYoutube />
                      </span>
                    </div>

                    <span className="absolute bottom-2 left-2 max-w-[90%] truncate rounded-md bg-black/70 px-2 py-1 text-[11px] font-medium text-white">
                      {video.tag}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-base font-bold leading-6 text-white">
                      {video.title}
                    </h3>

                    <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                      <FaUserTie className="shrink-0 text-emerald-300" />
                      {video.speaker}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
                      YouTube-এ দেখুন
                      <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
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
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-emerald-400/15 bg-[#10252d] p-4 transition-colors hover:border-emerald-400/35 sm:p-5"
                >
                  <span className="absolute right-4 top-3 text-xs font-semibold text-slate-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-lg text-emerald-300">
                    <FaBook />
                  </div>

                  <span className="mb-3 w-fit max-w-full rounded-lg border border-emerald-400/15 bg-emerald-400/[0.07] px-2.5 py-1 text-xs font-medium leading-5 text-emerald-300">
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
    </section>
  );
};

export default HadithSunnah;
