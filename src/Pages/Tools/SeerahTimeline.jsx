
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  FaHeartBroken, FaBaby, FaRoute, FaHeart, FaDoorClosed,
  FaBookOpen, FaFemale, FaKaaba, FaExclamationTriangle, FaFlag, FaScroll,
  FaHandshake, FaStar, FaMosque, FaMoon, FaHandHoldingUsd, FaSkullCrossbones,
  FaBan, FaShieldAlt, FaMapMarkedAlt, FaMountain, FaProcedures, FaShip,
  FaHistory,
  FaExternalLinkAlt,
} from "react-icons/fa";

// ---------- থিম (Hikmah) — অপরিবর্তিত ----------
const THEME = {
  bg: "#0B1724",
  primary: "#34D399",
  accent: "#dfbd7b",
  text: "#FFFFFF",
  secondary: "#94A3B8",
};

// জ্বলন্ত লাইনের রঙ = THEME.accent (#dfbd7b)
const GOLD_RGB = "223,189,123";

// ---------- আলোর আচরণ (দরকার হলে এখানে বদলান) ----------
const FRONT = 0.72;     // স্ক্রিনের কত শতাংশ নিচে আলোর "সীমা" থাকবে (0.72 = ৭২%)
const BF = 0.35;        // প্রতিটি সারির মোট অগ্রগতির কত অংশ বাঁকের জন্য (বাকিটা লাইনের)
const EASE = 7;         // যত বেশি, আলো তত দ্রুত স্ক্রলের পিছু নেয়
const MIN_SPEED = 0.9;  // আলোর সর্বনিম্ন গতি (সারি/সেকেন্ড), যাতে শেষ অংশটাও সুন্দরভাবে শেষ হয়
const SNAP = 2.5;       // এতগুলো সারির বেশি দূরে থাকলে দূরেরগুলো সরাসরি জ্বালিয়ে/নিভিয়ে দেওয়া হয়
const LINE_OFFSET = 20; // সারির নিচ থেকে লাইনের কেন্দ্রের দূরত্ব (px)

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

// ---------- স্ট্যাটিক CSS ----------
// জ্বলা/নেভা, লাইনের ভরাট হওয়া ইত্যাদি সবকিছু স্ক্রল-অবস্থান থেকে JS হিসাব করে inline style-এ বসায়।
// এখানে শুধু শুরুর (অন্ধকার) অবস্থা আর বয়ে চলা আলোর অ্যানিমেশন।
const CSS = `
.sl-ev{opacity:.22;transform:translateY(8px)}
.sl-pt{opacity:.25}

.sl-fill{
  background-image:linear-gradient(90deg,rgba(${GOLD_RGB},.55) 0%,#dfbd7b 35%,#f7e6b9 50%,#dfbd7b 65%,rgba(${GOLD_RGB},.55) 100%);
  background-size:220px 100%;background-repeat:repeat-x;
  clip-path:inset(0 100% 0 0);
}
.sl-fill.sl-rtl{clip-path:inset(0 0 0 100%)}
.sl-core{position:absolute;left:0;right:0;top:5px;height:2px;background:rgba(255,246,222,.85);box-shadow:0 0 6px rgba(${GOLD_RGB},.9)}
.sl-live .sl-fill{animation:slFlowL 2.4s linear infinite}
.sl-live .sl-fill.sl-rtl{animation:slFlowR 2.4s linear infinite}

.sl-bend{clip-path:inset(0 0 100% 0)}

.sl-spark{position:absolute;top:50%;left:0;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:9999px;opacity:0;pointer-events:none;
  background:radial-gradient(circle,rgba(255,247,226,.95) 0%,rgba(${GOLD_RGB},.65) 30%,rgba(${GOLD_RGB},0) 70%)}

@keyframes slFlowL{from{background-position:0 0}to{background-position:220px 0}}
@keyframes slFlowR{from{background-position:0 0}to{background-position:-220px 0}}

@media (prefers-reduced-motion: reduce){
  .sl-live .sl-fill,.sl-live .sl-fill.sl-rtl{animation:none}
  .sl-spark{display:none}
}
`;

// ---------- হেল্পার ----------
const toBn = (n) => String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

