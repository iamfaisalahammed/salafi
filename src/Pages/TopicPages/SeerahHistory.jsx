import { useEffect, useState } from "react";
import { FaPlay, FaBookQuran } from "react-icons/fa6";

const categories = [
  {
    id: "prophets",
    name: "25 Prophets",
    icon: <FaBookQuran />,
  },
  {
    id: "seerah",
    name: "Seerah of Prophet ﷺ",
    icon: <FaBookQuran />,
  },
  // {
  //   id: "sahabah",
  //   name: "Sahabah",
  //   icon: <FaUserFriends />,
  // },
  // {
  //   id: "scholars",
  //   name: "Great Scholars",
  //   icon: <FaGraduationCap />,
  // },
  // {
  //   id: "history",
  //   name: "Islamic History",
  //   icon: <FaLandmark />,
  // },
];

const videos = [
  {
    category: "seerah",
    title: "Life of Prophet Muhammad ﷺ",
    image:
      "https://i.ibb.co.com/hRDJjJxK/f0a62ab2-c43c-4a7c-85eb-d6e0c324a540.png",
    link: "https://www.youtube.com/show/VLPLlZazEh_c4nScNCvGBn8OEf6ujk-sDUpg?sbp=KgtEVy0wMGNrQ0FQSUAB",
  },

  {
    category: "sahabah",
    title: "Biography of Abu Bakr رضي الله عنه",
    image: "https://i.ibb.co.com/example.jpg",
    link: "https://youtube.com",
  },
  {
    category: "scholars",
    title: "Imam Bukhari Biography",
    image: "https://i.ibb.co.com/example.jpg",
    link: "https://youtube.com",
  },
  {
    category: "history",
    title: "Ottoman Empire History",
    image: "https://i.ibb.co.com/example.jpg",
    link: "https://youtube.com",
  },
];

// 25 Prophets mentioned in the Qur'an, each paired with a symbol from
// their story and a distinct accent color, in traditional chronological order.
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

// Snake the 25 prophets through a 4-column grid, alternating direction
// each row, so the connecting path winds left-right-left like a river.
const COLS = 4;
const ROW_HEIGHT = 145;

// Build a smooth dashed path through every node's center.
const buildPath = (nodes, columns, width, rowHeight) => {
  if (nodes.length === 0) return "";

  const toXY = (index) => {
    const row = Math.floor(index / columns);
    const posInRow = index % columns;
    const countInRow = Math.min(
      columns,
      nodes.length - row * columns
    );

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

const SeerahHistory = () => {
  const [active, setActive] = useState("prophets");
  const [columns, setColumns] = useState(COLS);

  // Keep four columns on mobile and adjust the timeline for larger screens.
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1024) {
        setColumns(5);
      } else {
        setColumns(4);
      }
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

  const prophetNodes = prophets.map((p, i) => {
    const row = Math.floor(i / columns);
    const posInRow = i % columns;
    const countInRow = Math.min(
      columns,
      prophets.length - row * columns
    );

    const col =
      row % 2 === 0 ? posInRow : countInRow - 1 - posInRow;

    return {
      ...p,
      x: ((col + 0.5) / columns) * 100,
      y: row * rowHeight + rowHeight / 2,
    };
  });

  return (
    <section className="min-h-screen bg-white px-3 py-10 text-slate-800 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Title */}
        <div className="mb-8 text-center sm:mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Islamic Legacy
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600 sm:text-base">
            Explore Prophets, Seerah, Sahabah & Islamic History
          </p>
        </div>

        {/* Category Buttons */}
        <div className="mb-9 flex flex-wrap justify-center gap-2 sm:mb-12 sm:gap-3">
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              aria-pressed={active === item.id}
              className={`flex min-h-10 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors sm:px-5 sm:text-sm ${
                active === item.id
                  ? "border-emerald-700 bg-emerald-700 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-emerald-50"
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>

        {/* All Prophets — winding path timeline (now on all devices, including mobile) */}
        {active === "prophets" && (
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 text-center sm:mb-8">
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Prophets in Islam
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                25 Prophets mentioned in the Qur'an
              </p>
            </div>

            {/* Winding snake path — shared by desktop, tablet, and mobile */}
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
                  stroke="#a7d9bd"
                  strokeWidth="2.5"
                  strokeDasharray="6 7"
                  strokeLinecap="round"
                />
              </svg>

              {prophetNodes.map((p, index) => (
                <a
                  key={p.name}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch the story of Prophet ${p.name}`}
                  className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-lg px-0.5 py-1 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  style={{
                    left: `${p.x}%`,
                    top: p.y,
                    width: `${100 / columns}%`,
                  }}
                >
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 bg-white text-base shadow-sm transition-transform duration-200 group-hover:scale-110 sm:h-11 sm:w-11 sm:text-xl lg:h-14 lg:w-14 lg:text-2xl"
                    style={{ borderColor: p.color }}
                  >
                    {p.icon}
                  </div>

                  <div className="w-full leading-tight">
                    <p
                      className="break-words text-[10px] font-bold sm:text-xs lg:text-sm"
                      style={{ color: p.color }}
                    >
                      {p.name}
                    </p>
                    <p
                      dir="rtl"
                      className="mt-1 text-[8px] text-slate-500 sm:text-[10px]"
                    >
                      {p.arabic}
                    </p>
                  </div>

                  <span className="absolute right-0 top-0 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-slate-200 bg-white text-[8px] text-slate-500 sm:right-1 sm:h-4 sm:w-4 sm:text-[9px]">
                    {index + 1}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Video Cards */}
        {active !== "prophets" && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <article
                  key={video.title}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors hover:border-emerald-300"
                >
                  {/* Image */}
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch ${video.title} on YouTube`}
                    className="relative block aspect-video overflow-hidden bg-slate-100"
                  >
                    <img
                      src={video.image}
                      alt={video.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />

                    <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white">
                        <FaPlay />
                      </span>
                    </span>
                  </a>

                  <div className="p-4 sm:p-5">
                    <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                      {video.title}
                    </h3>

                    <a
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
                    >
                      <FaPlay className="text-xs" />
                      Watch on YouTube →
                    </a>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <FaBookQuran className="mx-auto text-3xl text-emerald-700" />
                <h3 className="mt-3 font-semibold text-slate-900">
                  No resources available yet
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Resources for this category will appear here when available.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SeerahHistory;