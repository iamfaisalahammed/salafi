import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { geoNaturalEarth1, geoPath, geoGraticule10 } from "d3-geo";
import { feature } from "topojson-client";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json";

const GLOBAL = {
  pop2020: 2022590000,
  share2020: 25.6,
  sunni: 22.44,
  shia: 2.5,
};
// সুন্নি ও শিয়ার বাইরে বাকি অংশ
const OTHER_SHARE = Math.max(0, GLOBAL.share2020 - GLOBAL.sunni - GLOBAL.shia);

const RAW = [
  ["Afghanistan", "আফগানিস্তান", 43780590, 99.86],
  ["Albania", "আলবেনিয়া", 1816889, 65.56],
  ["Algeria", "আলজেরিয়া", 46562328, 98.16],
  ["Azerbaijan", "আজারবাইজান", 9997575, 96.15],
  ["Bahrain", "বাহরাইন", 1277439, 77.73],
  ["Bangladesh", "বাংলাদেশ", 155829324, 88.7],
  ["Brunei", "ব্রুনেই", 274639, 58.89],
  ["Burkina Faso", "বুর্কিনা ফাসো", 13287370, 55.19],
  ["Chad", "চাদ", 12582149, 59.9],
  ["Comoros", "কোমোরোস", 866123, 98.11],
  ["Djibouti", "জিবুতি", 1158288, 97.82],
  ["Egypt", "মিশর", 106991402, 90.39],
  ["Eritrea", "ইরিত্রিয়া", 1935819, 53.67],
  ["Gambia", "গাম্বিয়া", 2487813, 88.15],
  ["Guinea", "গিনি", 12876243, 85.27],
  ["Indonesia", "ইন্দোনেশিয়া", 222331100, 77.81],
  ["Iran", "ইরান", 90730565, 98.17],
  ["Iraq", "ইরাক", 45792338, 97.39],
  ["Jordan", "জর্ডান", 11015465, 95.61],
  ["Kazakhstan", "কাজাখস্তান", 15955428, 76.55],
  ["Kosovo", "কসোভো", 1547846, 92.46],
  ["Kuwait", "কুয়েত", 3923741, 78.07],
  ["Kyrgyzstan", "কিরগিজস্তান", 6514463, 89.3],
  ["Lebanon", "লেবানন", 3473845, 59.39],
  ["Libya", "লিবিয়া", 7382815, 98.98],
  ["Malaysia", "মালয়েশিয়া", 19797341, 55.03],
  ["Maldives", "মালদ্বীপ", 522712, 98.69],
  ["Mali", "মালি", 21966338, 87.17],
  ["Mauritania", "মৌরিতানিয়া", 5273362, 99.22],
  ["Morocco", "মরক্কো", 38300300, 99.66],
  ["Niger", "নাইজার", 26661069, 95.5],
  ["Oman", "ওমান", 4881546, 88.84],
  ["Pakistan", "পাকিস্তান", 243009084, 95.22],
  ["Palestine", "ফিলিস্তিন", 4519296, 80.85],
  ["Qatar", "কাতার", 1967875, 63.16],
  ["Saudi Arabia", "সৌদি আরব", 30904329, 89.41],
  ["Senegal", "সেনেগাল", 17225950, 90.99],
  ["Sierra Leone", "সিয়েরা লিওন", 5777122, 65.5],
  ["Somalia", "সোমালিয়া", 19622747, 99.84],
  ["Sudan", "সুদান", 47199849, 91.36],
  ["Syria", "সিরিয়া", 24482628, 95.56],
  ["Tajikistan", "তাজিকিস্তান", 10525945, 97.58],
  ["Tunisia", "তিউনিসিয়া", 12286657, 99.5],
  ["Turkey", "তুরস্ক", 86014465, 98.09],
  ["Turkmenistan", "তুর্কমেনিস্তান", 7221899, 94.79],
  ["United Arab Emirates", "সংযুক্ত আরব আমিরাত", 8451565, 74.49],
  ["Uzbekistan", "উজবেকিস্তান", 34935091, 94.28],
  ["Yemen", "ইয়েমেন", 41470624, 99.27],
].map(([name, bn, pop, pct]) => ({ name, bn, pop, pct }));

const BY_NAME = new Map(RAW.map((item) => [item.name, item]));
const MAXPOP = Math.max(...RAW.map((item) => item.pop));
const RANKED = [...RAW].sort((a, b) => b.pop - a.pop);

const ALIASES = {
  "United Republic of Tanzania": "Tanzania",
  "United States of America": "United States",
  Türkiye: "Turkey",
  "Republic of Serbia": "Serbia",
  "State of Palestine": "Palestine",
  "West Bank": "Palestine",
  "Palestinian Territories": "Palestine",
  "The Gambia": "Gambia",
  Czechia: "Czech Republic",
  eSwatini: "Eswatini",
  "Ivory Coast": "Côte d'Ivoire",
  "Côte d’Ivoire": "Côte d'Ivoire",
};

// খুব ছোট দেশের জন্য মার্কার (longitude, latitude)
const MARKERS = {
  Bahrain: [50.55, 26.07],
  Maldives: [73.5, 3.2],
  Comoros: [43.35, -11.7],
};

const SEAS = [
  ["ATLANTIC OCEAN", -15, 20],
  ["INDIAN OCEAN", 76, -4],
  ["ARABIAN SEA", 64, 15.5],
  ["BAY OF BENGAL", 89, 14],
  ["MEDITERRANEAN SEA", 19, 34.2],
  ["BLACK SEA", 34.5, 43.3],
];

