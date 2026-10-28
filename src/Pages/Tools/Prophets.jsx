import { useEffect, useLayoutEffect, useRef, useState } from "react";

// শাজারাহ-ই-আম্বিয়া: Hikmah Emerald + Gold Theme (+ স্ক্রল-চালিত সোনালি আলো)

const GOLD = "#dfbd7b";
const DIM = "0.38"; // ম্লান অবস্থার উজ্জ্বলতা (০.৩ = বেশি অন্ধকার, ০.৫ = কম অন্ধকার)

const sections = [
  {
    id: "adam",
    title: "আদম (আ.) ও তাঁর সন্তান",
    nodes: [
      { name: "আদম", en: "Adam", kind: "prophet" },
      { name: "শীষ", en: "Seth (Sheesh)", kind: "prophet", sub: true, relation: "পুত্র", book: { type: "suhuf", text: "৫০ সুহুফ" } },
      { name: "কাবিল", en: "Qabil (Cain)", kind: "notProphet", sub: true, relation: "পুত্র", note: "নবী নন" },
      { name: "হাবিল", en: "Abel (Habil)", kind: "family", sub: true, relation: "পুত্র" },
    ],
  },
  {
    id: "idrees-nuh",
    title: "ইদরিস ও নূহ (আ.)",
    nodes: [
      { name: "ইদরিস", en: "Idrees", kind: "prophet", book: { type: "suhuf", text: "৩০ সুহুফ" } },
      { name: "নূহ", en: "Noah (Nuh)", kind: "prophet" },
      { name: "হাম", en: "Ham", kind: "family", sub: true, relation: "পুত্র" },
      { name: "সাম", en: "Sam", kind: "family", sub: true, relation: "পুত্র" },
      { name: "ইয়াফিস", en: "Yafith", kind: "family", sub: true, relation: "পুত্র" },
      { name: "কিনআন", en: "Kan'an", kind: "notProphet", sub: true, relation: "পুত্র", note: "নবী নন" },
    ],
  },
  {
    id: "sam-line",
    title: "সাম-এর বংশধারা",
    nodes: [
      { name: "ইরাম", en: "Iram", kind: "family" },
      { name: "আদ", en: "Ad ('Ad)", kind: "family" },
      { name: "হুদ", en: "Hud", kind: "prophet" },
      { name: "সালিহ", en: "Saleh", kind: "prophet", note: "সামূদ জাতির নবী" },
    ],
  },
  {
    id: "ibrahim",
    title: "ইবরাহীম (আ.)",
    nodes: [
      { name: "ইবরাহীম", en: "Abraham (Ibrahim)", kind: "prophet", book: { type: "suhuf", text: "১০ সুহুফ" } },
      { name: "সারাহ", en: "Sarah", kind: "family", sub: true, relation: "প্রথম স্ত্রী" },
      { name: "হাজেরা", en: "Hajra", kind: "family", sub: true, relation: "দ্বিতীয় স্ত্রী" },
      { name: "কাতুরা", en: "Qaturah", kind: "family", sub: true, relation: "তৃতীয় স্ত্রী" },
      { name: "লূত", en: "Lut (Lot)", kind: "prophet", sub: true },
      { name: "ইউনুস", en: "Yunus (Jonah)", kind: "prophet", note: "চার্টে সরাসরি কোনো সংযোগ নেই" },
    ],
  },
  {
    id: "qaturah",
    title: "কাতুরার বংশ",
    nodes: [
      { name: "মাদইয়ান", en: "Madyan", kind: "family" },
      { name: "শুআইব", en: "Shu'aib", kind: "prophet", note: "মাদইয়ানবাসীর নবী" },
    ],
  },
  {
    id: "ishaq",
    title: "ইসহাক, ইয়াকুব ও বনী ইসরাঈল",
    nodes: [
      { name: "ইসহাক", en: "Isaac (Ishaq)", kind: "prophet" },
      { name: "ইয়াকুব", en: "Jacob (Yaqub)", kind: "prophet" },
      { name: "ইউসুফ", en: "Joseph (Yusuf)", kind: "prophet", sub: true, relation: "পুত্র" },
      { name: "বিনইয়ামিন", en: "Binyamin", kind: "family", sub: true, relation: "পুত্র" },
      { name: "অন্য ১০ পুত্র", en: "Other sons", kind: "family", sub: true, relation: "পুত্র" },
      { name: "বনী ইসরাঈল", en: "Bani Israil", kind: "family", note: "ইয়াকুব (আ.)-এর ১২ পুত্রের বংশধর জাতি/জনগোষ্ঠী" },
    ],
  },
  {
    id: "bani-israil",
    title: "বনী ইসরাঈলের নবীগণ",
    nodes: [
      { name: "মূসা", en: "Moses (Musa)", kind: "prophet", book: { type: "kitab", text: "তাওরাত" } },
      { name: "হারুন", en: "Aaron (Haroon)", kind: "prophet" },
      { name: "ইলিয়াস", en: "Iliyas (Eliyas)", kind: "prophet", sub: true },
      { name: "ইউশা বিন নূন", en: "Yusha bin Noon", kind: "prophet" },
      { name: "শামুয়েল", en: "Samuel", kind: "prophet" },
      { name: "আইয়ুব", en: "Job (Ayyub)", kind: "prophet" },
      { name: "দাউদ", en: "David (Dawood)", kind: "prophet", book: { type: "kitab", text: "যাবুর" } },
      { name: "সুলাইমান", en: "Solomon (Sulaiman)", kind: "prophet" },
      { name: "যাকারিয়া", en: "Zakariya", kind: "prophet" },
      { name: "ইয়াহইয়া", en: "Yahya", kind: "prophet" },
    ],
  },
  {
    id: "imran",
    title: "আল-ই-ইমরান",
    nodes: [
      { name: "ইমরান", en: "Imran", kind: "family" },
      { name: "ইমরানের স্ত্রী", en: "Imra'atu 'Imran", kind: "family", note: "কুরআন ৩:৩৫। রিওয়ায়াত অনুযায়ী নাম: হান্না বিনতে ফাকূদ" },
      { name: "মারইয়াম", en: "Maryam", kind: "family" },
      { name: "ঈসা", en: "Jesus (Isa)", kind: "prophet", book: { type: "kitab", text: "ইঞ্জিল" } },
    ],
  },
  {
    id: "ismail",
    title: "ইসমাঈল (আ.) ও শেষ নবী",
    nodes: [
      { name: "ইসমাঈল", en: "Isma'il", kind: "prophet" },
      { name: "মুহাম্মাদ ﷺ", en: "Muhammad (Last Prophet)", kind: "prophet", book: { type: "kitab", text: "কুরআন" }, highlight: true },
    ],
  },
];



