import { useEffect, useState, useCallback } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { FaPlay, FaBookQuran } from "react-icons/fa6";
import { FaTimes, FaYoutube, FaExternalLinkAlt } from "react-icons/fa";

const FONT = { fontFamily: "'Hind Siliguri', sans-serif" };


const compactButton =
  "inline-flex min-h-9 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b]";

const categories = [
  { id: "prophets", name: "২৫ নবী", icon: <FaBookQuran /> },
  { id: "seerah", name: "নবী ﷺ-এর জীবনী", icon: <FaBookQuran /> },
  { id: "scholars", name: "ইসলামের আলেমগণ", icon: <FaGraduationCap /> },
];

const videos = [
  {
    category: "seerah",
    title: "Life of Prophet Muhammad ﷺ",
    videoId: "DW-00ckCAPI",
    link: "https://www.youtube.com/show/VLPLlZazEh_c4nScNCvGBn8OEf6ujk-sDUpg?sbp=KgtEVy0wMGNrQ0FQSUAB",
  },
  {
    category: "sahabah",
    title: "Biography of Abu Bakr رضي الله عنه",
    videoId: "example_video_id",
    link: "https://youtube.com",
  },
  {
    category: "scholars",
    title: "বিখ্যাত মুহাদ্দিসগণ",
    videoId: "Ifgy6vZ98hY",
    link: "https://www.youtube.com/playlist?list=PLh00bXGWSenmmOTbYJqpboeCopZgOf7kV",
  },
  {
    category: "history",
    title: "Ottoman Empire History",
    videoId: "example_video_id",
    link: "https://youtube.com",
  },
];

const prophets = [
  { name: "Adam", arabic: "عليه السلام", icon: "🌳", color: "#4ADE80", link: "https://youtu.be/ywHoaKVf0E4" },
  { name: "Idris", arabic: "عليه السلام", icon: "⛰️", color: "#38BDF8", link: "https://youtu.be/Qe9ylM6fNYM" },
  { name: "Nuh", arabic: "عليه السلام", icon: "🚢", color: "#F472B6", link: "https://youtu.be/S4JR8gWIvYg" },
  { name: "Hud", arabic: "عليه السلام", icon: "🌪️", color: "#A78BFA", link: "https://youtu.be/Brnu5TgB0Jc" },
  { name: "Saleh", arabic: "عليه السلام", icon: "🐪", color: "#FB923C", link: "https://youtu.be/Pxf0L6PguOY" },
  { name: "Ibrahim", arabic: "عليه السلام", icon: "🔥", color: "#F87171", link: "https://youtu.be/tSteK_9b5Q0" },
  { name: "Lut", arabic: "عليه السلام", icon: "🏙️", color: "#FBBF24", link: "https://youtu.be/T8e9J_FleyE" },
  { name: "Ismail", arabic: "عليه السلام", icon: "🐑", color: "#F87171", link: "https://youtu.be/LlLNy0Icf7M" },
  { name: "Ishaq", arabic: "عليه السلام", icon: "🕊️", color: "#60A5FA", link: "https://youtu.be/ntfdrLthUdg" },
  { name: "Yaqub", arabic: "عليه السلام", icon: "🏕️", color: "#C084FC", link: "https://youtu.be/_CqhdVQztxg" },
  { name: "Yusuf", arabic: "عليه السلام", icon: "🪣", color: "#FCD34D", link: "https://youtu.be/_lzwHFr2hBA" },
  { name: "Ayyub", arabic: "عليه السلام", icon: "⏳", color: "#F97316", link: "https://youtu.be/lN_0oRePY-g" },
  { name: "Shuaib", arabic: "عليه السلام", icon: "⚡", color: "#818CF8", link: "https://youtu.be/jcCEiN4xhFI" },
  { name: "Musa", arabic: "عليه السلام", icon: "🌊", color: "#22D3EE", link: "https://youtu.be/TbQJ6MKtp5Q" },
  { name: "Harun", arabic: "عليه السلام", icon: "🪄", color: "#4ADE80", link: "https://youtu.be/UPybeb9JdJs" },
  { name: "Dhul-Kifl", arabic: "عليه السلام", icon: "🕯️", color: "#4ADE80", link: "https://youtu.be/UQokR2tslts" },
  { name: "Dawud", arabic: "عليه السلام", icon: "👑", color: "#FBBF24", link: "https://youtu.be/prZrvfpMQ9U" },
  { name: "Sulaiman", arabic: "عليه السلام", icon: "🦜", color: "#4ADE80", link: "https://youtu.be/bFIheGltBC8" },
  { name: "Ilyas", arabic: "عليه السلام", icon: "✨", color: "#60A5FA", link: "https://youtu.be/cWfNnCaH6MI" },
  { name: "Alyasa", arabic: "عليه السلام", icon: "🌟", color: "#F472B6", link: "https://youtu.be/vf0Df6XVTTc" },
  { name: "Yunus", arabic: "عليه السلام", icon: "🐋", color: "#38BDF8", link: "https://youtu.be/9_W1cFXWqrE" },
  { name: "Zakariya", arabic: "عليه السلام", icon: "🌿", color: "#34D399", link: "https://youtu.be/4uvZtvQv6ow" },
  { name: "Yahya", arabic: "عليه السلام", icon: "📖", color: "#A78BFA", link: "https://youtu.be/9KFO2P-0LhI" },
  { name: "Isa", arabic: "عليه السلام", icon: "🧺", color: "#FBBF24", link: "https://youtu.be/2pVm1-edHWk" },
  { name: "Muhammad", arabic: "ﷺ", icon: "🕋", color: "#F87171", link: "https://youtu.be/MxkQM92MSzI" },
];

