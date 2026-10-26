
import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const MOSQUES = [
    {
        id: "aqsa",
        name: "মাসজিদুল আকসা",
        short: "আল-আকসা",
        arabic: "المسجد الأقصى",
        city: "জেরুসালেম, ফিলিস্তিন",
        desc: "ইসলামের প্রথম কিবলা এবং ইসরা (রাতের সফর)-এর গন্তব্য।",
        query: "Al-Aqsa Mosque, Jerusalem",
        lx: 100,
        ly: 150,
    },
    {
        id: "nabawi",
        name: "মসজিদে নববী",
        short: "মদিনা",
        arabic: "المسجد النبوي",
        city: "মদিনা, সৌদি আরব",
        desc: "হিজরতের পর রাসূলুল্লাহ (সা.)-এর নির্মিত মসজিদ।",
        query: "Al-Masjid an-Nabawi, Medina",
        lx: 360,
        ly: 520,
    },
    {
        id: "haram",
        name: "মসজিদুল হারাম",
        short: "মক্কা",
        arabic: "المسجد الحرام",
        city: "মক্কা, সৌদি আরব",
        desc: "কাবা শরিফের অবস্থান এবং মুসলিমদের কিবলা।",
        query: "Masjid al-Haram, Mecca",
        lx: 300,
        ly: 690,
    },
];

const byId = (id) => MOSQUES.find((m) => m.id === id);

const HADITHS = [
    {
        id: 1,
        title: "এই তিনটি মসজিদের দিকে বিশেষ সাওয়াবের উদ্দেশ্যে সফরের ফযিলত",
        intro:
            "ইসলাম ধর্মে কেবল এই তিনটি মসজিদ ব্যতিরেকে অন্য কোনো ইবাদতের নিয়তে বিশেষ সওয়াবের আশায় ভ্রমণ বা সফর করা নিষেধ করা হয়েছে।",
        narrator:
            "হযরত আবু হুরায়রা (রা.) থেকে বর্ণিত, রাসূলুল্লাহ (সা.) ইরশাদ করেছেন:",
        quote:
            "তিনটি মসজিদ ছাড়া (ইবাদতের উদ্দেশ্যে বিশেষ সওয়াবের নিয়তে) অন্য কোনো মসজিদের দিকে সফর করা যাবে না—মসজিদুল হারাম, আমার এই মসজিদটি (মসজিদে নববী) এবং মাসজিদুল আকসা।",
        book: "সহিহ বুখারি (হাদিস নং ১১৮৯), সহিহ মুসলিম (হাদিস নং ১৩৯৭)",
        grade: "সহিহ",
        tags: ["haram", "nabawi", "aqsa"],
    },
    {
        id: 2,
        title: "মসজিদে হারামে সালাতের (নামাজের) অসীম সওয়াব",
        narrator:
            "হযরত জাবের ইবনে আবদুল্লাহ (রা.) থেকে বর্ণিত, রাসূলুল্লাহ (সা.) ইরশাদ করেছেন:",
        quote:
            "আমার এই মসজিদে (মসজিদে নববী) এক ওয়াক্ত নামাজ পড়া মসজিদুল হারাম ছাড়া অন্য যেকোনো মসজিদে এক হাজার ওয়াক্ত নামাজ পড়ার চেয়েও উত্তম। আর মসজিদুল হারামে এক ওয়াক্ত নামাজ পড়া অন্য যেকোনো মসজিদে এক লাখ ওয়াক্ত নামাজ পড়ার সমান।",
        book: "মুসনাদ আহমাদ (হাদিস নং ১৪৬৯৪), ইবনে মাজাহ (হাদিস নং ১৪০৬)",
        grade: "সহিহ বা হাসান",
        tags: ["haram", "nabawi"],
    },
    {
        id: 3,
        title: "মসজিদে নববীর ফযিলত ও রিয়াজুল জান্নাত",
        narrator:
            "হযরত আবু হুরায়রা (রা.) থেকে বর্ণিত, নবী করীম (সা.) ইরশাদ করেছেন:",
        quote:
            "আমার ঘর এবং আমার মিম্বরের মধ্যবর্তী স্থানটি জান্নাতের বাগানসমূহের একটি বাগান। আর আমার মিম্বরটি আমার হাউজের ওপর অবস্থিত।",
        book: "সহিহ বুখারি (হাদিস নং ১১৯৬), সহিহ মুসলিম (হাদিস নং ১৩৯১)",
        grade: "সহিহ",
        tags: ["nabawi"],
    },
    {
        id: 4,
        title: "মসজিদে আকসার মর্যাদা ও সালাতের সওয়াব",
        narrator:
            "হযরত আবু যার (রা.) থেকে বর্ণিত, তিনি বলেন, আমরা একবার রাসূলুল্লাহ (সা.)-এর উপস্থিতিতে আলোচনা করছিলাম যে, রাসুলের মসজিদ (মসজিদে নববী) শ্রেষ্ঠ নাকি বায়তুল মুকাদ্দাস (মসজিদুল আকসা) শ্রেষ্ঠ? তখন রাসূলুল্লাহ (সা.) ইরশাদ করলেন:",
        quote:
            "আমার এই মসজিদে (মসজিদে নববী) নামাজ পড়া বায়তুল মুকাদ্দাসে নামাজ পড়ার চেয়ে চার গুণ বেশি শ্রেষ্ঠ। আর এটি (বায়তুল মুকাদ্দাস) কতই না চমৎকার নামাজের জায়গা এবং তা কতই না পবিত্র ইবাদতের স্থান!",
        note:
            "অন্যান্য বর্ণনায় বায়তুল মুকাদ্দাসে নামাজ পড়ার সওয়াব সাধারণ মসজিদের তুলনায় বহুগুণ বেশি বলে বর্ণিত হয়েছে।",
        book: "মুস্তাদরাক হাকেম (খণ্ড ৪, হাদিস নং ৮৫১১), বাইহাকি",
        grade: "সহিহ বা হাসান",
        tags: ["nabawi", "aqsa"],
    },
];

