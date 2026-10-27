import { useEffect, useState } from "react";
import {
  FaHandHoldingHeart,
  FaCopy,
  FaCheck,
  FaHeart,
  FaArrowUpRightFromSquare,
  FaBookOpen,
} from "react-icons/fa6";

const FONT = { fontFamily: "'Hind Siliguri', sans-serif" };

const IslamicDonation = () => {
  const [copied, setCopied] = useState(false);

  const bkashNumber = "xxxxxxxxxxx";

  useEffect(() => {
    if (!copied) return;

    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bkashNumber);
      setCopied(true);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = bkashNumber;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        const success = document.execCommand("copy");
        setCopied(success);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-[#081b22] px-3 py-10 text-slate-100 sm:px-6 sm:py-14 lg:py-16"
      style={FONT}
    >
      <style>{`
        @keyframes donation-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes donation-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @keyframes donation-ring {
          0% { box-shadow: 0 0 0 0 rgba(223, 189, 123, .18); }
          70% { box-shadow: 0 0 0 9px rgba(223, 189, 123, 0); }
          100% { box-shadow: 0 0 0 0 rgba(223, 189, 123, 0); }
        }

        @keyframes donation-shine {
          from { transform: translateX(-150%) skewX(-15deg); }
          to { transform: translateX(250%) skewX(-15deg); }
        }

        .donation-enter {
          animation: donation-fade-up .6s ease-out both;
        }

        .donation-delay-1 { animation-delay: 100ms; }
        .donation-delay-2 { animation-delay: 180ms; }
        .donation-delay-3 { animation-delay: 260ms; }

        .donation-icon {
          animation: donation-float 4s ease-in-out infinite;
        }

        .donation-ring {
          animation: donation-ring 3s ease-out infinite;
        }

        .donation-card {
          transition: border-color .25s ease, box-shadow .25s ease,
            transform .25s ease;
        }

        .donation-card:hover {
          border-color: rgba(223,189,123,.45);
          box-shadow: 0 12px 30px -22px rgba(0, 0, 0, .25);
        }

        .donation-copy {
          position: relative;
          overflow: hidden;
        }

        .donation-copy::after {
          content: "";
          position: absolute;
          inset: 0;
          width: 35%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.22),
            transparent
          );
          transform: translateX(-150%) skewX(-15deg);
        }

        .donation-copy:hover::after {
          animation: donation-shine .7s ease;
        }

        @media (prefers-reduced-motion: reduce) {
          .donation-enter,
          .donation-icon,
          .donation-ring {
            animation: none !important;
          }

          .donation-card,
          .donation-copy {
            transition: none !important;
          }

          .donation-copy:hover::after {
            animation: none !important;
          }
        }
      `}</style>

      {/* Background */}
      <div className="pointer-events-none absolute -right-24 top-12 h-64 w-64 rounded-full bg-emerald-500/[0.09] blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-amber-400/[0.07] blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="donation-enter mb-7 border-b border-white/10 pb-6 sm:mb-9 sm:pb-7">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5 text-xs font-semibold text-emerald-300 sm:text-sm">
            <FaBookOpen />
            <span>হিকমাহ লাইব্রেরি</span>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="min-w-0">
              <h2 className="text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl lg:text-4xl">
                হিকমাহর পাশে থাকুন
                <span className="text-[#dfbd7b]"> ও কল্যাণ ছড়িয়ে দিন</span>
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                ইসলামিক জ্ঞান সবার কাছে পৌঁছে দিতে আপনার স্বেচ্ছামূলক
                সহযোগিতা এই উদ্যোগকে এগিয়ে নিতে সাহায্য করবে।
              </p>
            </div>

            <div className="flex w-fit shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs font-medium text-slate-300 sm:text-sm">
              <FaHandHoldingHeart className="text-base text-[#dfbd7b]" />
              <span>Support Hikmah</span>
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Quran Reminder */}
          <div className="donation-enter donation-delay-1 donation-card relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#122c32] via-[#10252d] to-[#0d2229] p-5 sm:p-7">
            <div className="pointer-events-none absolute -right-5 -top-8 select-none text-8xl font-light text-emerald-300/[0.08]">
              ❋
            </div>

            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="h-5 w-1 rounded-full bg-[#d2aa69]" />
                <p className="text-xs font-bold tracking-wide text-[#dfbd7b] sm:text-sm">
                  আল-কুরআনের বাণী
                </p>
              </div>

        

              <div className="mt-5 border-l-2 border-[#dfbd7b]/60 pl-4">
                <p className="text-sm leading-7 text-slate-200 sm:text-base sm:leading-8">
               যারা আল্লাহর পথে তাদের সম্পদ ব্যয় করে, তাদের উপমা একটি বীজের মত, যা উৎপন্ন করল সাতটি শীষ, প্রতিটি শীষে রয়েছে একশ’ দানা। আর আল্লাহ যাকে চান তার জন্য বাড়িয়ে দেন। আর আল্লাহ প্রাচুর্যময়, সর্বজ্ঞ।
                </p>
              </div>

              <p className="mt-4 text-xs font-semibold text-[#dfbd7b] sm:text-sm">
                — সূরা আল-বাকারা, ২:২৬১ 
              </p>
            </div>
          </div>

          {/* Hadith */}
          <div className="donation-enter donation-delay-2 donation-card rounded-2xl border border-white/10 bg-[#10252d] p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#17332f] text-[#dfbd7b] ring-1 ring-white/10">
                <FaHeart size={17} />
              </div>

              <p className="text-xs font-bold tracking-wide text-[#dfbd7b] sm:text-sm">
                রাসূলুল্লাহ ﷺ-এর বাণী
              </p>
            </div>

            <p className="mt-5 text-lg font-bold leading-8 text-white sm:text-xl">
              “সদকা করলে সম্পদ কমে না। আর ক্ষমা করার মাধ্যমে আল্লাহ
              বান্দার সম্মান বাড়িয়ে দেন।”
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              আল্লাহর সন্তুষ্টির জন্য বিনয়ী হলে আল্লাহ বান্দার মর্যাদা
              আরও বৃদ্ধি করেন।
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <p className="text-xs text-slate-500">
                — সহিহ মুসলিম, হাদিস ২৫৮৮
              </p>

              <a
                href="https://sunnah.com/search?q=Charity+does+not+decrease+wealth"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg py-1 text-sm font-semibold text-[#dfbd7b] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                সূত্র দেখুন
                <FaArrowUpRightFromSquare size={11} />
              </a>
            </div>
          </div>

          {/* Donation Card */}
          <div className="donation-enter donation-delay-3 donation-card relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#122c32] to-[#0d2229] p-5 sm:p-7 lg:col-span-2">
            <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full border-[20px] border-white/10" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full border-[20px] border-white/10" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-start gap-4">
                <div className="donation-icon donation-ring flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300">
                  <FaHandHoldingHeart size={22} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-white sm:text-lg">
                    স্বেচ্ছায় সহযোগিতা করুন
                  </h3>

                  <p className="mt-1.5 text-xs font-medium text-slate-400 sm:text-sm">
                    bKash Personal Number
                  </p>

                  <p className="mt-2 break-all text-lg font-extrabold tracking-wider text-[#e2136e] sm:text-xl">
                    {bkashNumber}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    নম্বরটি কপি করে bKash অ্যাপ থেকে সহযোগিতা করতে পারেন।
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className={`donation-copy inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2.5 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.97] sm:w-auto ${
                  copied
                    ? "bg-[#d2aa69] text-white shadow-md shadow-emerald-600/15"
                    : "bg-[#d2aa69] text-white shadow-sm shadow-emerald-700/15 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
                }`}
              >
                {copied ? <FaCheck size={15} /> : <FaCopy size={15} />}
                {copied ? "কপি হয়েছে" : "নম্বর কপি করুন"}
              </button>
            </div>
          </div>
        </div>

     
      </div>
    </section>
  );
};

export default IslamicDonation;