const COLS = 4;
const ROW_HEIGHT = 145;

const buildPath = (nodes, columns, width, rowHeight) => {
  if (!nodes.length) return "";

  const toXY = (index) => {
    const row = Math.floor(index / columns);
    const posInRow = index % columns;
    const countInRow = Math.min(columns, nodes.length - row * columns);
    const col = row % 2 === 0 ? posInRow : countInRow - 1 - posInRow;

    return [
      ((col + 0.5) / columns) * width,
      row * rowHeight + rowHeight / 2,
    ];
  };

  let d = `M ${toXY(0)[0]} ${toXY(0)[1]}`;

  for (let i = 1; i < nodes.length; i++) {
    const [x0, y0] = toXY(i - 1);
    const [x1, y1] = toXY(i);
    const midY = (y0 + y1) / 2;

    d += ` C ${x0} ${midY}, ${x1} ${midY}, ${x1} ${y1}`;
  }

  return d;
};

function VideoModal({ video, onClose }) {
  useEffect(() => {
    if (!video) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [video, onClose]);

  if (!video) return null;

  const hasValidVideoId =
    video.videoId && !video.videoId.startsWith("example_");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="seerah-video-title"
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[#dfbd7b]/20 bg-[#10252d] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 p-4 sm:p-5">
          <div className="min-w-0">
            <span className="mb-2 inline-flex items-center gap-2 rounded-lg border border-[#dfbd7b]/20 bg-[#dfbd7b]/10 px-2.5 py-1 text-[11px] font-semibold text-[#dfbd7b]">
              <FaYoutube />
              ভিডিও রিসোর্স
            </span>

            <h2
              id="seerah-video-title"
              className="text-base font-bold leading-7 text-slate-100 sm:text-lg"
            >
              {video.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="বন্ধ করুন"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-[#dfbd7b]/30 hover:bg-[#dfbd7b]/10 hover:text-[#dfbd7b]"
          >
            <FaTimes />
          </button>
        </div>

        <div className="relative aspect-video bg-[#081b22]">
          {hasValidVideoId ? (
            <img
              src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
              alt={video.title}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-400">
              <FaBookQuran className="text-4xl text-[#dfbd7b]" />
              <p className="text-sm">ভিডিওর প্রিভিউ উপলভ্য নয়</p>
            </div>
          )}

          <a
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${video.title} YouTube-এ খুলুন`}
            className="absolute inset-0 flex items-center justify-center bg-black/20 transition hover:bg-black/40"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#dfbd7b] text-[#081b22] shadow-xl transition hover:scale-110 sm:h-16 sm:w-16">
              <FaPlay className="ml-1 text-xl" />
            </span>
          </a>
        </div>

        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <p className="text-xs leading-5 text-slate-400">
            YouTube-এ সম্পূর্ণ ভিডিওটি দেখুন।
          </p>

          <a
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${compactButton} border-[#dfbd7b]/30 bg-[#dfbd7b] text-[#081b22] hover:bg-[#e8cb96]`}
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

export default function SeerahHistory() {
  const [active, setActive] = useState("prophets");
  const [columns, setColumns] = useState(COLS);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const updateColumns = () => {
      setColumns(window.innerWidth >= 1024 ? 5 : 4);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const filteredVideos = videos.filter((item) => item.category === active);
  const rowHeight = columns === 4 ? ROW_HEIGHT : 170;
  const rows = Math.ceil(prophets.length / columns);
  const pathHeight = rows * rowHeight;

  const prophetNodes = prophets.map((prophet, index) => {
    const row = Math.floor(index / columns);
    const posInRow = index % columns;
    const countInRow = Math.min(columns, prophets.length - row * columns);
    const col = row % 2 === 0 ? posInRow : countInRow - 1 - posInRow;

    return {
      ...prophet,
      x: ((col + 0.5) / columns) * 100,
      y: row * rowHeight + rowHeight / 2,
    };
  });

  const closeVideoModal = useCallback(() => {
    setActiveVideo(null);
  }, []);

  return (
    <section
      className="min-h-screen overflow-x-clip bg-[#081b22] px-3 py-8 text-slate-200 sm:px-6 sm:py-12 lg:px-8"
      style={FONT}
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-7 text-center sm:mb-9">
          <h1 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl md:text-4xl">
            ইসলামের ইতিহাস ও ঐতিহ্য
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            ইসলামের ইতিহাস, নবী-রাসূলদের জীবন এবং ইসলামী জ্ঞান-ঐতিহ্যের
            গুরুত্বপূর্ণ অধ্যায়গুলো জানুন।
          </p>
        </header>

        {/* Category buttons */}
        <div className="mb-8 flex flex-wrap justify-center gap-2 sm:mb-10">
          {categories.map((item) => {
            const isActive = active === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                aria-pressed={isActive}
                className={`${compactButton} ${
                  isActive
                    ? "border-[#dfbd7b] bg-[#dfbd7b] text-[#081b22] shadow-sm"
                    : "border-[#dfbd7b]/20 bg-[#10252d] text-slate-300 hover:border-[#dfbd7b]/50 hover:bg-[#dfbd7b]/10 hover:text-[#dfbd7b]"
                }`}
              >
                {item.icon}
                {item.name}
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#081b22]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Prophets timeline */}
        {active === "prophets" && (
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
                কুরআনে উল্লেখিত ২৫ জন নবী
              </h2>
              <p className="mt-2 text-xs text-slate-400 sm:text-sm">
                যেকোনো নবীর নাম নির্বাচন করে সংশ্লিষ্ট ভিডিও দেখুন
              </p>
            </div>

            <div
              className="relative mx-auto"
              style={{ height: pathHeight, maxWidth: 1000 }}
            >
              <svg
                viewBox={`0 0 1000 ${pathHeight}`}
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <path
                  d={buildPath(prophets, columns, 1000, rowHeight)}
                  fill="none"
                  stroke="#dfbd7b"
                  strokeOpacity="0.55"
                  strokeWidth="2.5"
                  strokeDasharray="5 7"
                  strokeLinecap="round"
                />
              </svg>

              {prophetNodes.map((prophet, index) => (
                <a
                  key={prophet.name}
                  href={prophet.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch the story of Prophet ${prophet.name}`}
                  className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-lg px-0.5 py-1 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b]"
                  style={{
                    left: `${prophet.x}%`,
                    top: prophet.y,
                    width: `${100 / columns}%`,
                  }}
                >
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 bg-[#10252d] text-base shadow-sm transition-transform duration-200 group-hover:scale-110 sm:h-11 sm:w-11 sm:text-xl lg:h-14 lg:w-14 lg:text-2xl"
                    style={{ borderColor: prophet.color }}
                  >
                    {prophet.icon}
                  </div>

                  <div className="w-full leading-tight">
                    <p
                      className="break-words text-[10px] font-bold sm:text-xs lg:text-sm"
                      style={{ color: prophet.color }}
                    >
                      {prophet.name}
                    </p>
                    <p
                      dir="rtl"
                      className="mt-1 text-[8px] text-slate-400 sm:text-[10px]"
                    >
                      {prophet.arabic}
                    </p>
                  </div>

                  <span className="absolute right-0 top-0 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#dfbd7b]/25 bg-[#10252d] text-[8px] text-[#dfbd7b] sm:right-1 sm:h-4 sm:w-4 sm:text-[9px]">
                    {index + 1}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Video resources */}
        {active !== "prophets" && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <article
                  key={video.title}
                  className="group overflow-hidden rounded-xl border border-[#dfbd7b]/15 bg-[#10252d] transition-colors hover:border-[#dfbd7b]/40"
                >
                  <button
                    type="button"
                    onClick={() => setActiveVideo(video)}
                    aria-label={`${video.title} এর বিস্তারিত দেখুন`}
                    className="relative block aspect-video w-full overflow-hidden bg-[#0b2027] text-left"
                  >
                    {video.videoId &&
                    !video.videoId.startsWith("example_") ? (
                      <img
                        src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                        alt={video.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <FaYoutube className="text-5xl text-[#dfbd7b]" />
                      </div>
                    )}

                    <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dfbd7b] text-[#081b22] transition-transform group-hover:scale-110">
                        <FaPlay className="text-sm" />
                      </span>
                    </span>
                  </button>

                  <div className="p-3.5 sm:p-4">
                    <h3 className="text-sm font-bold leading-6 text-slate-100 sm:text-base">
                      {video.title}
                    </h3>

                    <button
                      type="button"
                      onClick={() => setActiveVideo(video)}
                      className={`${compactButton} mt-3 border-[#dfbd7b]/25 bg-[#dfbd7b]/10 text-[#dfbd7b] hover:bg-[#dfbd7b] hover:text-[#081b22]`}
                    >
                      <FaPlay className="text-[10px]" />
                      বিস্তারিত দেখুন
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full rounded-xl border border-[#dfbd7b]/15 bg-[#10252d] px-4 py-10 text-center">
                <FaBookQuran className="mx-auto text-3xl text-[#dfbd7b]" />
                <h3 className="mt-3 font-semibold text-slate-100">
                  এখনো কোনো রিসোর্স নেই
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  এই বিভাগের রিসোর্স যোগ করা হলে এখানে দেখা যাবে।
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <VideoModal video={activeVideo} onClose={closeVideoModal} />
    </section>
  );
}