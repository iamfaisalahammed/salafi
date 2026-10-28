
import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import atlasData from '../../../public/data/khilafahAtlasData.json';

/* ==========================================
   ১. ডাটা (সব তথ্য khilafahAtlasData.json ফাইলে আছে)
   তথ্য আপডেট করতে শুধু ঐ JSON ফাইল এডিট করুন।
========================================== */
const HISTORICAL_PERIODS_BN = atlasData.periods;
const SILK_ROAD_ROUTES = atlasData.routes;
const LANDMASSES = atlasData.landmasses;
const SEA_LABELS = atlasData.seaLabels;
const CATEGORIES = atlasData.categories;
const HOW_TO_STEPS = atlasData.howToSteps;
const HISTORICAL_CITIES_BN = atlasData.cities.map((c) => ({
  ...c,
  short: c.short || c.name.split(' ')[0]
}));

/* ==========================================
   ২. আইকন
========================================== */
const Icon = ({ d, d2, className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
    {d2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d2} />}
  </svg>
);

const IconGlobe = (p) => <Icon {...p} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />;
const IconZoomIn = (p) => <Icon {...p} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />;
const IconZoomOut = (p) => <Icon {...p} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />;
const IconReset = (p) => <Icon {...p} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />;
const IconMapPin = (p) => <Icon {...p} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" d2="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />;
const IconLayers = (p) => <Icon {...p} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />;
const IconBook = (p) => <Icon {...p} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />;
const IconCalendar = (p) => <Icon {...p} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />;
const IconCompare = (p) => <Icon {...p} d="M9 17V7m6 10V7m-8 10h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />;
const IconSearch = (p) => <Icon {...p} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />;
const IconClose = (p) => <Icon {...p} d="M6 18L18 6M6 6l12 12" />;
const IconCrown = (p) => <Icon {...p} d="M5 16l-1-8 4 3 4-5 4 5 4-3-1 8H5z" />;
const IconRoute = (p) => <Icon {...p} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />;
const IconHelp = (p) => <Icon {...p} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />;
const IconChevron = (p) => <Icon {...p} d="M5 15l7-7 7 7" />;
const IconChevronDown = (p) => <Icon {...p} d="M19 9l-7 7-7-7" />;
const IconArrowLeft = (p) => <Icon {...p} d="M15 19l-7-7 7-7" />;
const IconArrowRight = (p) => <Icon {...p} d="M9 5l7 7-7 7" />;
const IconSwap = (p) => <Icon {...p} d="M8 7h12m0 0l-4-4m4 4l-4 4M16 17H4m0 0l4-4m-4 4l4 4" />;

/* ==========================================
   ৩. সহায়ক ফাংশন ও ধ্রুবক
========================================== */
const MIN_K = 0.8;
const MAX_K = 6;
const VIEW = { x: 90, y: 190, w: 830, h: 410 };
const GRATICULE_X = [90, 170, 250, 330, 410, 490, 570, 650, 730, 810, 890];
const GRATICULE_Y = [190, 270, 350, 430, 510, 590];

const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
const isCapitalOf = (period, city) => period.capital.includes(city.short);
const toBn = (n) => String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbd7b]';

