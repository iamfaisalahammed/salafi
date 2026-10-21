
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

const tabs = [
  {
    id: "collections",
    name: "Hadith Collections",
    subtitle: "হাদিসের সংকলন",
    icon: FaDatabase,
  },
  {
    id: "videos",
    name: "Videos",
    subtitle: "ভিডিও",
    icon: FaPlayCircle,
  },
  {
    id: "books",
    name: "Books",
    subtitle: "বই",
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

const HadithSunnah = () => {
  const [active, setActive] = useState("collections");

  return (
    <section className="min-h-screen bg-gradient-to-b from-emerald-50/60 via-white to-white px-3 py-10 text-slate-800 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-8 text-center sm:mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            হাদিস ও সুন্নাহ
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            রাসুলুল্লাহ ﷺ-এর হাদিস অধ্যয়ন করুন, সুন্নাহ সম্পর্কে জানুন
            এবং নির্ভরযোগ্য সূত্রের আলোকে জাল হাদিস ও বিদআত সম্পর্কে
            সচেতন হোন।
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
                className={`flex min-h-11 items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all sm:px-5 ${
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

        {/* Hadith Collections */}
        {active === "collections" && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {collections.map((item, i) => (
              <article
                key={item.id}
                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-700/10 sm:p-6"
              >
                <span className="absolute right-5 top-4 text-sm font-semibold text-slate-200">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-700 transition-colors group-hover:bg-emerald-700 group-hover:text-white">
                  <FaBookOpen />
                </div>

                <h2 className="pr-8 text-lg font-bold text-slate-900">
                  {item.title}
                </h2>

                <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-900"
                >
                  অধ্যয়ন করুন
                  <FaExternalLinkAlt className="text-xs" />
                </a>
              </article>
            ))}
          </div>
        )}

        {/* Videos */}
        {active === "videos" && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <a
                key={video.id}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-700/10"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <img
                    src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                    alt={video.title}
                    loading="lazy"
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
                    <FaUserTie className="shrink-0 text-emerald-700" />
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
          <>
           

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

                  <span className="mb-3 w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                    {book.type}
                  </span>

                  <h2 className="pr-6 text-lg font-bold leading-snug text-slate-900">
                    {book.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
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
                      className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-900"
                    >
                      পড়ুন / ডাউনলোড
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  ) : (
                    <span className="mt-5 inline-flex w-fit cursor-not-allowed items-center gap-2 text-sm font-medium text-slate-400">
                      লিংক যোগ করা হয়নি
                    </span>
                  )}
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HadithSunnah;