// acc = #dfbd7b, accRgb = একই রঙের RGB (rgba-এর জন্য)
const C = {
  bg: "#0B1724",
  card: "#112236",
  line: "#1E3350",
  pri: "#34D399",
  acc: "#dfbd7b",
  accRgb: "223,189,123",
  accDark: "#b8975a",
  blue: "#60A5FA",
  tx: "#FFFFFF",
  tx2: "#94A3B8",
};

const BANDS = [
  { min: 95, color: "#34D399", label: "৯৫%+" },
  { min: 85, color: "#10A37A", label: "৮৫–৯৪%" },
  { min: 70, color: "#0B7A62", label: "৭০–৮৪%" },
  { min: 50, color: "#0E5448", label: "৫০–৬৯%" },
];

const bandColor = (pct) =>
  BANDS.find((band) => pct >= band.min)?.color ?? "#16273B";

const fmt = (number) => Number(number).toLocaleString("en-US");

// বড় সংখ্যা ছোট করে দেখানো (যেমন 155.8M)
const short = (n) =>
  n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : `${(n / 1e3).toFixed(0)}K`;

const normalizeCountryName = (name) => (name ? ALIASES[name] ?? name : "");

const getCountryName = (p) =>
  p?.name ?? p?.NAME ?? p?.ADMIN ?? p?.name_long ?? "";

// ম্যাপ যেন ফ্রেমের বাইরে হারিয়ে না যায়
const clampView = (v, W, H) => {
  const k = Math.min(10, Math.max(1, v.k));
  return {
    k,
    x: Math.min(0, Math.max(W - W * k, v.x)),
    y: Math.min(0, Math.max(H - H * k, v.y)),
  };
};

// একটি পয়েন্টকে স্ক্রিনের মাঝখানে এনে জুম করা
const focusView = (cx, cy, k, W, H, yf = 0.5) =>
  clampView({ k, x: W / 2 - k * cx, y: H * yf - k * cy }, W, H);

// মোবাইল স্ক্রিন শনাক্ত
const MOBILE_QUERY = "(max-width: 640px)";
const subscribeMobile = (callback) => {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
};
const getMobile = () => window.matchMedia(MOBILE_QUERY).matches;
const getMobileServer = () => false;

// ডোনাটের অংশ (পরিধি = 2π × 40), শুরুর অবস্থান আগেই হিসাব করা
const CIRC = 251.33;
const DONUT_BASE = [
  { label: "সুন্নি", value: GLOBAL.sunni, color: C.pri },
  { label: "শিয়া", value: GLOBAL.shia, color: C.acc },
  { label: "অন্যান্য", value: OTHER_SHARE, color: C.blue },
];
const DONUT = DONUT_BASE.map((seg, i) => ({
  ...seg,
  len: (seg.value / 100) * CIRC,
  offset: -(
    (DONUT_BASE.slice(0, i).reduce((sum, s) => sum + s.value, 0) / 100) *
    CIRC
  ),
}));