const CHIPS = [
    { id: "all", label: "সব হাদিস" },
    { id: "haram", label: "মসজিদুল হারাম" },
    { id: "nabawi", label: "মসজিদে নববী" },
    { id: "aqsa", label: "মাসজিদুল আকসা" },
];

// Pure seeded random (no Math.random) — same result on every render
const seeded = (seed) => {
    let s = seed;
    return () => {
        s = (s + 0x6d2b79f5) | 0;
        let t = Math.imul(s ^ (s >>> 15), 1 | s);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
};

const LIGHTS = (() => {
    const rnd = seeded(7);
    return Array.from({ length: 240 }, (_, i) => {
        const coast = i % 2 === 0;
        const y = rnd() * 740 + 40;
        const x = coast ? 55 + Math.sin(y / 90) * 18 + rnd() * 55 + y * 0.12 : 170 + rnd() * 410;
        return { x, y, r: rnd() * 1.3 + 0.35, o: rnd() * 0.55 + 0.3, d: rnd() * 4 };
    });
})();

const STARS = (() => {
    const rnd = seeded(21);
    return Array.from({ length: 60 }, () => ({
        x: rnd() * 600,
        y: rnd() * 95,
        r: rnd() * 1 + 0.3,
        d: rnd() * 5,
    }));
})();

const bn = (n) => String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

const ROUTE =
    "M 95 100 C 180 120, 260 150, 300 210 S 400 290, 380 340 S 330 400, 360 450 S 400 560, 430 620 S 470 690, 470 745";

const mapsUrl = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const dirUrl = (q) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;
const embedUrl = (q) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed`;
const openMaps = (q) => window.open(mapsUrl(q), "_blank", "noopener,noreferrer");

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const Reveal = ({ children, delay = 0, className = "" }) => {
    const ref = useRef(null);
    const [on, setOn] = useState(false);
    useEffect(() => {
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setOn(true);
                    io.disconnect();
                }
            },
            { threshold: 0.12 }
        );
        io.observe(ref.current);
        return () => io.disconnect();
    }, []);
    return (
        <div ref={ref} className={`reveal ${on ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

const Minaret = ({ x, y, h = 38 }) => (
    <g>
        <rect x={x - 2.2} y={y - h} width="4.4" height={h} fill="url(#stone)" />
        <rect x={x - 3.6} y={y - h * 0.62} width="7.2" height="2.4" fill="#FDE9A8" />
        <polygon points={`${x - 3.4},${y - h} ${x + 3.4},${y - h} ${x},${y - h - 10}`} fill="#FFF6DC" />
        <circle cx={x} cy={y - h - 11} r="1.4" fill="#fff" className="blink" />
    </g>
);

const Rings = ({ cx, cy }) => (
    <g>
        {[0, 1.4, 2.8].map((d) => (
            <circle
                key={d}
                cx={cx}
                cy={cy}
                r="26"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="1.2"
                className="ring"
                style={{ animationDelay: `${d}s` }}
            />
        ))}
    </g>
);

const Hotspot = ({ m, current, setActive, children }) => (
    <g
        className={`mosque ${current === m.id ? "is-active" : ""}`}
        role="link"
        tabIndex={0}
        aria-label={`${m.name} — গুগল ম্যাপে খুলুন`}
        onMouseEnter={() => setActive(m.id)}
        onMouseLeave={() => setActive(null)}
        onFocus={() => setActive(m.id)}
        onBlur={() => setActive(null)}
        onClick={() => openMaps(m.query)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openMaps(m.query)}
    >
        {children}
    </g>
);

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
const SacredMosques = () => {
    const [hover, setHover] = useState(null);
    const [filter, setFilter] = useState("all");
    const [preview, setPreview] = useState(null);
    const [copied, setCopied] = useState(null);
    const wrapRef = useRef(null);

    const current = hover ?? (filter !== "all" ? filter : null);
    const shown = HADITHS.filter((h) => filter === "all" || h.tags.includes(filter));
    const previewMosque = byId(preview);

    const onMove = (e) => {
        const el = wrapRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        el.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };

    useEffect(() => {
        const h = (e) => e.key === "Escape" && setPreview(null);
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, []);

    const copy = async (h) => {
        try {
            await navigator.clipboard.writeText(`${h.quote}\n— ${h.book}`);
            setCopied(h.id);
            setTimeout(() => setCopied(null), 1800);
        } catch {
            /* clipboard unavailable */
        }
    };

    return (
        <section className="sm-root relative min-h-screen overflow-hidden bg-[#0B1724] text-white">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
                .sm-root { font-family: 'Hind Siliguri', system-ui, sans-serif; }
                .sm-wrap { --px: 0; --py: 0; }
                .layer-far  { transform: translate(calc(var(--px) * -6px),  calc(var(--py) * -6px));  transition: transform .3s ease-out; }
                .layer-mid  { transform: translate(calc(var(--px) * -12px), calc(var(--py) * -9px));  transition: transform .3s ease-out; }
                .layer-near { transform: translate(calc(var(--px) * -20px), calc(var(--py) * -12px)); transition: transform .3s ease-out; }

                @keyframes draw    { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
                @keyframes flow    { to { stroke-dashoffset: -40; } }
                @keyframes twinkle { 0%,100% { opacity: .2; } 50% { opacity: 1; } }
                @keyframes breathe { 0%,100% { opacity: .5; } 50% { opacity: 1; } }
                @keyframes ring    { 0% { transform: scale(.4); opacity: .9; } 100% { transform: scale(2.6); opacity: 0; } }
                @keyframes rise    { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
                @keyframes pop     { from { opacity: 0; transform: scale(.7); } to { opacity: 1; transform: scale(1); } }
                @keyframes shoot   { 0% { transform: translate(0,0); opacity: 0; } 5% { opacity: 1; } 18% { transform: translate(260px,110px); opacity: 0; } 100% { opacity: 0; transform: translate(260px,110px); } }
                @keyframes drift   { from { transform: translateX(-30px); } to { transform: translateX(30px); } }
                @keyframes shimmer { to { background-position: 200% center; } }

                .route-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 3.6s ease-out .4s forwards; }
                .route-flow { animation: flow 2.2s linear infinite; }
                .twinkle    { animation: twinkle 3.4s ease-in-out infinite; }
                .blink      { animation: twinkle 1.8s ease-in-out infinite; }
                .breathe    { animation: breathe 4.5s ease-in-out infinite; }
                .ring       { transform-box: fill-box; transform-origin: center; animation: ring 4.2s ease-out infinite; }
                .shoot      { animation: shoot 9s linear infinite; }
                .shoot-2    { animation: shoot 13s linear 5s infinite; }
                .cloud      { animation: drift 18s ease-in-out infinite alternate; }
                .label-in   { opacity: 0; animation: pop .7s cubic-bezier(.2,.9,.3,1.3) forwards; transform-box: fill-box; transform-origin: center; }

                .mosque { cursor: pointer; outline: none; }
                .mosque .body { transition: transform .45s cubic-bezier(.2,.8,.2,1), filter .45s; transform-box: fill-box; transform-origin: center bottom; }
                .mosque:hover .body, .mosque.is-active .body { transform: scale(1.08); filter: drop-shadow(0 0 14px rgba(251,191,36,.9)); }
                .mosque .pill { opacity: 0; transform: translateY(6px); transition: all .35s ease; transform-box: fill-box; transform-origin: center; }
                .mosque:hover .pill, .mosque.is-active .pill { opacity: 1; transform: none; }
                .mosque:focus-visible .hit { stroke: #34D399; stroke-width: 2; stroke-dasharray: 5 4; }

                .title-shimmer {
                    background: linear-gradient(90deg,#fff 0%,#FBBF24 35%,#fff 65%,#34D399 100%);
                    background-size: 200% auto; -webkit-background-clip: text; background-clip: text; color: transparent;
                    animation: shimmer 8s linear infinite;
                }
                .rise   { opacity: 0; animation: rise .8s cubic-bezier(.2,.8,.2,1) forwards; }
                .reveal { opacity: 0; transform: translateY(22px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.8,.2,1); }
                .reveal.in { opacity: 1; transform: none; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { scrollbar-width: none; }

                @media (prefers-reduced-motion: reduce) {
                    *, *::before, *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }
                    .route-draw { stroke-dashoffset: 0; }
                    .reveal { opacity: 1; transform: none; }
                }
            `}</style>

            {/* ambient glows */}
            <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#FBBF24]/10 blur-[120px]" />
            <div className="pointer-events-none absolute top-[60rem] -left-24 h-[360px] w-[360px] rounded-full bg-[#34D399]/10 blur-[120px]" />

            <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 lg:pt-14">
                {/* ------------------------------ Hero ------------------------------ */}
                <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
                    <div>
                        <span
                            className="rise inline-flex items-center gap-2 rounded-full border border-[#34D399]/30 bg-[#34D399]/10 px-3 py-1 text-sm text-[#34D399]"
                            style={{ animationDelay: ".05s" }}
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-[#34D399]" />
                            এক পথে তিন পবিত্র গন্তব্য
                        </span>
                        <h1
                            className="rise title-shimmer mt-4 text-[2.6rem] font-bold leading-[1.15] sm:text-6xl"
                            style={{ animationDelay: ".2s" }}
                        >
                            পবিত্র তিন মসজিদ
                        </h1>
                        <p
                            className="rise mt-4 max-w-lg text-base leading-relaxed text-[#94A3B8] sm:text-lg"
                            style={{ animationDelay: ".35s" }}
                        >
                            মক্কা, মদিনা ও জেরুসালেম—ম্যাপের যেকোনো মসজিদে ট্যাপ করলে গুগল ম্যাপে তার অবস্থান খুলবে।
                            নিচে সহিহ হাদিসের আলোকে এই মসজিদগুলোর মর্যাদা পড়ুন।
                        </p>

                        <div className="rise mt-6 flex flex-wrap items-center gap-3" style={{ animationDelay: ".5s" }}>
                            <a
                                href="#hadith"
                                className="rounded-full bg-[#d6aa62]  px-5 py-2.5 font-semibold text-[#0B1724] transition hover:scale-105 hover:shadow-[0_0_28px_rgba(251,191,36,.5)]"
                            >
                                হাদিস পড়ুন
                            </a>
                            <a
                                href="#mosques"
                                className="rounded-full border border-white/15 px-5 py-2.5 text-white transition hover:border-[#34D399]/60 hover:bg-[#34D399]/10"
                            >
                                মসজিদগুলো দেখুন
                            </a>
                        </div>

                      
                    </div>

                    {/* ------------------------------ Map ------------------------------ */}
                    <div
                        ref={wrapRef}
                        onMouseMove={onMove}
                        className="sm-wrap mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,.9)] ring-1 ring-[#FBBF24]/10"
                    >
                        <svg
                            viewBox="0 0 600 800"
                            className="block h-auto w-full"
                            role="img"
                            aria-label="রাতের আকাশ থেকে দেখা আল-আকসা, মদিনা ও মক্কা, একটি আলোকিত পথে যুক্ত"
                        >
                            <defs>
                                <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0" stopColor="#070F1B" />
                                    <stop offset="0.35" stopColor="#0B1724" />
                                    <stop offset="1" stopColor="#0A0F16" />
                                </linearGradient>
                                <linearGradient id="sea" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0" stopColor="#0A2438" />
                                    <stop offset="1" stopColor="#0B2A45" stopOpacity="0" />
                                </linearGradient>
                                <linearGradient id="stone" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0" stopColor="#FDE9A8" />
                                    <stop offset="1" stopColor="#E5A92B" />
                                </linearGradient>
                                <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0" stopColor="#FDE68A" />
                                    <stop offset="1" stopColor="#FBBF24" />
                                </linearGradient>
                                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                                    <stop offset="0" stopColor="#FBBF24" stopOpacity="0.85" />
                                    <stop offset="1" stopColor="#FBBF24" stopOpacity="0" />
                                </radialGradient>
                                <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="3.5" />
                                </filter>
                            </defs>

                            <rect width="600" height="800" fill="url(#sky)" />

                            <g className="layer-far">
                                {STARS.map((s, i) => (
                                    <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" className="twinkle" style={{ animationDelay: `${s.d}s` }} />
                                ))}
                                <g className="shoot">
                                    <line x1="120" y1="20" x2="90" y2="8" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
                                </g>
                                <g className="shoot-2">
                                    <line x1="330" y1="35" x2="300" y2="23" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" />
                                </g>
                                <path d="M 0 120 L 70 120 C 40 300, 120 420, 90 560 C 70 660, 130 740, 160 800 L 0 800 Z" fill="url(#sea)" />
                                <ellipse cx="400" cy="120" rx="160" ry="14" fill="#34D399" opacity=".06" className="cloud" />
                                <ellipse cx="180" cy="300" rx="130" ry="10" fill="#34D399" opacity=".05" className="cloud" style={{ animationDelay: "-6s" }} />
                            </g>

                            <g className="layer-mid">
                                {LIGHTS.map((l, i) => (
                                    <circle key={i} cx={l.x} cy={l.y} r={l.r} fill="#FBBF24" opacity={l.o} className="twinkle" style={{ animationDelay: `${l.d}s` }} />
                                ))}
                                <path d={ROUTE} fill="none" stroke="#FBBF24" strokeWidth="8" opacity="0.32" filter="url(#blur)" />
                                <path d={ROUTE} pathLength="1" fill="none" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" className="route-draw" />
                                <path d={ROUTE} fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 18" className="route-flow" />
                                <circle r="9" fill="url(#glow)">
                                    <animateMotion dur="9s" repeatCount="indefinite" path={ROUTE} begin="3s" />
                                </circle>
                                <circle r="2.6" fill="#fff">
                                    <animateMotion dur="9s" repeatCount="indefinite" path={ROUTE} begin="3s" />
                                </circle>
                            </g>

                            <g className="layer-near">
                                {/* AL-AQSA */}
                                <Hotspot m={MOSQUES[0]} current={current} setActive={setHover}>
                                    <circle cx="95" cy="92" r="46" className="hit" fill="transparent" />
                                    <Rings cx={95} cy={104} />
                                    <g className="body">
                                        <circle cx="95" cy="92" r="42" fill="url(#glow)" className="breathe" />
                                        <rect x="60" y="104" width="70" height="10" rx="2" fill="#E8C46A" />
                                        <rect x="71" y="90" width="48" height="16" fill="#D9B35A" />
                                        {[78, 88, 98, 108].map((x) => (
                                            <rect key={x} x={x} y="94" width="4" height="9" rx="2" fill="#7A5A1C" />
                                        ))}
                                        <path d="M 73 90 A 22 22 0 0 1 117 90 Z" fill="url(#gold)" />
                                        <rect x="94" y="62" width="2" height="9" fill="#FDE68A" />
                                    </g>
                                </Hotspot>

                                {/* MEDINA */}
                                <Hotspot m={MOSQUES[1]} current={current} setActive={setHover}>
                                    <ellipse cx="360" cy="452" rx="130" ry="50" className="hit" fill="transparent" />
                                    <Rings cx={360} cy={452} />
                                    <g className="body">
                                        <ellipse cx="360" cy="455" rx="135" ry="42" fill="url(#glow)" opacity=".4" className="breathe" />
                                        <polygon points="285,457 335,427 440,427 475,457 420,482 320,482" fill="#D9B35A" />
                                        <polygon points="310,454 345,437 420,437 445,454 410,470 330,470" fill="#0E9F7E" />
                                        <polygon points="340,448 360,440 395,440 410,450 390,459 352,459" fill="#34D399" opacity=".75" />
                                        <Minaret x={338} y={432} h={44} />
                                        <Minaret x={363} y={424} h={52} />
                                        <Minaret x={392} y={432} h={44} />
                                        <Minaret x={430} y={440} h={40} />
                                        <Minaret x={316} y={442} h={36} />
                                        {Array.from({ length: 40 }, (_, i) => (
                                            <circle
                                                key={i}
                                                cx={260 + i * 6.4}
                                                cy={454 + Math.sin(i * 0.8) * 30}
                                                r="1.2"
                                                fill="#FDE9A8"
                                                className="twinkle"
                                                style={{ animationDelay: `${(i % 8) * 0.4}s` }}
                                            />
                                        ))}
                                    </g>
                                </Hotspot>

                                {/* MECCA */}
                                <Hotspot m={MOSQUES[2]} current={current} setActive={setHover}>
                                    <ellipse cx="470" cy="775" rx="140" ry="62" className="hit" fill="transparent" />
                                    <Rings cx={470} cy={775} />
                                    <g className="body">
                                        <ellipse cx="470" cy="772" rx="155" ry="72" fill="url(#glow)" opacity=".4" className="breathe" />
                                        <ellipse cx="470" cy="778" rx="136" ry="56" fill="#B98A3A" />
                                        <ellipse cx="470" cy="778" rx="120" ry="45" fill="#FFF1C8" opacity=".92" />
                                        <ellipse cx="470" cy="778" rx="96" ry="34" fill="none" stroke="#E9D6A0" strokeWidth="5" strokeDasharray="1.5 3" />
                                        <ellipse cx="470" cy="778" rx="78" ry="27" fill="#F2F6FF" />
                                        <ellipse cx="470" cy="778" rx="60" ry="20" fill="none" stroke="#9DB4E8" strokeWidth="2.5" strokeDasharray="1 3.5">
                                            <animateTransform attributeName="transform" type="rotate" from="0 470 778" to="360 470 778" dur="30s" repeatCount="indefinite" />
                                        </ellipse>
                                        <rect x="458" y="770" width="24" height="16" fill="#111" />
                                        <rect x="458" y="770" width="24" height="3" fill="#FBBF24" />
                                        <Minaret x={375} y={738} h={36} />
                                        <Minaret x={415} y={724} h={42} />
                                        <Minaret x={525} y={724} h={42} />
                                        <Minaret x={565} y={738} h={36} />
                                    </g>
                                </Hotspot>

                                {/* labels + Google Maps pill */}
                                {MOSQUES.map((m, i) => (
                                    <g
                                        key={m.id}
                                        className={`mosque ${current === m.id ? "is-active" : ""}`}
                                        style={{ pointerEvents: "none" }}
                                    >
                                        <text
                                            x={m.lx}
                                            y={m.ly}
                                            textAnchor="middle"
                                            fontSize={current === m.id ? 27 : 24}
                                            fontWeight="700"
                                            fill={current === m.id ? "#FBBF24" : "#FFFFFF"}
                                            stroke="#0B1724"
                                            strokeOpacity=".8"
                                            strokeWidth="5"
                                            paintOrder="stroke"
                                            className="label-in"
                                            style={{
                                                animationDelay: `${1.2 + i * 0.5}s`,
                                                transition: "font-size .3s, fill .3s",
                                                fontFamily: "'Hind Siliguri', sans-serif",
                                            }}
                                        >
                                            {m.short}
                                        </text>
                                        <g className="pill">
                                            <rect x={m.lx - 72} y={m.ly + 10} width="144" height="26" rx="13" fill="#FBBF24" />
                                            <text
                                                x={m.lx}
                                                y={m.ly + 28}
                                                textAnchor="middle"
                                                fontSize="13"
                                                fontWeight="700"
                                                fill="#0B1724"
                                                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                                            >
                                                গুগল ম্যাপে খুলুন ↗
                                            </text>
                                        </g>
                                    </g>
                                ))}
                            </g>
                        </svg>
                    </div>
                </div>

                {/* ---------------------------- Mosque cards ---------------------------- */}
                <section id="mosques" className="mt-16 scroll-mt-6 sm:mt-24">
                    <Reveal>
                        <h2 className="text-2xl font-bold sm:text-3xl">তিনটি পবিত্র মসজিদ</h2>
                        <p className="mt-2 text-[#94A3B8]">অবস্থান দেখতে বা পথের নির্দেশনা পেতে নিচের বাটন ব্যবহার করুন।</p>
                    </Reveal>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        {[MOSQUES[2], MOSQUES[1], MOSQUES[0]].map((m, i) => (
                            <Reveal key={m.id} delay={i * 100}>
                                <article
                                    onMouseEnter={() => setHover(m.id)}
                                    onMouseLeave={() => setHover(null)}
                                    className={`h-full rounded-2xl border p-5 transition duration-300 ${
                                        current === m.id
                                            ? "-translate-y-1 border-[#FBBF24]/60 bg-white/[0.08] shadow-[0_0_40px_-10px_rgba(251,191,36,.5)]"
                                            : "border-white/10 bg-white/[0.04]"
                                    }`}
                                >
                                    <p className="text-sm text-[#34D399]">{m.city}</p>
                                    <h3 className="mt-1 text-xl font-semibold">{m.name}</h3>
                                    <p className="text-sm text-[#FBBF24]/90" dir="rtl">
                                        {m.arabic}
                                    </p>
                                    <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">{m.desc}</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <a
                                            href={mapsUrl(m.query)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-full bg-[#34D399] px-4 py-2 text-sm font-semibold text-[#0B1724] transition hover:brightness-110"
                                        >
                                            গুগল ম্যাপ ↗
                                        </a>
                                        <a
                                            href={dirUrl(m.query)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-full border border-white/15 px-4 py-2 text-sm transition hover:bg-white/10"
                                        >
                                            পথ দেখুন
                                        </a>
                                        <button
                                            onClick={() => setPreview(m.id)}
                                            className="rounded-full border border-white/15 px-4 py-2 text-sm transition hover:bg-white/10"
                                        >
                                            প্রিভিউ
                                        </button>
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ------------------------------ Hadith ------------------------------ */}
                <section id="hadith" className="mt-16 scroll-mt-6 sm:mt-24">
                    <Reveal>
                        <h2 className="text-2xl font-bold sm:text-3xl">হাদিসের আলোকে মর্যাদা</h2>
                        <p className="mt-2 text-[#94A3B8]">মসজিদ বেছে নিলে ম্যাপেও সেটি হাইলাইট হবে।</p>
                    </Reveal>

                    <div className="sticky top-0 z-20 -mx-4 mt-5 bg-[#0B1724]/85 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
                        <div className="no-scrollbar flex gap-2 overflow-x-auto" role="tablist" aria-label="হাদিস ফিল্টার">
                            {CHIPS.map((c) => (
                                <button
                                    key={c.id}
                                    role="tab"
                                    aria-selected={filter === c.id}
                                    onClick={() => setFilter(c.id)}
                                    className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition ${
                                        filter === c.id
                                            ? "border-[#d6aa62] bg-[#d6aa62] font-semibold text-[#0B1724]"
                                            : "border-white/15 text-[#94A3B8] hover:border-white/40 hover:text-white"
                                    }`}
                                >
                                    {c.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 grid gap-5 lg:grid-cols-2">
                        {shown.map((h, i) => (
                            <Reveal key={h.id} delay={i * 90}>
                                <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-[#34D399]/40 sm:p-6">
                                    <header className="flex items-start gap-3">
                                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#34D399]/50 bg-[#34D399]/10 font-bold text-[#34D399]">
                                            {bn(h.id)}
                                        </span>
                                        <h3 className="text-lg font-semibold leading-snug">{h.title}</h3>
                                    </header>

                                    {h.intro && (
                                        <p className="mt-4 text-sm leading-relaxed text-[#94A3B8]">{h.intro}</p>
                                    )}

                                    <p className="mt-4 text-sm font-medium text-white/90">{h.narrator}</p>

                                    <blockquote className="mt-3 rounded-r-xl border-l-4 border-[#d6aa62] bg-[#FBBF24]/[0.06] px-4 py-3 text-[1.05rem] leading-[1.9] text-white">
                                        “{h.quote}”
                                    </blockquote>

                                    {h.note && <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">({h.note})</p>}

                                    <footer className="mt-auto pt-5">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                    h.grade === "সহিহ"
                                                        ? "bg-[#34D399]/15 text-[#34D399]"
                                                        : "bg-[#FBBF24]/15 text-[#d6aa62]"
                                                }`}
                                            >
                                                মর্যাদা: {h.grade}
                                            </span>
                                            {h.tags.map((t) => (
                                                <button
                                                    key={t}
                                                    onClick={() => setFilter(t)}
                                                    className="rounded-full bg-white/5 px-3 py-1 text-xs text-[#94A3B8] transition hover:bg-white/10 hover:text-white"
                                                >
                                                    {byId(t).name}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="mt-3 flex items-end justify-between gap-3">
                                            <p className="text-sm text-[#94A3B8]">
                                                <span className="text-white/80">হাদিস গ্রন্থ:</span> {h.book}
                                            </p>
                                            <button
                                                onClick={() => copy(h)}
                                                className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-xs transition hover:bg-white/10"
                                            >
                                                {copied === h.id ? "কপি হয়েছে ✓" : "কপি"}
                                            </button>
                                        </div>
                                    </footer>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </section>
            </div>

            {/* ---------------------------- Preview modal ---------------------------- */}
            {previewMosque && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
                    onClick={() => setPreview(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${previewMosque.name} ম্যাপ প্রিভিউ`}
                >
                    <div
                        className="w-full max-w-3xl overflow-hidden rounded-t-3xl border border-white/15 bg-[#0B1724] shadow-2xl sm:rounded-2xl"
                        style={{ animation: "pop .35s cubic-bezier(.2,.9,.3,1.2)" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
                            <div className="min-w-0">
                                <h3 className="truncate font-semibold">{previewMosque.name}</h3>
                                <p className="text-xs text-[#94A3B8]">{previewMosque.city}</p>
                            </div>
                            <div className="flex shrink-0 items-center gap-2">
                                <a
                                    href={mapsUrl(previewMosque.query)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full bg-[#FBBF24] px-4 py-1.5 text-sm font-semibold text-[#0B1724] hover:brightness-110"
                                >
                                    গুগল ম্যাপ ↗
                                </a>
                                <button
                                    onClick={() => setPreview(null)}
                                    aria-label="বন্ধ করুন"
                                    className="grid h-9 w-9 place-items-center rounded-full border border-white/20 hover:bg-white/10"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        <iframe
                            title={`${previewMosque.name} — গুগল ম্যাপ`}
                            src={embedUrl(previewMosque.query)}
                            className="h-[60vh] w-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default SacredMosques;
