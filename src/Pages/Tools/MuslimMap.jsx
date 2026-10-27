
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { geoNaturalEarth1, geoPath, geoGraticule10 } from "d3-geo";
import { feature } from "topojson-client";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json";

const W = 1000;
const H = 540;

const GLOBAL = {
  pop2020: 2022590000,
  share2020: 25.6,
  sunni: 22.44,
  shia: 2.5,
};

const RAW = [
  ["Afghanistan", 43780590, 99.86],
  ["Albania", 1816889, 65.56],
  ["Algeria", 46562328, 98.16],
  ["Azerbaijan", 9997575, 96.15],
  ["Bahrain", 1277439, 77.73],
  ["Bangladesh", 155829324, 88.7],
  ["Brunei", 274639, 58.89],
  ["Burkina Faso", 13287370, 55.19],
  ["Chad", 12582149, 59.9],
  ["Comoros", 866123, 98.11],
  ["Djibouti", 1158288, 97.82],
  ["Egypt", 106991402, 90.39],
  ["Eritrea", 1935819, 53.67],
  ["Gambia", 2487813, 88.15],
  ["Guinea", 12876243, 85.27],
  ["Indonesia", 222331100, 77.81],
  ["Iran", 90730565, 98.17],
  ["Iraq", 45792338, 97.39],
  ["Jordan", 11015465, 95.61],
  ["Kazakhstan", 15955428, 76.55],
  ["Kosovo", 1547846, 92.46],
  ["Kuwait", 3923741, 78.07],
  ["Kyrgyzstan", 6514463, 89.3],
  ["Lebanon", 3473845, 59.39],
  ["Libya", 7382815, 98.98],
  ["Malaysia", 19797341, 55.03],
  ["Maldives", 522712, 98.69],
  ["Mali", 21966338, 87.17],
  ["Mauritania", 5273362, 99.22],
  ["Morocco", 38300300, 99.66],
  ["Niger", 26661069, 95.5],
  ["Oman", 4881546, 88.84],
  ["Pakistan", 243009084, 95.22],
  ["Palestine", 4519296, 80.85],
  ["Qatar", 1967875, 63.16],
  ["Saudi Arabia", 30904329, 89.41],
  ["Senegal", 17225950, 90.99],
  ["Sierra Leone", 5777122, 65.5],
  ["Somalia", 19622747, 99.84],
  ["Sudan", 47199849, 91.36],
  ["Syria", 24482628, 95.56],
  ["Tajikistan", 10525945, 97.58],
  ["Tunisia", 12286657, 99.5],
  ["Turkey", 86014465, 98.09],
  ["Turkmenistan", 7221899, 94.79],
  ["United Arab Emirates", 8451565, 74.49],
  ["Uzbekistan", 34935091, 94.28],
  ["Yemen", 41470624, 99.27],
].map(([name, pop, pct]) => ({ name, pop, pct }));

const BY_NAME = new Map(RAW.map((item) => [item.name, item]));
const MAXPOP = Math.max(...RAW.map((item) => item.pop));
const RANKED = [...RAW].sort((a, b) => b.pop - a.pop);

const ALIASES = {
  "United Republic of Tanzania": "Tanzania",
  "United States of America": "United States",
  "Türkiye": "Turkey",
  "Republic of Serbia": "Serbia",
  "State of Palestine": "Palestine",
  "West Bank": "Palestine",
  "Palestinian Territories": "Palestine",
  "United Arab Emirates": "United Arab Emirates",
  "The Gambia": "Gambia",
  "Republic of the Congo": "Republic of the Congo",
  "Democratic Republic of the Congo": "Democratic Republic of the Congo",
  "Czechia": "Czech Republic",
  "eSwatini": "Eswatini",
  "North Macedonia": "North Macedonia",
  "South Sudan": "South Sudan",
  "Ivory Coast": "Côte d'Ivoire",
  "Côte d’Ivoire": "Côte d'Ivoire",
  "Western Sahara": "Western Sahara",
};

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

const C = {
  bg: "#0B1724",
  card: "#112236",
  line: "#1E3350",
  pri: "#34D399",
  acc: "#FBBF24",
  tx: "#FFFFFF",
  tx2: "#94A3B8",
};