const fourBooks = [
  { book: "তাওরাত", to: "মূসা (আ.)" },
  { book: "যাবুর", to: "দাউদ (আ.)" },
  { book: "ইঞ্জিল", to: "ঈসা (আ.)" },
  { book: "কুরআন", to: "মুহাম্মাদ ﷺ" },
];

const filters = [
  { key: "all", label: "সব" },
  { key: "prophet", label: "নবী", dot: "bg-emerald-400" },
  { key: "notProphet", label: "নবী নন", dot: "bg-rose-400" },
  { key: "family", label: "পরিবার", dot: "bg-slate-400" },
];

const dotStyle = {
  prophet: "bg-emerald-400",
  notProphet: "bg-rose-400",
  family: "bg-slate-400",
};

const bookStyle = {
  suhuf: "bg-amber-400/10 text-amber-300 border border-amber-400/20",
  kitab: "bg-emerald-400/10 text-emerald-300 border border-emerald-400/20",
};

const hideScrollbar = "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden";
const bn = (n) => n.toLocaleString("bn-BD");

// ---------------------------------------------------------------------------
// আলোর ইফেক্টের সাধারণ অংশ (CSS + স্ক্রল হেল্পার)
// ---------------------------------------------------------------------------

const glowCss = `
.gl-t { transition: opacity .5s ease .09s; }
.gl-flow {
  background: linear-gradient(180deg, rgba(223,189,123,.55) 0%, #dfbd7b 35%, rgba(223,189,123,.95) 50%, #dfbd7b 65%, rgba(223,189,123,.55) 100%);
  background-size: 100% 160px;
  animation: gl-flow 2.2s linear infinite;
  box-shadow: 0 0 6px 1px rgba(223,189,123,.55), 0 0 14px 2px rgba(223,189,123,.25);
}
@keyframes gl-flow { from { background-position: 0 0; } to { background-position: 0 160px; } }
@media (prefers-reduced-motion: reduce) {
  .gl-t { transition: none; }
  .gl-flow { animation: none; }
}
`;

const smoothBehavior = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

// স্ক্রিনের যে উচ্চতা পর্যন্ত আলো পৌঁছাবে (ভিউপোর্টের ওপর থেকে px)।
// একদম নিচে পৌঁছালে Infinity, ফলে শেষ সারিও পুরো জ্বলে।
const getAnchor = () => {
  const vh = window.innerHeight;
  const remaining =
    document.documentElement.scrollHeight - (window.scrollY + vh);
  if (remaining <= 2) return Infinity;

  const base = vh * 0.62;
  const zone = vh * 0.4;
  if (remaining >= zone) return base;
  return base + (1 - remaining / zone) * (vh * 0.38 + 8);
};

// স্ক্রল/রিসাইজ/লেআউট বদলালে rAF-এ সরাসরি DOM আপডেট (React re-render ছাড়া)
const useScrollGlow = (ref, update) => {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    let raf = 0;
    const run = () => {
      raf = 0;
      update(root);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };

    update(root);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    if (observer) observer.observe(root);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (observer) observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, update]);
};

// ---------------------------------------------------------------------------
// মোবাইল ভিউ
// ---------------------------------------------------------------------------

