import { useState } from "react";
import {
  FaHeart,
  FaArrowUp,
  FaShareAlt,
  FaCopy,
  FaCheck,
} from "react-icons/fa";

const FONT = { fontFamily: "'Hind Siliguri', sans-serif" };

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const currentYear = new Date().getFullYear();

  const shareUrl = window.location.origin;
  const shareTitle = "Hikmah — ইসলামী জ্ঞান ও রিসোর্স";
  const shareText =
    "ইসলামী জ্ঞান, বই, ভিডিও ও উপকারী রিসোর্স পেতে Hikmah ভিজিট করুন।";

  const shareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Share failed:", error);
        }
      }
    } else {
      await copyLink();
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      window.prompt("Hikmah-এর লিংক কপি করুন:", shareUrl);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      style={FONT}
      className="border-t border-emerald-400/20 bg-[#081b22] px-4 pb-6 pt-10 text-slate-300 sm:px-6 sm:pt-14"
    >
      <style>{`
        @keyframes hkOrbit {
          to { transform: rotate(360deg); }
        }

        /* বাটনের চারপাশে ঘোরা গোল্ড বর্ডার */
        .hk-orbit {
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 230deg,
            rgba(214, 170, 98, 0.15) 270deg,
            #d6aa62 360deg
          );
          animation: hkOrbit 4s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .hk-orbit { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        {/* Share Section and Islamic Reminder */}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          {/* Share Hikmah - Left */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-emerald-300">
              <FaShareAlt className="text-emerald-400" />

              <span className="text-xs font-semibold sm:text-sm">
                উপকারী জ্ঞান ছড়িয়ে দিন
              </span>
            </div>

            <h2 className="text-2xl font-bold leading-relaxed text-white sm:text-3xl">
              Hikmah শেয়ার করুন,
              <span className="text-[#d6aa62]">
                {" "}ছড়িয়ে দিন{" "}
              </span>
              ইসলামী জ্ঞান।
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              আপনার প্রিয়জনদের সঙ্গে Hikmah শেয়ার করুন।
              উপকারী ইসলামী বই, ভিডিও ও রিসোর্স পৌঁছে দিন
              সবার কাছে।
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {/* শেয়ার বাটন: হালকা ব্যাকগ্রাউন্ড + চারপাশে ঘোরা গোল্ড বর্ডার */}
              <button
                type="button"
                onClick={shareApp}
                className="group relative inline-flex overflow-hidden rounded-xl bg-[#d6aa62]/25 p-[1.5px] focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-[#081b22]"
              >
                <span
                  aria-hidden="true"
                  className="hk-orbit pointer-events-none absolute left-1/2 top-1/2 -ml-[200px] -mt-[200px] h-[400px] w-[400px]"
                />

                <span className="relative inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-[#0c242b] px-5 py-3 font-semibold text-[#e4c28b] transition-colors group-hover:bg-[#12313a]">
                  <FaShareAlt />
                  Hikmah শেয়ার করুন
                </span>
              </button>

              <button
                type="button"
                onClick={copyLink}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-3 font-semibold text-emerald-300 transition-colors hover:bg-emerald-400/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#081b22]"
              >
                {copied ? <FaCheck /> : <FaCopy />}
                {copied ? "লিংক কপি হয়েছে" : "লিংক কপি করুন"}
              </button>
            </div>
          </div>

          {/* Islamic Reminder - Right */}
          <div className="rounded-2xl border border-emerald-400/20 bg-[#10252d] p-5 sm:p-7">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                <FaHeart size={20} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  নেক কাজে সহযোগী হোন
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  ভালো কিছু অন্যের কাছে পৌঁছে দিন।
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-r-xl border-l-4 border-[#d6aa62] bg-[#081b22] px-4 py-4 sm:px-5">
              <p className="text-sm leading-7 text-slate-300">
                “যে ব্যক্তি কোন ভাল আমলের পথ প্রদর্শন করে, তার জন্যে ’আমলকারীর সমান সাওয়াব রয়েছে।”
              </p>

              <p className="mt-3 text-xs font-semibold text-[#d6aa62]">
                — সহিহ মুসলিম, ১৮৯৩
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent sm:my-12" />

        {/* Footer Bottom */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate-500 sm:text-sm">
            © {currentYear}{" "}
            <span className="font-semibold text-emerald-300">
              Hikmah
            </span>
            . All rights reserved.
          </p>

          <p className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-400 sm:text-sm">
            <span>Made with <span className="animate-pulse">❤️</span> for the Ummah.</span>
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="উপরে ফিরে যান"
            title="উপরে ফিরে যান"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 transition-colors hover:border-emerald-400 hover:bg-emerald-400 hover:text-[#081b22] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#081b22]"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}
