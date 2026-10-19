
import { useState } from "react";
import {
  FaHandHoldingHeart,
  FaCopy,
  FaCheck,
  FaHeart,
} from "react-icons/fa";

const IslamicDonation = () => {
  const [copied, setCopied] = useState(false);

  // Replace this with your actual bKash number
  const bkashNumber = "xxxxxxxxxxx";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bkashNumber);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-100 px-5 py-8 text-center sm:px-10 sm:py-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <FaHandHoldingHeart size={26} />
            </div>

            <p className="mt-4 text-xs font-semibold tracking-widest text-emerald-700">
              আপনার সহযোগিতা
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              হিকমাহর পাশে থাকুন
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
              ইসলামিক জ্ঞান ছড়িয়ে দিতে এবং এই উদ্যোগকে এগিয়ে নিতে
              আপনার স্বেচ্ছামূলক সহযোগিতা আমাদের অনুপ্রাণিত করবে।
              আল্লাহ আপনার উত্তম নিয়ত ও আমল কবুল করুন।
            </p>
          </div>

          <div className="space-y-5 p-5 sm:p-8">
            {/* Quran Reminder */}
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-5 sm:p-7">
              <p className="text-xs font-bold tracking-wide text-emerald-800">
                আল-কুরআনের বাণী
              </p>

              <p
                dir="rtl"
                lang="ar"
                className="mt-4 text-right text-2xl leading-loose text-gray-900 sm:text-3xl"
              >
                مَثَلُ الَّذِينَ يُنْفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنْبَتَتْ سَبْعَ سَنَابِلَ
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-700 sm:text-base">
                “যারা আল্লাহর পথে নিজেদের সম্পদ ব্যয় করে,
                তাদের উপমা একটি বীজের মতো, যা সাতটি শীষ উৎপন্ন করে।”
              </p>

              <p className="mt-3 text-xs font-semibold text-emerald-800">
                — সূরা আল-বাকারা, ২:২৬১ (আয়াতের অংশ)
              </p>
            </div>

            {/* Hadith */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 sm:p-7">
              <p className="text-xs font-bold tracking-wide text-emerald-800">
                রাসূলুল্লাহ ﷺ-এর বাণী
              </p>

              <p className="mt-3 text-lg font-semibold leading-8 text-gray-900 sm:text-xl">
                “সদকা করলে সম্পদ কমে না।”
              </p>

              <p className="mt-2 text-sm text-gray-500">
                — সহিহ মুসলিম, হাদিস ২৫৮৮
              </p>

              <a
                href="https://sunnah.com/search?q=Charity+does+not+decrease+wealth"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex text-sm font-medium text-emerald-700 underline decoration-emerald-200 underline-offset-4 transition hover:text-emerald-900"
              >
                হাদিসের সূত্র দেখুন
              </a>
            </div>

            {/* Donation Card */}
            <div className="flex flex-col gap-5 rounded-xl border border-pink-100 bg-pink-50/50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-700">
                  <FaHandHoldingHeart size={22} />
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900">
                    স্বেচ্ছায় সহযোগিতা করুন
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    bKash Personal Number
                  </p>

                  <p className="mt-2 break-all text-lg font-bold tracking-wider text-pink-700 sm:text-xl">
                    {bkashNumber}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                {copied ? <FaCheck /> : <FaCopy />}
                {copied ? "কপি হয়েছে" : "নম্বর কপি করুন"}
              </button>
            </div>

            {/* Closing Message */}
            <div className="pt-2 text-center">
              <p className="text-sm leading-7 text-gray-600">
                দান সম্পূর্ণ ঐচ্ছিক। সহযোগিতা করতে না পারলেও
                হিকমাহর উপকারী জ্ঞান অন্যদের সঙ্গে শেয়ার করুন।
              </p>

              <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800">
                <FaHeart className="text-emerald-600" />
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
