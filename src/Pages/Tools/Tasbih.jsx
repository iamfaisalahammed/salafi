
import {
  FaMoon,
  FaStarAndCrescent,
  FaHand,
} from "react-icons/fa6";

const toBn = (n) =>
  String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

// [number, x, y] — viewBox 490 x 640
const counts = [
  // Little finger
  [1, 55, 318],
  [2, 97, 298],
  [3, 50, 268],
  [4, 90, 256],
  [5, 52, 195],
  [6, 88, 188],
  [7, 68, 138],

  // Ring finger
  [8, 122, 290],
  [9, 166, 271],
  [10, 124, 236],
  [11, 158, 228],
  [12, 124, 152],
  [13, 156, 147],
  [14, 144, 58],

  // Middle finger
  [15, 190, 268],
  [16, 230, 271],
  [17, 197, 208],
  [18, 237, 205],
  [19, 207, 118],
  [20, 242, 118],
  [21, 230, 28],

  // Index finger
  [22, 262, 282],
  [23, 298, 294],
  [24, 274, 214],
  [25, 316, 218],
  [26, 289, 143],
  [27, 324, 146],
  [28, 313, 73],

  // Thumb
  [29, 346, 408],
  [30, 374, 425],
  [31, 378, 352],
  [32, 416, 372],
  [33, 446, 299],
];

const fingers = [
  "M45 325 L40 200 Q38 150 60 130 Q80 125 95 150 L105 322 Z",
  "M115 290 L118 110 Q125 62 150 65 Q168 70 168 100 L172 280 Z",
  "M178 280 L185 85 Q192 40 220 38 Q250 42 252 80 L255 280 Z",
  "M250 285 L275 120 Q285 85 310 85 Q335 95 330 125 L312 310 Z",
  "M335 420 L345 380 Q400 310 440 305 Q465 310 455 340 Q420 390 375 430 Z",
];

const joints = [
  [42, 272, 102, 262],
  [40, 200, 98, 196],
  [116, 238, 170, 230],
  [118, 155, 170, 150],
  [182, 210, 254, 208],
  [186, 125, 252, 122],
  [262, 218, 322, 222],
  [280, 145, 332, 148],
  [338, 410, 388, 436],
  [352, 368, 440, 392],
];