// হিজরি + খ্রিষ্টাব্দ তারিখ লেখা
const formatDate = (h, ce) => {
  const hijri = h < 0 ? `হিজরতের ${toBn(-h)} বছর আগে` : `${toBn(h)} হিজরি`;
  return ce ? `${hijri} • ${toBn(ce)} খ্রি.` : hijri;
};

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

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

// SSR-নিরাপদ useLayoutEffect (প্রথম পেইন্টের আগেই সঠিক অবস্থা বসাতে)
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// একটি সারির লাইনের তথ্য: দিক, দৈর্ঘ্য (সারির প্রস্থের ভগ্নাংশ), আলো যেখান থেকে শুরু করে
const getLineInfo = (ri, n, cols) => {
  const isOdd = ri % 2 === 1;
  const frac =
    n === cols ? (ri === 0 ? (cols - 0.5) / cols : (cols - 1) / cols) : (n - 1) / cols;
  const startX = isOdd ? 1 - 0.5 / cols : ri === 0 ? 0 : 0.5 / cols;
  return { isOdd, frac, startX };
};

// ---------- আলো জ্বালানো/নেভানো (সরাসরি DOM style, React re-render ছাড়া) ----------
// f = লাইন কতটা ভরাট (০..১)। ঘরের অবস্থান (at) পার হলেই ঘর জ্বলে ওঠে।
function setLight(item, f, base, dy) {
  const on = clamp01((f - item.at * 0.88) / 0.12);
  if (on === item.on) return;
  item.on = on;
  item.el.style.opacity = String(base + (1 - base) * on);
  if (dy) item.el.style.transform = on >= 1 ? "none" : `translateY(${(1 - on) * dy}px)`;
  const hl = on > 0 && on < 1 ? Math.sin(Math.PI * on) : 0; // জ্বলার মুহূর্তে সোনালি ঝলক
  item.glow.style.filter =
    hl > 0.02
      ? `drop-shadow(0 0 ${(12 * hl).toFixed(1)}px rgba(${GOLD_RGB},${(0.95 * hl).toFixed(2)}))`
      : "";
}

