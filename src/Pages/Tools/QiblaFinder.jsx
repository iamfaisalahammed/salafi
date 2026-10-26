import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FaCompass,
  FaLocationDot,
  FaKaaba,
  FaRotate,
  FaCircleExclamation,
  FaCircleCheck,
} from "react-icons/fa6";
import {
  ALIGNMENT_TOLERANCE_DEG,
  calculateQibla,
  getDirection,
  getScreenAngle,
  isValidCoordinate,
  readHeadingFromEvent,
  shortestAngleDelta,
  smoothAngle,
} from "./qiblaMath";

// লোকেশন সংক্রান্ত বার্তা
const GEO_ERRORS = {
  1: "কিবলার দিক বের করতে ব্রাউজারের Location permission চালু করুন, তারপর রিফ্রেশ করুন।",
  2: "আপনার অবস্থান পাওয়া যাচ্ছে না। GPS/ইন্টারনেট চালু আছে কিনা দেখে আবার চেষ্টা করুন।",
  3: "লোকেশন পেতে সময় শেষ হয়েছে। আবার চেষ্টা করুন।",
};

// কম্পাসের অবস্থা অনুযায়ী বার্তা। tone: "warn" হলে হলুদ সতর্কবার্তা দেখায়।
const COMPASS_MESSAGES = {
  live: {
    tone: "info",
    text: "কম্পাস সেন্সর সক্রিয়। ডিভাইসটি সমতল রেখে ধীরে ঘোরান।",
  },
  starting: {
    tone: "info",
    text: "কম্পাস সেন্সরের ডেটার অপেক্ষা করা হচ্ছে...",
  },
  "needs-permission": {
    tone: "info",
    text: "লাইভ কম্পাসের জন্য Motion permission প্রয়োজন। নিচের বাটনে চাপ দিন। অনুমতি না দিলে কিবলার কোণ স্থির মোডে দেখানো হবে।",
  },
  denied: {
    tone: "warn",
    text: "Motion permission দেওয়া হয়নি, তাই লাইভ কম্পাস বন্ধ। পেজটি বন্ধ করে আবার খুলুন এবং অনুমতি দিন; প্রয়োজনে ব্রাউজারের সাইট সেটিংস পরীক্ষা করুন।",
  },
  "permission-error": {
    tone: "warn",
    text: "কম্পাস চালু করা যায়নি। সাইটটি HTTPS-এ খোলা আছে কিনা ও ডিভাইসের সেটিংস পরীক্ষা করে আবার চেষ্টা করুন।",
  },
  unsupported: {
    tone: "warn",
    text: "এই ডিভাইস বা ব্রাউজারে কম্পাস সেন্সর সমর্থিত নয়। স্থির মোডে দেখানো কোণ ব্যবহার করুন।",
  },
  insecure: {
    tone: "warn",
    text: "লাইভ কম্পাসের জন্য সাইটটি HTTPS-এ খুলতে হবে। স্থির মোডে দেখানো কোণ ব্যবহার করুন।",
  },
  "no-data": {
    tone: "warn",
    text: "কম্পাস সেন্সর থেকে কোনো ডেটা পাওয়া যায়নি। আপনার ডিভাইসে কম্পাস নাও থাকতে পারে বা ব্রাউজারে Motion access বন্ধ আছে। স্থির মোডে দেখানো কোণ ব্যবহার করুন।",
  },
  "no-absolute": {
    tone: "warn",
    text: "এই ব্রাউজার উত্তর দিকের ভিত্তিতে কম্পাস ডেটা দিচ্ছে না, তাই লাইভ দিক দেখানো হচ্ছে না। Android-এ Chrome (বা Samsung Internet) ব্যবহার করে দেখুন।",
  },
  tilted: {
    tone: "warn",
    text: "ডিভাইসের অবস্থানের কারণে দিক পড়া যাচ্ছে না। ফোনটি সমতলভাবে (স্ক্রিন ওপরের দিকে) বা খাড়া করে ধরুন।",
  },
  uncalibrated: {
    tone: "warn",
    text: "কম্পাস ক্যালিব্রেট করা নেই বা নির্ভুলতা কম, তাই লাইভ দিক দেখানো হচ্ছে না। ফোনটি বাতাসে ৮-এর মতো করে কয়েকবার ঘোরান।",
  },
};