const Tasbih = () => {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#06161c] via-[#081b22] to-[#0a2229] px-4 py-10 text-slate-100 sm:px-6 sm:py-14"
      style={{
        fontFamily: "'Hind Siliguri', sans-serif",
      }}
    >
      <style>
        {"@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700;800&display=swap');"}
      </style>

      {/* Background Decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-400/[0.07] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-96 h-80 w-80 rounded-full bg-[#c99a54]/[0.08] blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl">
        {/* Heading */}
        <header className="mb-8 text-center sm:mb-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.08] text-emerald-300 shadow-lg shadow-emerald-500/10">
            <FaMoon className="text-2xl" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            আঙুলে তাসবীহ গণনা
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">
            সহজভাবে আঙুলে তাসবীহ গণনা করার পদ্ধতি ও
            গুরুত্বপূর্ণ নির্দেশনা জেনে নিন।
          </p>
        </header>

        {/* Main Card */}
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#10252d]/90 shadow-2xl shadow-black/20 backdrop-blur-xl">
          {/* Card Header */}
          <div className="border-b border-white/10 px-5 py-5 sm:px-7 sm:py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#c99a54]/20 bg-[#c99a54]/10 text-[#e0b875]">
                <FaHand className="text-xl" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-white sm:text-xl">
                  তাসবীহ পড়ার সহজ উপায়
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
                  আঙুলের সাহায্যে ৩৩ বার গণনা
                </p>
              </div>
            </div>
          </div>

          {/* Hand Illustration Area */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#102b32] via-[#0d252c] to-[#132b31] px-2 py-5 sm:px-6 sm:py-8">
            {/* Subtle pattern */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, #c99a54 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-white/[0.08] bg-[#071a20]/60 p-2 shadow-inner sm:p-4">
              <div className="mb-1 flex items-center justify-center gap-2 pt-2 text-xs font-medium text-emerald-300/80 sm:text-sm">
                <FaStarAndCrescent />
                <span>আঙুলে তাসবীহ গণনার চিত্র</span>
              </div>

              <svg
                viewBox="0 0 490 640"
                className="h-auto w-full"
                role="img"
                aria-label="আঙুলে ১ থেকে ৩৩ পর্যন্ত তাসবীহ গণনার চিত্র"
              >
                <defs>
                  <linearGradient
                    id="tasbih-skin"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#f8dfc9" />
                    <stop offset="100%" stopColor="#eab99a" />
                  </linearGradient>

                  <linearGradient
                    id="tasbih-palm"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#fbe6d5" />
                    <stop offset="100%" stopColor="#e9b696" />
                  </linearGradient>

                  <filter
                    id="tasbih-shadow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="150%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="8"
                      stdDeviation="8"
                      floodColor="#000000"
                      floodOpacity="0.22"
                    />
                  </filter>
                </defs>

                {/* Decorative beads */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <circle
                    key={i}
                    cx={430 + i * 4}
                    cy={20 + i * 34}
                    r={20 - i * 0.6}
                    fill="#c99a54"
                    opacity="0.38"
                  />
                ))}

                {/* Palm */}
                <path
                  d="M45 325 L105 322 L172 280 L255 280 L312 310 L335 420 L385 440 Q370 520 330 570 Q300 620 290 640 L60 640 Q40 600 45 540 Z"
                  fill="url(#tasbih-palm)"
                  stroke="#d6a383"
                  strokeWidth="2"
                  filter="url(#tasbih-shadow)"
                />

                {/* Fingers */}
                {fingers.map((d, i) => (
                  <path
                    key={i}
                    d={d}
                    fill="url(#tasbih-skin)"
                    stroke="#d6a383"
                    strokeWidth="2"
                  />
                ))}

                {/* Joint Lines */}
                {joints.map(([x1, y1, x2, y2], i) => (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#c58d6b"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                ))}

                {/* Numbers */}
                {counts.map(([n, x, y]) => (
                  <text
                    key={n}
                    x={x}
                    y={y}
                    fontSize="15"
                    fontWeight="700"
                    fill={
                      n === 33 || n === 29 || n === 30
                        ? "#b83232"
                        : "#25343a"
                    }
                    textAnchor="middle"
                  >
                    {toBn(n)}
                  </text>
                ))}

                {/* Illustration Label */}
                <text
                  x="190"
                  y="410"
                  textAnchor="middle"
                  fontSize="34"
                  fontWeight="800"
                  fill="#b83232"
                >
                  তাসবীহ
                </text>

                <text
                  x="190"
                  y="450"
                  textAnchor="middle"
                  fontSize="24"
                  fontWeight="700"
                  fill="#25343a"
                >
                  পড়ার সহজ উপায়
                </text>

                <text
                  x="190"
                  y="490"
                  textAnchor="middle"
                  fontSize="26"
                  fontWeight="800"
                  fill="#25343a"
                >
                  <tspan fill="#b83232">১</tspan>
                  {" বারেই "}
                  <tspan fill="#b83232">৩৩</tspan>
                </text>
              </svg>
            </div>
          </div>

          {/* Hadith */}
          <div className="p-5 sm:p-7">
            <div className="rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.04] p-4 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-300/10 text-emerald-300">
                  <FaMoon />
                </div>

                <h3 className="text-base font-bold text-white sm:text-lg">
                  হাদিসের নির্দেশনা
                </h3>
              </div>

              <p className="text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                রাসূলুল্লাহ ﷺ আঙুলে তাসবীহ গণনা করার নির্দেশ
                দিয়েছেন। কারণ আঙুলগুলো কিয়ামতের দিন
                জিজ্ঞাসিত হবে এবং কথা বলবে।
              </p>

              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="text-xs leading-6 text-slate-400 sm:text-sm">
                  সূত্র: সুনান আবু দাউদ, হাদিস ১৫০১;
                  জামে আত-তিরমিযী, হাদিস ৩৪৮৬।
                  হাদিস নম্বর সংস্করণভেদে ভিন্ন হতে পারে।
                </p>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#c99a54]/15 bg-[#c99a54]/[0.05] p-4">
              <FaStarAndCrescent className="mt-1 shrink-0 text-[#d6aa62]" />

              <p className="text-xs leading-6 text-slate-400 sm:text-sm">
                তাসবীহ গণনার সময় মনোযোগ ও আন্তরিকতার সঙ্গে
                আল্লাহর জিকির করুন। এই চিত্রটি গণনা বুঝতে
                সহায়ক একটি নির্দেশিকা।
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Caption */}
        <p className="mt-6 text-center text-xs leading-6 text-slate-500">
          Hikmah — জ্ঞান অর্জন করুন, সুন্নাহর পথে চলুন।
        </p>
      </div>
    </main>
  );
};

export default Tasbih;