const BANDS = [
  { min: 95, color: "#34D399", label: "৯৫%+" },
  { min: 85, color: "#10A37A", label: "৮৫–৯৪.৯৯%" },
  { min: 70, color: "#0B7A62", label: "৭০–৮৪.৯৯%" },
  { min: 50, color: "#0E5448", label: "৫০–৬৯.৯৯%" },
];

const bandColor = (pct) =>
  BANDS.find((band) => pct >= band.min)?.color ?? "#16273B";

const fmt = (number) => Number(number).toLocaleString("en-US");

function normalizeCountryName(name) {
  if (!name) return "";
  return ALIASES[name] ?? name;
}

function getCountryName(properties) {
  return (
    properties?.name ??
    properties?.NAME ??
    properties?.ADMIN ??
    properties?.name_long ??
    ""
  );
}

export default function MuslimMap() {
  const [topo, setTopo] = useState(null);
  const [err, setErr] = useState("");
  const [sel, setSel] = useState(null);
  const [tip, setTip] = useState(null);
  const [mode, setMode] = useState("pct");
  const [view, setView] = useState({ k: 1, x: 0, y: 0 });

  const drag = useRef(null);
  const svgRef = useRef(null);
  const clipId = `hk-clip-${useId().replace(/:/g, "")}`;

  const load = useCallback(async (signal) => {
    setErr("");

    try {
      const response = await fetch(GEO_URL, { signal });

      if (!response.ok) {
        throw new Error(`Map request failed: ${response.status}`);
      }

      const data = await response.json();

      if (!data?.objects?.countries || !data?.arcs) {
        throw new Error("Invalid map data");
      }

      setTopo(data);
    } catch (error) {
      if (error.name !== "AbortError") {
        setErr("ম্যাপের ডেটা লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করুন।");
      }
    }
  }, []);

useEffect(() => {
  const controller = new AbortController();

  const fetchMap = async () => {
    await load(controller.signal);
  };

  fetchMap();

  return () => controller.abort();
}, [load]);

  const projection = useMemo(
    () =>
      geoNaturalEarth1().fitExtent(
        [
          [16, 16],
          [W - 16, H - 16],
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
    []
  );

  const path = useMemo(() => geoPath(projection), [projection]);
  const grat = useMemo(() => path(geoGraticule10()), [path]);

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

          if (data && country.geometry) {
            const geometry = country.geometry;

            const polygons =
              geometry.type === "MultiPolygon"
                ? geometry.coordinates.map((coordinates) => ({
                    type: "Polygon",
                    coordinates,
                  }))
                : geometry.type === "Polygon"
                  ? [geometry]
                  : [];

            polygons.forEach((polygon) => {
              const polygonArea = path.area(polygon);

              if (polygonArea > area) {
                area = polygonArea;
                centroid = path.centroid(polygon);
              }
            });
          }

          return {
            key: `${index}-${name}`,
            name,
            originalName,
            data,
            path: countryPath,
            centroid,
            area,
          };
        })
        .filter(Boolean);
    } catch {
      return [];
    }
  }, [topo, path]);

  const matched = useMemo(
    () => new Set(items.filter((item) => item.data).map((item) => item.name)),
    [items]
  );

  const rank = sel
    ? RANKED.findIndex((item) => item.name === sel.name) + 1
    : 0;

  const fill = (data) => {
    if (!data) return "#16273B";

    if (mode === "pct") {
      return bandColor(data.pct);
    }

    const opacity = 0.18 + 0.82 * Math.sqrt(data.pop / MAXPOP);

    return `rgba(251,191,36,${opacity.toFixed(2)})`;
  };

  const zoomBy = (factor) => {
    setView((current) => {
      const k = Math.min(8, Math.max(1, current.k * factor));
      const ratio = k / current.k;

      return {
        k,
        x: W / 2 - (W / 2 - current.x) * ratio,
        y: H / 2 - (H / 2 - current.y) * ratio,
      };
    });

    setTip(null);
  };

  const resetView = () => {
    setView({ k: 1, x: 0, y: 0 });
    setTip(null);
  };

  const onDown = (event) => {
    if (event.button !== undefined && event.button !== 0) return;

    drag.current = {
      pointerId: event.pointerId,
      sx: event.clientX,
      sy: event.clientY,
      x: view.x,
      y: view.y,
      moved: false,
    };

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture is not available in every environment.
    }
  };

  const onMove = (event) => {
    const current = drag.current;
    const svg = svgRef.current;

    if (!current || !svg) return;

    const dx = event.clientX - current.sx;
    const dy = event.clientY - current.sy;

    if (Math.abs(dx) + Math.abs(dy) > 5) {
      current.moved = true;
    }

    if (current.moved) {
      const rect = svg.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const scaleX = W / rect.width;
      const scaleY = H / rect.height;

      setView((previous) => ({
        ...previous,
        x: current.x + dx * scaleX,
        y: current.y + dy * scaleY,
      }));

      setTip(null);
    }
  };

  const onUp = () => {
    // Keep the moved flag until click handling finishes.
    // The next pointer-down replaces the previous drag state.
  };

  const pick = (data) => {
    if (!data) return;
    if (drag.current?.moved) return;

    setSel(data);
    setTip(null);
  };

  const hover = (event, item) => {
    if (!item?.data || drag.current?.moved) return;

    const x = Math.min(event.clientX + 14, window.innerWidth - 230);
    const y = Math.min(event.clientY + 14, window.innerHeight - 120);

    setTip({ x: Math.max(8, x), y: Math.max(8, y), data: item.data });
  };

  const selectedData = sel
    ? BY_NAME.get(sel.name)
    : null;

  return (
    <div className="hk">
      <style>{CSS}</style>

      <header className="hk-head">
        <div className="hk-rule" />
        <h1>WORLD MUSLIM POPULATION</h1>
        <p>হিকমাহ · রেফারেন্স ডেটা · প্রদত্ত তথ্যের উৎস যাচাই করুন</p>
        <div className="hk-rule" />
      </header>

      <section className="hk-stats">
        <div>
          <b>{fmt(GLOBAL.pop2020)}</b>
          <span>বিশ্বের মুসলিম জনসংখ্যা (২০২০)</span>
        </div>

        <div>
          <b>{GLOBAL.share2020}%</b>
          <span>বিশ্বের জনসংখ্যায় মুসলিমদের অংশ (২০২০)</span>
        </div>

        <div>
          <b>{GLOBAL.sunni}%</b>
          <span>বিশ্ব জনসংখ্যায় সুন্নিদের অংশ (প্রদত্ত ডেটা)</span>
        </div>

        <div>
          <b>{GLOBAL.shia.toFixed(2)}%</b>
          <span>বিশ্ব জনসংখ্যায় শিয়াদের অংশ (প্রদত্ত ডেটা)</span>
        </div>
      </section>

      <section className="hk-card">
        <div className="hk-bar">
          <h2>মুসলিম-সংখ্যাগরিষ্ঠ দেশ ({RAW.length}টি)</h2>

          <div className="hk-tabs">
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
        </div>

        <div className="hk-mapwrap">
          <div className="hk-zoom">
            <button
              type="button"
              onClick={() => zoomBy(1.5)}
              aria-label="Zoom in"
              title="জুম ইন"
            >
              +
            </button>

            <button
              type="button"
              onClick={() => zoomBy(1 / 1.5)}
              aria-label="Zoom out"
              title="জুম আউট"
            >
              −
            </button>

            <button
              type="button"
              onClick={resetView}
              aria-label="Reset map"
              title="ম্যাপ রিসেট"
            >
              ⟲
            </button>
          </div>

          {!topo && !err && (
            <div className="hk-msg">ম্যাপ লোড হচ্ছে…</div>
          )}

          {err && (
            <div className="hk-msg hk-error">
              <p>{err}</p>
              <button
                type="button"
                onClick={() => load(new AbortController().signal)}
              >
                আবার চেষ্টা করুন
              </button>
            </div>
          )}

          {topo && items.length === 0 && (
            <div className="hk-msg">
              ম্যাপের ডেটা পড়তে সমস্যা হয়েছে। আবার লোড করুন।
              <button
                type="button"
                onClick={() => load(new AbortController().signal)}
              >
                রিলোড
              </button>
            </div>
          )}

          <div className="hk-scroll">
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
              onPointerLeave={() => setTip(null)}
            >
              <defs>
                <clipPath id={clipId}>
                  <rect
                    x="8"
                    y="8"
                    width={W - 16}
                    height={H - 16}
                  />
                </clipPath>
              </defs>

              <rect width={W} height={H} fill={C.bg} />

              <g clipPath={`url(#${clipId})`}>
                <g
                  transform={`translate(${view.x} ${view.y}) scale(${view.k})`}
                >
                  <path
                    d={grat}
                    fill="none"
                    stroke={C.acc}
                    strokeOpacity=".12"
                    strokeWidth=".6"
                    vectorEffect="non-scaling-stroke"
                  />

                  {SEAS.map(([name, longitude, latitude]) => {
                    const point = projection([longitude, latitude]);

                    return (
                      <text
                        key={name}
                        x={point[0]}
                        y={point[1]}
                        className="hk-sea"
                        style={{ fontSize: 13 / view.k }}
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
                      onClick={() => pick(item.data)}
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
                          r={5 / view.k}
                          fill={fill(data)}
                          stroke={C.acc}
                          strokeWidth={1 / view.k}
                          style={{ cursor: "pointer" }}
                          onClick={() => pick(data)}
                          onPointerMove={(event) =>
                            hover(event, { name, data })
                          }
                          onPointerLeave={() => setTip(null)}
                        />
                      );
                    })}

                  {items
                    .filter(
                      (item) =>
                        item.data &&
                        item.centroid &&
                        item.area * view.k * view.k > 650
                    )
                    .map((item) => (
                      <text
                        key={`label-${item.key}`}
                        x={item.centroid[0]}
                        y={item.centroid[1]}
                        className="hk-lbl"
                        style={{
                          fontSize:
                            Math.min(
                              12,
                              Math.max(6.5, Math.sqrt(item.area) / 5.5)
                            ) / Math.sqrt(view.k),
                        }}
                      >
                        {item.name === "United Arab Emirates"
                          ? "UAE"
                          : item.name.toUpperCase()}
                      </text>
                    ))}
                </g>
              </g>

              <g transform={`translate(26 ${H - 118})`}>
                <rect
                  width="178"
                  height="92"
                  fill={C.bg}
                  fillOpacity=".92"
                  stroke={C.acc}
                />

                <text x="10" y="18" className="hk-lg-t">
                  {mode === "pct" ? "মুসলিমদের শতাংশ" : "মুসলিম জনসংখ্যা"}
                </text>

                {mode === "pct" ? (
                  BANDS.map((band, index) => (
                    <g
                      key={band.label}
                      transform={`translate(10 ${28 + index * 15})`}
                    >
                      <rect
                        width="16"
                        height="10"
                        fill={band.color}
                        stroke={C.acc}
                        strokeWidth=".6"
                      />
                      <text x="24" y="9" className="hk-lg">
                        {band.label}
                      </text>
                    </g>
                  ))
                ) : (
                  <g transform="translate(10 32)">
                    <rect
                      width="16"
                      height="10"
                      fill="rgba(251,191,36,.25)"
                      stroke={C.acc}
                      strokeWidth=".6"
                    />
                    <text x="24" y="9" className="hk-lg">
                      কম
                    </text>

                    <rect
                      y="18"
                      width="16"
                      height="10"
                      fill="rgba(251,191,36,1)"
                      stroke={C.acc}
                      strokeWidth=".6"
                    />
                    <text x="24" y="27" className="hk-lg">
                      বেশি
                    </text>

                    <text x="0" y="48" className="hk-lg">
                      ধূসর = ডেটা নেই
                    </text>
                  </g>
                )}
              </g>

              <rect
                x="2"
                y="2"
                width={W - 4}
                height={H - 4}
                fill="none"
                stroke={C.acc}
                strokeWidth="3"
              />

              <rect
                x="8"
                y="8"
                width={W - 16}
                height={H - 16}
                fill="none"
                stroke={C.acc}
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>

        <p className="hk-note">
          দেশ নির্বাচন করতে ক্লিক বা ট্যাপ করুন। ড্র্যাগ করে ম্যাপ সরান
          এবং +/− দিয়ে জুম করুন। সংখ্যাগুলো প্রদত্ত ডেটা থেকে নেওয়া;
          প্রকাশের আগে মূল উৎস ও রেফারেন্স বছর যাচাই করুন।
        </p>
      </section>

      <div className="hk-grid">
        <section className="hk-card">
          <h2>দেশের তথ্য</h2>

          {selectedData ? (
            <div>
              <p className="hk-big">{selectedData.name}</p>

              <div className="hk-row">
                <span>মুসলিম জনসংখ্যা (প্রদত্ত ডেটা)</span>
                <b>{fmt(selectedData.pop)}</b>
              </div>

              <div className="hk-row">
                <span>মোট জনসংখ্যায় মুসলিম</span>
                <b>{selectedData.pct.toFixed(2)}%</b>
              </div>

              <div className="hk-row">
                <span>মুসলিম-সংখ্যাগরিষ্ঠ</span>
                <b>{selectedData.pct > 50 ? "হ্যাঁ" : "না"}</b>
              </div>

              <div className="hk-row">
                <span>প্রদত্ত তালিকায় অবস্থান</span>
                <b>
                  {rank > 0 ? `${rank} / ${RAW.length}` : "তথ্য নেই"}
                </b>
              </div>
            </div>
          ) : (
            <p className="hk-dim">
              ম্যাপ বা তালিকা থেকে একটি দেশ বেছে নিন।
            </p>
          )}
        </section>

        <section className="hk-card">
          <h2>সর্বোচ্চ মুসলিম জনসংখ্যা</h2>

          {RANKED.slice(0, 12).map((data) => (
            <button
              type="button"
              key={data.name}
              className={
                "hk-b" + (sel?.name === data.name ? " sel" : "")
              }
              onClick={() => setSel(data)}
            >
              <span className="hk-country-name">{data.name}</span>

              <span className="t">
                <span
                  className="hk-bar-fill"
                  style={{
                    width: `${(data.pop / MAXPOP) * 100}%`,
                  }}
                />
              </span>

              <span className="hk-pop">
                {(data.pop / 1e6).toFixed(1)}M
              </span>
            </button>
          ))}
        </section>

        <section className="hk-card hk-donut">
          <h2>বিশ্বে মুসলিমদের অংশ (২০২০)</h2>

          <svg
            viewBox="0 0 120 120"
            width="150"
            height="150"
            role="img"
            aria-label={`বিশ্ব জনসংখ্যার ${GLOBAL.share2020}% মুসলিম`}
          >
            <circle
              cx="60"
              cy="60"
              r="40"
              fill="none"
              stroke={C.line}
              strokeWidth="16"
            />

            <circle
              cx="60"
              cy="60"
              r="40"
              fill="none"
              stroke={C.pri}
              strokeWidth="16"
              strokeDasharray={`${(GLOBAL.share2020 / 100) * 251.33} 251.33`}
              transform="rotate(-90 60 60)"
            />

            <text
              x="60"
              y="66"
              textAnchor="middle"
              fill={C.acc}
              fontSize="18"
              fontWeight="700"
            >
              {GLOBAL.share2020}%
            </text>
          </svg>
        </section>
      </div>

      {tip && (
        <div
          className="hk-tip"
          style={{ left: tip.x, top: tip.y }}
          role="status"
        >
          <b>{tip.data.name}</b>
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
  padding: 16px;
  max-width: 1240px;
  margin: 0 auto;
  min-height: 100vh;
}

.hk * { box-sizing: border-box; }

.hk-head { text-align: center; margin-bottom: 14px; }

.hk-head h1 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(1.2rem, 4vw, 2.1rem);
  letter-spacing: .1em;
  color: ${C.acc};
  margin: 10px 0 2px;
  font-weight: 700;
  overflow-wrap: anywhere;
}

.hk-head p {
  margin: 0 0 10px;
  color: ${C.tx2};
  font-size: .88rem;
}

.hk-rule {
  height: 5px;
  border-top: 1px solid ${C.acc};
  border-bottom: 1px solid ${C.acc};
}

.hk-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 14px;
}

