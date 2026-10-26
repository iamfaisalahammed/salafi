import { useCallback, useEffect, useRef, useState } from "react";
import {
  FaCompass,
  FaLocationDot,
  FaKaaba,
  FaRotate,
  FaCircleExclamation,
  FaCircleCheck,
} from "react-icons/fa6";

const KAABA = {
  latitude: 21.4225,
  longitude: 39.8262,
};

const toRadians = (degree) => (degree * Math.PI) / 180;
const toDegrees = (radian) => (radian * 180) / Math.PI;
const normalize = (angle) => ((angle % 360) + 360) % 360;

const getQiblaBearing = (latitude, longitude) => {
  const lat = toRadians(latitude);
  const kaabaLat = toRadians(KAABA.latitude);
  const longitudeDifference = toRadians(KAABA.longitude - longitude);

  const y = Math.sin(longitudeDifference);
  const x =
    Math.cos(lat) * Math.tan(kaabaLat) -
    Math.sin(lat) * Math.cos(longitudeDifference);

  return normalize(toDegrees(Math.atan2(y, x)));
};

const getDirection = (bearing) => {
  const directions = [
    "উত্তর",
    "উত্তর-পূর্ব",
    "পূর্ব",
    "দক্ষিণ-পূর্ব",
    "দক্ষিণ",
    "দক্ষিণ-পশ্চিম",
    "পশ্চিম",
    "উত্তর-পশ্চিম",
  ];

  return directions[Math.round(bearing / 45) % 8];
};

// alpha, beta, gamma থেকে টিল্ট-সংশোধিত কম্পাস হেডিং
const getHeadingFromEuler = (alpha, beta, gamma) => {
  const a = toRadians(alpha);
  const b = toRadians(beta);
  const g = toRadians(gamma);

  const cA = Math.cos(a);
  const sA = Math.sin(a);
  const sB = Math.sin(b);
  const cG = Math.cos(g);
  const sG = Math.sin(g);
  const cB = Math.cos(b);

  const vx = -cA * sG - sA * sB * cG;
  const vy = -sA * sG + cA * sB * cG;

  // cB শুধু স্কেল, তাই সরাসরি ব্যবহার হয়নি
  void cB;

  return normalize(toDegrees(Math.atan2(vx, vy)));
};

const getScreenAngle = () => {
  if (typeof window === "undefined") return 0;
  const angle = window.screen?.orientation?.angle;
  return typeof angle === "number" ? angle : 0;
};

