
import { useMemo, useState } from "react";
import {
  FaPlayCircle,
  FaHeadphones,
  FaBookOpen,
  FaGraduationCap,
  FaYoutube,
  FaSearch,
  FaArrowRight,
  FaExternalLinkAlt,
} from "react-icons/fa";

const FONT = { fontFamily: "'Hind Siliguri', sans-serif" };

const tabs = [
  { id: "tafsir", name: "কুরআন ও তাফসির", icon: FaBookOpen },
  { id: "learn", name: "কুরআন শিক্ষা", icon: FaPlayCircle },
  { id: "audio", name: "তিলাওয়াত", icon: FaHeadphones },
];

const videos = [
  {
    id: 1,
    title: "Learn Quran",
    description: "ভিডিওর মাধ্যমে কুরআন শেখার ধারাবাহিক পাঠ",
    videoId: "QjlHTj_rOrw",
    link: "https://www.youtube.com/watch?v=QjlHTj_rOrw&list=PL4t9900UvRaI6IgG0VbQIRyCa0pAPeTjg",
    tag: "Video Playlist",
  },
];

const audioResources = [
  {
    id: 1,
    title: "QuranicAudio",
    description: "বিভিন্ন কারির কুরআন তিলাওয়াত শুনুন।",
    link: "https://quranicaudio.com/",
    tag: "Audio Library",
  },
];

const tafsirSources = [
  {
    id: "ibn-kathir",
    title: "তাফসির ইবনে কাসির",
    slug: "bn-tafseer-ibn-e-kaseer",
  },
  {
    id: "abu-bakr-zakaria",
    title: "তাফসির আবু বকর জাকারিয়া",
    slug: "bn-tafsir-abu-bakr-zakaria",
  },
];