.hk-stats div {
  min-width: 0;
  background: ${C.card};
  border: 1px solid ${C.line};
  border-radius: 10px;
  padding: 10px 12px;
}

.hk-stats b {
  display: block;
  font-size: clamp(.95rem, 2.5vw, 1.25rem);
  color: ${C.pri};
  overflow-wrap: anywhere;
}

.hk-stats span { font-size: .78rem; color: ${C.tx2}; }

.hk-card {
  min-width: 0;
  background: ${C.card};
  border: 1px solid ${C.line};
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 14px;
}

.hk-card h2 {
  font-family: Georgia, serif;
  font-size: .95rem;
  margin: 0 0 10px;
  color: ${C.acc};
  letter-spacing: .02em;
}

.hk-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.hk-tabs { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }

.hk-tabs button {
  background: ${C.bg};
  color: ${C.tx2};
  border: 1px solid ${C.line};
  border-radius: 8px;
  padding: 5px 12px;
  font: inherit;
  font-size: .85rem;
  cursor: pointer;
}

.hk-tabs button.on {
  color: ${C.pri};
  border-color: ${C.pri};
}

.hk button:focus-visible {
  outline: 2px solid ${C.acc};
  outline-offset: 3px;
}

.hk-mapwrap { position: relative; }

.hk-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 6px;
}

