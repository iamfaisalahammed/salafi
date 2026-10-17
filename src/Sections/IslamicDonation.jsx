
import { useState } from "react";
import {
  FaHandHoldingHeart,
  FaCopy,
  FaCheck,

} from "react-icons/fa";

const IslamicDonation = () => {
  const [copied, setCopied] = useState(false);
  const bkashNumber = "01XXXXXXXXX";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bkashNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <section className="relative overflow-hidden px-4 py-10 sm:py-14">
      {/* Islamic Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#06140d] via-[#0b2117] to-[#030906]" />
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-emerald-400/20 bg-[#0a1911]/90 shadow-2xl shadow-black/20">

          {/* Header */}
          <div className="border-b border-white/10 px-5 py-8 text-center sm:px-10 sm:py-10">
            


         

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
              ইসলামিক জ্ঞান ছড়িয়ে দিতে এবং এই উদ্যোগকে এগিয়ে নিতে
              আপনার স্বেচ্ছামূলক সহযোগিতা আমাদের অনুপ্রাণিত করবে।
              আল্লাহ আপনার উত্তম নিয়ত ও আমল কবুল করুন।
            </p>
          </div>

          {/* Quran Reminder */}
          <div className="px-5 py-8 sm:px-10">
            <div className="rounded-2xl border border-amber-400/20 bg-gradient-to-r from-amber-400/[0.06] to-transparent p-5 sm:p-7">
              <p className="mb-4 text-xs font-semibold tracking-widest text-amber-300">
                আল-কুরআনের বাণী
              </p>

              <p
                dir="rtl"
                lang="ar"
                className="text-right text-2xl leading-loose text-amber-200 sm:text-3xl"
              >
                مَثَلُ الَّذِينَ يُنْفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنْبَتَتْ سَبْعَ سَنَابِلَ
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-200 sm:text-base">
                “যারা আল্লাহর পথে নিজেদের সম্পদ ব্যয় করে,
                তাদের উপমা একটি বীজের মতো, যা সাতটি শীষ উৎপন্ন করে।”
              </p>

              <p className="mt-3 text-xs font-semibold text-amber-300">
                — সূরা আল-বাকারা, আয়াত ২৬১ (আংশিক)
              </p>
            </div>

            {/* Hadith */}
            <div className="mt-5 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.04] p-5 sm:p-7">
              <p className="mb-3 text-xs font-semibold tracking-widest text-emerald-300">
                রাসূলুল্লাহ ﷺ-এর বাণী
              </p>

              <p className="text-lg font-semibold leading-8 text-white sm:text-xl">
                “সদকা করলে সম্পদ কমে না।”
              </p>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                — সহিহ মুসলিম, হাদিস ২৫৮৮
              </p>

              <a
                href="https://sunnah.com/search?q=Charity+does+not+decrease+wealth"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex text-sm font-medium text-emerald-300 underline decoration-emerald-300/30 underline-offset-4 transition hover:text-amber-300"
              >
                হাদিসের সূত্র দেখুন
              </a>
            </div>

            {/* Donation Card */}
            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-pink-400/20 bg-[#170e15] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400">
                  <FaHandHoldingHeart size={23} />
                </div>

                <div>
                  <h3 className="font-bold text-white">
                    স্বেচ্ছায় সহযোগিতা করুন
                  </h3>
                  <p className="mt-1 text-xs text-gray-400">
                    bKash Personal Number
                  </p>
                  <p className="mt-1 text-lg font-bold tracking-wider text-pink-300">
                    {bkashNumber}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-pink-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                {copied ? <FaCheck /> : <FaCopy />}
                {copied ? "কপি হয়েছে" : "নম্বর কপি করুন"}
              </button>
            </div>

            {/* Closing Message */}
            <div className="mt-6 text-center">
              <p className="text-sm leading-7 text-gray-300">
                দান সম্পূর্ণ ঐচ্ছিক। সহযোগিতা করতে না পারলেও
                হিকমাহর উপকারী জ্ঞান অন্যদের সঙ্গে শেয়ার করুন।
              </p>

              <p className="mt-3 text-sm font-medium text-emerald-300">
                জাযাকুমুল্লাহু খাইরান
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IslamicDonation;