const updateMobile = (root) => {
  if (!root.getClientRects().length) return;
  const anchor = getAnchor();

  const wraps = Array.from(root.querySelectorAll("[data-gwrap]"));
  const dots = Array.from(root.querySelectorAll("[data-gdot]"));
  const cards = Array.from(root.querySelectorAll("[data-gdim]"));
  const wrapRects = wraps.map((el) => el.getBoundingClientRect());
  const dotRects = dots.map((el) => el.getBoundingClientRect());
  const cardRects = cards.map((el) => el.getBoundingClientRect());

  wraps.forEach((wrap, i) => {
    const r = wrapRects[i];
    const p =
      r.height > 0 ? Math.min(1, Math.max(0, (anchor - r.top) / r.height)) : 0;
    const key = p.toFixed(4);
    if (wrap.dataset.p === key) return;
    wrap.dataset.p = key;

    const line = wrap.querySelector("[data-gline]");
    const head = wrap.querySelector("[data-ghead]");
    if (line) {
      line.style.clipPath =
        p <= 0
          ? "inset(0 0 100% 0)"
          : `inset(-12px -12px ${((1 - p) * 100).toFixed(2)}% -12px)`;
    }
    if (head) {
      head.style.opacity = p > 0 && p < 1 ? "1" : "0";
      head.style.transform = `translateY(${(p * r.height - 4).toFixed(1)}px)`;
    }
  });

  dots.forEach((el, i) => {
    const r = dotRects[i];
    const on = r.top + r.height / 2 <= anchor ? "1" : "0";
    if (el.dataset.on !== on) {
      el.dataset.on = on;
      el.style.opacity = on;
    }
  });

  cards.forEach((el, i) => {
    const r = cardRects[i];
    const on = r.top + Math.min(r.height / 2, 24) <= anchor ? "1" : DIM;
    if (el.dataset.on !== on) {
      el.dataset.on = on;
      el.style.opacity = on;
    }
  });

  const topBtn = root.querySelector("[data-gtop]");
  if (topBtn) {
    const show = window.scrollY > 500;
    const state = show ? "1" : "0";
    if (topBtn.dataset.on !== state) {
      topBtn.dataset.on = state;
      topBtn.style.opacity = state;
      topBtn.style.pointerEvents = show ? "auto" : "none";
      topBtn.tabIndex = show ? 0 : -1;
      topBtn.setAttribute("aria-hidden", show ? "false" : "true");
    }
  }
};

