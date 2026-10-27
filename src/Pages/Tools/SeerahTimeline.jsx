import { useEffect, useState } from "react";
import {
  FaHeartBroken, FaBaby, FaRoute, FaHeart, FaDoorClosed,
  FaBookOpen, FaFemale, FaKaaba, FaExclamationTriangle, FaFlag, FaScroll,
  FaHandshake, FaStar, FaMosque, FaMoon, FaHandHoldingUsd, FaSkullCrossbones,
  FaBan, FaShieldAlt, FaMapMarkedAlt, FaMountain, FaProcedures, FaShip,
} from "react-icons/fa";

// ---------- থিম (Hikmah) ----------
const THEME = {
  bg: "#0B1724",
  primary: "#34D399",
  accent: "#dfbd7b",
  text: "#FFFFFF",
  secondary: "#94A3B8",
};

// ---------- ডেটা ----------
// প্রতিটি আইটেম: [বয়স, আইকন-টাইপ, বর্ণনা, হিজরি সাল (ঋণাত্মক = হিজরতের আগে), খ্রিষ্টাব্দ]
// জোড় সারি বাম→ডান, বিজোড় সারি ডান→বাম কালানুক্রমে।
// নিচে এগুলোকে কালানুক্রমে সাজিয়ে (CHRONO) স্ক্রিন অনুযায়ী নতুন করে সারি বানানো হয়।
const ROWS = [
  [
    [0, "death", "জন্মের কয়েক মাস আগে পিতা আবদুল্লাহ ইন্তেকাল করেন।", -53, 570],
    [0, "birth", "মক্কায় রাসূলুল্লাহ ﷺ-এর জন্ম।", -53, 570],
    [6, "death", "মাতা আমিনার ইন্তেকাল; ৬ বছর বয়সে তিনি এতিম হন।", -47, 577],
    [8, "death", "দাদা আবদুল মুত্তালিবের ইন্তেকাল।", -45, 579],
    [12, "travel", "শামে (সিরিয়া) সফর ও বাহিরার সঙ্গে সাক্ষাৎ।", -41, 583],
    [25, "travel", "খাদিজা (রা.)-এর পক্ষে শামে বাণিজ্য সফর।", -28, 596],
    [25, "marriage", "খাদিজা বিনতু খুওয়াইলিদের সঙ্গে বিবাহ।", -28, 596],
  ],
  [
    [40, "door", "গোপনে দাওয়াত।", -13, 610],
    [40, "quran", "প্রথম ওহী ও নবুওয়াত লাভ।", -13, 610],
    [35, "daughter", "চতুর্থ কন্যা ফাতিমার জন্ম।", -18, 606],
    [35, "kaaba", "গোত্রীয় বিবাদ মীমাংসা ও কাবায় হাজরে আসওয়াদ স্থাপন।", -18, 606],
    [34, "daughter", "তৃতীয় কন্যা উম্মে কুলসুমের জন্ম।", -19, 605],
    [33, "daughter", "দ্বিতীয় কন্যা রুকাইয়ার জন্ম।", -20, 604],
    [30, "daughter", "প্রথম কন্যা যয়নবের জন্ম।", -23, 601],
  ],
  [
    [43, "door", "প্রকাশ্য দাওয়াত।", -10, 613],
    [43, "persecution", "মুসলিমদের উপর নির্যাতন।", -10, 613],
    [43, "death", "ইসলামের প্রথম শহীদ সুমাইয়্যা বিনতু খাইয়্যাত।", -10, 614],
    [46, "migration", "আবিসিনিয়ায় মুসলিমদের প্রথম হিজরত।", -9, 615],
    [47, "convert", "নবীজির চাচা হামযা ইবনু আবদিল মুত্তালিবের ইসলাম গ্রহণ।", -8, 615],
    [47, "convert", "উমর ইবনুল খাত্তাবের ইসলাম গ্রহণ।", -8, 616],
    [49, "scroll", "কুরাইশদের পক্ষ থেকে বনু হাশিমের বয়কট।", -6, 618],
  ],
  [
    [52, "pledge", "প্রথম আকাবার শপথ।", -2, 621],
    [51, "convert", "আবু যার আল-গিফারির ইসলাম গ্রহণ।", -3, 620],
    [50, "miraj", "আল-ইসরা ও আল-মিরাজ।", -3, 620],
    [49, "mountain", "তায়েফে নবীজির সফর।", -4, 619],
    [49, "death", "নবীজির স্ত্রী খাদিজা বিনতু খুওয়াইলিদের ইন্তেকাল।", -4, 619],
    [49, "death", "নবীজির চাচা আবু তালিব ইবনু আবদিল মুত্তালিবের ইন্তেকাল।", -4, 619],
    [49, "migration", "আবিসিনিয়ায় দ্বিতীয় হিজরত।", -7, 619],
  ],
  [
    [52, "map", "মুসআব ইবনু উমাইর মদিনায় যান।", -1, 622],
    [52, "pledge", "দ্বিতীয় আকাবার শপথ।", -1, 622],
    [53, "map", "মক্কা থেকে মদিনায় নবীজির হিজরত।", 1, 622],
    [53, "mosque", "মসজিদে কুবা: ইসলামের ইতিহাসের প্রথম মসজিদ।", 1, 622],
    [53, "mosque", "মসজিদে নববী নির্মাণ।", 1, 622],
    [53, "scroll", "মদিনার সনদ ও ইহুদিদের সাথে চুক্তি।", 1, 622],
    [53, "convert", "সালমান আল-ফারসির ইসলাম গ্রহণ।", 1, 622],
  ],
  [
    [55, "battle", "উহুদের যুদ্ধ।", 3, 625],
    [54, "battle", "বদরের যুদ্ধ।", 2, 624],
    [54, "death", "নবীজির কন্যা রুকাইয়ার ইন্তেকাল।", 2, 623],
    [54, "zakat", "যাকাত ফরজ হয়।", 2, 623],
    [54, "fast", "রমযানের রোযা ফরজ হয়।", 2, 623],
    [54, "kaaba", "কিবলা পরিবর্তন।", 2, 623],
    [53, "convert", "আবদুল্লাহ ইবনু সালামের (পূর্বনাম আল-হুসাইন ইবনু সালাম) ইসলাম গ্রহণ।", 2, 623],
  ],
  [
    [56, "convert", "আবু হুরাইরার ইসলাম গ্রহণ।", 4, 626],
    [56, "ban", "ইসলামে মদ পান নিষিদ্ধ হয়।", 4, 626],
    [57, "battle", "আহযাবের যুদ্ধ (খন্দক)।", 5, null],
    [59, "poison", "নবীজিকে বিষ প্রয়োগ।", 7, 628],
    [59, "kaaba", "২০০০ মুসলিমকে নিয়ে কাযা উমরা।", 7, null],
    [60, "convert", "খালিদ ইবনুল ওয়ালিদের ইসলাম গ্রহণ।", 8, 629],
    [60, "convert", "আমর ইবনুল আসের ইসলাম গ্রহণ।", 8, 629],
  ],
  [
    [61, "kaaba", "আবু বকরের নেতৃত্বে হজ্জ।", 9, 631],
    [61, "battle", "তাবুক অভিযান।", 9, 630],
    [61, "death", "নবীজির কন্যা উম্মে কুলসুমের ইন্তেকাল।", 9, 630],
    [61, "battle", "হুনাইনের যুদ্ধ ও তায়েফ অবরোধ।", 8, 629],
    [60, "kaaba", "মক্কা বিজয়।", 8, 629],
    [60, "death", "নবীজির কন্যা যয়নবের ইন্তেকাল।", 8, 629],
    [60, "battle", "মুতার যুদ্ধ।", 8, 629],
  ],
  [
    [61, "map", "আলী (রা.)-কে ইয়েমেনে প্রেরণ।", 10, 631],
    [62, "mountain", "বিদায় হজ্জ।", 10, 632],
    [62, "map", "মুআয ইবনু জাবাল ও আবু মূসা আল-আশআরিকে ইয়েমেনে প্রেরণ।", 11, 632],
    [62, "ill", "নবীজি ﷺ অসুস্থ হন।", 11, 632],
    [63, "birth", "রাসূলুল্লাহ ﷺ-এর ইন্তেকাল।", 12, 632],
    [63, "death", "নবীজির পর ৬ মাসের মাথায় কন্যা ফাতিমার ইন্তেকাল।", 12, 632],
  ],
];