/* ==========================================
   ৪. তথ্য প্যানেল (ডেস্কটপ সাইডবার ও মোবাইল শিট উভয়ে ব্যবহৃত)
========================================== */
function InfoContent({ period, comparePeriod, isCompareMode, activeTab, setActiveTab, onSwap }) {
  const tabs = [
    { id: 'overview', label: 'বিবরণ' },
    { id: 'timeline', label: 'ঘটনাবলী' },
    { id: 'sources', label: 'তথ্যসূত্র' }
  ];

  return (
    <div className="flex flex-col min-h-0">
      {isCompareMode && comparePeriod && (
        <div className="p-3 bg-[#0B1724] border-b border-[#dfbd7b]/40 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-[#dfbd7b]">তুলনামূলক তথ্য</span>
            <button
              onClick={onSwap}
              className={`flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg bg-[#1E3350] text-gray-200 border border-gray-700 hover:border-[#dfbd7b] ${FOCUS}`}
            >
              <IconSwap className="w-3.5 h-3.5" /> অদলবদল
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 bg-[#112236] rounded-xl border border-emerald-500/40">
              <span className="text-emerald-400 font-bold block">{period.name}</span>
              <span className="text-gray-300 block mt-1">আয়তন: {period.peakArea}</span>
              <span className="text-gray-300 block">রাজধানী: {period.capital}</span>
            </div>
            <div className="p-2.5 bg-[#112236] rounded-xl border border-amber-400/40">
              <span className="text-amber-300 font-bold block">{comparePeriod.name}</span>
              <span className="text-gray-300 block mt-1">আয়তন: {comparePeriod.peakArea}</span>
              <span className="text-gray-300 block">রাজধানী: {comparePeriod.capital}</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-px bg-gray-800 text-xs">
        <div className="p-3 bg-[#112236]">
          <span className="text-gray-400 text-[11px] font-bold block">রাজধানী</span>
          <span className="font-bold text-white flex items-center gap-1 mt-1 text-sm">
            <IconCrown className="w-4 h-4 text-[#dfbd7b] shrink-0" /> {period.capital}
          </span>
        </div>
        <div className="p-3 bg-[#112236]">
          <span className="text-gray-400 text-[11px] font-bold block">সর্বোচ্চ বিস্তার</span>
          <span className="font-bold text-emerald-400 mt-1 text-sm block">{period.peakArea}</span>
        </div>
      </div>

      <div className="flex gap-1 p-1.5 border-b border-gray-800 bg-[#0B1724]" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition ${FOCUS} ${
              activeTab === tab.id ? 'bg-[#dfbd7b] text-gray-950' : 'text-gray-400 hover:text-gray-200 hover:bg-[#1E3350]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4 text-xs">
        {activeTab === 'overview' && (
          <>
            <div>
              <h3 className="text-xs font-bold text-[#dfbd7b] mb-2 flex items-center gap-1.5">
                <IconBook className="w-4 h-4 text-emerald-400" /> সংক্ষিপ্ত বিবরণ
              </h3>
              <p className="text-gray-200 leading-relaxed text-[13px] bg-[#1E3350]/30 p-3.5 rounded-xl border border-gray-800/80">{period.overview}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-300 mb-1.5">শাসনকর্তা ও নেতৃত্ব</h3>
              <p className="text-gray-100 text-[13px] bg-[#1E3350]/30 p-3 rounded-xl border border-gray-800/80 font-semibold">{period.leadership}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-300 mb-2">বর্তমান যেসব দেশ অন্তর্ভুক্ত</h3>
              <div className="flex flex-wrap gap-1.5">
                {period.modernCountries.map((country) => (
                  <span key={country} className="px-2.5 py-1 rounded-full bg-[#1E3350] text-gray-200 border border-gray-700 text-[12px]">
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#dfbd7b] mb-3">গুরুত্বপূর্ণ ঐতিহাসিক ঘটনাবলী</h3>
            {period.keyEvents.map((evt) => (
              <div key={evt.year + evt.title} className="relative pl-4 border-l-2 border-[#dfbd7b] space-y-1 pb-2">
                <span className="text-[11px] font-bold text-[#dfbd7b] bg-[#dfbd7b]/10 px-2 py-0.5 rounded border border-[#dfbd7b]/30">{evt.year}</span>
                <h4 className="font-bold text-white text-[13px] mt-1">{evt.title}</h4>
                <p className="text-gray-300 text-[12px] leading-relaxed">{evt.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#dfbd7b] mb-2">ঐতিহাসিক তথ্যসূত্র ও গ্রন্থ</h3>
            {period.sources.map((src) => (
              <div key={src.title} className="bg-[#1E3350]/30 border border-gray-800 p-3.5 rounded-xl space-y-1.5">
                <div className="font-bold text-[#dfbd7b] text-[13px]">{src.title}</div>
                <div className="text-[12px] text-gray-300">লেখক/সংকলক: <span className="text-white font-medium">{src.author}</span></div>
                <p className="text-[12px] text-gray-400 italic bg-[#0B1724] p-2 rounded border border-gray-800">{src.notes}</p>
              </div>
            ))}
          </div>
        )}

        <p className="text-[11px] text-gray-500 leading-relaxed pt-2 border-t border-gray-800">
          মানচিত্রের সীমানা আনুমানিক ও শিক্ষামূলক চিত্রায়ন; এটি নিখুঁত ভৌগোলিক সীমানা নয়।
        </p>
      </div>
    </div>
  );
}

/* ==========================================
   ৫. মূল কম্পোনেন্ট
========================================== */
export default function KhilafahAtlas() {
  const [selectedPeriodId, setSelectedPeriodId] = useState(HISTORICAL_PERIODS_BN[0].id);
  const [comparePeriodId, setComparePeriodId] = useState(null);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedCity, setSelectedCity] = useState(null);
  const [activeRegion, setActiveRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pickerTarget, setPickerTarget] = useState(null); // null | 'primary' | 'compare'
  const [activeTab, setActiveTab] = useState('overview');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showHelp, setShowHelp] = useState(true);
  const [hintVisible, setHintVisible] = useState(true);
  const [transform, setTransform] = useState({ k: 1, x: 0, y: 0 });

  const svgRef = useRef(null);
  const pointersRef = useRef(new Map());
  const pinchDistRef = useRef(0);
  const startPosRef = useRef({ x: 0, y: 0 });
  const movedRef = useRef(false);

  const total = HISTORICAL_PERIODS_BN.length;

  const selectedIndex = useMemo(() => {
    const i = HISTORICAL_PERIODS_BN.findIndex((p) => p.id === selectedPeriodId);
    return i < 0 ? 0 : i;
  }, [selectedPeriodId]);

  const currentPeriod = HISTORICAL_PERIODS_BN[selectedIndex];

  const comparePeriod = useMemo(
    () => HISTORICAL_PERIODS_BN.find((p) => p.id === comparePeriodId) || null,
    [comparePeriodId]
  );

  const filteredEras = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return HISTORICAL_PERIODS_BN.filter((p) => {
      const matchesCategory = categoryFilter === 'ALL' || p.typeCategory === categoryFilter;
      if (!matchesCategory) return false;
      if (!q) return true;
      const textHit = [p.name, p.capital, p.dates, p.type].some((s) => s.toLowerCase().includes(q));
      const cityHit = HISTORICAL_CITIES_BN.some(
        (c) => (c.name + c.region).toLowerCase().includes(q) && isCapitalOf(p, c)
      );
      return textHit || cityHit;
    });
  }, [searchQuery, categoryFilter]);

  /* Esc দিয়ে তালিকা বা গাইড বন্ধ */
  useEffect(() => {
    if (!showHelp && !pickerTarget) return undefined;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (pickerTarget) setPickerTarget(null);
      else setShowHelp(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showHelp, pickerTarget]);

  /* ---------- জুম ও প্যান ---------- */
  const toSvgPoint = useCallback((cx, cy) => {
    const svg = svgRef.current;
    const ctm = svg ? svg.getScreenCTM() : null;
    if (!svg || !ctm) return { x: VIEW.x + VIEW.w / 2, y: VIEW.y + VIEW.h / 2 };
    const pt = svg.createSVGPoint();
    pt.x = cx;
    pt.y = cy;
    const p = pt.matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  }, []);

  const unitsPerPx = useCallback(() => {
    const svg = svgRef.current;
    const ctm = svg ? svg.getScreenCTM() : null;
    return ctm && ctm.a ? 1 / ctm.a : 1;
  }, []);

  const zoomAt = useCallback((factor, px, py) => {
    setTransform((prev) => {
      const k = clamp(prev.k * factor, MIN_K, MAX_K);
      const r = k / prev.k;
      return { k, x: px - (px - prev.x) * r, y: py - (py - prev.y) * r };
    });
  }, []);

  const zoomCenter = (factor) => zoomAt(factor, VIEW.x + VIEW.w / 2, VIEW.y + VIEW.h / 2);
  const handleReset = () => setTransform({ k: 1, x: 0, y: 0 });
  const handlePan = (dx, dy) => setTransform((prev) => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;
    const onWheel = (e) => {
      e.preventDefault();
      const p = toSvgPoint(e.clientX, e.clientY);
      zoomAt(e.deltaY < 0 ? 1.15 : 0.87, p.x, p.y);
    };
    svg.addEventListener('wheel', onWheel, { passive: false });
    return () => svg.removeEventListener('wheel', onWheel);
  }, [toSvgPoint, zoomAt]);

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    setHintVisible(false);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointersRef.current.size === 1) {
      movedRef.current = false;
      startPosRef.current = { x: e.clientX, y: e.clientY };
    } else if (pointersRef.current.size === 2) {
      const [a, b] = Array.from(pointersRef.current.values());
      pinchDistRef.current = Math.hypot(a.x - b.x, a.y - b.y);
      movedRef.current = true;
    }
  };

  const onPointerMove = (e) => {
    const prev = pointersRef.current.get(e.pointerId);
    if (!prev) return;
    const cur = { x: e.clientX, y: e.clientY };
    pointersRef.current.set(e.pointerId, cur);

    if (pointersRef.current.size === 1) {
      if (Math.hypot(cur.x - startPosRef.current.x, cur.y - startPosRef.current.y) > 6) movedRef.current = true;
      if (!movedRef.current) return;
      const u = unitsPerPx();
      const dx = (cur.x - prev.x) * u;
      const dy = (cur.y - prev.y) * u;
      setTransform((t) => ({ ...t, x: t.x + dx, y: t.y + dy }));
    } else if (pointersRef.current.size === 2) {
      const [a, b] = Array.from(pointersRef.current.values());
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinchDistRef.current > 0 && dist > 0) {
        const mid = toSvgPoint((a.x + b.x) / 2, (a.y + b.y) / 2);
        zoomAt(dist / pinchDistRef.current, mid.x, mid.y);
      }
      pinchDistRef.current = dist;
    }
  };

  const onPointerUp = (e) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) pinchDistRef.current = 0;
  };

  /* ---------- যুগ বাছাই ও তুলনা ---------- */
  const selectPrimary = (id) => {
    if (isCompareMode && id === comparePeriodId) setComparePeriodId(selectedPeriodId);
    setSelectedPeriodId(id);
  };

  const pickEra = (id) => {
    setSelectedCity(null);
    setActiveRegion(null);
    if (pickerTarget === 'compare') {
      if (id !== selectedPeriodId) setComparePeriodId(id);
    } else {
      selectPrimary(id);
    }
    setPickerTarget(null);
  };

  const stepEra = (delta) => {
    const next = HISTORICAL_PERIODS_BN[selectedIndex + delta];
    if (!next) return;
    setSelectedCity(null);
    setActiveRegion(null);
    selectPrimary(next.id);
  };

  const toggleCompareMode = () => {
    if (isCompareMode) {
      setIsCompareMode(false);
      setComparePeriodId(null);
    } else {
      setIsCompareMode(true);
      setComparePeriodId(HISTORICAL_PERIODS_BN[(selectedIndex + 1) % total].id);
    }
  };

  const swapPeriods = () => {
    if (!comparePeriodId) return;
    setSelectedPeriodId(comparePeriodId);
    setComparePeriodId(selectedPeriodId);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setCategoryFilter('ALL');
  };

  /* ---------- মানচিত্রে ট্যাপ ---------- */
  const onCityTap = (e, city) => {
    e.stopPropagation();
    if (movedRef.current) return;
    setActiveRegion(null);
    setSelectedCity(city);
  };

  const onRegionTap = (e, name) => {
    e.stopPropagation();
    if (movedRef.current) return;
    setSelectedCity(null);
    setActiveRegion((prev) => (prev === name ? null : name));
  };

  const k = transform.k;
  const showFullLabels = k >= 1.6;

  const iconBtn = `w-11 h-11 flex items-center justify-center text-gray-300 hover:text-[#dfbd7b] hover:bg-[#1E3350] rounded-xl transition ${FOCUS}`;
  const stepBtn = `shrink-0 w-14 md:w-16 flex flex-col items-center justify-center gap-0.5 rounded-2xl border border-[#dfbd7b]/40 bg-[#1E3350]/70 text-[#dfbd7b] text-[10px] font-bold transition enabled:hover:bg-[#dfbd7b]/20 enabled:active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed ${FOCUS}`;

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-[#0B1724] text-gray-100 font-sans overflow-hidden select-none">
      <style>{`
        @keyframes atlas-dash { to { stroke-dashoffset: -28; } }
        .atlas-route { animation: atlas-dash 3s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .atlas-route { animation: none; } }
      `}</style>

      {/* ---------- হেডার ---------- */}
      <header className="flex-none bg-gradient-to-b from-[#14293F] to-[#0F2033] border-b border-[#dfbd7b]/25 z-30 shadow-xl">
        <div className="flex items-center justify-between gap-2 px-3 md:px-5 pt-2.5 pb-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 shrink-0 rounded-2xl bg-gradient-to-br from-[#dfbd7b]/30 to-[#dfbd7b]/5 border border-[#dfbd7b]/70 flex items-center justify-center text-[#dfbd7b]">
              <IconGlobe className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base md:text-lg font-bold text-white leading-tight truncate">খিলাফাত এটলাস</h1>
              <p className="text-[11px] md:text-xs text-gray-400 leading-snug truncate">
                {toBn(total)}টি যুগের ইসলামী ইতিহাস মানচিত্রে
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setShowRoutes((v) => !v)}
              aria-pressed={showRoutes}
              aria-label="বাণিজ্য পথ দেখান বা লুকান"
              className={`flex items-center gap-1 h-10 px-2.5 rounded-xl border text-[11px] font-semibold transition ${FOCUS} ${
                showRoutes ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-[#1E3350] text-gray-400 border-gray-700'
              }`}
            >
              <IconRoute className="w-4 h-4" />
              <span className="hidden sm:inline">বাণিজ্য পথ</span>
            </button>
            <button
              onClick={toggleCompareMode}
              aria-pressed={isCompareMode}
              aria-label="যুগ তুলনা চালু বা বন্ধ"
              className={`flex items-center gap-1 h-10 px-2.5 rounded-xl border text-[11px] font-semibold transition ${FOCUS} ${
                isCompareMode ? 'bg-[#dfbd7b] text-gray-950 border-[#dfbd7b]' : 'bg-[#1E3350] text-gray-300 border-gray-700'
              }`}
            >
              <IconCompare className="w-4 h-4" />
              <span>{isCompareMode ? 'তুলনা বন্ধ' : 'তুলনা'}</span>
            </button>
            <button
              onClick={() => setShowHelp(true)}
              aria-label="কীভাবে ব্যবহার করবেন"
              className={`h-10 w-10 flex items-center justify-center rounded-xl bg-[#1E3350] border border-[#dfbd7b]/50 text-[#dfbd7b] ${FOCUS}`}
            >
              <IconHelp className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* যুগ বাছাই বার: আগের ‹ [ বর্তমান যুগ ▾ ] › পরের */}
        <div className="flex items-stretch gap-2 px-3 md:px-5 pb-2.5">
          <button onClick={() => stepEra(-1)} disabled={selectedIndex <= 0} aria-label="আগের যুগ" className={stepBtn}>
            <IconArrowLeft className="w-5 h-5" />
            <span>আগের</span>
          </button>

          <button
            onClick={() => setPickerTarget('primary')}
            aria-haspopup="dialog"
            aria-label="সব যুগের তালিকা খুলুন"
            className={`flex-1 min-w-0 flex items-center gap-3 text-left px-3.5 py-2 rounded-2xl border border-[#dfbd7b] bg-gradient-to-r from-[#dfbd7b]/20 to-[#dfbd7b]/5 transition active:scale-[0.99] ${FOCUS}`}
          >
            <span className="w-3 h-10 rounded-full shrink-0" style={{ backgroundColor: currentPeriod.color }} />
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-bold text-[#dfbd7b]/80">
                যুগ {toBn(selectedIndex + 1)} / {toBn(total)}
              </span>
              <span className="block text-sm font-bold text-white truncate">{currentPeriod.name}</span>
              <span className="block text-[11px] text-gray-300 truncate">{currentPeriod.dates}</span>
            </span>
            <span className="shrink-0 flex flex-col items-center text-[10px] font-bold text-[#dfbd7b] gap-0.5">
              <IconChevronDown className="w-5 h-5" />
              <span>সব যুগ</span>
            </span>
          </button>

          <button onClick={() => stepEra(1)} disabled={selectedIndex >= total - 1} aria-label="পরের যুগ" className={stepBtn}>
            <IconArrowRight className="w-5 h-5" />
            <span>পরের</span>
          </button>
        </div>

        {isCompareMode && comparePeriod && (
          <div className="flex items-center gap-2 px-3 md:px-5 pb-2.5">
            <button
              onClick={() => setPickerTarget('compare')}
              aria-haspopup="dialog"
              aria-label="তুলনার যুগ বদলান"
              className={`flex-1 min-w-0 flex items-center gap-2.5 text-left px-3 py-2 rounded-2xl border border-dashed border-amber-400 bg-amber-500/10 ${FOCUS}`}
            >
              <span className="w-2.5 h-8 rounded-full shrink-0" style={{ backgroundColor: comparePeriod.color }} />
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-bold text-amber-300">তুলনার যুগ (কমলা রেখা)</span>
                <span className="block text-[13px] font-bold text-amber-100 truncate">{comparePeriod.name}</span>
              </span>
              <IconChevronDown className="w-5 h-5 text-amber-300 shrink-0" />
            </button>
            <button
              onClick={swapPeriods}
              aria-label="দুই যুগ অদলবদল করুন"
              className={`h-12 w-12 shrink-0 flex items-center justify-center rounded-2xl bg-[#1E3350] border border-gray-700 text-gray-200 hover:border-[#dfbd7b] ${FOCUS}`}
            >
              <IconSwap className="w-5 h-5" />
            </button>
          </div>
        )}
      </header>

      {/* ---------- মূল এলাকা ---------- */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
        {/* মানচিত্র */}
        <div className="relative flex-1 min-h-0 min-w-0 bg-[#060D14] overflow-hidden">
          {/* লিজেন্ড */}
          <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20 max-w-[60%] md:max-w-xs">
            <div className="bg-[#112236]/85 backdrop-blur-md border border-[#dfbd7b]/30 rounded-2xl px-3 py-2 shadow-xl text-xs">
              <div className="hidden md:flex items-center gap-1.5 mb-1.5 font-bold text-[#dfbd7b]">
                <IconLayers className="w-4 h-4" /> মানচিত্রের নির্দেশিকা
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm border border-[#dfbd7b] shrink-0" style={{ backgroundColor: currentPeriod.color }} />
                <span className="text-gray-100 font-semibold truncate">{currentPeriod.name}</span>
              </div>
              {isCompareMode && comparePeriod && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-3 h-3 rounded-sm border border-dashed border-amber-400 shrink-0" style={{ backgroundColor: comparePeriod.color }} />
                  <span className="text-amber-300 font-semibold truncate">{comparePeriod.name}</span>
                </div>
              )}
              <div className="hidden md:flex items-center gap-2 mt-1.5 text-[11px] text-gray-400">
                <span className="w-2.5 h-2.5 rounded-full bg-[#dfbd7b] border border-gray-900" /> রাজধানী
                <span className="w-2.5 h-2.5 rounded-full bg-[#34D399] border border-gray-900 ml-2" /> অন্যান্য শহর
              </div>
              {showRoutes && (
                <div className="hidden md:flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                  <span className="w-5 border-t-2 border-dashed border-[#dfbd7b]" /> রেশম পথ ও বাণিজ্য পথ
                </div>
              )}
            </div>
          </div>

          {/* জুম কন্ট্রোল */}
          <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20 flex flex-col gap-2">
            <div className="bg-[#112236]/85 backdrop-blur-md border border-[#dfbd7b]/30 rounded-2xl p-1 flex flex-col shadow-xl">
              <button onClick={() => zoomCenter(1.3)} aria-label="জুম ইন" className={iconBtn}>
                <IconZoomIn className="w-5 h-5" />
              </button>
              <button onClick={() => zoomCenter(0.77)} aria-label="জুম আউট" className={iconBtn}>
                <IconZoomOut className="w-5 h-5" />
              </button>
              <div className="h-px bg-gray-700 my-0.5" />
              <button onClick={handleReset} aria-label="মানচিত্র রিসেট করুন" className={iconBtn}>
                <IconReset className="w-5 h-5" />
              </button>
            </div>

            <div className="hidden lg:grid bg-[#112236]/85 backdrop-blur-md border border-gray-800 rounded-2xl p-1.5 grid-cols-3 gap-1 shadow-xl text-gray-400 w-28">
              <div />
              <button onClick={() => handlePan(0, 40)} aria-label="উপরে" className="p-1.5 hover:text-white hover:bg-[#1E3350] rounded">▲</button>
              <div />
              <button onClick={() => handlePan(40, 0)} aria-label="বামে" className="p-1.5 hover:text-white hover:bg-[#1E3350] rounded">◀</button>
              <button onClick={handleReset} aria-label="কেন্দ্রে ফিরুন" className="p-1.5 hover:text-[#dfbd7b] hover:bg-[#1E3350] rounded">●</button>
              <button onClick={() => handlePan(-40, 0)} aria-label="ডানে" className="p-1.5 hover:text-white hover:bg-[#1E3350] rounded">▶</button>
              <div />
              <button onClick={() => handlePan(0, -40)} aria-label="নিচে" className="p-1.5 hover:text-white hover:bg-[#1E3350] rounded">▼</button>
              <div />
            </div>
          </div>

          {/* SVG মানচিত্র */}
          <svg
            ref={svgRef}
            className="w-full h-full block cursor-grab active:cursor-grabbing"
            style={{ touchAction: 'none' }}
            viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="ইসলামী খিলাফাত ও সাম্রাজ্যের ইন্টারঅ্যাকটিভ মানচিত্র"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={onPointerUp}
            onClick={() => {
              if (movedRef.current) return;
              setSelectedCity(null);
              setActiveRegion(null);
            }}
          >
            <defs>
              <radialGradient id="ocean-grad" cx="50%" cy="45%" r="75%">
                <stop offset="0%" stopColor="#10243A" />
                <stop offset="100%" stopColor="#060D14" />
              </radialGradient>
              <linearGradient id="land-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#23405F" />
                <stop offset="100%" stopColor="#162B44" />
              </linearGradient>
              <linearGradient id="terr-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={currentPeriod.color} stopOpacity={Math.min(currentPeriod.fillOpacity + 0.2, 0.95)} />
                <stop offset="100%" stopColor={currentPeriod.color} stopOpacity={currentPeriod.fillOpacity - 0.15} />
              </linearGradient>
              <linearGradient id="compare-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={comparePeriod ? comparePeriod.color : '#FBBF24'} stopOpacity="0.5" />
                <stop offset="100%" stopColor={comparePeriod ? comparePeriod.color : '#FBBF24'} stopOpacity="0.25" />
              </linearGradient>
              <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect x="-1000" y="-1000" width="3000" height="3000" fill="url(#ocean-grad)" />

            <g transform={`translate(${transform.x} ${transform.y}) scale(${transform.k})`}>
              {/* অক্ষাংশ-দ্রাঘিমা রেখা */}
              <g stroke="#1E3350" strokeOpacity="0.45" strokeWidth="1">
                {GRATICULE_X.map((x) => (
                  <line key={`gx${x}`} x1={x} y1="150" x2={x} y2="640" vectorEffect="non-scaling-stroke" />
                ))}
                {GRATICULE_Y.map((y) => (
                  <line key={`gy${y}`} x1="60" y1={y} x2="960" y2={y} vectorEffect="non-scaling-stroke" />
                ))}
              </g>

              {/* স্থলভাগ */}
              <g>
                {LANDMASSES.map((d) => (
                  <path
                    key={d}
                    d={d}
                    fill="url(#land-grad)"
                    stroke="#3A5C85"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </g>

              {/* সাগরের নাম */}
              <g fill="#4A6A91" fontStyle="italic" className="pointer-events-none">
                {SEA_LABELS.map((s) => (
                  <text key={s.text} x={s.x} y={s.y} fontSize={10 / Math.sqrt(k)}>
                    {s.text}
                  </text>
                ))}
              </g>

              {/* বাণিজ্য পথ */}
              {showRoutes && (
                <g fill="none" className="pointer-events-none">
                  {SILK_ROAD_ROUTES.map((route) => (
                    <path
                      key={route}
                      d={route}
                      className="atlas-route"
                      stroke="#dfbd7b"
                      strokeWidth="1.6"
                      strokeDasharray="6 8"
                      strokeLinecap="round"
                      strokeOpacity="0.7"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </g>
              )}

              {/* তুলনার ভূখণ্ড */}
              {isCompareMode && comparePeriod && (
                <g className="pointer-events-none">
                  {comparePeriod.mapPaths.map((poly) => (
                    <path
                      key={`cmp-${poly.name}`}
                      d={poly.path}
                      fill="url(#compare-grad)"
                      stroke="#FBBF24"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </g>
              )}

              {/* নির্বাচিত যুগের ভূখণ্ড */}
              <g filter="url(#soft-glow)">
                {currentPeriod.mapPaths.map((poly) => (
                  <path
                    key={`pri-${poly.name}`}
                    d={poly.path}
                    fill="url(#terr-grad)"
                    stroke="#dfbd7b"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    className="cursor-pointer"
                    onPointerEnter={(e) => {
                      if (e.pointerType === 'mouse') setActiveRegion(poly.name);
                    }}
                    onPointerLeave={(e) => {
                      if (e.pointerType === 'mouse') setActiveRegion(null);
                    }}
                    onClick={(e) => onRegionTap(e, poly.name)}
                  />
                ))}
              </g>

              {/* শহর ও রাজধানী */}
              {HISTORICAL_CITIES_BN.map((city) => {
                const isCapital = isCapitalOf(currentPeriod, city);
                const isSelected = selectedCity && selectedCity.id === city.id;
                const showLabel = isCapital || isSelected || showFullLabels;
                return (
                  <g
                    key={city.id}
                    transform={`translate(${city.coords.x} ${city.coords.y})`}
                    className="cursor-pointer"
                    onClick={(e) => onCityTap(e, city)}
                  >
                    <circle r={16 / k} fill="transparent" />
                    {isCapital && (
                      <circle r={9 / k} fill="none" stroke="#dfbd7b" strokeWidth="1.5" vectorEffect="non-scaling-stroke">
                        <animate attributeName="r" values={`${8 / k};${17 / k};${8 / k}`} dur="2.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.9;0;0.9" dur="2.4s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle
                      r={(isCapital ? 6 : 4.2) / k}
                      fill={isCapital ? '#dfbd7b' : '#34D399'}
                      stroke={isSelected ? '#FFFFFF' : '#0B1724'}
                      strokeWidth={1.8 / k}
                    />
                    {showLabel && (
                      <text
                        x={9 / k}
                        y={4 / k}
                        fontSize={(isCapital ? 12 : 10.5) / k}
                        fontWeight={isCapital ? 700 : 500}
                        fill={isCapital ? '#dfbd7b' : '#E5E7EB'}
                        stroke="#060D14"
                        strokeWidth={3 / k}
                        strokeLinejoin="round"
                        style={{ paintOrder: 'stroke' }}
                        className="pointer-events-none"
                      >
                        {city.short}
                        {isCapital ? ' 👑' : ''}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>

          {/* ব্যবহার-ইঙ্গিত */}
          {hintVisible && !selectedCity && !activeRegion && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none w-max max-w-[92%]">
              <div className="bg-[#112236]/90 backdrop-blur border border-[#dfbd7b]/40 text-[#dfbd7b] text-[11px] md:text-xs font-medium rounded-full px-3.5 py-1.5 text-center">
                টেনে সরান · দুই আঙুলে জুম · শহরে ট্যাপ করুন
              </div>
            </div>
          )}

          {/* শহর বা অঞ্চলের কার্ড */}
          {(selectedCity || activeRegion) && (
            <div className="absolute bottom-3 left-3 right-3 md:right-auto md:bottom-6 md:left-6 z-20 bg-[#112236]/95 border border-[#dfbd7b]/50 backdrop-blur rounded-2xl p-3.5 text-xs md:max-w-xs shadow-2xl">
              {selectedCity ? (
                <div>
                  <div className="flex items-start justify-between gap-2 font-bold text-[#dfbd7b] text-sm mb-1">
                    <span className="flex items-center gap-1.5">
                      <IconMapPin className="w-4 h-4 text-emerald-400 shrink-0" /> {selectedCity.name}
                    </span>
                    <button onClick={() => setSelectedCity(null)} aria-label="কার্ড বন্ধ করুন" className="text-gray-400 hover:text-white p-1 -m-1">
                      <IconClose className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-gray-200 mt-1 leading-relaxed text-[13px]">{selectedCity.significance}</p>
                  <div className="text-[11px] text-gray-400 mt-2 pt-1.5 border-t border-gray-800">
                    অঞ্চল: <strong className="text-gray-300">{selectedCity.region}</strong>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between gap-2 font-bold text-[#dfbd7b] text-sm">
                    <span className="flex items-center gap-1.5">
                      <IconLayers className="w-4 h-4 text-emerald-400 shrink-0" /> {activeRegion}
                    </span>
                    <button onClick={() => setActiveRegion(null)} aria-label="কার্ড বন্ধ করুন" className="text-gray-400 hover:text-white p-1 -m-1">
                      <IconClose className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-[12px] text-gray-300 mt-1">{currentPeriod.name}-এর অধীনে ঐতিহাসিক সীমানা।</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ডেস্কটপ সাইডবার */}
        <aside className="hidden lg:flex flex-col w-96 bg-[#112236] border-l border-[#dfbd7b]/30 z-20 shadow-2xl min-h-0">
          <div className="p-4 border-b border-gray-800 bg-[#1E3350]/30 flex-none">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#dfbd7b]/15 text-[#dfbd7b] border border-[#dfbd7b]/30">{currentPeriod.type}</span>
              <span className="text-xs text-gray-300 flex items-center gap-1">
                <IconCalendar className="w-3.5 h-3.5 text-emerald-400" /> {currentPeriod.dates}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-2 leading-tight">{currentPeriod.name}</h2>
            <p className="text-xs text-[#dfbd7b] font-medium mt-1">{currentPeriod.subtitle}</p>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto">
            <InfoContent
              period={currentPeriod}
              comparePeriod={comparePeriod}
              isCompareMode={isCompareMode}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onSwap={swapPeriods}
            />
          </div>
        </aside>

        {/* মোবাইল বটম শিট */}
        <section className="lg:hidden flex-none bg-[#112236] border-t-2 border-[#dfbd7b]/60 rounded-t-3xl shadow-[0_-8px_24px_rgba(0,0,0,0.45)] pb-[env(safe-area-inset-bottom)]">
          <button
            onClick={() => setSheetOpen((v) => !v)}
            aria-expanded={sheetOpen}
            className="w-full px-4 pt-2 pb-3 text-left focus-visible:outline-none focus-visible:bg-[#1E3350]/50 rounded-t-3xl"
          >
            <span className="block mx-auto w-10 h-1 rounded-full bg-gray-600 mb-2" />
            <span className="flex items-center justify-between gap-3">
              <span className="min-w-0">
                <span className="block text-[11px] text-[#dfbd7b] truncate">{currentPeriod.subtitle}</span>
                <span className="block text-[11px] text-gray-400 mt-0.5 truncate">
                  রাজধানী: {currentPeriod.capital}
                </span>
              </span>
              <span className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#dfbd7b]/15 border border-[#dfbd7b]/40 text-[11px] font-bold text-[#dfbd7b]">
                <IconChevron className={`w-4 h-4 transition-transform ${sheetOpen ? 'rotate-180' : ''}`} />
                {sheetOpen ? 'বন্ধ করুন' : 'বিস্তারিত পড়ুন'}
              </span>
            </span>
          </button>
          {sheetOpen && (
            <div className="max-h-[50dvh] overflow-y-auto border-t border-gray-800">
              <InfoContent
                period={currentPeriod}
                comparePeriod={comparePeriod}
                isCompareMode={isCompareMode}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onSwap={swapPeriods}
              />
            </div>
          )}
        </section>
      </div>

      {/* ---------- যুগ নির্বাচনের তালিকা (লাইনে লাইনে সাজানো) ---------- */}
      {pickerTarget && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm sm:p-4"
          onClick={() => setPickerTarget(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="atlas-picker-title"
            className="w-full sm:max-w-3xl max-h-[90dvh] flex flex-col bg-[#112236] border border-[#dfbd7b]/50 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-none p-4 border-b border-gray-800 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h2 id="atlas-picker-title" className="text-base font-bold text-white">
                    {pickerTarget === 'compare' ? 'তুলনার জন্য দ্বিতীয় যুগ বেছে নিন' : 'একটি যুগ বেছে নিন'}
                  </h2>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {toBn(filteredEras.length)}টি যুগ দেখানো হচ্ছে · যুগে ট্যাপ করলেই মানচিত্র বদলে যাবে
                  </p>
                </div>
                <button
                  onClick={() => setPickerTarget(null)}
                  aria-label="তালিকা বন্ধ করুন"
                  className={`h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:text-white ${FOCUS}`}
                >
                  <IconClose className="w-5 h-5" />
                </button>
              </div>

              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400 pointer-events-none">
                  <IconSearch className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="যুগ বা শহরের নাম খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1E3350] text-base text-gray-100 pl-9 pr-10 py-2.5 rounded-xl border border-gray-700 focus:outline-none focus:border-[#dfbd7b]"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} aria-label="সার্চ মুছুন" className="absolute right-2.5 top-2.5 text-gray-400 hover:text-white">
                    <IconClose className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.val}
                    onClick={() => setCategoryFilter(cat.val)}
                    aria-pressed={categoryFilter === cat.val}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition ${FOCUS} ${
                      categoryFilter === cat.val
                        ? 'bg-[#dfbd7b] text-gray-950 border-[#dfbd7b] font-bold'
                        : 'bg-[#1E3350] text-gray-300 border-gray-700 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto p-3">
              {filteredEras.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-10 text-sm text-gray-300">
                  <span>কোনো যুগ পাওয়া যায়নি।</span>
                  <button onClick={clearFilters} className={`px-4 py-2 rounded-xl bg-[#dfbd7b] text-gray-950 font-bold text-xs ${FOCUS}`}>
                    ফিল্টার মুছুন
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {filteredEras.map((period) => {
                    const isSelected = period.id === selectedPeriodId;
                    const isComparing = period.id === comparePeriodId;
                    const lockedForCompare = pickerTarget === 'compare' && isSelected;
                    let tone = 'bg-[#1E3350]/60 border-gray-700 text-gray-200 hover:border-[#dfbd7b]/60';
                    if (isSelected) tone = 'bg-[#dfbd7b]/20 border-[#dfbd7b] text-white';
                    else if (isComparing) tone = 'bg-amber-500/15 border-amber-400 text-amber-100';
                    return (
                      <button
                        key={period.id}
                        onClick={() => pickEra(period.id)}
                        disabled={lockedForCompare}
                        aria-pressed={isSelected}
                        className={`flex flex-col text-left p-3 rounded-2xl border transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed ${tone} ${FOCUS}`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="w-6 h-1.5 rounded-full" style={{ backgroundColor: period.color }} />
                          <span className="text-[10px] text-gray-400 font-bold">{toBn(period.id)}</span>
                        </span>
                        <span className="text-[13px] font-bold mt-2 leading-snug">{period.name}</span>
                        <span className="text-[11px] text-gray-400 mt-1">{period.dates}</span>
                        {isSelected && <span className="text-[10px] font-bold text-[#dfbd7b] mt-1.5">{lockedForCompare ? 'প্রথম যুগ' : 'বর্তমান যুগ'}</span>}
                        {isComparing && <span className="text-[10px] font-bold text-amber-300 mt-1.5">তুলনার যুগ</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------- ব্যবহার-নির্দেশিকা মডাল ---------- */}
      {showHelp && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm sm:p-4"
          onClick={() => setShowHelp(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="atlas-help-title"
            className="w-full sm:max-w-lg max-h-[92dvh] overflow-y-auto bg-[#112236] border border-[#dfbd7b]/50 rounded-t-3xl sm:rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 p-5 border-b border-gray-800">
              <div>
                <h2 id="atlas-help-title" className="text-lg font-bold text-white">খিলাফাত এটলাস</h2>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                  নবী করীম ﷺ-এর যুগ থেকে সফবীয় সাম্রাজ্য পর্যন্ত {toBn(total)}টি যুগের ভূখণ্ড, রাজধানী, ঘটনা ও তথ্যসূত্র মানচিত্রে দেখুন।
                </p>
              </div>
              <button onClick={() => setShowHelp(false)} aria-label="গাইড বন্ধ করুন" className="p-1.5 rounded-full bg-gray-800 text-gray-300 hover:text-white shrink-0">
                <IconClose className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5">
              <h3 className="text-sm font-bold text-[#dfbd7b] mb-3">কীভাবে ব্যবহার করবেন</h3>
              <ol className="space-y-3">
                {HOW_TO_STEPS.map((s, i) => (
                  <li key={s.t} className="flex gap-3">
                    <span className="w-6 h-6 shrink-0 rounded-full bg-[#dfbd7b]/20 border border-[#dfbd7b]/60 text-[#dfbd7b] text-xs font-bold flex items-center justify-center">
                      {toBn(i + 1)}
                    </span>
                    <span>
                      <span className="block text-[13px] font-bold text-white">{s.t}</span>
                      <span className="block text-[12px] text-gray-300 leading-relaxed mt-0.5">{s.d}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="text-[11px] text-gray-500 mt-4 leading-relaxed">
                মানচিত্রের সীমানা আনুমানিক ও শিক্ষামূলক চিত্রায়ন। এই গাইড পরে খুলতে উপরের ডানের ? বাটনে ট্যাপ করুন।
              </p>
              <button
                onClick={() => setShowHelp(false)}
                className="w-full mt-4 py-3 rounded-2xl bg-[#dfbd7b] text-gray-950 font-bold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                বুঝেছি, শুরু করি
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