export default function MuslimMap() {
  const [topo, setTopo] = useState(null);
  const [err, setErr] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [sel, setSel] = useState(null);
  const [tip, setTip] = useState(null);
  const [mode, setMode] = useState("pct");
  const [q, setQ] = useState("");
  const [anim, setAnim] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [userView, setUserView] = useState(null);

  const compact = useSyncExternalStore(
    subscribeMobile,
    getMobile,
    getMobileServer
  );

  const svgRef = useRef(null);
  const mapRef = useRef(null);
  const pointers = useRef(new Map());
  const gesture = useRef(null);
  const didDrag = useRef(false);
  const clipId = `hk-clip-${useId().replace(/:/g, "")}`;

  const W = compact ? 600 : 1000;
  const H = compact ? 440 : 540;

  // ম্যাপ ডেটা লোড (ফেচ সরাসরি effect-এর ভেতরে)
  useEffect(() => {
    const controller = new AbortController();

    fetch(GEO_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Map request failed: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        if (!json?.objects?.countries || !json?.arcs) {
          throw new Error("Invalid map data");
        }
        setTopo(json);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setErr("ম্যাপের ডেটা লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করুন।");
        }
      });

    return () => controller.abort();
  }, [reloadKey]);

  const retry = () => {
    setErr("");
    setReloadKey((n) => n + 1);
  };

  const projection = useMemo(
    () =>
      geoNaturalEarth1().fitExtent(
        [
          [10, 10],
          [W - 10, H - 10],
        ],
        {
          type: "MultiPoint",
          coordinates: [
            [-20, -14],
            [142, -14],
            [-20, 52],
            [142, 52],
          ],
        }
      ),
    [W, H]
  );

  const path = useMemo(() => geoPath(projection), [projection]);
  const grat = useMemo(() => path(geoGraticule10()), [path]);

  // শুরুর ভিউ: মোবাইলে মধ্যপ্রাচ্য/দক্ষিণ এশিয়ায় জুম
  const home = useMemo(() => {
    if (!compact) return { k: 1, x: 0, y: 0, w: W };
    const [cx, cy] = projection([50, 25]);
    return { ...focusView(cx, cy, 2.2, W, H), w: W };
  }, [compact, projection, W, H]);

  // স্ক্রিন সাইজ বদলালে ইউজারের ভিউ বাদ দিয়ে home ব্যবহার হবে
  const view = userView && userView.w === W ? userView : home;
  const setView = (v) => setUserView({ ...v, w: W });

  const items = useMemo(() => {
    if (!topo) return [];
    try {
      const countries = feature(topo, topo.objects.countries);
      return countries.features
        .map((country, index) => {
          const originalName = getCountryName(country.properties);
          const name = normalizeCountryName(originalName);
          const data = BY_NAME.get(name);
          const countryPath = path(country);
          if (!countryPath) return null;

          let centroid = null;
          let area = 0;
          let bounds = null;

          if (data && country.geometry) {
            const g = country.geometry;
            const polygons =
              g.type === "MultiPolygon"
                ? g.coordinates.map((coordinates) => ({
                    type: "Polygon",
                    coordinates,
                  }))
                : g.type === "Polygon"
                  ? [g]
                  : [];

            polygons.forEach((polygon) => {
              const polygonArea = path.area(polygon);
              if (polygonArea > area) {
                area = polygonArea;
                centroid = path.centroid(polygon);
                bounds = path.bounds(polygon);
              }
            });
          }

          return {
            key: `${index}-${name}`,
            name,
            data,
            path: countryPath,
            centroid,
            area,
            bounds,
          };
        })
        .filter(Boolean);
    } catch {
      return [];
    }
  }, [topo, path]);

  const itemByName = useMemo(
    () => new Map(items.filter((i) => i.data).map((i) => [i.name, i])),
    [items]
  );

  const matched = useMemo(() => new Set(itemByName.keys()), [itemByName]);

  const rank = sel ? RANKED.findIndex((item) => item.name === sel.name) + 1 : 0;

  const fill = (data) => {
    if (!data) return "#16273B";
    if (mode === "pct") return bandColor(data.pct);
    const opacity = 0.18 + 0.82 * Math.sqrt(data.pop / MAXPOP);
    return `rgba(${C.accRgb},${opacity.toFixed(2)})`;
  };

  /* ---------- জুম ও দেশ নির্বাচন ---------- */

  const zoomBy = (factor) => {
    const k = Math.min(10, Math.max(1, view.k * factor));
    const ratio = k / view.k;
    setAnim(true);
    setView(
      clampView(
        {
          k,
          x: W / 2 - (W / 2 - view.x) * ratio,
          y: H / 2 - (H / 2 - view.y) * ratio,
        },
        W,
        H
      )
    );
    setTip(null);
  };

  const resetView = () => {
    setAnim(true);
    setUserView(null);
    setTip(null);
  };

  const selectCountry = (data, scrollToMap = false) => {
    if (!data) return;
    const item = itemByName.get(data.name);
    const yf = compact ? 0.36 : 0.5; // মোবাইলে নিচের শিটের জন্য জায়গা

    let target = null;
    if (item?.bounds) {
      const [[x0, y0], [x1, y1]] = item.bounds;
      const k = Math.min(
        6,
        Math.max(1.6, 0.7 / Math.max((x1 - x0) / W, (y1 - y0) / H))
      );
      target = focusView((x0 + x1) / 2, (y0 + y1) / 2, k, W, H, yf);
    } else if (MARKERS[data.name]) {
      const [px, py] = projection(MARKERS[data.name]);
      target = focusView(px, py, 5, W, H, yf);
    }

    setSel(data);
    setTip(null);
    if (target) {
      setAnim(true);
      setView(target);
    }
    if (scrollToMap && mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /* ---------- টাচ/মাউস: ড্র্যাগ ও পিঞ্চ ---------- */

  const toSvg = (cx, cy) => {
    const rect = svgRef.current.getBoundingClientRect();
    return {
      x: ((cx - rect.left) * W) / rect.width,
      y: ((cy - rect.top) * H) / rect.height,
      scale: W / rect.width,
    };
  };

  const onDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (!svgRef.current) return;

    didDrag.current = false;
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });
    setAnim(false);

    const pts = [...pointers.current.values()];

    if (pts.length === 1) {
      gesture.current = {
        mode: "pan",
        sx: event.clientX,
        sy: event.clientY,
        vx: view.x,
        vy: view.y,
        k: view.k,
        moved: false,
      };
    } else if (pts.length === 2) {
      const [a, b] = pts;
      gesture.current = {
        mode: "pinch",
        d0: Math.hypot(a.x - b.x, a.y - b.y) || 1,
        k0: view.k,
        vx: view.x,
        vy: view.y,
        m0: toSvg((a.x + b.x) / 2, (a.y + b.y) / 2),
        moved: true,
      };
      setTip(null);
    }
  };

  const onMove = (event) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    const g = gesture.current;
    if (!g || !svgRef.current) return;
    const pts = [...pointers.current.values()];

    if (g.mode === "pan" && pts.length === 1) {
      const dx = event.clientX - g.sx;
      const dy = event.clientY - g.sy;
      if (Math.abs(dx) + Math.abs(dy) > 6) g.moved = true;
      if (!g.moved) return;

      const { scale } = toSvg(0, 0);
      setView(
        clampView({ k: g.k, x: g.vx + dx * scale, y: g.vy + dy * scale }, W, H)
      );
      setTip(null);
    }

    if (g.mode === "pinch" && pts.length === 2) {
      const [a, b] = pts;
      const d = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      const k = Math.min(10, Math.max(1, g.k0 * (d / g.d0)));
      const m = toSvg((a.x + b.x) / 2, (a.y + b.y) / 2);

      // শুরুতে মাঝের বিন্দু ম্যাপের যে জায়গায় ছিল, সেটাই ধরে রাখা
      const px = (g.m0.x - g.vx) / g.k0;
      const py = (g.m0.y - g.vy) / g.k0;

      setView(clampView({ k, x: m.x - px * k, y: m.y - py * k }, W, H));
    }
  };

  const onUp = (event) => {
    pointers.current.delete(event.pointerId);
    const g = gesture.current;

    // ড্র্যাগ বা পিঞ্চ হলে পরের click বাতিল হবে (onClickCapture দেখুন)
    if (g?.moved) didDrag.current = true;

    if (pointers.current.size === 1) {
      // পিঞ্চ শেষ, এক আঙুল বাকি: আবার পান শুরু
      const [p] = [...pointers.current.values()];
      gesture.current = {
        mode: "pan",
        sx: p.x,
        sy: p.y,
        vx: view.x,
        vy: view.y,
        k: view.k,
        moved: true,
      };
    } else if (pointers.current.size === 0) {
      gesture.current = null;
    }
  };

  // টুলটিপ শুধু মাউসে (বাটন চেপে ড্র্যাগ করার সময় নয়)
  const hover = (event, item) => {
    if (event.pointerType !== "mouse" || event.buttons) return;
    if (!item?.data) return;
    const x = Math.min(event.clientX + 14, window.innerWidth - 230);
    const y = Math.min(event.clientY + 14, window.innerHeight - 120);
    setTip({ x: Math.max(8, x), y: Math.max(8, y), data: item.data });
  };

  /* ---------- সার্চ ---------- */

  const matches = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return RAW.filter(
      (d) => d.name.toLowerCase().includes(term) || d.bn.includes(q.trim())
    ).slice(0, 8);
  }, [q]);

  const labelBase = compact ? 14 : 12;
  const labelMinArea = compact ? 300 : 650;
  const list = showAll ? RANKED : RANKED.slice(0, 10);

  return (
    <div className={"hk" + (sel ? " has-sel" : "")}>
      <style>{CSS}</style>

      <header className="hk-head">
        <div className="hk-rule" />
        <h1>WORLD MUSLIM POPULATION</h1>
        <p>হিকমাহ · রেফারেন্স ডেটা · প্রদত্ত তথ্যের উৎস যাচাই করুন</p>
        <div className="hk-rule" />
      </header>

      {/* ---------- স্ট্যাট কার্ড ---------- */}
      <section className="hk-stats">
        <div className="hk-stat s1">
          <span className="hk-stat-l">বিশ্বের মুসলিম জনসংখ্যা (২০২০)</span>
          <b>{fmt(GLOBAL.pop2020)}</b>
        </div>
        <div className="hk-stat s2">
          <span className="hk-stat-l">বিশ্বে মুসলিম</span>
          <b>{GLOBAL.share2020}%</b>
        </div>
        <div className="hk-stat s3">
          <span className="hk-stat-l">সুন্নি (প্রদত্ত ডেটা)</span>
          <b>{GLOBAL.sunni}%</b>
        </div>
        <div className="hk-stat s4">
          <span className="hk-stat-l">শিয়া (প্রদত্ত ডেটা)</span>
          <b>{GLOBAL.shia.toFixed(2)}%</b>
        </div>
      </section>

      {/* ---------- ম্যাপ কার্ড ---------- */}
      <section className="hk-card" ref={mapRef}>
        <h2>মুসলিম-সংখ্যাগরিষ্ঠ দেশ ({RAW.length}টি)</h2>

        <div className="hk-search">
          <span className="hk-search-ic" aria-hidden="true">
            ⌕
          </span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="দেশ খুঁজুন… (বাংলাদেশ, Egypt)"
            aria-label="দেশ খুঁজুন"
          />
          {matches.length > 0 && (
            <div className="hk-results">
              {matches.map((d) => (
                <button
                  type="button"
                  key={d.name}
                  onClick={() => {
                    selectCountry(d);
                    setQ("");
                  }}
                >
                  <span>{d.bn}</span>
                  <small>{d.name}</small>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hk-tabs" role="group" aria-label="ম্যাপ মোড">
          <button
            type="button"
            className={mode === "pct" ? "on" : ""}
            aria-pressed={mode === "pct"}
            onClick={() => setMode("pct")}
          >
            শতাংশ অনুযায়ী
          </button>
          <button
            type="button"
            className={mode === "pop" ? "on" : ""}
            aria-pressed={mode === "pop"}
            onClick={() => setMode("pop")}
          >
            জনসংখ্যা অনুযায়ী
          </button>
        </div>

        <div className="hk-mapwrap">
          <div className="hk-zoom">
            <button type="button" onClick={() => zoomBy(1.6)} aria-label="Zoom in">
              +
            </button>
            <button
              type="button"
              onClick={() => zoomBy(1 / 1.6)}
              aria-label="Zoom out"
            >
              −
            </button>
            <button type="button" onClick={resetView} aria-label="Reset map">
              ⟲
            </button>
          </div>

          {!topo && !err && <div className="hk-msg">ম্যাপ লোড হচ্ছে…</div>}

          {err && (
            <div className="hk-msg hk-error">
              <p>{err}</p>
              <button type="button" onClick={retry}>
                আবার চেষ্টা করুন
              </button>
            </div>
          )}

          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            className="hk-svg"
            role="img"
            aria-label="বিশ্বের মুসলিম-সংখ্যাগরিষ্ঠ দেশগুলোর ইন্টারেক্টিভ মানচিত্র"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onPointerLeave={(e) => {
              setTip(null);
              if (e.pointerType === "mouse") onUp(e);
            }}
            onClickCapture={(e) => {
              // ড্র্যাগ বা পিঞ্চের পর আসা click দেশ নির্বাচন করবে না
              if (didDrag.current) {
                e.stopPropagation();
                didDrag.current = false;
              }
            }}
          >
            <defs>
              <clipPath id={clipId}>
                <rect x="0" y="0" width={W} height={H} rx="12" />
              </clipPath>
            </defs>

            <rect width={W} height={H} fill={C.bg} />

            <g clipPath={`url(#${clipId})`}>
              <g
                className={anim ? "hk-anim" : ""}
                style={{
                  transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})`,
                  transformOrigin: "0 0",
                }}
                onTransitionEnd={() => setAnim(false)}
              >
                <path
                  d={grat}
                  fill="none"
                  stroke={C.acc}
                  strokeOpacity=".1"
                  strokeWidth=".6"
                  vectorEffect="non-scaling-stroke"
                />

                {SEAS.map(([name, lon, lat]) => {
                  const point = projection([lon, lat]);
                  return (
                    <text
                      key={name}
                      x={point[0]}
                      y={point[1]}
                      className="hk-sea"
                      style={{ fontSize: (compact ? 10 : 13) / view.k }}
                    >
                      {name}
                    </text>
                  );
                })}

                {items.map((item) => (
                  <path
                    key={item.key}
                    d={item.path}
                    className={
                      "hk-c" +
                      (item.data ? " live" : "") +
                      (sel?.name === item.name ? " sel" : "")
                    }
                    fill={fill(item.data)}
                    vectorEffect="non-scaling-stroke"
                    onClick={() => selectCountry(item.data)}
                    onPointerMove={(event) => hover(event, item)}
                    onPointerLeave={() => setTip(null)}
                  />
                ))}

                {Object.entries(MARKERS)
                  .filter(([name]) => !matched.has(name))
                  .map(([name, coordinates]) => {
                    const data = BY_NAME.get(name);
                    const point = projection(coordinates);
                    return (
                      <circle
                        key={name}
                        cx={point[0]}
                        cy={point[1]}
                        r={(compact ? 8 : 5) / view.k}
                        fill={fill(data)}
                        stroke={sel?.name === name ? "#fff" : C.acc}
                        strokeWidth={1.5 / view.k}
                        style={{ cursor: "pointer" }}
                        onClick={() => selectCountry(data)}
                        onPointerMove={(event) => hover(event, { name, data })}
                        onPointerLeave={() => setTip(null)}
                      />
                    );
                  })}

                {items
                  .filter(
                    (item) =>
                      item.data &&
                      item.centroid &&
                      item.area * view.k * view.k > labelMinArea
                  )
                  .map((item) => (
                    <text
                      key={`label-${item.key}`}
                      x={item.centroid[0]}
                      y={item.centroid[1]}
                      className="hk-lbl"
                      style={{ fontSize: labelBase / view.k }}
                    >
                      {item.name === "United Arab Emirates"
                        ? "UAE"
                        : item.name.toUpperCase()}
                    </text>
                  ))}
              </g>
            </g>
          </svg>
        </div>

        <div className="hk-legend">
          {mode === "pct" ? (
            BANDS.map((band) => (
              <span key={band.label}>
                <i style={{ background: band.color }} />
                {band.label}
              </span>
            ))
          ) : (
            <span className="hk-grad">
              কম <i /> বেশি
            </span>
          )}
          <span>
            <i style={{ background: "#16273B" }} />
            ডেটা নেই
          </span>
        </div>

        <p className="hk-note">
          দেশ ট্যাপ করুন · এক আঙুলে ম্যাপ সরান · দুই আঙুলে জুম করুন। সংখ্যাগুলো
          প্রদত্ত ডেটা থেকে নেওয়া; প্রকাশের আগে মূল উৎস ও রেফারেন্স বছর যাচাই
          করুন।
        </p>
      </section>

      <div className="hk-grid">
        {/* ---------- দেশের তথ্য (মোবাইলে বটম শিট) ---------- */}
        <aside className={"hk-card hk-sheet" + (sel ? " open" : "")}>
          <h2 className="hk-sheet-title">দেশের তথ্য</h2>

          {sel ? (
            <div>
              <div className="hk-handle" aria-hidden="true" />

              <div className="hk-sheet-top">
                <div>
                  <p className="hk-big">{sel.bn}</p>
                  <p className="hk-en">
                    {sel.name}
                    <span className="hk-chip">
                      {sel.pct > 50 ? "মুসলিম-সংখ্যাগরিষ্ঠ" : "সংখ্যালঘু"}
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  className="hk-close"
                  onClick={() => setSel(null)}
                  aria-label="বন্ধ করুন"
                >
                  ✕
                </button>
              </div>

              <div className="hk-tiles">
                <div className="hk-tile">
                  <span>মুসলিম জনসংখ্যা</span>
                  <b>{fmt(sel.pop)}</b>
                </div>
                <div className="hk-tile">
                  <span>মুসলিমের শতাংশ</span>
                  <b>{sel.pct.toFixed(2)}%</b>
                </div>
                <div className="hk-tile">
                  <span>র‍্যাঙ্ক</span>
                  <b>
                    #{rank} <small>/ {RAW.length}</small>
                  </b>
                </div>
              </div>

              <div className="hk-pctbar" aria-hidden="true">
                <span style={{ width: `${sel.pct}%` }} />
              </div>
              <p className="hk-pctlabel">
                মোট জনসংখ্যার {sel.pct.toFixed(1)}% মুসলিম
              </p>
            </div>
          ) : (
            <p className="hk-dim hk-sheet-empty">
              ম্যাপ বা তালিকা থেকে একটি দেশ বেছে নিন।
            </p>
          )}
        </aside>

        {/* ---------- সর্বোচ্চ তালিকা ---------- */}
        <section className="hk-card">
          <h2>
            {showAll ? "সব দেশ (জনসংখ্যা অনুযায়ী)" : "সর্বোচ্চ মুসলিম জনসংখ্যা"}
          </h2>

          {list.map((data, index) => (
            <button
              type="button"
              key={data.name}
              className={"hk-b" + (sel?.name === data.name ? " sel" : "")}
              onClick={() => selectCountry(data, true)}
            >
              <span className={"hk-rank" + (index < 3 ? " top" : "")}>
                {index + 1}
              </span>
              <span className="hk-b-main">
                <span className="hk-b-row">
                  <span className="hk-country-name">{data.bn}</span>
                  <span className="hk-pop">{short(data.pop)}</span>
                </span>
                <span className="t">
                  <span
                    className="hk-bar-fill"
                    style={{ width: `${(data.pop / MAXPOP) * 100}%` }}
                  />
                </span>
              </span>
            </button>
          ))}

          <button
            type="button"
            className="hk-more"
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll ? "কম দেখুন ↑" : `সব ${RAW.length}টি দেশ দেখুন ↓`}
          </button>
        </section>

        {/* ---------- ডোনাট ---------- */}
        <section className="hk-card hk-donut">
          <h2>বিশ্বে মুসলিমদের অংশ (২০২০)</h2>

          <svg
            viewBox="0 0 120 120"
            className="hk-donut-svg"
            role="img"
            aria-label={`বিশ্ব জনসংখ্যার ${GLOBAL.share2020}% মুসলিম`}
          >
            <circle
              cx="60"
              cy="60"
              r="40"
              fill="none"
              stroke={C.line}
              strokeWidth="14"
            />
            {DONUT.map((seg) => (
              <circle
                key={seg.label}
                cx="60"
                cy="60"
                r="40"
                fill="none"
                stroke={seg.color}
                strokeWidth="14"
                strokeDasharray={`${seg.len} ${CIRC - seg.len}`}
                strokeDashoffset={seg.offset}
                transform="rotate(-90 60 60)"
              />
            ))}
            <text
              x="60"
              y="58"
              textAnchor="middle"
              fill={C.acc}
              fontSize="17"
              fontWeight="700"
            >
              {GLOBAL.share2020}%
            </text>
            <text x="60" y="73" textAnchor="middle" fill={C.tx2} fontSize="8">
              মুসলিম
            </text>
          </svg>

          <div className="hk-dlegend">
            {DONUT.map((seg) => (
              <span key={seg.label}>
                <i style={{ background: seg.color }} />
                {seg.label}
                <b>{seg.value.toFixed(2)}%</b>
              </span>
            ))}
          </div>
        </section>
      </div>

      {tip && (
        <div className="hk-tip" style={{ left: tip.x, top: tip.y }} role="status">
          <b>{tip.data.bn}</b>
          <br />
          {fmt(tip.data.pop)} জন মুসলিম
          <br />
          {tip.data.pct.toFixed(2)}% জনসংখ্যা
        </div>
      )}
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');

.hk {
  background: ${C.bg};
  color: ${C.tx};
  font-family: 'Hind Siliguri', system-ui, sans-serif;
  padding: 14px;
  max-width: 1240px;
  margin: 0 auto;
  min-height: 100vh;
  -webkit-tap-highlight-color: transparent;
}
.hk * { box-sizing: border-box; }
.hk button { font-family: inherit; }

/* ---------- হেডার ---------- */
.hk-head { text-align: center; margin-bottom: 12px; }
.hk-head h1 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(1rem, 4.2vw, 2rem);
  letter-spacing: .06em;
  color: ${C.acc};
  margin: 8px 0 2px;
  font-weight: 700;
  overflow-wrap: anywhere;
}
.hk-head p { margin: 0 0 8px; color: ${C.tx2}; font-size: .76rem; }
.hk-rule { height: 4px; border-top: 1px solid ${C.acc}; border-bottom: 1px solid ${C.acc}; }

/* ---------- স্ট্যাট কার্ড (ছোট ও কমপ্যাক্ট) ---------- */
.hk-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 12px;
}
.hk-stat {
  min-width: 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(160deg, #15304a 0%, ${C.card} 75%);
  border: 1px solid ${C.line};
  border-radius: 12px;
  padding: 9px 10px 8px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.hk-stat::before {
  content: "";
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--c);
}
.hk-stat.s1 {
  --c: ${C.pri};
  grid-column: span 3;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.hk-stat.s2 { --c: ${C.acc}; }
.hk-stat.s3 { --c: ${C.pri}; }
.hk-stat.s4 { --c: ${C.blue}; }
.hk-stat-l { font-size: .68rem; color: ${C.tx2}; line-height: 1.35; }
.hk-stat b {
  font-size: 1.05rem;
  color: var(--c);
  overflow-wrap: anywhere;
  line-height: 1.15;
}
.hk-stat.s1 b { font-size: 1.1rem; white-space: nowrap; }

/* ---------- কার্ড ---------- */
.hk-card {
  min-width: 0;
  background: ${C.card};
  border: 1px solid ${C.line};
  border-radius: 16px;
  padding: 12px;
  margin-bottom: 12px;
}
.hk-card h2 { font-size: .95rem; margin: 0 0 10px; color: ${C.acc}; }

/* ---------- সার্চ ---------- */
.hk-search { position: relative; margin-bottom: 8px; }
.hk-search-ic {
  position: absolute;
  left: 12px; top: 50%;
  transform: translateY(-52%);
  color: ${C.tx2};
  font-size: 1.1rem;
  pointer-events: none;
}
.hk-search input {
  width: 100%;
  height: 42px;
  background: ${C.bg};
  color: ${C.tx};
  border: 1px solid ${C.line};
  border-radius: 12px;
  padding: 0 12px 0 36px;
  font: inherit;
  font-size: 16px; /* iOS জুম বন্ধ রাখতে */
}
.hk-search input:focus { outline: none; border-color: ${C.pri}; box-shadow: 0 0 0 3px rgba(52,211,153,.18); }
.hk-results {
  position: absolute;
  left: 0; right: 0; top: 46px;
  z-index: 20;
  background: ${C.bg};
  border: 1px solid ${C.pri};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0,0,0,.55);
}
.hk-results button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 44px;
  padding: 8px 14px;
  background: transparent;
  color: ${C.tx};
  border: 0;
  border-bottom: 1px solid ${C.line};
  font-size: .92rem;
  cursor: pointer;
}
.hk-results button:active { background: ${C.card}; }
.hk-results button:last-child { border-bottom: 0; }
.hk-results small { color: ${C.tx2}; }

/* ---------- মোড ট্যাব (ছোট) ---------- */
.hk-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px;
  background: ${C.bg};
  border: 1px solid ${C.line};
  border-radius: 12px;
  padding: 3px;
  margin-bottom: 8px;
}
.hk-tabs button {
  min-height: 36px;
  background: transparent;
  color: ${C.tx2};
  border: 0;
  border-radius: 9px;
  font-size: .8rem;
  cursor: pointer;
  transition: background .2s, color .2s;
}
.hk-tabs button.on {
  background: linear-gradient(135deg, ${C.pri}, #10A37A);
  color: #052e22;
  font-weight: 700;
}

.hk button:focus-visible { outline: 2px solid ${C.acc}; outline-offset: 2px; }

/* ---------- ম্যাপ ---------- */
.hk-mapwrap {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${C.acc};
}
.hk-svg {
  display: block;
  width: 100%;
  height: auto;
  touch-action: none;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
}
.hk-svg:active { cursor: grabbing; }
.hk-anim { transition: transform .45s cubic-bezier(.22,.8,.3,1); }

.hk-zoom {
  position: absolute;
  right: 8px;
  top: 8px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  background: rgba(11,23,36,.85);
  border: 1px solid rgba(${C.accRgb},.6);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(6px);
}
.hk-zoom button {
  width: 38px;
  height: 38px;
  background: transparent;
  color: ${C.acc};
  border: 0;
  border-bottom: 1px solid rgba(${C.accRgb},.25);
  font-size: 1.15rem;
  cursor: pointer;
}
.hk-zoom button:last-child { border-bottom: 0; }
.hk-zoom button:active { background: ${C.acc}; color: ${C.bg}; }

.hk-msg {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: ${C.tx2};
  z-index: 1;
  text-align: center;
  padding: 16px;
  pointer-events: none;
}
.hk-msg button {
  min-height: 40px;
  background: ${C.bg};
  color: ${C.pri};
  border: 1px solid ${C.pri};
  border-radius: 10px;
  padding: 4px 16px;
  cursor: pointer;
  pointer-events: auto;
}
.hk-error { color: #FCA5A5; }

.hk-c { stroke: #2A3F5C; stroke-width: .5; }
.hk-c.live { stroke: ${C.acc}; stroke-width: .7; cursor: pointer; transition: filter .15s; }
@media (hover: hover) { .hk-c.live:hover { filter: brightness(1.3); } }
.hk-c.sel { stroke: #fff; stroke-width: 2; }

.hk-lbl {
  font-family: Georgia, serif;
  font-weight: 700;
  letter-spacing: .04em;
  text-anchor: middle;
  fill: #fff;
  pointer-events: none;
  paint-order: stroke;
  stroke: ${C.bg};
  stroke-width: 2.5px;
  stroke-linejoin: round;
}
.hk-sea {
  font-family: Georgia, serif;
  font-style: italic;
  letter-spacing: .2em;
  fill: #3B5A80;
  text-anchor: middle;
  pointer-events: none;
}

/* ---------- লেজেন্ড ---------- */
.hk-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 12px;
  margin-top: 10px;
  font-size: .76rem;
  color: ${C.tx2};
}
.hk-legend span { display: inline-flex; align-items: center; gap: 6px; }
.hk-legend i {
  display: inline-block;
  width: 14px;
  height: 11px;
  border-radius: 3px;
  border: 1px solid ${C.acc};
}
.hk-legend .hk-grad i {
  width: 64px;
  background: linear-gradient(90deg, rgba(${C.accRgb},.2), rgba(${C.accRgb},1));
}
.hk-note { font-size: .72rem; color: ${C.tx2}; margin: 8px 0 0; line-height: 1.7; }

.hk-grid { display: grid; gap: 0 14px; grid-template-columns: minmax(0, 1fr); }

/* ---------- দেশের তথ্য ---------- */
.hk-handle {
  width: 38px; height: 4px;
  background: ${C.line};
  border-radius: 99px;
  margin: 0 auto 10px;
}
.hk-sheet-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
.hk-big { font-size: 1.4rem; font-weight: 700; color: ${C.pri}; margin: 0; line-height: 1.3; }
.hk-en { margin: 2px 0 10px; color: ${C.tx2}; font-size: .8rem; display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.hk-chip {
  background: rgba(52,211,153,.14);
  color: ${C.pri};
  border: 1px solid rgba(52,211,153,.4);
  border-radius: 99px;
  padding: 1px 10px;
  font-size: .7rem;
}
.hk-dim { color: ${C.tx2}; margin: 0; }
.hk-close {
  width: 38px; height: 38px; flex: none;
  background: ${C.bg};
  color: ${C.tx2};
  border: 1px solid ${C.line};
  border-radius: 50%;
  cursor: pointer;
}
.hk-close:active { background: ${C.line}; }

.hk-tiles {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 6px;
  margin-bottom: 10px;
}
.hk-tile {
  min-width: 0;
  background: ${C.bg};
  border: 1px solid ${C.line};
  border-radius: 10px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.hk-tile span { font-size: .66rem; color: ${C.tx2}; }
.hk-tile b { font-size: .92rem; color: ${C.tx}; overflow-wrap: anywhere; }
.hk-tile small { color: ${C.tx2}; font-weight: 400; font-size: .66rem; }
.hk-tile:nth-child(2) b { color: ${C.acc}; }

.hk-pctbar { height: 8px; background: ${C.bg}; border-radius: 99px; overflow: hidden; }
.hk-pctbar span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, ${C.pri}, ${C.acc});
  border-radius: 99px;
  transition: width .5s ease;
}
.hk-pctlabel { margin: 5px 0 0; font-size: .72rem; color: ${C.tx2}; }

/* ---------- সর্বোচ্চ তালিকা ---------- */
.hk-b {
  width: 100%;
  min-height: 46px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 6px;
  margin: 2px 0;
  color: ${C.tx};
  text-align: left;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: background .15s, border-color .15s;
}
.hk-b:active { background: ${C.bg}; }
@media (hover: hover) { .hk-b:hover { background: ${C.bg}; } }
.hk-b.sel { background: ${C.bg}; border-color: ${C.acc}; }

.hk-rank {
  flex: none;
  width: 26px; height: 26px;
  display: grid;
  place-items: center;
  background: ${C.bg};
  border: 1px solid ${C.line};
  border-radius: 8px;
  font-size: .74rem;
  color: ${C.tx2};
}
.hk-rank.top { background: ${C.acc}; border-color: ${C.acc}; color: ${C.bg}; font-weight: 700; }

.hk-b-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 5px; }
.hk-b-row { display: flex; justify-content: space-between; gap: 8px; font-size: .88rem; }
.hk-country-name { overflow-wrap: anywhere; }
.hk-b .t { display: block; background: ${C.bg}; height: 7px; border-radius: 99px; overflow: hidden; }
.hk-bar-fill { display: block; height: 100%; background: linear-gradient(90deg, #10A37A, ${C.pri}); border-radius: 99px; }
.hk-b .hk-pop { color: ${C.tx2}; font-size: .78rem; flex: none; }
.hk-b.sel .hk-bar-fill { background: linear-gradient(90deg, ${C.accDark}, ${C.acc}); }
.hk-b.sel .hk-country-name { color: ${C.acc}; }

.hk-more {
  width: 100%;
  min-height: 42px;
  margin-top: 8px;
  background: transparent;
  color: ${C.pri};
  border: 1px dashed ${C.pri};
  border-radius: 10px;
  font-size: .85rem;
  cursor: pointer;
}
.hk-more:active { background: rgba(52,211,153,.12); }

/* ---------- ডোনাট ---------- */
.hk-donut { text-align: center; }
.hk-donut-svg { width: 100%; max-width: 150px; height: auto; }
.hk-dlegend { display: flex; flex-direction: column; gap: 6px; margin-top: 10px; }
.hk-dlegend span {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: .82rem;
  color: ${C.tx2};
  background: ${C.bg};
  border: 1px solid ${C.line};
  border-radius: 10px;
  padding: 7px 10px;
}
.hk-dlegend i { width: 12px; height: 12px; border-radius: 4px; flex: none; }
.hk-dlegend b { margin-left: auto; color: ${C.tx}; }

.hk-tip {
  position: fixed;
  pointer-events: none;
  background: rgba(0,0,0,.92);
  border: 1px solid ${C.acc};
  border-radius: 8px;
  padding: 6px 10px;
  font-size: .85rem;
  z-index: 50;
  max-width: 220px;
  overflow-wrap: anywhere;
}
.hk-tip b { color: ${C.acc}; }

@media (min-width: 600px) {
  .hk-stats { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .hk-stat.s1 { grid-column: span 1; flex-direction: column; align-items: flex-start; }
  .hk-stat.s1 b { white-space: normal; }
}

@media (min-width: 900px) {
  .hk-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr) 240px;
    align-items: start;
  }
  .hk-close, .hk-handle { display: none; }
  .hk-tiles { grid-template-columns: 1fr; }
}

/* মোবাইল: নিচ থেকে ওঠা শিট */
@media (max-width: 899px) {
  .hk-sheet-title { display: none; }
  .hk-sheet {
    position: fixed;
    left: 0; right: 0; bottom: 0;
    z-index: 40;
    margin: 0;
    border-radius: 22px 22px 0 0;
    padding: 10px 14px calc(14px + env(safe-area-inset-bottom));
    transform: translateY(110%);
    transition: transform .3s ease;
    box-shadow: 0 -12px 34px rgba(0,0,0,.6);
  }
  .hk-sheet.open { transform: none; }
  .hk-sheet-empty { display: none; }
  .hk.has-sel { padding-bottom: 250px; }
}

@media (max-width: 480px) {
  .hk { padding: 10px; }
  .hk-card { padding: 10px; }
}
`;