// আইকন ও রঙ (ডার্ক থিমের জন্য: হালকা রঙ + স্বচ্ছ ব্যাকগ্রাউন্ড)
// লাল = মৃত্যু/যুদ্ধ, গোলাপি = পরিবার, সবুজ = ইসলাম, সোনালি = দাওয়াত/চুক্তি
const ICONS = {
  death: [FaHeartBroken, "text-red-400 bg-red-400/10 ring-red-400/30"],
  birth: [FaBaby, "text-emerald-400 bg-emerald-400/10 ring-emerald-400/30"],
  travel: [FaRoute, "text-sky-400 bg-sky-400/10 ring-sky-400/30"],
  marriage: [FaHeart, "text-pink-400 bg-pink-400/10 ring-pink-400/30"],
  door: [FaDoorClosed, "text-amber-400 bg-amber-400/10 ring-amber-400/30"],
  quran: [FaBookOpen, "text-emerald-400 bg-emerald-400/10 ring-emerald-400/30"],
  daughter: [FaFemale, "text-pink-400 bg-pink-400/10 ring-pink-400/30"],
  kaaba: [FaKaaba, "text-slate-300 bg-slate-400/10 ring-slate-400/30"],
  persecution: [FaExclamationTriangle, "text-red-400 bg-red-400/10 ring-red-400/30"],
  migration: [FaShip, "text-emerald-400 bg-emerald-400/10 ring-emerald-400/30"],
  convert: [FaFlag, "text-emerald-400 bg-emerald-400/10 ring-emerald-400/30"],
  scroll: [FaScroll, "text-amber-400 bg-amber-400/10 ring-amber-400/30"],
  pledge: [FaHandshake, "text-slate-300 bg-slate-400/10 ring-slate-400/30"],
  miraj: [FaStar, "text-indigo-300 bg-indigo-400/10 ring-indigo-400/30"],
  mosque: [FaMosque, "text-emerald-400 bg-emerald-400/10 ring-emerald-400/30"],
  battle: [FaShieldAlt, "text-red-400 bg-red-400/10 ring-red-400/30"],
  zakat: [FaHandHoldingUsd, "text-amber-400 bg-amber-400/10 ring-amber-400/30"],
  fast: [FaMoon, "text-amber-300 bg-amber-300/10 ring-amber-300/30"],
  poison: [FaSkullCrossbones, "text-slate-300 bg-slate-400/10 ring-slate-400/30"],
  ban: [FaBan, "text-red-400 bg-red-400/10 ring-red-400/30"],
  mountain: [FaMountain, "text-amber-400 bg-amber-400/10 ring-amber-400/30"],
  map: [FaMapMarkedAlt, "text-emerald-400 bg-emerald-400/10 ring-emerald-400/30"],
  ill: [FaProcedures, "text-slate-300 bg-slate-400/10 ring-slate-400/30"],
};