// q = এই সারির অগ্রগতি (০..১): প্রথম BF অংশ বাঁক, বাকিটা লাইন
function applyRow(r, q) {
  if (r.q === q) return;
  r.q = q;

  const b = r.bend ? clamp01(q / BF) : 1;
  const f = r.bend ? clamp01((q - BF) / (1 - BF)) : q;

  if (r.bend) r.bend.style.clipPath = `inset(0 0 ${(1 - b) * 100}% 0)`;

  r.fill.style.clipPath = r.odd
    ? `inset(0 0 0 ${(1 - f) * 100}%)`
    : `inset(0 ${(1 - f) * 100}% 0 0)`;

  const live = f > 0;
  if (live !== r.live) {
    r.live = live;
    r.el.classList.toggle("sl-live", live);
  }

  const edge = Math.min(f / 0.05, (1 - f) / 0.05, 1);
  r.spark.style.opacity = f > 0 && f < 1 ? String(Math.max(0, edge)) : "0";
  r.spark.style.left = `${(r.odd ? 1 - f : f) * 100}%`;

  r.evs.forEach((e) => setLight(e, f, 0.22, 8));
  r.pts.forEach((p) => setLight(p, f, 0.25, 0));
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

// ---------- টাইমলাইন (সারিগুলো) ----------
function Timeline({ cols }) {
  const rootRef = useRef(null);

  // কালানুক্রমিক তালিকাকে cols সংখ্যক করে সারিতে ভাগ করা
  const rows = [];
  for (let i = 0; i < CHRONO.length; i += cols) rows.push(CHRONO.slice(i, i + cols));

  const half = `calc(100% / ${cols * 2})`; // একটি কলামের অর্ধেক (বৃত্তের কেন্দ্র)
  const gridStyle = { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` };
  const glow = `drop-shadow(0 0 5px rgba(${GOLD_RGB},.6))`;

  // স্ক্রল-চালিত আলো: স্ক্রলের অবস্থান থেকে "কতটুকু জ্বলবে" হিসাব হয়,
  // তাই নিচে নামলে আলো সাথে যায়, উপরে উঠলে ফিরে আসে (নিভে যায়)।
  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const items = (el, sel) =>
      Array.from(el.querySelectorAll(sel)).map((node) => ({
        el: node,
        glow: node.querySelector("[data-glow]") || node,
        at: Number(node.dataset.at) || 0,
        on: -1,
      }));

    const rowData = Array.from(root.querySelectorAll("[data-row]")).map((el) => ({
      el,
      odd: el.dataset.odd === "1",
      bend: el.querySelector("[data-bend]"),
      fill: el.querySelector("[data-fill]"),
      spark: el.querySelector("[data-spark]"),
      evs: items(el, "[data-ev]"),
      pts: items(el, "[data-pt]"),
      q: -1,
      live: false,
    }));
    const n = rowData.length;
    if (n === 0) return undefined;

    const render = (p) => {
      for (let i = 0; i < n; i++) applyRow(rowData[i], clamp01(p - i));
    };

    // মোশন কমানোর সেটিং থাকলে সবকিছু একবারে জ্বালিয়ে রাখি
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      render(n);
      return undefined;
    }

    let lines = []; // প্রতিটি সারির লাইনের y-অবস্থান (ডকুমেন্টে)
    let target = 0;
    let P = 0;
    let raf = 0;
    let last = 0;

    const measure = () => {
      const sy = window.scrollY;
      lines = rowData.map(
        (r) => r.el.getBoundingClientRect().top + sy + r.el.offsetHeight - LINE_OFFSET
      );
    };

    // স্ক্রল অবস্থান → আলো কতটুকু এগোবে (সারির এককে)
    const computeTarget = () => {
      const vh = window.innerHeight;
      const sy = window.scrollY;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);
      // একদম নিচে পৌঁছালে সীমা পুরো স্ক্রিনের নিচে চলে যায়, যাতে শেষ সারিও জ্বলে
      const t = clamp01(1 - (maxScroll - sy) / vh);
      const front = sy + vh * (FRONT + (1 - FRONT) * t);

      let p = 0;
      for (let i = 0; i < n; i++) {
        const end = lines[i];
        if (front >= end) {
          p = i + 1;
          continue;
        }
        if (i > 0 && front > lines[i - 1]) {
          p = i + (BF * (front - lines[i - 1])) / (end - lines[i - 1]);
        }
        break;
      }
      return p;
    };

    const tick = (now) => {
      raf = 0;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;

      let diff = target - P;
      if (Math.abs(diff) > SNAP) {
        P = target - Math.sign(diff) * SNAP; // দূরের সারিগুলো সরাসরি ঠিক অবস্থায়
        diff = target - P;
      }
      const eased = diff * (1 - Math.exp(-dt * EASE));
      const minStep = MIN_SPEED * dt;
      P +=
        Math.abs(eased) < minStep
          ? Math.sign(diff) * Math.min(Math.abs(diff), minStep)
          : eased;

      if (Math.abs(target - P) > 0.0005) {
        render(P);
        raf = requestAnimationFrame(tick);
      } else {
        P = target;
        render(P);
      }
    };

    const kick = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const refresh = () => {
      measure();
      target = computeTarget();
      kick();
    };

    // শুরু: যেখানেই পেজ খুলুক, আগের সারিগুলো জ্বলন্ত অবস্থায় থাকবে
    measure();
    target = computeTarget();
    P = Math.max(0, target - SNAP);
    render(P);
    kick();

    const onScroll = () => {
      target = computeTarget();
      kick();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", refresh);
    let ro = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(refresh); // ফন্ট লোড হয়ে সারির উচ্চতা বদলালেও ঠিক থাকবে
      ro.observe(root);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", refresh);
      if (ro) ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef}>
      {rows.map((chunk, ri) => {
        const n = chunk.length;
        const { isOdd, frac, startX } = getLineInfo(ri, n, cols);

        // বিজোড় সারিতে ডান থেকে শুরু: বাম দিকে ফাঁকা ঘর + উল্টানো ইভেন্ট
        const cells = isOdd
          ? [...Array(cols - n).fill(null), ...[...chunk].reverse()]
          : [...chunk, ...Array(cols - n).fill(null)];

        // অসম্পূর্ণ শেষ সারির লাইন যেখানে থামবে
        const emptyOffset = `calc(100% * ${(cols - n) / cols} + 100% / ${cols * 2})`;
        const lineLeft = isOdd ? (n < cols ? emptyOffset : half) : ri === 0 ? 0 : half;
        const lineRight = isOdd ? half : n < cols ? emptyOffset : half;

        // লাইনের কত অংশে পৌঁছালে এই ঘর জ্বলবে (০..১)
        const atFor = (i) =>
          frac <= 0 ? 0 : clamp01(Math.abs((i + 0.5) / cols - startX) / frac).toFixed(4);

        return (
          <div key={ri} data-row="" data-odd={isOdd ? "1" : "0"} className="relative">
            {/* ইভেন্টগুলো */}
            <div className="grid" style={gridStyle}>
              {cells.map((item, i) =>
                item ? (
                  <div
                    key={i}
                    data-ev=""
                    data-at={atFor(i)}
                    className="sl-ev relative z-10 flex flex-col items-center text-center px-1 pb-5 pt-2"
                  >
                    <div data-glow="">
                      <EventIcon type={item[1]} />
                    </div>
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

            {/* এমারেল্ড লাইন (বেস) */}
            <div
              className="absolute h-3"
              style={{
                bottom: 14,
                left: lineLeft,
                right: lineRight,
                backgroundColor: "rgba(52,211,153,0.25)",
              }}
            />

            {/* বাঁক (বেস): গ্রিডের বাইরে দিয়ে যাবে, তাই লেখার উপর পড়বে না */}
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

            {/* ✨ সোনালি বাঁক */}
            {ri > 0 && (
              <div
                className="absolute pointer-events-none"
                style={{
                  top: -26,
                  bottom: 14,
                  width: `calc(${half} + 24px)`,
                  filter: glow,
                  ...(isOdd
                    ? { left: `calc(100% - ${half})` }
                    : { right: `calc(100% - ${half})` }),
                }}
              >
                <div
                  data-bend=""
                  className={`sl-bend h-full w-full border-t-[12px] border-b-[12px] ${
                    isOdd ? "border-r-[12px] rounded-r-full" : "border-l-[12px] rounded-l-full"
                  }`}
                  style={{ borderColor: `rgba(${GOLD_RGB},.9)` }}
                />
              </div>
            )}

            {/* ✨ সোনালি লাইন: আলো বয়ে যায় + মাথায় স্ফুলিঙ্গ */}
            <div
              className="absolute pointer-events-none"
              style={{ bottom: 14, left: lineLeft, right: lineRight, height: 12 }}
            >
              <div className="absolute inset-0" style={{ filter: glow }}>
                <div
                  data-fill=""
                  className={`sl-fill absolute inset-0 ${isOdd ? "sl-rtl" : ""}`}
                >
                  <span className="sl-core" />
                </div>
              </div>
              <span data-spark="" className="sl-spark" />
            </div>

            {/* বয়সের বৃত্ত */}
            <div className="grid h-10 items-center" style={gridStyle}>
              {cells.map((item, i) => (
                <div key={i} className="flex justify-center">
                  {item && (
                    <div data-pt="" data-at={atFor(i)} className="sl-pt relative z-10">
                      <AgeBadge age={item[0]} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------- মূল পেজ ----------
export default function SeerahTimeline() {
  const cols = useCols();

  return (
    <section
      className="min-h-screen"
      style={{
        backgroundColor: THEME.bg,
        color: THEME.text,
        fontFamily: "'Hind Siliguri', sans-serif",
      }}
    >
      <style>{CSS}</style>

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
        {/* key={cols}: স্ক্রিন সাইজের ব্রেকপয়েন্ট বদলালে টাইমলাইন নতুন করে সাজানো হয় */}
        <Timeline key={cols} cols={cols} />

        {/* ব্যাখ্যা */}
        <p className="mt-10 text-xs text-center" style={{ color: THEME.secondary }}>
          বৃত্তের সংখ্যা = নবীজির বয়স • খ্রি. = খ্রিষ্টাব্দ
        </p>
        <div className="mb-5 flex justify-center">
          <a
            href="https://play.google.com/store/apps/details?id=org.gtaf.seerah"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-emerald-400"
          >
            <FaHistory className="shrink-0 text-base text-emerald-500" />
            <span>সিরাত জানতে Seerah of Muhammad ﷺ অ্যাপ ডাউনলোড করুন</span>
            <FaExternalLinkAlt className="shrink-0 text-[10px]" />
          </a>
        </div>
      </div>
    </section>
  );
}