const QiblaFinder = () => {
  const geoSupported =
    typeof navigator !== "undefined" && "geolocation" in navigator;

  const [location, setLocation] = useState(null);
  const [bearing, setBearing] = useState(null);
  const [heading, setHeading] = useState(null);
  const [loading, setLoading] = useState(geoSupported);
  const [error, setError] = useState(() => {
    if (!geoSupported) {
      return "আপনার ব্রাউজারে লোকেশন সুবিধা সমর্থিত নয়।";
    }
    if (typeof window !== "undefined" && !window.isSecureContext) {
      return "লোকেশন ও কম্পাস ব্যবহার করতে সাইটটি HTTPS-এ খুলতে হবে।";
    }
    return "";
  });
  const [needsPermission] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.DeviceOrientationEvent?.requestPermission === "function"
  );
  const [compassActive, setCompassActive] = useState(
    () =>
      typeof window !== "undefined" &&
      "DeviceOrientationEvent" in window &&
      typeof window.DeviceOrientationEvent?.requestPermission !== "function"
  );

  const headingRef = useRef(null);

  const fetchLocation = useCallback(() => {
    const onSuccess = (position) => {
      const { latitude, longitude, accuracy } = position.coords;

      setLocation({ latitude, longitude, accuracy });
      setBearing(getQiblaBearing(latitude, longitude));
      setError("");
      setLoading(false);
    };

    const attempt = (highAccuracy) => {
      navigator.geolocation.getCurrentPosition(
        onSuccess,
        (err) => {
          // হাই-অ্যাকুরেসি ব্যর্থ হলে সাধারণ মোডে আবার চেষ্টা
          if (highAccuracy && err.code !== 1) {
            attempt(false);
            return;
          }

          const messages = {
            1: "কিবলার দিক বের করতে ব্রাউজারের Location permission চালু করুন।",
            2: "আপনার অবস্থান পাওয়া যাচ্ছে না। আবার চেষ্টা করুন।",
            3: "লোকেশন পেতে সময় শেষ হয়েছে। আবার চেষ্টা করুন।",
          };

          setError(
            messages[err.code] || "লোকেশন পাওয়া যায়নি। আবার চেষ্টা করুন।"
          );
          setLoading(false);
        },
        {
          enableHighAccuracy: highAccuracy,
          timeout: highAccuracy ? 10000 : 15000,
          maximumAge: 60000,
        }
      );
    };

    attempt(true);
  }, []);

  const refreshLocation = () => {
    if (!geoSupported) return;
    setLoading(true);
    setError("");
    fetchLocation();
  };

  useEffect(() => {
    if (geoSupported && window.isSecureContext) {
      fetchLocation();
    }
  }, [geoSupported, fetchLocation]);

  useEffect(() => {
    if (!compassActive) return undefined;

    const eventName =
      "ondeviceorientationabsolute" in window
        ? "deviceorientationabsolute"
        : "deviceorientation";

    const handleOrientation = (event) => {
      let raw = null;

      if (typeof event.webkitCompassHeading === "number") {
        raw = event.webkitCompassHeading;
      } else if (
        (eventName === "deviceorientationabsolute" || event.absolute) &&
        typeof event.alpha === "number" &&
        typeof event.beta === "number" &&
        typeof event.gamma === "number"
      ) {
        raw = getHeadingFromEuler(event.alpha, event.beta, event.gamma);
      }

      if (raw === null) return;

      const corrected = normalize(raw + getScreenAngle());
      const previous = headingRef.current;

      if (previous === null) {
        headingRef.current = corrected;
        setHeading(corrected);
        return;
      }

      // সবচেয়ে ছোট পথে ঘোরানো ও হালকা স্মুদিং
      const delta = ((corrected - normalize(previous) + 540) % 360) - 180;
      const next = previous + delta * 0.35;

      if (Math.abs(next - previous) < 0.4) return;

      headingRef.current = next;
      setHeading(next);
    };

    window.addEventListener(eventName, handleOrientation, true);

    return () => {
      window.removeEventListener(eventName, handleOrientation, true);
    };
  }, [compassActive]);

  const requestCompassPermission = async () => {
    try {
      const permission = await window.DeviceOrientationEvent.requestPermission();

      if (permission !== "granted") {
        setError("লাইভ কম্পাস ব্যবহারের জন্য Motion permission অনুমোদন করুন।");
        return;
      }

      setError("");
      setCompassActive(true);
    } catch {
      setError("কম্পাস চালু করা যায়নি। আপনার ডিভাইসের সেটিংস পরীক্ষা করুন।");
    }
  };

  const currentHeading = heading ?? 0;
  const pointerRotation = (bearing ?? 0) - currentHeading;

  const difference =
    heading !== null && bearing !== null
      ? ((bearing - normalize(heading) + 540) % 360) - 180
      : null;
  const isAligned = difference !== null && Math.abs(difference) <= 5;

  return (
    <main className="min-h-screen bg-[#081b22] px-4 py-8 font-['Hind_Siliguri',sans-serif] text-slate-100 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        {/* Heading */}
        <header className="mb-8 text-center sm:mb-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
            <FaCompass className="text-2xl" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            কিবলা ফাইন্ডার
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
            আপনার বর্তমান অবস্থান থেকে পবিত্র কাবা শরিফের সঠিক দিক নির্ণয় করুন।
          </p>
        </header>

        {/* Compass */}
        <section className="rounded-3xl border border-white/10 bg-[#10252d] p-5 shadow-xl shadow-black/10 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-400">কিবলার দিক</p>
              <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                {bearing !== null
                  ? `${bearing.toFixed(1)}°`
                  : "অবস্থান নির্ধারণ করুন"}
              </h2>
            </div>

            <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-300">
              <FaKaaba className="mr-2 inline" />
              মক্কা, সৌদি আরব
            </div>
          </div>

          <div className="relative mx-auto my-8 flex aspect-square w-full max-w-[300px] items-center justify-center sm:max-w-[340px]">
            {/* Compass dial */}
            <div
              className="absolute inset-0 rounded-full border border-emerald-400/20 bg-[#0a1e26] transition-transform duration-150 ease-out"
              style={{ transform: `rotate(${-currentHeading}deg)` }}
            >
              <div className="absolute inset-3 rounded-full border border-white/10" />
              <div className="absolute inset-8 rounded-full border border-white/5" />

              {Array.from({ length: 36 }, (_, index) => (
                <div
                  key={index}
                  className="absolute inset-0"
                  style={{ transform: `rotate(${index * 10}deg)` }}
                >
                  <div
                    className={`mx-auto ${
                      index % 3 === 0
                        ? "h-3 w-0.5 bg-emerald-400/70"
                        : "h-2 w-px bg-slate-500/50"
                    }`}
                  />
                </div>
              ))}

              <span className="absolute left-1/2 top-5 -translate-x-1/2 text-sm font-bold text-emerald-300">
                N
              </span>
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                E
              </span>
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm font-semibold text-slate-400">
                S
              </span>
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                W
              </span>
            </div>

            {/* Qibla pointer */}
            {bearing !== null && (
              <div
                className="absolute inset-0 transition-transform duration-150 ease-out"
                style={{ transform: `rotate(${pointerRotation}deg)` }}
              >
                <div className="absolute left-1/2 top-9 flex h-[38%] -translate-x-1/2 flex-col items-center">
                  <FaKaaba
                    className={`mb-1 text-2xl drop-shadow-[0_0_10px_rgba(52,211,153,0.45)] ${
                      isAligned ? "text-emerald-300" : "text-emerald-400"
                    }`}
                  />
                  <div className="w-1 flex-1 rounded-full bg-gradient-to-t from-emerald-400/20 to-emerald-300" />
                </div>
              </div>
            )}

            {/* Center */}
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#10252d] bg-emerald-400 text-[#081b22] shadow-lg shadow-emerald-500/20">
              <FaCompass className="text-2xl" />
            </div>
          </div>

          {isAligned && (
            <div className="mb-4 flex items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-300">
              <FaCircleCheck />
              আপনি এখন কিবলার দিকে আছেন
            </div>
          )}

          <div className="rounded-2xl border border-white/5 bg-[#0a1e26] p-4 text-center">
            <p className="text-sm text-slate-400">কিবলার অভিমুখ</p>
            <p className="mt-1 text-lg font-bold text-emerald-300">
              {bearing !== null
                ? `${getDirection(bearing)} (${bearing.toFixed(1)}°)`
                : "লোকেশন অপেক্ষমাণ"}
            </p>

            <p className="mt-2 text-xs leading-6 text-slate-500">
              {heading !== null
                ? "কম্পাস সেন্সর সক্রিয়। ডিভাইসটি সমতল রেখে ধীরে ঘোরান।"
                : "লাইভ কম্পাসের জন্য আপনার ডিভাইসে সেন্সর ও অনুমতি প্রয়োজন। সেন্সর না থাকলে উত্তর দিক ওপরে ধরে কিবলার কোণ অনুসরণ করুন।"}
            </p>
          </div>

          {needsPermission && !compassActive && (
            <button
              type="button"
              onClick={requestCompassPermission}
              className="mt-4 w-full rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/15"
            >
              <FaCompass className="mr-2 inline" />
              লাইভ কম্পাস চালু করুন
            </button>
          )}
        </section>

        {/* Location */}
        <section className="mt-5 rounded-3xl border border-white/10 bg-[#10252d] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
              <FaLocationDot className="text-lg" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-semibold">আপনার অবস্থান</h3>

              {loading ? (
                <p className="mt-2 text-sm text-slate-400">
                  অবস্থান নির্ধারণ করা হচ্ছে...
                </p>
              ) : location ? (
                <>
                  <p className="mt-2 break-words text-sm leading-6 text-slate-300">
                    অক্ষাংশ: {location.latitude.toFixed(5)}
                    <br />
                    দ্রাঘিমাংশ: {location.longitude.toFixed(5)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    আনুমানিক নির্ভুলতা: {Math.round(location.accuracy)} মিটার
                  </p>
                </>
              ) : (
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  কিবলার দিক হিসাব করতে আপনার লোকেশন প্রয়োজন।
                </p>
              )}
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-4 flex items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-sm leading-6 text-amber-200"
            >
              <FaCircleExclamation className="mt-1 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="button"
            onClick={refreshLocation}
            disabled={loading || !geoSupported}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 font-semibold text-[#081b22] transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaRotate className={loading ? "animate-spin" : ""} />
            {loading ? "অবস্থান খোঁজা হচ্ছে..." : "লোকেশন রিফ্রেশ করুন"}
          </button>
        </section>

        {/* Instructions */}
        <section className="mt-5 rounded-3xl border border-white/10 bg-[#10252d] p-5 sm:p-6">
          <h3 className="font-bold">কীভাবে ব্যবহার করবেন?</h3>

          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
            <li className="flex gap-3">
              <span className="font-bold text-emerald-400">১.</span>
              ব্রাউজারে Location permission অনুমোদন করুন।
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-emerald-400">২.</span>
              ফোনটি সমতল রাখুন এবং কম্পাস সেন্সর থাকলে কিবলার নির্দেশক অনুসরণ
              করুন।
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-emerald-400">৩.</span>
              কম্পাসের দিক সঠিক রাখতে ধাতব বস্তু ও চৌম্বকীয় উৎস থেকে দূরে
              থাকুন।
            </li>
          </ul>

          <p className="mt-5 border-t border-white/5 pt-4 text-xs leading-6 text-slate-500">
            দ্রষ্টব্য: কিবলার কোণ আপনার অবস্থানের ভিত্তিতে গণনা করা হয়। ডিভাইসের
            কম্পাস সেন্সর ও ক্যালিব্রেশনের কারণে লাইভ দিক কিছুটা ভিন্ন হতে পারে।
            নামাজের আগে প্রয়োজনে নির্ভরযোগ্য স্থানীয় দিকনির্দেশনার সঙ্গে মিলিয়ে
            নিন।
          </p>
        </section>
      </div>
    </main>
  );
};

export default QiblaFinder;