.hk-svg {
  display: block;
  width: 100%;
  min-width: 680px;
  height: auto;
  touch-action: none;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
}

.hk-svg:active { cursor: grabbing; }

.hk-zoom {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hk-zoom button {
  width: 32px;
  height: 32px;
  background: ${C.bg};
  color: ${C.acc};
  border: 1px solid ${C.acc};
  border-radius: 6px;
  font-size: 1.05rem;
  cursor: pointer;
}

.hk-msg {
  position: absolute;
  inset: 0;
  min-height: 150px;
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
  background: ${C.bg};
  color: ${C.pri};
  border: 1px solid ${C.pri};
  border-radius: 6px;
  padding: 4px 10px;
  font: inherit;
  cursor: pointer;
  pointer-events: auto;
}

.hk-error { color: #FCA5A5; }

.hk-c { stroke: #2A3F5C; stroke-width: .5; }

.hk-c.live {
  stroke: ${C.acc};
  stroke-width: .7;
  cursor: pointer;
  transition: filter .15s;
}

.hk-c.live:hover { filter: brightness(1.3); }

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

.hk-lg-t {
  font-family: Georgia, serif;
  font-size: 11px;
  fill: ${C.acc};
  font-weight: 700;
}

.hk-lg { font-size: 10.5px; fill: ${C.tx}; }

.hk-note {
  font-size: .76rem;
  color: ${C.tx2};
  margin: 10px 0 0;
  line-height: 1.7;
}

.hk-grid { display: grid; gap: 14px; grid-template-columns: minmax(0, 1fr); }

.hk-big {
  font-size: 1.5rem;
  font-weight: 700;
  color: ${C.pri};
  margin: 0 0 4px;
  overflow-wrap: anywhere;
}

.hk-dim { color: ${C.tx2}; margin: 0; }

.hk-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 6px 0;
  border-bottom: 1px dashed ${C.line};
  font-size: .92rem;
}

.hk-row span { color: ${C.tx2}; }
.hk-row b { text-align: right; overflow-wrap: anywhere; }

.hk-b {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(80px, 105px) minmax(30px, 1fr) 55px;
  gap: 6px;
  align-items: center;
  font-family: inherit;
  font-size: .8rem;
  margin: 5px 0;
  padding: 2px 0;
  color: ${C.tx};
  text-align: left;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.hk-country-name { overflow-wrap: anywhere; }

.hk-b .t {
  display: block;
  background: ${C.bg};
  height: 12px;
  border-radius: 2px;
  overflow: hidden;
}

.hk-bar-fill {
  display: block;
  height: 100%;
  background: ${C.pri};
  border-radius: 2px;
}

.hk-b .hk-pop { text-align: right; color: ${C.tx2}; }
.hk-b.sel { color: ${C.acc}; }
.hk-b.sel .hk-bar-fill { background: ${C.acc}; }

.hk-donut { text-align: center; }

.hk-tip {
  position: fixed;
  pointer-events: none;
  background: rgba(0, 0, 0, .92);
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
}

@media (min-width: 900px) {
  .hk-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr) 220px;
    align-items: start;
  }
}

@media (max-width: 480px) {
  .hk { padding: 10px; }
  .hk-card { padding: 10px; }
  .hk-head h1 { letter-spacing: .04em; }
  .hk-tabs { width: 100%; }
  .hk-tabs button { flex: 1; padding: 6px 5px; font-size: .78rem; }
  .hk-svg { min-width: 600px; }
  .hk-b { grid-template-columns: 86px minmax(20px, 1fr) 48px; }
}
`;