const surahs = [
  ["আল-ফাতিহা", "Al-Fatihah", "الفاتحة"],
  ["আল-বাকারা", "Al-Baqarah", "البقرة"],
  ["আলে ইমরান", "Ali 'Imran", "آل عمران"],
  ["আন-নিসা", "An-Nisa", "النساء"],
  ["আল-মায়িদা", "Al-Ma'idah", "المائدة"],
  ["আল-আনআম", "Al-An'am", "الأنعام"],
  ["আল-আরাফ", "Al-A'raf", "الأعراف"],
  ["আল-আনফাল", "Al-Anfal", "الأنفال"],
  ["আত-তাওবা", "At-Tawbah", "التوبة"],
  ["ইউনুস", "Yunus", "يونس"],
  ["হুদ", "Hud", "هود"],
  ["ইউসুফ", "Yusuf", "يوسف"],
  ["আর-রাদ", "Ar-Ra'd", "الرعد"],
  ["ইবরাহিম", "Ibrahim", "ابراهيم"],
  ["আল-হিজর", "Al-Hijr", "الحجر"],
  ["আন-নাহল", "An-Nahl", "النحل"],
  ["আল-ইসরা", "Al-Isra", "الإسراء"],
  ["আল-কাহফ", "Al-Kahf", "الكهف"],
  ["মারইয়াম", "Maryam", "مريم"],
  ["ত্ব-হা", "Ta-Ha", "طه"],
  ["আল-আম্বিয়া", "Al-Anbya", "الأنبياء"],
  ["আল-হাজ্জ", "Al-Hajj", "الحج"],
  ["আল-মুমিনুন", "Al-Mu'minun", "المؤمنون"],
  ["আন-নূর", "An-Nur", "النور"],
  ["আল-ফুরকান", "Al-Furqan", "الفرقان"],
  ["আশ-শুআরা", "Ash-Shu'ara", "الشعراء"],
  ["আন-নামল", "An-Naml", "النمل"],
  ["আল-কাসাস", "Al-Qasas", "القصص"],
  ["আল-আনকাবুত", "Al-Ankabut", "العنكبوت"],
  ["আর-রুম", "Ar-Rum", "الروم"],
  ["লুকমান", "Luqman", "لقمان"],
  ["আস-সাজদা", "As-Sajdah", "السجدة"],
  ["আল-আহযাব", "Al-Ahzab", "الأحزاب"],
  ["সাবা", "Saba", "سبإ"],
  ["ফাতির", "Fatir", "فاطر"],
  ["ইয়াসিন", "Ya-Sin", "يس"],
  ["আস-সাফফাত", "As-Saffat", "الصافات"],
  ["সাদ", "Sad", "ص"],
  ["আয-যুমার", "Az-Zumar", "الزمر"],
  ["গাফির", "Ghafir", "غافر"],
  ["ফুসসিলাত", "Fussilat", "فصلت"],
  ["আশ-শুরা", "Ash-Shura", "الشورى"],
  ["আয-যুখরুফ", "Az-Zukhruf", "الزخرف"],
  ["আদ-দুখান", "Ad-Dukhan", "الدخان"],
  ["আল-জাসিয়া", "Al-Jathiyah", "الجاثiyah"],
  ["আল-আহকাফ", "Al-Ahqaf", "الأحقاف"],
  ["মুহাম্মদ", "Muhammad", "محمد"],
  ["আল-ফাতহ", "Al-Fath", "الفتح"],
  ["আল-হুজুরাত", "Al-Hujurat", "الحجرات"],
  ["কাফ", "Qaf", "ق"],
  ["আয-যারিয়াত", "Adh-Dhariyat", "الذاريات"],
  ["আত-তূর", "At-Tur", "الطور"],
  ["আন-নাজম", "An-Najm", "النجم"],
  ["আল-কামার", "Al-Qamar", "القمر"],
  ["আর-রহমান", "Ar-Rahman", "الرحمن"],
  ["আল-ওয়াকিয়া", "Al-Waqi'ah", "الواقعة"],
  ["আল-হাদিদ", "Al-Hadid", "الحديد"],
  ["আল-মুজাদিলা", "Al-Mujadila", "المجادلة"],
  ["আল-হাশর", "Al-Hashr", "الحشر"],
  ["আল-মুমতাহিনা", "Al-Mumtahanah", "الممتحنة"],
  ["আস-সাফ", "As-Saff", "الصف"],
  ["আল-জুমুআ", "Al-Jumu'ah", "الجمعة"],
  ["আল-মুনাফিকুন", "Al-Munafiqun", "المنافقون"],
  ["আত-তাগাবুন", "At-Taghabun", "التغابن"],
  ["আত-তালাক", "At-Talaq", "الطلاق"],
  ["আত-তাহরিম", "At-Tahrim", "التحريم"],
  ["আল-মুলক", "Al-Mulk", "الملك"],
  ["আল-কলম", "Al-Qalam", "القلم"],
  ["আল-হাক্কাহ", "Al-Haqqah", "الحاقة"],
  ["আল-মাআরিজ", "Al-Ma'arij", "المعارج"],
  ["নূহ", "Nuh", "نوح"],
  ["আল-জিন", "Al-Jinn", "الجن"],
  ["আল-মুযযাম্মিল", "Al-Muzzammil", "المزمل"],
  ["আল-মুদ্দাসসির", "Al-Muddaththir", "المدثر"],
  ["আল-কিয়ামাহ", "Al-Qiyamah", "القيامة"],
  ["আল-ইনসান", "Al-Insan", "الانسان"],
  ["আল-মুরসালাত", "Al-Mursalat", "المرسلات"],
  ["আন-নাবা", "An-Naba", "النبإ"],
  ["আন-নাযিআত", "An-Nazi'at", "النازعات"],
  ["আবাসা", "Abasa", "عبس"],
  ["আত-তাকভির", "At-Takwir", "التكوير"],
  ["আল-ইনফিতার", "Al-Infitar", "الإنفطار"],
  ["আল-মুতাফফিফিন", "Al-Mutaffifin", "المطففين"],
  ["আল-ইনশিকাক", "Al-Inshiqaq", "الإنشقاق"],
  ["আল-বুরুজ", "Al-Buruj", "البروج"],
  ["আত-তারিক", "At-Tariq", "الطارق"],
  ["আল-আলা", "Al-A'la", "الأعلى"],
  ["আল-গাশিয়াহ", "Al-Ghashiyah", "الغاشية"],
  ["আল-ফজর", "Al-Fajr", "الفجر"],
  ["আল-বালাদ", "Al-Balad", "البلد"],
  ["আশ-শামস", "Ash-Shams", "الشمس"],
  ["আল-লাইল", "Al-Layl", "الليل"],
  ["আদ-দুহা", "Ad-Duha", "الضحى"],
  ["আশ-শারহ", "Ash-Sharh", "الشرح"],
  ["আত-তিন", "At-Tin", "التين"],
  ["আল-আলাক", "Al-Alaq", "العلق"],
  ["আল-কদর", "Al-Qadr", "القدر"],
  ["আল-বাইয়্যিনাহ", "Al-Bayyinah", "البينة"],
  ["আয-যিলযাল", "Az-Zalzalah", "الزلزلة"],
  ["আল-আদিয়াত", "Al-Adiyat", "العاديات"],
  ["আল-কারিআহ", "Al-Qari'ah", "القارعة"],
  ["আত-তাকাসুর", "At-Takathur", "التكاثر"],
  ["আল-আসর", "Al-Asr", "العصر"],
  ["আল-হুমাযাহ", "Al-Humazah", "الهمزة"],
  ["আল-ফিল", "Al-Fil", "الفيل"],
  ["কুরাইশ", "Quraysh", "قريش"],
  ["আল-মাউন", "Al-Ma'un", "الماعون"],
  ["আল-কাউসার", "Al-Kawthar", "الكوثر"],
  ["আল-কাফিরুন", "Al-Kafirun", "الكافرون"],
  ["আন-নাসর", "An-Nasr", "النصر"],
  ["আল-মাসাদ", "Al-Masad", "المسد"],
  ["আল-ইখলাস", "Al-Ikhlas", "الإخلاص"],
  ["আল-ফালাক", "Al-Falaq", "الفلق"],
  ["আন-নাস", "An-Nas", "الناس"],
].map(([bn, en, ar], index) => ({
  id: index + 1,
  bn,
  en,
  ar,
}));

