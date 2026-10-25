
import { useEffect, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { FaPlay, FaBookQuran } from "react-icons/fa6";

const FONT = { fontFamily: "'Hind Siliguri', sans-serif" };

const compactButton =
  "inline-flex min-h-9 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400";

const categories = [
  {
    id: "prophets",
    name: "২৫ নবী",
    icon: <FaBookQuran />,
  },
  {
    id: "seerah",
    name: "নবী ﷺ-এর জীবনী",
    icon: <FaBookQuran />,
  },
  {
    id: "scholars",
    name: "ইসলামের আলেমগণ",
    icon: <FaGraduationCap />,
  },
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
    const col =
      row % 2 === 0 ? posInRow : countInRow - 1 - posInRow;

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

export default function SeerahHistory() {
  const [active, setActive] = useState("prophets");
  const [columns, setColumns] = useState(COLS);

  useEffect(() => {
    const updateColumns = () => {
      setColumns(window.innerWidth >= 1024 ? 5 : 4);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const filteredVideos = videos.filter(
    (item) => item.category === active
  );

  const rowHeight = columns === 4 ? ROW_HEIGHT : 170;
  const rows = Math.ceil(prophets.length / columns);
  const pathHeight = rows * rowHeight;

  const prophetNodes = prophets.map((prophet, index) => {
    const row = Math.floor(index / columns);
    const posInRow = index % columns;
    const countInRow = Math.min(
      columns,
      prophets.length - row * columns
    );

    const col =
      row % 2 === 0 ? posInRow : countInRow - 1 - posInRow;

    return {
      ...prophet,
      x: ((col + 0.5) / columns) * 100,
      y: row * rowHeight + rowHeight / 2,
    };
  });

  return (
    <section
      className="min-h-screen overflow-x-clip bg-[#081b22] px-3 py-8 text-slate-200 sm:px-6 sm:py-12 lg:px-8"
      style={FONT}
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <header className="mb-7 text-center sm:mb-9">
          <h1 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl md:text-4xl">
            ইসলামের ইতিহাস ও ঐতিহ্য
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            ইসলামের ইতিহাস, নবী-রাসূলদের জীবন এবং ইসলামী জ্ঞান-ঐতিহ্যের
            গুরুত্বপূর্ণ অধ্যায়গুলো জানুন।
          </p>
        </header>

        {/* Compact category buttons */}
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
                    ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-300"
                    : "border-emerald-400/15 bg-[#10252d] text-slate-300 hover:border-emerald-400/35 hover:text-emerald-300"
                }`}
              >
                {item.icon}
                {item.name}
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
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
                  stroke="#246453"
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
                  className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-lg px-0.5 py-1 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
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

                  <span className="absolute right-0 top-0 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-emerald-400/20 bg-[#10252d] text-[8px] text-slate-400 sm:right-1 sm:h-4 sm:w-4 sm:text-[9px]">
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
                  className="overflow-hidden rounded-xl border border-emerald-400/15 bg-[#10252d] transition-colors hover:border-emerald-400/35"
                >
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch ${video.title} on YouTube`}
                    className="relative block aspect-video overflow-hidden bg-[#0b2027]"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                      alt={video.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                        <FaPlay className="text-sm" />
                      </span>
                    </span>
                  </a>

                  <div className="p-3.5 sm:p-4">
                    <h3 className="text-sm font-bold leading-6 text-slate-100 sm:text-base">
                      {video.title}
                    </h3>
                    <a
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${compactButton} mt-3 border-emerald-400/20 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/15`}
                    >
                      <FaPlay className="text-[10px]" />
                      YouTube-এ দেখুন
                    </a>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full rounded-xl border border-emerald-400/15 bg-[#10252d] px-4 py-10 text-center">
                <FaBookQuran className="mx-auto text-3xl text-emerald-400" />
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
    </section>
  );
}
