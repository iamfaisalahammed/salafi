import { useState } from "react";
import { FaPlay, FaBookQuran, FaGraduationCap, FaLandmark } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";

const categories = [
  {
    id: "prophets",
    name: "All Prophets",
    icon: <FaBookQuran />,
  },
  {
    id: "seerah",
    name: "Seerah of Prophet ﷺ",
    icon: <FaBookQuran />,
  },
  {
    id: "sahabah",
    name: "Sahabah",
    icon: <FaUserFriends />,
  },
  {
    id: "scholars",
    name: "Great Scholars",
    icon: <FaGraduationCap />,
  },
  {
    id: "history",
    name: "Islamic History",
    icon: <FaLandmark />,
  },
];

const videos = [
  {
    category: "seerah",
    title: "Life of Prophet Muhammad ﷺ",
    image: "https://i.ibb.co.com/example.jpg",
    link: "https://youtube.com",
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
  { name: "Adam", arabic: "عليه السلام", icon: "🌳", color: "#4ADE80" },
  { name: "Idris", arabic: "عليه السلام", icon: "⛰️", color: "#38BDF8" },
  { name: "Nuh", arabic: "عليه السلام", icon: "🚢", color: "#F472B6" },
  { name: "Hud", arabic: "عليه السلام", icon: "🌪️", color: "#A78BFA" },
  { name: "Saleh", arabic: "عليه السلام", icon: "🐪", color: "#FB923C" },
  { name: "Ibrahim", arabic: "عليه السلام", icon: "🔥", color: "#F87171" },
  { name: "Lut", arabic: "عليه السلام", icon: "🏙️", color: "#FBBF24" },
  { name: "Ismail", arabic: "عليه السلام", icon: "🐑", color: "#34D399" },
  { name: "Ishaq", arabic: "عليه السلام", icon: "🕊️", color: "#60A5FA" },
  { name: "Yaqub", arabic: "عليه السلام", icon: "🏕️", color: "#C084FC" },
  { name: "Yusuf", arabic: "عليه السلام", icon: "🪣", color: "#FCD34D" },
  { name: "Ayyub", arabic: "عليه السلام", icon: "⏳", color: "#F97316" },
  { name: "Shuaib", arabic: "عليه السلام", icon: "⚡", color: "#818CF8" },
  { name: "Musa", arabic: "عليه السلام", icon: "🌊", color: "#22D3EE" },
  { name: "Harun", arabic: "عليه السلام", icon: "🪄", color: "#4ADE80" },
  { name: "Dhul-Kifl", arabic: "عليه السلام", icon: "🕯️", color: "#FB7185" },
  { name: "Dawud", arabic: "عليه السلام", icon: "👑", color: "#FBBF24" },
  { name: "Sulaiman", arabic: "عليه السلام", icon: "🦜", color: "#4ADE80" },
  { name: "Ilyas", arabic: "عليه السلام", icon: "✨", color: "#60A5FA" },
  { name: "Alyasa", arabic: "عليه السلام", icon: "🌟", color: "#F472B6" },
  { name: "Yunus", arabic: "عليه السلام", icon: "🐋", color: "#38BDF8" },
  { name: "Zakariya", arabic: "عليه السلام", icon: "🌿", color: "#34D399" },
  { name: "Yahya", arabic: "عليه السلام", icon: "📖", color: "#A78BFA" },
  { name: "Isa", arabic: "عليه السلام", icon: "🧺", color: "#FBBF24" },
  { name: "Muhammad", arabic: "ﷺ", icon: "🕋", color: "#F87171" },
];

// Snake the 25 prophets through a 5-column grid, alternating direction
// each row, so the connecting path winds left-right-left like a river.
const COLS = 5;
const ROW_HEIGHT = 190;
const rows = Math.ceil(prophets.length / COLS);

const prophetNodes = prophets.map((p, i) => {
  const row = Math.floor(i / COLS);
  const posInRow = i % COLS;
  const col = row % 2 === 0 ? posInRow : COLS - 1 - posInRow;
  return {
    ...p,
    x: (col / (COLS - 1)) * 100, // percentage across width
    y: row * ROW_HEIGHT + ROW_HEIGHT / 2, // px down the track
  };
});

const pathHeight = rows * ROW_HEIGHT;

// Build a smooth dashed path through every node's center.
const buildPath = (nodes) => {
  if (nodes.length === 0) return "";
  const toXY = (n) => [(n.x / 100) * 1000, n.y];
  let d = `M ${toXY(nodes[0])[0]} ${toXY(nodes[0])[1]}`;
  for (let i = 1; i < nodes.length; i++) {
    const [x0, y0] = toXY(nodes[i - 1]);
    const [x1, y1] = toXY(nodes[i]);
    const midY = (y0 + y1) / 2;
    d += ` C ${x0} ${midY}, ${x1} ${midY}, ${x1} ${y1}`;
  }
  return d;
};

const SeerahHistory = () => {
  const [active, setActive] = useState("prophets");

  const filteredVideos = videos.filter((item) => item.category === active);

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-green-950 to-slate-900 py-20 px-5">
      {/* Title */}
      <div className="text-center mb-12 text-white">
        <h1 className="text-4xl md:text-5xl font-bold">Islamic Legacy</h1>
        <p className="mt-3 text-gray-300">
          Explore Prophets, Seerah, Sahabah & Islamic History
        </p>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`
            flex items-center gap-2 px-5 py-3 rounded-full
            border transition duration-300
            ${
              active === item.id
                ? "bg-green-600 text-white border-green-500"
                : "bg-white/10 text-gray-200 border-white/20 hover:bg-white/20"
            }
            `}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </div>

      {/* All Prophets — winding path timeline */}
      {active === "prophets" && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white text-2xl font-bold text-center mb-2">
            Prophets in Islam
          </h2>
          <p className="text-gray-400 text-center mb-10 text-sm">
            25 Prophets mentioned in the Qur'an
          </p>

          {/* Desktop / tablet: winding snake path */}
          <div
            className="relative hidden md:block"
            style={{ height: pathHeight }}
          >
            <svg
              viewBox={`0 0 1000 ${pathHeight}`}
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              <path
                d={buildPath(prophetNodes)}
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="3"
                strokeDasharray="10 10"
                strokeLinecap="round"
              />
            </svg>

            {prophetNodes.map((p, index) => (
              <div
                key={p.name}
                className="absolute flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${p.x}%`, top: p.y }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl bg-white/10 backdrop-blur-md border-2 shadow-lg transition-transform duration-300 group-hover:scale-110"
                  style={{ borderColor: p.color }}
                >
                  {p.icon}
                </div>
                <div className="text-center leading-tight whitespace-nowrap">
                  <p
                    className="font-bold text-sm"
                    style={{ color: p.color }}
                  >
                    {p.name}
                  </p>
                  <p className="text-[10px] text-gray-400">{p.arabic}</p>
                </div>
                <span className="absolute -top-3 -right-3 text-[10px] w-5 h-5 rounded-full bg-black/60 border border-white/20 text-gray-300 flex items-center justify-center">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile: simple vertical timeline */}
          <div className="md:hidden relative pl-8">
            <div className="absolute left-[27px] top-2 bottom-2 border-l-2 border-dashed border-white/20" />
            <div className="space-y-5">
              {prophets.map((p, index) => (
                <div key={p.name} className="relative flex items-center gap-4">
                  <div
                    className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-xl bg-white/10 border-2 z-10"
                    style={{ borderColor: p.color }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <p className="font-bold" style={{ color: p.color }}>
                      {index + 1}. {p.name}
                    </p>
                    <p className="text-xs text-gray-400">{p.arabic}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Video Cards */}
      {active !== "prophets" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 hover:-translate-y-2 transition duration-300"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={video.image}
                  alt={video.title}
                  className="w-full h-52 object-cover"
                />

                <a
                  href={video.link}
                  target="_blank"
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition"
                >
                  <div className="bg-red-600 w-14 h-14 rounded-full flex items-center justify-center text-white text-xl">
                    <FaPlay />
                  </div>
                </a>
              </div>

              <div className="p-5 text-white">
                <h3 className="font-bold text-lg">{video.title}</h3>

                <button
                  onClick={() => window.open(video.link)}
                  className="mt-4 text-green-400"
                >
                  Watch on YouTube →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SeerahHistory;
