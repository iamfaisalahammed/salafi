import { useCallback, useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// মক্কার সঠিক Coordinates
const MAKKAH = { lat: 21.4225, lng: 39.8262 };

// ব্রাউজার geolocation সাপোর্ট করে কিনা
const IS_SUPPORTED = typeof navigator !== "undefined" && "geolocation" in navigator;
const NOT_SUPPORTED_MSG = "আপনার ব্রাউজার লোকেশন সাপোর্ট করে না।";

// কার্ডের কমন স্টাইল
const CARD =
  "rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#122C32,#0D2229)] shadow-[0_10px_40px_-15px_rgba(16,185,129,0.35)] backdrop-blur-md";

// বাটনের স্টাইল (Emerald ও Gold)
const BTN_BASE =
  "btn w-full border-none font-semibold transition hover:brightness-110 sm:w-auto";
const BTN_EMERALD = `${BTN_BASE} bg-[linear-gradient(135deg,#10B981,#059669)] text-white shadow-[0_0_20px_rgba(16,185,129,0.35)]`;
const BTN_GOLD = `${BTN_BASE} bg-[linear-gradient(135deg,#DFBD7B,#C9A45C)] text-[#081B22] shadow-[0_0_20px_rgba(223,189,123,0.3)]`;

// ব্যাকগ্রাউন্ডের তারা (প্রতিবার একই থাকবে)
const STARS = Array.from({ length: 16 }, (_, i) => ({
  top: (i * 37 + 11) % 96,
  left: (i * 53 + 7) % 96,
  size: 2 + (i % 3),
  delay: (i % 5) * 0.7,
  duration: 2.5 + (i % 4) * 0.8,
  color: i % 3 === 0 ? "#34D399" : "#DFBD7B",
}));

// Animation ও Leaflet-এর dark স্টাইল
const STYLES = `
@keyframes mk-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes mk-twinkle { 0%,100% { opacity: .15; transform: scale(.8); } 50% { opacity: 1; transform: scale(1.3); } }
@keyframes mk-pulse { 0% { transform: scale(.6); opacity: .8; } 100% { transform: scale(2.6); opacity: 0; } }
.mk-float { animation: mk-float 5s ease-in-out infinite; }
.mk-star { animation: mk-twinkle var(--d, 3s) ease-in-out infinite; animation-delay: var(--delay, 0s); }
.mk-pulse { animation: mk-pulse 2s ease-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .mk-float, .mk-star, .mk-pulse { animation: none; }
  
}
.mk-map { background: #0D2229; font-family: inherit; }
.mk-map .leaflet-control-zoom { border: 1px solid rgba(255,255,255,.1) !important; border-radius: 12px; overflow: hidden; }
.mk-map .leaflet-control-zoom a { background: #122C32; color: #DFBD7B; border-bottom: 1px solid rgba(255,255,255,.1); }
.mk-map .leaflet-control-zoom a:hover { background: #0D2229; }
.mk-map .leaflet-control-attribution { background: rgba(8,27,34,.75); color: #94a3b8; font-size: 10px; }
.mk-map .leaflet-control-attribution a { color: #DFBD7B; }
`;

// Haversine ফর্মুলা: দুই পয়েন্টের সরলরেখার দূরত্ব (কিমি)
const getDistanceKm = (a, b) => {
  const R = 6371;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

// Nominatim-এর উত্তর থেকে এলাকা, শহর, বিভাগ ও দেশের নাম বের করা
const getPlaceParts = (data) => {
  const a = (data && data.address) || {};
  const pick = (keys) => keys.map((k) => a[k]).find(Boolean);

  const area = pick(["neighbourhood", "suburb", "quarter", "village", "hamlet", "city_district", "residential"]);
  const city = pick(["city", "town", "municipality", "county", "state_district"]);

  // একই নাম দুইবার এলে বাদ দেওয়া
  return [...new Set([area, city, a.state, a.country].filter(Boolean))];
};

// কাবার সিম্বল (SVG)
const KAABA_SVG = `
  <svg width="28" height="28" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="7" width="28" height="28" rx="3" fill="#0A0F11" stroke="rgba(255,255,255,.35)" stroke-width="1"/>
    <rect x="6" y="14" width="28" height="4" fill="#DFBD7B"/>
    <rect x="22" y="22" width="7" height="13" rx="1" fill="#DFBD7B"/>
  </svg>`;

// মক্কার মার্কার: Kaaba আইকন + "Makkah" লেবেল
const makkahIcon = L.divIcon({
  className: "",
  html: `
    <div style="display:flex;flex-direction:column;align-items:center;">
      <div style="width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,#122C32,#081B22);border:2px solid #DFBD7B;box-shadow:0 0 22px rgba(223,189,123,.55);display:flex;align-items:center;justify-content:center;">
        ${KAABA_SVG}
      </div>
      <span style="margin-top:5px;padding:2px 12px;border-radius:9999px;background:#DFBD7B;color:#081B22;font-size:12px;font-weight:700;white-space:nowrap;">Makkah</span>
    </div>`,
  iconSize: [90, 80],
  iconAnchor: [45, 25],
});

// ইউজারের মার্কার: pulse করা emerald dot + "Your Location" লেবেল
const userIcon = L.divIcon({
  className: "",
  html: `
    <div style="display:flex;flex-direction:column;align-items:center;">
      <div style="position:relative;width:20px;height:20px;">
        <span class="mk-pulse" style="position:absolute;inset:0;border-radius:50%;background:rgba(16,185,129,.55);"></span>
        <span style="position:absolute;inset:0;border-radius:50%;background:#10B981;border:3px solid #fff;box-shadow:0 0 14px rgba(16,185,129,.9);"></span>
      </div>
      <span style="margin-top:8px;padding:2px 12px;border-radius:9999px;background:#059669;color:#fff;font-size:12px;font-weight:700;white-space:nowrap;">Your Location</span>
    </div>`,
  iconSize: [110, 56],
  iconAnchor: [55, 10],
});

// ভাসমান কুরআনের ইলাস্ট্রেশন
const QuranIllustration = () => (
  <svg viewBox="0 0 120 100" className="h-full w-full" aria-hidden="true">
    <defs>
      <linearGradient id="mkPage" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#1B4A4A" />
        <stop offset="1" stopColor="#0D2229" />
      </linearGradient>
      <mask id="mkCrescent">
        <rect width="120" height="100" fill="white" />
        <circle cx="64" cy="9" r="7" fill="black" />
      </mask>
    </defs>
    <circle cx="60" cy="11" r="8" fill="#DFBD7B" mask="url(#mkCrescent)" />
    <ellipse cx="60" cy="90" rx="38" ry="5" fill="#10B981" opacity="0.25" />
    <path d="M60 30 C46 22 26 22 10 28 L10 80 C26 74 46 74 60 82 Z" fill="url(#mkPage)" stroke="#DFBD7B" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M60 30 C74 22 94 22 110 28 L110 80 C94 74 74 74 60 82 Z" fill="url(#mkPage)" stroke="#DFBD7B" strokeWidth="1.5" strokeLinejoin="round" />
    <g stroke="#DFBD7B" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55">
      <path d="M18 40 Q36 34 52 42" />
      <path d="M18 50 Q36 44 52 52" />
      <path d="M18 60 Q36 54 52 62" />
      <path d="M68 42 Q84 34 102 40" />
      <path d="M68 52 Q84 44 102 50" />
      <path d="M68 62 Q84 54 102 60" />
    </g>
  </svg>
);

// লোকেশনের এক সারি (আইকন + শিরোনাম + বিবরণ)
const LocationRow = ({ icon, title, children }) => (
  <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#081B22]">
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs font-medium text-[#DFBD7B]">{title}</p>
      {children}
    </div>
  </div>
);

const MakkahLocator = () => {
  const mapEl = useRef(null); // ম্যাপের div
  const mapRef = useRef(null); // Leaflet map instance
  const userLayerRef = useRef(null); // ইউজারের মার্কার + লাইনের গ্রুপ
  const abortRef = useRef(null); // এলাকার নামের request বাতিল করার জন্য

  const [status, setStatus] = useState(IS_SUPPORTED ? "loading" : "error"); // loading | success | error
  const [error, setError] = useState(IS_SUPPORTED ? "" : NOT_SUPPORTED_MSG);
  const [distance, setDistance] = useState(null);
  const [user, setUser] = useState(null);
  const [place, setPlace] = useState({ status: "idle", parts: [] }); // idle | loading | done | failed

  // ইউজারের Coordinates থেকে এলাকার নাম আনা
  const fetchPlace = useCallback(async ({ lat, lng }) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setPlace({ status: "loading", parts: [] });

    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&zoom=16&accept-language=bn&lat=${lat}&lon=${lng}`;
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error("Reverse geocoding failed");

      const data = await res.json();
      const parts = getPlaceParts(data);
      setPlace(parts.length ? { status: "done", parts } : { status: "failed", parts: [] });
    } catch (err) {
      if (err.name !== "AbortError") setPlace({ status: "failed", parts: [] });
    }
  }, []);

  // GPS থেকে লোকেশন নিয়ে মার্কার ও লাইন আঁকা
  const getPosition = useCallback(() => {
    if (!IS_SUPPORTED) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const map = mapRef.current;
        if (!map) return;

        const current = { lat: pos.coords.latitude, lng: pos.coords.longitude };

        // আগের ইউজার মার্কার/লাইন থাকলে মুছে ফেলা
        if (userLayerRef.current) map.removeLayer(userLayerRef.current);

        // নিচে হালকা glow লাইন, উপরে সোনালি লাইন
        const points = [
          [current.lat, current.lng],
          [MAKKAH.lat, MAKKAH.lng],
        ];
        const glow = L.polyline(points, { color: "#34D399", weight: 10, opacity: 0.25 });
        const line = L.polyline(points, { color: "#DFBD7B", weight: 3 });
        const userMarker = L.marker(points[0], { icon: userIcon });

        userLayerRef.current = L.layerGroup([glow, line, userMarker]).addTo(map);

        // দুটি লোকেশন একসাথে দেখানোর জন্য auto zoom
        map.fitBounds(L.latLngBounds(points), { padding: [70, 70], maxZoom: 15 });

        setUser(current);
        setDistance(getDistanceKm(current, MAKKAH));
        setStatus("success");
        fetchPlace(current);
      },
      (err) => {
        const messages = {
          1: "লোকেশন পারমিশন দেওয়া হয়নি। ব্রাউজারের সেটিংস থেকে পারমিশন চালু করে আবার চেষ্টা করুন।",
          2: "আপনার অবস্থান পাওয়া যাচ্ছে না। GPS বা ইন্টারনেট চেক করে আবার চেষ্টা করুন।",
          3: "লোকেশন পেতে অনেক সময় লাগছে। আবার চেষ্টা করুন।",
        };
        setError(messages[err.code] || "লোকেশন নিতে সমস্যা হয়েছে।");
        setStatus("error");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }, [fetchPlace]);

  // Retry / Update বাটন
  const handleRefresh = () => {
    setStatus("loading");
    setError("");
    getPosition();
  };

  // ম্যাপ একবার তৈরি করা + মক্কার মার্কার + লোকেশন চাওয়া
  useEffect(() => {
    const el = mapEl.current;
    const map = L.map(el, { zoomControl: false }).setView([MAKKAH.lat, MAKKAH.lng], 5);

    L.control.zoom({ position: "bottomright" }).addTo(map);

       L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
      className: "mk-tiles", // dark filter এই class-এ লাগে
    }).addTo(map);

    L.marker([MAKKAH.lat, MAKKAH.lng], { icon: makkahIcon }).addTo(map);

    mapRef.current = map;

    // লেআউট বদলালে (কার্ড আসা/যাওয়া) ম্যাপের সাইজ ঠিক রাখা
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(el);

    getPosition();

    return () => {
      observer.disconnect();
      map.remove();
      mapRef.current = null;
      userLayerRef.current = null;
      abortRef.current?.abort();
    };
  }, [getPosition]);

  const headline = place.parts[0];
  const subline = place.parts.slice(1).join(", ");

  return (
    <section
      className="relative isolate min-h-screen overflow-hidden bg-[#081B22] px-4 py-6 sm:py-10"
      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
    >
      <style>{STYLES}</style>

      {/* Glow ও তারা (শুধু সাজসজ্জা) */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#DFBD7B]/10 blur-3xl" />
      {STARS.map((s, i) => (
        <span
          key={i}
          className="mk-star pointer-events-none absolute rounded-full"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            boxShadow: `0 0 8px ${s.color}`,
            "--d": `${s.duration}s`,
            "--delay": `${s.delay}s`,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* ১. হেডার + স্ট্যাটাস + দূরত্ব */}
          <div className={`${CARD} relative overflow-hidden p-5 sm:p-6 lg:col-span-5 lg:col-start-1 lg:row-start-1`}>
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#DFBD7B]/10 blur-3xl" />

            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#DFBD7B]">
                  Hikmah টুলস
                </p>
                <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  মক্কা <span className="text-[#DFBD7B]">লোকেটর</span>
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  আপনার বর্তমান অবস্থান থেকে পবিত্র মক্কার সরলরেখার দূরত্ব দেখুন।
                </p>
              </div>
              <div className="mk-float h-20 w-20 shrink-0 drop-shadow-[0_0_18px_rgba(223,189,123,0.35)] sm:h-28 sm:w-28">
                <QuranIllustration />
              </div>
            </div>

            <div className="mt-5">
              {/* লোডিং */}
              {status === "loading" && (
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                  <span className="loading loading-spinner loading-sm text-emerald-400" />
                  আপনার লোকেশন খোঁজা হচ্ছে...
                </div>
              )}

              {/* দূরত্ব */}
              {status === "success" && distance !== null && (
                <div className="rounded-xl border border-[#DFBD7B]/20 bg-[#DFBD7B]/5 p-4">
                  <p className="text-xs text-slate-300">মক্কা পর্যন্ত সরলরেখার দূরত্ব</p>
                  <p
                    className="mt-1 text-4xl font-bold text-[#DFBD7B]"
                    style={{ textShadow: "0 0 24px rgba(223,189,123,.45)" }}
                  >
                    {distance.toLocaleString("bn-BD", { maximumFractionDigits: 1 })}
                    <span className="ml-2 text-lg font-semibold text-slate-200">কিমি</span>
                  </p>
                </div>
              )}

              {/* এরর */}
              {status === "error" && (
                <div role="alert" className="rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-sm leading-relaxed text-red-200">
                  {error}
                </div>
              )}

              {/* বাটন: এরর হলে Emerald, সফল হলে Gold */}
              {status === "error" && IS_SUPPORTED && (
                <button onClick={handleRefresh} className={`${BTN_EMERALD} mt-4`}>
                  আবার চেষ্টা করুন
                </button>
              )}
              {status === "success" && (
                <button onClick={handleRefresh} className={`${BTN_GOLD} mt-4`}>
                  লোকেশন আপডেট করুন
                </button>
              )}
            </div>
          </div>

          {/* ২. ম্যাপ */}
          <div className={`${CARD} relative isolate flex flex-col overflow-hidden p-2 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1`}>
            <div
              ref={mapEl}
              className="mk-map h-[55vh] min-h-[340px] w-full rounded-xl lg:h-auto lg:min-h-[520px] lg:flex-1"
            />
            {status === "loading" && (
              <div className="absolute left-1/2 top-5 z-[1000] flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-[#081B22]/90 px-4 py-2 text-sm text-white shadow-lg backdrop-blur">
                <span className="loading loading-spinner loading-xs text-emerald-400" />
                লোকেশন খোঁজা হচ্ছে...
              </div>
            )}
          </div>

          {/* ৩. লোকেশনের বিবরণ */}
          <div className={`${CARD} space-y-3 p-4 sm:p-5 lg:col-span-5 lg:col-start-1 lg:row-start-2`}>
            <h2 className="text-base font-semibold text-white">লোকেশনের বিবরণ</h2>

            {/* ইউজারের অবস্থান */}
            <LocationRow
              title="আপনার অবস্থান"
              icon={
                <span className="relative flex h-4 w-4">
                  <span className="mk-pulse absolute inset-0 rounded-full bg-emerald-400/60" />
                  <span className="relative h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
                </span>
              }
            >
              {!user && (
                <p className="mt-1 text-sm text-slate-400">
                  {status === "loading" ? "লোকেশন খোঁজা হচ্ছে..." : "এখনো লোকেশন পাওয়া যায়নি"}
                </p>
              )}

              {user && place.status === "loading" && (
                <div className="mt-2 space-y-2">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-white/10" />
                </div>
              )}

              {user && place.status === "done" && (
                <>
                  <p className="mt-1 break-words text-base font-semibold text-white">{headline}</p>
                  {subline && <p className="break-words text-sm text-slate-300">{subline}</p>}
                </>
              )}

              {user && place.status === "failed" && (
                <p className="mt-1 text-sm text-slate-400">এলাকার নাম পাওয়া যায়নি</p>
              )}

              {user && (
                <p className="mt-1 font-mono text-xs text-slate-400">
                  {user.lat.toFixed(4)}, {user.lng.toFixed(4)}
                </p>
              )}
            </LocationRow>

            {/* মক্কা */}
            <LocationRow
              title="গন্তব্য"
              icon={<span dangerouslySetInnerHTML={{ __html: KAABA_SVG }} />}
            >
              <p className="mt-1 text-base font-semibold text-white">মক্কা, সৌদি আরব</p>
              <p className="font-mono text-xs text-slate-400">
                {MAKKAH.lat}, {MAKKAH.lng}
              </p>
            </LocationRow>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MakkahLocator;