const PERMISSION_BUTTON_STATES = ["needs-permission", "denied", "permission-error"];
const NO_DATA_TIMEOUT_MS = 5000;

const getInitialCompassState = () => {
  if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) {
    return "unsupported";
  }
  if (!window.isSecureContext) return "insecure";
  if (typeof window.DeviceOrientationEvent.requestPermission === "function") {
    return "needs-permission";
  }
  return "starting";
};

const QiblaFinder = () => {
  const geoSupported =
    typeof navigator !== "undefined" && "geolocation" in navigator;
  const secure = typeof window !== "undefined" && window.isSecureContext;

  const [location, setLocation] = useState(null);
  const [heading, setHeading] = useState(null);
  const [loading, setLoading] = useState(geoSupported && secure);
  const [error, setError] = useState(() => {
    if (!geoSupported) {
      return "আপনার ব্রাউজারে লোকেশন সুবিধা সমর্থিত নয়।";
    }
    if (!secure) {
      return "লোকেশন ও কম্পাস ব্যবহার করতে সাইটটি HTTPS-এ খুলতে হবে।";
    }
    return "";
  });
  const [compassState, setCompassState] = useState(getInitialCompassState);
  const [compassEnabled, setCompassEnabled] = useState(
    () => getInitialCompassState() === "starting"
  );

  const headingRef = useRef(null);
  const frameRef = useRef(0);

  const qibla = useMemo(
    () =>
      location
        ? calculateQibla(location.latitude, location.longitude)
        : { bearing: null, distanceKm: null },
    [location]
  );
  const bearing = qibla.bearing;

  const fetchLocation = useCallback((fresh) => {
    const onSuccess = (position) => {
      const { latitude, longitude, accuracy } = position.coords;

      if (!isValidCoordinate(latitude, longitude)) {
        setError("ডিভাইস থেকে সঠিক লোকেশন পাওয়া যায়নি। আবার চেষ্টা করুন।");
        setLoading(false);
        return;
      }

      setLocation({
        latitude,
        longitude,
        accuracy: Number.isFinite(accuracy) ? accuracy : null,
      });
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

          setError(
            GEO_ERRORS[err.code] || "লোকেশন পাওয়া যায়নি। আবার চেষ্টা করুন।"
          );
          setLoading(false);
        },
        {
          enableHighAccuracy: highAccuracy,
          timeout: highAccuracy ? 10000 : 15000,
          maximumAge: fresh ? 0 : 30000,
        }
      );
    };

    attempt(true);
  }, []);

  const refreshLocation = () => {
    if (!geoSupported || !secure) return;
    setLoading(true);
    setError("");
    fetchLocation(true);
  };

  useEffect(() => {
    if (geoSupported && secure) {
      fetchLocation(false);
    }
  }, [geoSupported, secure, fetchLocation]);

  useEffect(() => {
    if (!compassEnabled) return undefined;

    const isAbsoluteEventType = "ondeviceorientationabsolute" in window;
    const eventName = isAbsoluteEventType
      ? "deviceorientationabsolute"
      : "deviceorientation";

    const flush = () => {
      frameRef.current = 0;
      setHeading(headingRef.current);
    };

    const handleOrientation = (event) => {
      const result = readHeadingFromEvent(
        event,
        getScreenAngle(),
        isAbsoluteEventType
      );

      // সংখ্যা ছাড়া ইভেন্ট (যেমন ডেস্কটপ) উপেক্ষা; টাইমআউট এটি ধরবে
      if (result.status === "no-data") return;

      if (result.status !== "ok") {
        // ভুল দিক দেখানোর চেয়ে লাইভ দিক বন্ধ করা ভালো
        headingRef.current = null;
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = 0;
        }
        setHeading(null);
        setCompassState(result.status);
        return;
      }

      const previous = headingRef.current;
      headingRef.current =
        previous === null ? result.heading : smoothAngle(previous, result.heading);

      setCompassState("live");

      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(flush);
      }
    };

    window.addEventListener(eventName, handleOrientation, true);

    const timer = setTimeout(() => {
      setCompassState((current) => (current === "starting" ? "no-data" : current));
    }, NO_DATA_TIMEOUT_MS);

    return () => {
      window.removeEventListener(eventName, handleOrientation, true);
      clearTimeout(timer);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
      }
    };
  }, [compassEnabled]);

  const requestCompassPermission = async () => {
    try {
      const permission = await window.DeviceOrientationEvent.requestPermission();

      if (permission !== "granted") {
        setCompassState("denied");
        return;
      }

      setCompassState("starting");
      setCompassEnabled(true);
    } catch {
      setCompassState("permission-error");
    }
  };

  const isLive = compassState === "live" && heading !== null;
  const currentHeading = isLive ? heading : 0;
  const pointerRotation = (bearing ?? 0) - currentHeading;

  const difference =
    isLive && bearing !== null ? shortestAngleDelta(heading, bearing) : null;
  const isAligned = difference !== null && Math.abs(difference) <= ALIGNMENT_TOLERANCE_DEG;

  const compassInfo = COMPASS_MESSAGES[compassState] ?? COMPASS_MESSAGES.unsupported;
  const showPermissionButton = PERMISSION_BUTTON_STATES.includes(compassState);
  const nearKaaba = location !== null && bearing === null;
  const lowAccuracy = location?.accuracy != null && location.accuracy > 10000;

  return (
    <main className="min-h-screen bg-[#081b22] px-4 py-6 font-['Hind_Siliguri',sans-serif] text-slate-100 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl lg:max-w-5xl">
        {/* Heading */}
        <header className="mb-6 text-center sm:mb-10">
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

        <div className="grid gap-5 lg:grid-cols-2 lg:items-start">
          {/* Compass */}
          <section className="min-w-0 rounded-3xl border border-white/10 bg-[#10252d] p-4 shadow-xl shadow-black/10 sm:p-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm text-slate-400">কিবলার দিক</p>
                <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                  {bearing !== null
                    ? `${bearing.toFixed(1)}°`
                    : nearKaaba
                    ? "আপনি কাবার কাছে"
                    : "অবস্থান নির্ধারণ করুন"}
                </h2>
              </div>

              <div className="shrink-0 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-300">
                <FaKaaba className="mr-2 inline" />
                মক্কা, সৌদি আরব
              </div>
            </div>

            {/* Mode badge */}
            <div className="flex justify-center">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  isLive
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                    : "border-amber-400/30 bg-amber-400/10 text-amber-200"
                }`}
              >
                {isLive
                  ? "লাইভ কম্পাস চালু"
                  : "স্থির মোড — উত্তর ওপরে ধরে দেখুন"}
              </span>
            </div>

            <div
              role="img"
              aria-label={
                bearing !== null
                  ? `কিবলা উত্তর থেকে ঘড়ির কাঁটার দিকে ${bearing.toFixed(1)} ডিগ্রি`
                  : "কম্পাস"
              }
              className="relative mx-auto my-6 flex aspect-square w-full max-w-[300px] items-center justify-center sm:my-8 sm:max-w-[340px]"
              style={{ width: "min(100%, 21rem, 70vh)" }}
            >
              {/* Compass dial */}
              <div
                className="absolute inset-0 rounded-full border border-emerald-400/20 bg-[#0a1e26] transition-transform duration-150 ease-out motion-reduce:transition-none"
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
                  className="absolute inset-0 transition-transform duration-150 ease-out motion-reduce:transition-none"
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
              <div
                role="status"
                className="mb-4 flex items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-300"
              >
                <FaCircleCheck />
                আপনি এখন কিবলার দিকে আছেন
              </div>
            )}

            <div className="rounded-2xl border border-white/5 bg-[#0a1e26] p-4 text-center">
              <p className="text-sm text-slate-400">কিবলার অভিমুখ</p>
              <p className="mt-1 break-words text-lg font-bold text-emerald-300">
                {bearing !== null
                  ? `${getDirection(bearing)} (${bearing.toFixed(1)}°)`
                  : nearKaaba
                  ? "আপনি কাবার একদম কাছে আছেন"
                  : "লোকেশন অপেক্ষমাণ"}
              </p>

              {qibla.distanceKm !== null && (
                <p className="mt-1 text-xs text-slate-400">
                  কাবা থেকে দূরত্ব: প্রায়{" "}
                  {Math.round(qibla.distanceKm).toLocaleString("en-US")} কিমি
                </p>
              )}

              {bearing !== null && (
                <p className="mt-2 text-xs leading-6 text-slate-500">
                  কোণটি সত্য উত্তর থেকে ঘড়ির কাঁটার দিকে মাপা।
                </p>
              )}

              {compassInfo.tone === "info" && (
                <p
                  aria-live="polite"
                  className="mt-2 text-xs leading-6 text-slate-500"
                >
                  {compassInfo.text}
                </p>
              )}
            </div>

            {compassInfo.tone === "warn" && (
              <div
                role="status"
                aria-live="polite"
                className="mt-4 flex items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-sm leading-6 text-amber-200"
              >
                <FaCircleExclamation className="mt-1 shrink-0" />
                <span className="min-w-0 break-words">{compassInfo.text}</span>
              </div>
            )}

            {showPermissionButton && (
              <button
                type="button"
                onClick={requestCompassPermission}
                className="mt-4 w-full rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3.5 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/15"
              >
                <FaCompass className="mr-2 inline" />
                {compassState === "needs-permission"
                  ? "লাইভ কম্পাস চালু করুন"
                  : "আবার চেষ্টা করুন"}
              </button>
            )}
          </section>

          <div className="min-w-0 space-y-5">
            {/* Location */}
            <section className="rounded-3xl border border-white/10 bg-[#10252d] p-4 sm:p-6">
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
                      {location.accuracy !== null && (
                        <p className="mt-1 text-xs text-slate-500">
                          আনুমানিক নির্ভুলতা:{" "}
                          {location.accuracy >= 1000
                            ? `${(location.accuracy / 1000).toFixed(1)} কিমি`
                            : `${Math.round(location.accuracy)} মিটার`}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      কিবলার দিক হিসাব করতে আপনার লোকেশন প্রয়োজন।
                    </p>
                  )}
                </div>
              </div>

              {lowAccuracy && (
                <div
                  role="status"
                  className="mt-4 flex items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-sm leading-6 text-amber-200"
                >
                  <FaCircleExclamation className="mt-1 shrink-0" />
                  <span className="min-w-0 break-words">
                    লোকেশনের নির্ভুলতা কম (আনুমানিক অবস্থান)। GPS চালু করে রিফ্রেশ
                    করুন, নইলে কিবলার কোণ সামান্য ভুল হতে পারে।
                  </span>
                </div>
              )}

              {error && (
                <div
                  role="alert"
                  className="mt-4 flex items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-sm leading-6 text-amber-200"
                >
                  <FaCircleExclamation className="mt-1 shrink-0" />
                  <span className="min-w-0 break-words">{error}</span>
                </div>
              )}

              <button
                type="button"
                onClick={refreshLocation}
                disabled={loading || !geoSupported || !secure}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3.5 font-semibold text-[#081b22] transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaRotate className={loading ? "animate-spin" : ""} />
                {loading ? "অবস্থান খোঁজা হচ্ছে..." : "লোকেশন রিফ্রেশ করুন"}
              </button>
            </section>

            {/* Instructions */}
            <section className="rounded-3xl border border-white/10 bg-[#10252d] p-4 sm:p-6">
              <h3 className="font-bold">কীভাবে ব্যবহার করবেন?</h3>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
                <li className="flex gap-3">
                  <span className="font-bold text-emerald-400">১.</span>
                  <span className="min-w-0">
                    ব্রাউজারে Location permission অনুমোদন করুন।
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-emerald-400">২.</span>
                  <span className="min-w-0">
                    ফোনটি সমতল রাখুন (স্ক্রিন ওপরের দিকে) এবং কম্পাস সেন্সর থাকলে
                    কিবলার নির্দেশক অনুসরণ করুন। iPhone-এ আগে &quot;লাইভ কম্পাস
                    চালু করুন&quot; বাটনে চাপ দিন।
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-emerald-400">৩.</span>
                  <span className="min-w-0">
                    কম্পাসের দিক সঠিক রাখতে ধাতব বস্তু ও চৌম্বকীয় উৎস থেকে দূরে
                    থাকুন; দিক এলোমেলো মনে হলে ফোনটি ৮-এর মতো করে ঘোরান।
                  </span>
                </li>
              </ul>

         
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default QiblaFinder;