// ---------- হেল্পার ----------
const toBn = (n) => String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

// হিজরি + খ্রিষ্টাব্দ তারিখ লেখা
const formatDate = (h, ce) => {
  const hijri = h < 0 ? `হিজরতের ${toBn(-h)} বছর আগে` : `${toBn(h)} হিজরি`;
  return ce ? `${hijri} • ${toBn(ce)} খ্রি.` : hijri;
};

// কালানুক্রমে সাজানো সব ইভেন্ট (বিজোড় সারি উল্টে নিই)
const CHRONO = ROWS.flatMap((row, i) => (i % 2 ? [...row].reverse() : row));

// স্ক্রিন অনুযায়ী প্রতি সারিতে কয়টি ইভেন্ট: মোবাইল ৩, ট্যাবলেট ৪, ডেস্কটপ ৭
const getCols = () => {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth >= 1024) return 7;
  if (window.innerWidth >= 640) return 4;
  return 3;
};

function useCols() {
  const [cols, setCols] = useState(getCols);
  useEffect(() => {
    const onResize = () => setCols(getCols());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return cols;
}

// ---------- ছোট কম্পোনেন্ট ----------
function EventIcon({ type }) {
  const [Icon, color] = ICONS[type];
  return (
    <div
      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl shrink-0 ring-1 ${color}`}
    >
      <Icon />
    </div>
  );
}

function AgeBadge({ age }) {
  return (
    <div
      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full text-sm sm:text-base font-bold flex items-center justify-center ring-4 shadow z-10"
      style={{
        backgroundColor: THEME.primary,
        color: THEME.bg,
        "--tw-ring-color": THEME.bg, // বৃত্তের চারপাশে ব্যাকগ্রাউন্ডের রঙের রিং
      }}
    >
      {toBn(age)}
    </div>
  );
}

// ---------- মূল পেজ ----------
export default function SeerahTimeline() {
  const cols = useCols();

  // কালানুক্রমিক তালিকাকে cols সংখ্যক করে সারিতে ভাগ করা
  const rows = [];
  for (let i = 0; i < CHRONO.length; i += cols) rows.push(CHRONO.slice(i, i + cols));

  const half = `calc(100% / ${cols * 2})`; // একটি কলামের অর্ধেক (বৃত্তের কেন্দ্র)
  const gridStyle = { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` };

  return (
    <section
      className="min-h-screen"
      style={{
        backgroundColor: THEME.bg,
        color: THEME.text,
        fontFamily: "'Hind Siliguri', sans-serif",
      }}
    >
      {/* হেডার */}
      <div
        className="text-center px-4 py-8 md:py-10 border-b"
        style={{ borderColor: "rgba(52,211,153,0.25)" }}
      >
        <h1 className="text-2xl md:text-4xl font-bold" style={{ color: THEME.accent }}>
          নবী ﷺ-এর জীবনের টাইমলাইন
        </h1>
        <p
          className="mt-3 text-sm md:text-base max-w-3xl mx-auto"
          style={{ color: THEME.secondary }}
        >
          “আর আমি আপনাকে সমগ্র জগতের জন্য রহমত স্বরূপই প্রেরণ করেছি।” (সূরা আল-আম্বিয়া ২১:১০৭)
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-8 sm:px-12 overflow-hidden">
        {rows.map((chunk, ri) => {
          const n = chunk.length;
          const isOdd = ri % 2 === 1;
          // বিজোড় সারিতে ডান থেকে শুরু: বাম দিকে ফাঁকা ঘর + উল্টানো ইভেন্ট
          const cells = isOdd
            ? [...Array(cols - n).fill(null), ...[...chunk].reverse()]
            : [...chunk, ...Array(cols - n).fill(null)];

          // অসম্পূর্ণ শেষ সারির লাইন যেখানে থামবে
          const emptyOffset = `calc(100% * ${(cols - n) / cols} + 100% / ${cols * 2})`;
          const lineLeft = isOdd ? (n < cols ? emptyOffset : half) : ri === 0 ? 0 : half;
          const lineRight = isOdd ? half : n < cols ? emptyOffset : half;

          return (
            <div key={ri} className="relative">
              {/* ইভেন্টগুলো */}
              <div className="grid" style={gridStyle}>
                {cells.map((item, i) =>
                  item ? (
                    <div
                      key={i}
                      className="relative z-10 flex flex-col items-center text-center px-1 pb-5 pt-2"
                    >
                      <EventIcon type={item[1]} />
                      <p className="mt-2 text-[12px] sm:text-[13px] leading-snug text-white">
                        {item[2]}
                      </p>
                      <p
                        className="mt-1 text-[10px] sm:text-[11px] leading-tight"
                        style={{ color: THEME.secondary }}
                      >
                        {formatDate(item[3], item[4])}
                      </p>
                    </div>
                  ) : (
                    <div key={i} />
                  )
                )}
              </div>

              {/* এমারেল্ড লাইন */}
              <div
                className="absolute h-3"
                style={{
                  bottom: 14,
                  left: lineLeft,
                  right: lineRight,
                  backgroundColor: "rgba(52,211,153,0.25)",
                }}
              />

              {/* বাঁক: গ্রিডের বাইরে দিয়ে যাবে, তাই লেখার উপর পড়বে না */}
              {ri > 0 && (
                <div
                  className={`absolute border-t-[12px] border-b-[12px] ${
                    isOdd ? "border-r-[12px] rounded-r-full" : "border-l-[12px] rounded-l-full"
                  }`}
                  style={{
                    top: -26,
                    bottom: 14,
                    width: `calc(${half} + 24px)`,
                    borderColor: "rgba(52,211,153,0.25)",
                    ...(isOdd
                      ? { left: `calc(100% - ${half})` }
                      : { right: `calc(100% - ${half})` }),
                  }}
                />
              )}

              {/* বয়সের বৃত্ত */}
              <div className="grid h-10 items-center" style={gridStyle}>
                {cells.map((item, i) => (
                  <div key={i} className="flex justify-center">
                    {item && <AgeBadge age={item[0]} />}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* ব্যাখ্যা */}
        <p className="mt-10 text-xs text-center" style={{ color: THEME.secondary }}>
          বৃত্তের সংখ্যা = নবীজির বয়স • খ্রি. = খ্রিষ্টাব্দ
        </p>
      </div>
    </section>
  );
}