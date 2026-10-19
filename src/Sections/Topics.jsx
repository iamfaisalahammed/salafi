
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBookOpen,
  FaCompass,
  FaHistory,
  FaLandmark,
  FaMosque,
  FaScroll,
} from "react-icons/fa";

const topics = [
  {
    title: "ঈমান ও আকিদা",
    subtitle: "ঈমান ও ইসলামী বিশ্বাস সম্পর্কে জানুন",
    path: "/topics/iman-aqeedah",
    icon: FaCompass,
    number: "01",
  },
  {
    title: "ইসলামের মূল ভিত্তি",
    subtitle: "ইসলামের পাঁচটি স্তম্ভ সম্পর্কে জানুন",
    path: "/topics/pillars-of-islam",
    icon: FaMosque,
    number: "02",
  },
  {
    title: "কুরআন ও তাফসির",
    subtitle: "কুরআনের অর্থ ও ব্যাখ্যা অন্বেষণ করুন",
    path: "/topics/quran-tafsir",
    icon: FaBookOpen,
    number: "03",
  },
  {
    title: "হাদিস ও সুন্নাহ",
    subtitle: "রাসুলুল্লাহ ﷺ-এর শিক্ষা সম্পর্কে জানুন",
    path: "/topics/hadith-sunnah",
    icon: FaScroll,
    number: "04",
  },
  {
    title: "সিরাত ও ইসলামের ইতিহাস",
    subtitle: "ইসলামের ইতিহাস ও ঐতিহ্য জানুন",
    path: "/topics/seerah-history",
    icon: FaHistory,
    number: "05",
  },
  {
    title: "ইসলাম কেন?",
    subtitle: "ইসলামের বার্তা ও সৌন্দর্য সম্পর্কে জানুন",
    path: "/topics/why-islam",
    icon: FaLandmark,
    number: "06",
  },
];

export default function Topics() {
  return (
    <section className="bg-[#f8faf8] px-4 py-12 text-gray-800 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">

        {/* Section Heading */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-emerald-700">
            <FaBookOpen className="text-lg" />
            <span
              className="text-sm font-semibold"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              ইসলামিক জ্ঞানচর্চা
            </span>
          </div>

          <h2
            className="text-2xl font-bold leading-snug text-gray-900 sm:text-3xl"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            ইসলামের গুরুত্বপূর্ণ
            <span className="text-emerald-700"> বিষয়সমূহ</span>
          </h2>

          <p
            className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            ঈমান, কুরআন, হাদিস ও ইসলামের ইতিহাস সম্পর্কে জানুন।
            আপনার পছন্দের বিষয়টি নির্বাচন করে জ্ঞানচর্চা শুরু করুন।
          </p>
        </div>

        {/* Topic List */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {topics.map((topic) => {
            const Icon = topic.icon;

            return (
              <Link
                key={topic.path}
                to={topic.path}
                className="group flex min-w-0 items-center gap-3 rounded-xl border border-gray-200/80 bg-white p-4 transition-colors hover:border-emerald-300 hover:bg-emerald-50/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:gap-4 sm:p-5"
              >
                {/* Topic Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-100 sm:h-12 sm:w-12">
                  <Icon className="text-lg" />
                </div>

                {/* Topic Information */}
                <div className="min-w-0 flex-1">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900 transition-colors group-hover:text-emerald-800 sm:text-lg"
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                  >
                    {topic.title}
                  </h3>

                  <p
                    className="mt-1 text-xs leading-6 text-gray-500 sm:text-sm"
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                  >
                    {topic.subtitle}
                  </p>
                </div>

                {/* Arrow */}
                <FaArrowRight className="shrink-0 text-sm text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-700" />
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