const NodeRow = ({ node }) => (
  <li className={`relative ${node.sub ? "ml-5" : ""}`}>
    <span
      className={`absolute top-[18px] h-2.5 w-2.5 rounded-full ring-4 ring-[#0d2229] ${
        dotStyle[node.kind]
      } ${node.sub ? "-left-[46px]" : "-left-[26px]"}`}
    >
      <span
        aria-hidden="true"
        data-gdot
        className="gl-t absolute inset-0 rounded-full"
        style={{
          opacity: 0,
          backgroundColor: GOLD,
          boxShadow: "0 0 8px 2px rgba(223,189,123,.7)",
        }}
      />
    </span>

    <div data-gdim className="gl-t" style={{ opacity: DIM }}>
      <div
        className={`my-1 rounded-xl px-3 py-3 transition-colors ${
          node.highlight
            ? "border border-amber-400/40 bg-gradient-to-r from-emerald-900/70 to-[#102b2d] shadow-lg shadow-emerald-950/20"
            : "border border-white/[0.06] bg-white/[0.025] hover:border-emerald-400/20 hover:bg-emerald-400/[0.04]"
        }`}
      >
        {node.relation && (
          <span className="mb-1 block text-xs text-slate-400">{node.relation}</span>
        )}

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[17px] font-semibold leading-snug text-slate-100">
              {node.name}
              {node.kind === "prophet" && !node.name.includes("ﷺ") && (
                <span className="text-sm font-normal text-slate-400"> (আ.)</span>
              )}
            </h3>
            <p className="text-xs text-slate-400">{node.en}</p>
          </div>

          {node.book && (
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                node.highlight
                  ? "border border-amber-300/30 bg-amber-400/15 text-amber-200"
                  : bookStyle[node.book.type]
              }`}
            >
              {node.book.text}
            </span>
          )}
        </div>

        {node.note && (
          <p className="mt-1 text-sm leading-relaxed text-slate-400">{node.note}</p>
        )}
      </div>
    </div>
  </li>
);

const MobileSection = ({ section, index, nodes, open, onToggle }) => (
  <section
    id={`sec-${section.id}`}
    className="scroll-mt-20 border-b border-white/[0.08]"
  >
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="flex min-h-[60px] w-full items-center gap-3 rounded-xl px-2 text-left transition-colors hover:bg-emerald-400/[0.04] active:bg-emerald-400/[0.08]"
    >
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-400/10 text-sm font-bold text-emerald-300">
        <span
          aria-hidden="true"
          data-gdot
          className="gl-t pointer-events-none absolute -inset-px rounded-full border"
          style={{
            opacity: 0,
            borderColor: "rgba(223,189,123,.85)",
            boxShadow:
              "0 0 10px rgba(223,189,123,.4), inset 0 0 6px rgba(223,189,123,.15)",
          }}
        />
        {bn(index + 1)}
      </span>

      <span className="flex-1 text-base font-bold leading-snug text-slate-100">
        {section.title}
      </span>

      <svg
        className={`h-5 w-5 shrink-0 text-amber-300 transition-transform ${
          open ? "rotate-180" : ""
        }`}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </button>

    {open && (
      <div
        data-gwrap
        className="relative mb-4 ml-4 border-l-2 border-emerald-400/25 pl-5"
      >
        <span
          aria-hidden="true"
          data-gline
          className="gl-flow pointer-events-none absolute -left-[2px] top-0 h-full w-[2px]"
          style={{ clipPath: "inset(0 0 100% 0)" }}
        />
        <span
          aria-hidden="true"
          data-ghead
          className="pointer-events-none absolute top-0 h-2 w-2 rounded-full"
          style={{
            left: -5,
            opacity: 0,
            backgroundColor: GOLD,
            boxShadow: "0 0 8px 3px rgba(223,189,123,.8)",
          }}
        />
        <ol className="list-none">
          {nodes.map((node) => (
            <NodeRow key={node.en} node={node} />
          ))}
        </ol>
      </div>
    )}
  </section>
);

const BlockTitle = ({ children }) => (
  <h2 className="mb-4 flex items-center gap-3 text-lg font-bold text-slate-100">
    <span className="h-6 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-amber-300" />
    {children}
  </h2>
);

const MobileView = () => {
  const rootRef = useRef(null);
  const [filter, setFilter] = useState("all");
  const [closed, setClosed] = useState({});

  useScrollGlow(rootRef, updateMobile);

  // ফিল্টার/সেকশন খোলা-বন্ধ হলে নতুন তৈরি হওয়া অংশের আলো সঙ্গে সঙ্গে ঠিক করা
  useLayoutEffect(() => {
    if (rootRef.current) updateMobile(rootRef.current);
  }, [filter, closed]);

  const visible = sections
    .map((section, index) => ({
      section,
      index,
      nodes:
        filter === "all"
          ? section.nodes
          : section.nodes.filter((node) => node.kind === filter),
    }))
    .filter((item) => item.nodes.length > 0);

  const toggle = (id) =>
    setClosed((prev) => ({ ...prev, [id]: !prev[id] }));

  const jumpTo = (id) => {
    setClosed((prev) => ({ ...prev, [id]: false }));
    requestAnimationFrame(() => {
      document
        .getElementById(`sec-${id}`)
        ?.scrollIntoView({ behavior: smoothBehavior(), block: "start" });
    });
  };

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#081b22] pb-12 font-['Hind_Siliguri'] text-slate-300"
    >
      <div className="mx-auto max-w-2xl px-4">
        <header className="relative overflow-hidden pb-7 pt-9 text-center">
          <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-40 w-64 -translate-x-1/2 rounded-full bg-emerald-500/[0.08] blur-3xl" />

          <div className="relative">
            <span className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3.5 py-2 text-xs font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              নবীগণের বংশধারা
            </span>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              শাজারাহ-ই-আম্বিয়া
            </h1>

            <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-gradient-to-r from-emerald-400 to-amber-300" />

            <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
              আদম (আ.) থেকে মুহাম্মাদ ﷺ পর্যন্ত নবীগণের ধারা
            </p>

            <p className="mx-auto mt-4 inline-flex rounded-xl border border-amber-300/20 bg-amber-300/[0.06] px-3.5 py-2 text-xs leading-relaxed text-amber-200">
              সকল নবী মানবজাতির জন্য আল্লাহর রহমত
            </p>
          </div>
        </header>

        <section aria-label="ব্যক্তি ফিল্টার" className="pb-4">
          <p className="mb-2.5 text-xs font-semibold text-slate-400">
            ধরন অনুযায়ী দেখুন
          </p>

          <div className={`-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 ${hideScrollbar}`}>
            {filters.map((item) => {
              const active = filter === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(item.key)}
                  className={`flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all ${
                    active
                      ? "border-emerald-400 bg-emerald-500 text-[#071b20] shadow-md shadow-emerald-950/30"
                      : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-emerald-400/30 hover:bg-emerald-400/[0.06]"
                  }`}
                >
                  {item.dot && (
                    <span className={`h-2 w-2 rounded-full ${item.dot}`} />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>
        </section>

        <nav
          aria-label="সেকশন নেভিগেশন"
          className="sticky top-0 z-20 -mx-4 border-y border-white/[0.08] bg-[#081b22]/95 px-4 backdrop-blur-xl"
        >
          <div className={`flex gap-2 overflow-x-auto py-3 ${hideScrollbar}`}>
            {visible.map(({ section, index }) => (
              <button
                key={section.id}
                type="button"
                onClick={() => jumpTo(section.id)}
                className="h-9 shrink-0 whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.035] px-3.5 text-sm text-slate-300 transition-colors hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-200"
              >
                {bn(index + 1)}. {section.title}
              </button>
            ))}
          </div>
        </nav>

        <div className="mt-3">
          {visible.map(({ section, index, nodes }) => (
            <MobileSection
              key={section.id}
              section={section}
              index={index}
              nodes={nodes}
              open={!closed[section.id]}
              onToggle={() => toggle(section.id)}
            />
          ))}
        </div>

       

        <section className="mt-9">
          <BlockTitle>চারটি প্রধান আসমানী কিতাব</BlockTitle>
          <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/10 bg-[#0d2229] px-4">
            {fourBooks.map((item) => (
              <li
                key={item.book}
                className="flex items-center justify-between gap-3 py-3.5 text-[15px]"
              >
                <span className="font-semibold text-emerald-300">{item.book}</span>
                <span className="text-right text-slate-300">{item.to}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-emerald-500/[0.08] to-[#0d2229] p-4">
          <h2 className="mb-2 text-base font-bold text-emerald-300">বনী ইসরাঈল</h2>
          <p className="text-[15px] leading-7 text-slate-300">
            ইয়াকুব (আ.)-এর ১২ পুত্র: ইউসুফ, বিনইয়ামিন ও অন্য ১০ জন। তাঁদের বংশধরেরা বনী ইসরাঈল (একটি জাতি/জনগোষ্ঠী)।
          </p>
        </section>

        <section className="mt-4 rounded-2xl border border-amber-300/15 bg-gradient-to-br from-amber-300/[0.06] to-[#0d2229] p-4">
          <h2 className="mb-2 text-base font-bold text-amber-200">ইহুদি (ইয়াহুদ)</h2>
          <p className="text-[15px] leading-7 text-slate-300">
            এটি একটি ধর্মীয় পরিচয়। সব বনী ইসরাঈল ইহুদি ছিল না, তবে ইহুদিরা বনী ইসরাঈলের বংশধারা থেকে এসেছে।
          </p>
        </section>

        <p className="mt-8 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 text-center text-xs leading-6 text-slate-400">
          এই চার্ট একটি সাধারণ সারসংক্ষেপ। কিছু বংশধারা ও ব্যক্তির নবুওয়াত নিয়ে আলিমদের মধ্যে মতভেদ আছে।
        </p>
      </div>

      <button
        type="button"
        data-gtop
        aria-label="উপরে যান"
        aria-hidden="true"
        tabIndex={-1}
        onClick={() =>
          window.scrollTo({ top: 0, behavior: smoothBehavior() })
        }
        style={{ opacity: 0, pointerEvents: "none" }}
        className="fixed bottom-5 right-4 z-30 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-500 text-[#071b20] shadow-xl shadow-black/30 transition hover:bg-emerald-400"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.83l-3.71 3.94a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

// ---------------------------------------------------------------------------
// ট্যাবলেট/ডেস্কটপ বংশবৃক্ষ চার্ট
// ---------------------------------------------------------------------------

const W = 740;
const H = 1110;

const byEn = Object.fromEntries(
  sections.flatMap((section) => section.nodes).map((node) => [node.en, node])
);

const toneStyle = {
  green: "border-emerald-400/50 bg-emerald-400/10",
  blue: "border-emerald-300/30 bg-[#102c32]",
  orange: "border-amber-300/40 bg-amber-300/[0.07]",
  pink: "border-amber-300/50 bg-gradient-to-br from-emerald-900/80 to-[#102b2d]",
  dash: "border-dashed border-amber-300/50 bg-amber-300/[0.05]",
};

const L = (en, x, y, w, h, tone, showNote = false) => ({
  en, x, y, w, h, tone, showNote,
});

const layout = [
  L("Adam", 308, 72, 120, 36, "green"),
  L("Seth (Sheesh)", 193, 114, 100, 58, "green"),
  L("Qabil (Cain)", 322, 114, 92, 40, "pink", true),
  L("Abel (Habil)", 445, 114, 100, 40, "green"),
  L("Idrees", 193, 176, 100, 58, "green"),
  L("Noah (Nuh)", 313, 190, 115, 38, "blue"),
  L("Ham", 213, 242, 76, 24, "orange"),
  L("Sam", 332, 242, 76, 24, "orange"),
  L("Yafith", 452, 242, 76, 24, "orange"),
  L("Kan'an", 605, 242, 122, 40, "dash", true),
  L("Iram", 332, 272, 76, 20, "orange"),
  L("Ad ('Ad)", 332, 297, 76, 20, "orange"),
  L("Hud", 322, 322, 96, 32, "blue"),
  L("Saleh", 322, 359, 96, 40, "orange", true),
  L("Abraham (Ibrahim)", 291, 404, 156, 58, "blue"),
  L("Lut (Lot)", 515, 400, 80, 34, "blue"),
  L("Yunus (Jonah)", 639, 404, 88, 30, "blue"),
  L("Qaturah", 45, 436, 117, 40, "pink"),
  L("Hajra", 466, 436, 100, 40, "pink"),
  L("Sarah", 323, 468, 92, 36, "pink"),
  L("Madyan", 47, 494, 112, 40, "green"),
  L("Shu'aib", 47, 542, 112, 40, "blue", true),
  L("Isma'il", 470, 506, 95, 32, "blue"),
  L("Isaac (Ishaq)", 316, 508, 106, 36, "blue"),
  L("Jacob (Yaqub)", 316, 549, 106, 30, "blue"),
  L("Joseph (Yusuf)", 192, 592, 120, 36, "green"),
  L("Binyamin", 319, 592, 100, 36, "green"),
  L("Other sons", 432, 592, 136, 36, "green"),
  L("Aaron (Haroon)", 252, 684, 108, 38, "blue"),
  L("Moses (Musa)", 379, 684, 112, 58, "blue"),
  L("Iliyas (Eliyas)", 252, 744, 108, 36, "green"),
  L("Yusha bin Noon", 384, 748, 102, 28, "blue"),
  L("Samuel", 384, 780, 102, 28, "orange"),
  L("Job (Ayyub)", 384, 812, 102, 28, "green"),
  L("David (Dawood)", 380, 844, 110, 56, "blue"),
  L("Solomon (Sulaiman)", 380, 906, 110, 28, "green"),
  L("Zakariya", 385, 938, 100, 28, "orange"),
  L("Yahya", 385, 970, 100, 32, "blue"),
  L("Imran", 588, 672, 110, 40, "green"),
  L("Imra'atu 'Imran", 588, 718, 110, 104, "green"),
  L("Maryam", 586, 882, 114, 28, "green"),
  L("Jesus (Isa)", 586, 914, 114, 62, "blue"),
  L("Muhammad (Last Prophet)", 556, 1000, 172, 100, "pink"),
];

const solidPath =
  "M368 108V111 M243 111H495 M243 111V114 M368 111V114 M495 111V114 " +
  "M162 456H466 " +
  "M369 462V468 M369 504V508 M369 544V549 M369 579V582 " +
  "M252 582H500 M252 582V592 M369 582V592 M500 582V592";

const dashedPath =
  "M243 172V176 M293 190H303V209H313 " +
  "M370 228V235 M251 235H490 M251 235V242 M370 235V242 M490 235V242 M490 235H666V242 " +
  "M370 266V272 M370 292V297 M370 317V322 M370 354V359 M370 399V404 " +
  "M291 420H103V436 M447 417H515 M103 476V494 M103 534V542 " +
  "M517 476V506 M565 522H716V1000 " +
  "M575 632H643V640 M306 722V744 M435 742V970 " +
  "M485 952H545V896H586 M643 830V882";

// আলোর পথ: প্রতিটি সাব-পাথকে সেগমেন্টে ভেঙে ক্রমান্বয়ে জ্বালানোর জন্য
const H_SPAN = 18; // আনুভূমিক রেখা জ্বলতে স্ক্রল-দূরত্ব (বাঁক ধাপে ধাপে জ্বলে)

const buildGlow = (d) =>
  d
    .split("M")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const start = s.match(/^(-?[\d.]+)\s+(-?[\d.]+)/);
      let x = Number(start[1]);
      let y = Number(start[2]);
      const origin = y;
      const segs = [];
      let total = 0;

      for (const [, cmd, val] of s.slice(start[0].length).matchAll(/([HV])\s*(-?[\d.]+)/g)) {
        const nx = cmd === "H" ? Number(val) : x;
        const ny = cmd === "V" ? Number(val) : y;
        const len = Math.abs(nx - x) + Math.abs(ny - y);
        segs.push({
          x1: x,
          y1: y,
          x2: nx,
          y2: ny,
          len,
          span: cmd === "H" ? H_SPAN : Math.max(len, 1),
        });
        total += len;
        x = nx;
        y = ny;
      }

      return { d: `M${s}`, origin, segs, total };
    });

const solidGlow = buildGlow(solidPath);
const dashedGlow = buildGlow(dashedPath);
const allGlow = [...solidGlow, ...dashedGlow];

const updateChart = (root) => {
  if (!root.getClientRects().length) return;
  const box = root.querySelector("[data-gchart]");
  if (!box) return;
  const rect = box.getBoundingClientRect();
  if (rect.height <= 0) return;

  // ভিউপোর্টের anchor → চার্টের নিজস্ব কোঅর্ডিনেট
  const ay = (getAnchor() - rect.top) / (rect.height / H);
  const paths = root.querySelectorAll("[data-gp]");
  const heads = root.querySelectorAll("[data-gh]");

  allGlow.forEach((g, i) => {
    const pathEl = paths[i];
    const headEl = heads[i];
    if (!pathEl || !headEl) return;

    let u = ay - g.origin;
    let lit = 0;
    for (const s of g.segs) {
      const take = Math.min(1, Math.max(0, u / s.span));
      lit += s.len * take;
      if (take < 1) break;
      u -= s.span;
    }
    lit = Math.round(lit * 2) / 2;

    const key = String(lit);
    if (pathEl.dataset.l === key) return;
    pathEl.dataset.l = key;
    pathEl.style.strokeDasharray = `${lit} ${g.total + 10}`;

    if (lit > 0 && lit < g.total) {
      let rem = lit;
      let hx = g.segs[0].x1;
      let hy = g.segs[0].y1;
      for (const s of g.segs) {
        if (rem <= s.len) {
          const t = s.len > 0 ? rem / s.len : 0;
          hx = s.x1 + (s.x2 - s.x1) * t;
          hy = s.y1 + (s.y2 - s.y1) * t;
          break;
        }
        rem -= s.len;
      }
      headEl.setAttribute("cx", hx.toFixed(1));
      headEl.setAttribute("cy", hy.toFixed(1));
      headEl.style.opacity = "1";
    } else {
      headEl.style.opacity = "0";
    }
  });

  root.querySelectorAll("[data-gn]").forEach((el) => {
    const on = ay >= Number(el.dataset.gn) ? "1" : "0";
    if (el.dataset.on !== on) {
      el.dataset.on = on;
      el.style.opacity = on;
    }
  });

  root.querySelectorAll("[data-gd]").forEach((el) => {
    const on = ay >= Number(el.dataset.gd) ? "1" : DIM;
    if (el.dataset.on !== on) {
      el.dataset.on = on;
      el.style.opacity = on;
    }
  });
};

const TreeNode = ({ item }) => {
  const node = byEn[item.en];
  if (!node) return null;

  const twoLine = item.h >= 36;
  const sub = item.showNote && node.note ? node.note : node.en;
  const isLast = node.highlight;

  return (
    <div
      data-gd={item.y + 8}
      className={`gl-t absolute flex flex-col items-center justify-center gap-1 rounded-lg border px-1 py-1 text-center shadow-md shadow-black/10 ${
        toneStyle[item.tone]
      } ${isLast ? "ring-2 ring-amber-300/60" : ""}`}
      style={{ left: item.x, top: item.y, width: item.w, height: item.h, opacity: DIM }}
    >
      <span
        aria-hidden="true"
        data-gn={item.y + 8}
        className="gl-t pointer-events-none absolute -inset-px rounded-lg border"
        style={{
          opacity: 0,
          borderColor: "rgba(223,189,123,.85)",
          boxShadow:
            "0 0 10px rgba(223,189,123,.4), inset 0 0 8px rgba(223,189,123,.15)",
        }}
      />

      <div>
        <h3 className="text-[13px] font-bold leading-4 text-slate-100">
          {node.name}
          {node.kind === "prophet" && !node.name.includes("ﷺ") && (
            <span className="text-[10px] font-normal text-slate-400"> (আ.)</span>
          )}
        </h3>
        {twoLine && <p className="text-[10px] leading-3 text-slate-400">{sub}</p>}
      </div>

      {item.h >= 60 && node.note && !item.showNote && (
        <p className="px-1 text-[10px] leading-3 text-slate-300">{node.note}</p>
      )}

      {node.book && (
        <span
          className={`rounded-md border px-2 py-0.5 text-[11px] font-bold ${
            isLast
              ? "border-amber-300/30 bg-amber-300/15 text-amber-200"
              : bookStyle[node.book.type]
          }`}
        >
          {node.book.text}
        </span>
      )}
    </div>
  );
};

const Box = ({ x, y, w, h, className = "", children }) => (
  <div
    className={`absolute ${className}`}
    style={{ left: x, top: y, width: w, height: h }}
  >
    {children}
  </div>
);

const PedigreeChart = () => {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);

  useScrollGlow(wrapRef, updateChart);

  useEffect(() => {
    const element = wrapRef.current;
    if (!element) return undefined;

    const update = () => {
      if (element.clientWidth > 0) {
        setScale(Math.min(element.clientWidth / W, 1.4));
      }
    };

    update();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }

    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="mx-auto w-full max-w-[1040px]">
      <div
        data-gchart
        className="mx-auto"
        style={{ width: W * scale, height: H * scale }}
      >
        <div
          className="relative"
          style={{
            width: W,
            height: H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <svg className="absolute left-0 top-0" width={W} height={H} fill="none">
            <path d={solidPath} stroke="#34d399" strokeWidth="1.8" />
            <path d={dashedPath} stroke="#d2aa69" strokeWidth="1.2" strokeDasharray="4 3" />
          </svg>

          {/* সোনালি আলোর স্তর */}
          <svg
            className="pointer-events-none absolute left-0 top-0"
            width={W}
            height={H}
            fill="none"
            aria-hidden="true"
            style={{ filter: "drop-shadow(0 0 2.5px rgba(223,189,123,.85))" }}
          >
            <defs>
              <mask
                id="gl-dash-mask"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width={W}
                height={H}
              >
                <path
                  d={dashedPath}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                />
              </mask>
            </defs>

            <g>
              {solidGlow.map((g, i) => (
                <path
                  key={`s-${i}`}
                  data-gp
                  d={g.d}
                  stroke={GOLD}
                  strokeWidth="1.8"
                  style={{ strokeDasharray: `0 ${g.total + 10}` }}
                />
              ))}
            </g>

            <g mask="url(#gl-dash-mask)">
              {dashedGlow.map((g, i) => (
                <path
                  key={`d-${i}`}
                  data-gp
                  d={g.d}
                  stroke={GOLD}
                  strokeWidth="1.2"
                  style={{ strokeDasharray: `0 ${g.total + 10}` }}
                />
              ))}
            </g>

            <g>
              {allGlow.map((g, i) => (
                <circle
                  key={`h-${i}`}
                  data-gh
                  cx="0"
                  cy="0"
                  r="2.4"
                  fill={GOLD}
                  style={{ opacity: 0 }}
                />
              ))}
            </g>
          </svg>

          <Box
            x={195}
            y={4}
            w={350}
            h={62}
            className="flex flex-col items-center justify-center rounded-2xl border border-amber-300/40 bg-gradient-to-b from-[#173a36] to-[#0d2229] text-center shadow-lg shadow-black/20"
          >
            <h1 className="text-[26px] font-bold leading-8 text-amber-200">
              শাজারাহ-ই-আম্বিয়া
            </h1>
            <p className="text-[12px] text-slate-300">
              আদম (আ.) থেকে মুহাম্মাদ ﷺ পর্যন্ত নবীগণের ধারা
            </p>
          </Box>

          <Box
            x={18}
            y={10}
            w={150}
            h={92}
            className="flex flex-col items-center justify-center rounded-xl border border-emerald-400/20 bg-[#102c30] px-3 text-center shadow-sm"
          >
            <p className="text-[13px] font-medium leading-5 text-slate-200">
              সকল নবী মানবজাতির জন্য আল্লাহর রহমত
            </p>
            <span className="mt-2 h-px w-20 bg-amber-300/70" />
          </Box>

          <Box
            x={556}
            y={8}
            w={172}
            h={94}
            className="rounded-xl border border-white/10 bg-[#0d2229] p-2 text-[10px] leading-3 text-slate-300 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="h-0 w-8 shrink-0 border-t-2 border-emerald-400" />
              <b className="text-xs text-emerald-300">সরল রেখা</b>
            </div>
            <p className="mb-1.5 mt-0.5">
              শুধু আদম (আ.)-এর তিন পুত্র, ইবরাহীম (আ.)-এর সরাসরি সন্তান ও ইয়াকুব → তাঁর পুত্রগণ
            </p>
            <div className="flex items-center gap-2">
              <span className="h-0 w-8 shrink-0 border-t-2 border-dashed border-amber-300" />
              <b className="text-xs text-amber-200">ড্যাশ রেখা</b>
            </div>
            <p className="mt-0.5">(অন্য সব সংযোগ)</p>
          </Box>

          <Box
            x={185}
            y={586}
            w={390}
            h={92}
            className="rounded-xl border border-emerald-400/30 bg-emerald-500/[0.07] shadow-sm"
          >
            <div className="absolute inset-x-0 bottom-1 text-center">
              <p className="text-[13px] font-bold leading-4 text-emerald-300">বনী ইসরাঈল</p>
              <p className="text-[10px] leading-3 text-slate-300">
                (ইউসুফ + বিনইয়ামিন + ১০ পুত্র = ১২ পুত্র)
              </p>
              <p className="text-[10px] leading-3 text-slate-400">
                {byEn["Bani Israil"].note}
              </p>
            </div>
          </Box>

          <Box
            x={580}
            y={640}
            w={126}
            h={190}
            className="rounded-xl border border-dashed border-amber-300/40 bg-amber-300/[0.04]"
          >
            <p className="pt-1.5 text-center text-xs font-bold leading-4 text-amber-200">
              আল-ই-ইমরান
              <span className="block text-[10px] font-normal text-slate-400">Aal-e-Imran</span>
            </p>
          </Box>

          {layout.map((item) => (
            <TreeNode key={item.en} item={item} />
          ))}

          <Box
            x={18}
            y={800}
            w={226}
            h={150}
            className="rounded-xl border border-emerald-400/30 bg-[#102c30] p-2.5 shadow-sm"
          >
            <h2 className="mb-1.5 text-[13px] font-bold text-emerald-300">
              চারটি প্রধান আসমানী কিতাব
            </h2>
            <ul className="space-y-2 text-[12px] text-slate-200">
              {fourBooks.map((item) => (
                <li key={item.book} className="flex items-center gap-2">
                  <span className="h-6 w-5 shrink-0 rounded-sm border border-emerald-300/30 bg-emerald-500/20" />
                  <span className="font-bold">{item.book}</span>
                  <span className="ml-auto text-slate-400">– {item.to}</span>
                </li>
              ))}
            </ul>
          </Box>

          <Box
            x={18}
            y={958}
            w={134}
            h={140}
            className="rounded-xl border border-emerald-400/30 bg-[#102c30] p-2.5 text-[11px] leading-4 shadow-sm"
          >
            <h2 className="mb-0.5 text-[13px] font-bold text-emerald-300">বনী ইসরাঈল</h2>
            <p className="text-slate-300">ইয়াকুব (আ.)-এর ১২ পুত্র:</p>
            <ul className="list-disc pl-4 text-slate-300">
              <li>ইউসুফ</li>
              <li>বিনইয়ামিন</li>
              <li>অন্য ১০ জন</li>
            </ul>
            <p className="mt-0.5 text-slate-400">
              তাঁদের বংশধরেরা বনী ইসরাঈল (একটি জাতি/জনগোষ্ঠী)।
            </p>
          </Box>

          <Box
            x={160}
            y={958}
            w={134}
            h={140}
            className="rounded-xl border border-amber-300/30 bg-[#172c2c] p-2.5 text-[11px] leading-4 shadow-sm"
          >
            <h2 className="mb-0.5 text-[13px] font-bold text-amber-200">ইহুদি (ইয়াহুদ)</h2>
            <p className="text-slate-300">
              এটি একটি ধর্মীয় পরিচয়। সব বনী ইসরাঈল ইহুদি ছিল না, তবে ইহুদিরা বনী ইসরাঈলের বংশধারা থেকে এসেছে।
            </p>
          </Box>
        </div>
      </div>

      <p className="mt-4 text-center text-xs leading-6 text-slate-400">
        এই চার্ট একটি সাধারণ সারসংক্ষেপ। কিছু বংশধারা ও ব্যক্তির নবুওয়াত নিয়ে আলিমদের মধ্যে মতভেদ আছে।
      </p>
    </div>
  );
};

const Prophets = () => (
  <main className="min-h-screen bg-[#081b22]">
    <style>{glowCss}</style>

    <div className="md:hidden">
      <MobileView />
    </div>

    <div className="hidden px-4 py-8 font-['Hind_Siliguri'] md:block">
      <PedigreeChart />
    </div>
  </main>
);

export default Prophets;