const buttonStyle =
  "inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-2 text-xs font-semibold text-emerald-300 transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400";

export default function QuranTafsir() {
  const [active, setActive] = useState("learn");
  const [search, setSearch] = useState("");
  const [selectedTafsir, setSelectedTafsir] = useState(
    "bn-tafseer-ibn-e-kaseer"
  );

  const filteredSurahs = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return surahs;

    return surahs.filter(
      (surah) =>
        surah.bn.toLowerCase().includes(query) ||
        surah.en.toLowerCase().includes(query) ||
        String(surah.id).includes(query)
    );
  }, [search]);

  return (
    <section
      style={FONT}
      className="min-h-screen overflow-x-clip bg-[#081b22] px-3 py-8 text-slate-200 sm:px-6 sm:py-10 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-7 text-center sm:mb-9">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            কুরআন ও তাফসির
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            পবিত্র কুরআন শিখুন, তিলাওয়াত শুনুন, তাফসির পড়ুন এবং
            কুরআনবিষয়ক জ্ঞান অর্জন করুন।
          </p>
        </div>

        {/* Compact Tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2 sm:mb-9">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActive(tab.id);
                  setSearch("");
                }}
                aria-pressed={isActive}
                className={`inline-flex min-h-9 items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isActive
                    ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                    : "border-emerald-400/15 bg-[#10252d] text-slate-300 hover:border-emerald-400/40 hover:text-white"
                }`}
              >
                <Icon className="shrink-0" />
                <span>{tab.name}</span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Learn Quran */}
        {active === "learn" && (
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-white">কুরআন শিক্ষা</h2>
              <p className="mt-1 text-sm text-slate-400">
                ভিডিও লেসন ও ধারাবাহিক পাঠের মাধ্যমে শিখুন।
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <a
                  key={video.id}
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group min-w-0 overflow-hidden rounded-2xl border border-emerald-400/15 bg-[#10252d] transition-colors hover:border-emerald-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <div className="relative aspect-video overflow-hidden bg-[#081b22]">
                    <img
                      src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                      alt={video.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-lg text-white">
                        <FaYoutube />
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-white">{video.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {video.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
                      প্লেলিস্ট দেখুন <FaArrowRight />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Quran Audio */}
        {active === "audio" && (
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-white">কুরআন তিলাওয়াত</h2>
              <p className="mt-1 text-sm text-slate-400">
                অনলাইনে বিভিন্ন কারির তিলাওয়াত শুনুন।
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {audioResources.map((audio) => (
                <a
                  key={audio.id}
                  href={audio.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group min-w-0 rounded-2xl border border-emerald-400/15 bg-[#10252d] p-4 transition-colors hover:border-emerald-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-lg text-emerald-300">
                    <FaHeadphones />
                  </div>

                  <h3 className="font-bold text-white">{audio.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {audio.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
                    তিলাওয়াত শুনুন
                    <FaExternalLinkAlt className="text-[10px]" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Tafsir */}
        {active === "tafsir" && (
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-white">কুরআনের তাফসির</h2>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                সূরা নির্বাচন করে বাংলা তাফসির পড়ুন অথবা সরাসরি কুরআন পাঠ করুন।
              </p>
            </div>

            {/* Tafsir Selector and Search */}
            <div className="mb-4 rounded-xl border border-emerald-400/15 bg-[#10252d] p-3 sm:p-4">
              <label
                htmlFor="tafsir-source"
                className="mb-2 block text-sm font-semibold text-slate-200"
              >
                তাফসির নির্বাচন করুন
              </label>

              <select
                id="tafsir-source"
                value={selectedTafsir}
                onChange={(event) => setSelectedTafsir(event.target.value)}
                className="min-h-10 w-full rounded-lg border border-emerald-400/20 bg-[#081b22] px-3 text-sm text-slate-200 outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/10"
              >
                {tafsirSources.map((source) => (
                  <option key={source.id} value={source.slug}>
                    {source.title}
                  </option>
                ))}
              </select>

              <div className="relative mt-3">
                <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="সূরার নাম বা নম্বর দিয়ে খুঁজুন..."
                  aria-label="সূরার নাম বা নম্বর দিয়ে খুঁজুন"
                  className="min-h-10 w-full rounded-lg border border-emerald-400/15 bg-[#081b22] py-2 pl-9 pr-3 text-sm text-slate-200 outline-none placeholder:text-slate-500 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/10"
                />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                মোট {filteredSurahs.length}টি সূরা
              </p>
            </div>

            {/* Compact Surah List */}
            <div className="overflow-hidden rounded-xl border border-emerald-400/15 bg-[#10252d]">
              {filteredSurahs.map((surah) => (
                <div
                  key={surah.id}
                  className="border-b border-white/[0.06] px-3 py-3 last:border-b-0 transition-colors hover:bg-emerald-400/[0.03] sm:px-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-400/15 bg-emerald-400/10 text-[11px] font-bold text-emerald-300">
                      {String(surah.id).padStart(3, "0")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-slate-100">
                        {surah.bn}
                      </h3>
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {surah.en}
                      </p>
                    </div>

                    <p
                      dir="rtl"
                      lang="ar"
                      className="shrink-0 text-lg text-[#d6aa62] sm:text-xl"
                    >
                      {surah.ar}
                    </p>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 pl-11 sm:flex sm:justify-end">
                    <a
                      href={`https://quran.com/bn/${surah.id}/1/tafsirs/${selectedTafsir}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonStyle}
                    >
                      <FaBookOpen className="shrink-0" />
                      <span>তাফসির পড়ুন</span>
                      <FaExternalLinkAlt className="shrink-0 text-[9px]" />
                    </a>

                    <a
                      href={`https://quran.com/bn/${surah.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonStyle}
                    >
                      <FaBookOpen className="shrink-0" />
                      <span>কুরআন পড়ুন</span>
                      <FaExternalLinkAlt className="shrink-0 text-[9px]" />
                    </a>
                  </div>
                </div>
              ))}

              {filteredSurahs.length === 0 && (
                <div className="px-4 py-10 text-center">
                  <FaSearch className="mx-auto mb-3 text-2xl text-slate-500" />
                  <p className="font-semibold text-slate-200">
                    কোনো সূরা পাওয়া যায়নি
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    অন্য নাম বা সূরার নম্বর দিয়ে চেষ্টা করুন।
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className={`${buttonStyle} mt-4`}
                  >
                    সব সূরা দেখুন
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quran Sciences - kept ready for future use */}
        {active === "sciences" && (
          <div className="rounded-xl border border-emerald-400/15 bg-[#10252d] px-5 py-12 text-center">
            <FaGraduationCap className="mx-auto mb-3 text-3xl text-emerald-300" />
            <h2 className="text-xl font-bold text-white">উলূমুল কুরআন</h2>
            <p className="mt-2 text-sm text-slate-400">
              এই বিভাগে কুরআনবিষয়ক জ্ঞান ও শিক্ষামূলক রিসোর্স যুক্ত করা হবে।
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
