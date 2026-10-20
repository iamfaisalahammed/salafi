
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

const tabs = [
  {
    id: "learn",
    name: "Learn Quran",
    subtitle: "কুরআন শিক্ষা",
    icon: FaPlayCircle,
  },
  {
    id: "audio",
    name: "Quran Audio",
    subtitle: "তিলাওয়াত",
    icon: FaHeadphones,
  },
  {
    id: "tafsir",
    name: "Tafsir",
    subtitle: "তাফসির",
    icon: FaBookOpen,
  },
  {
    id: "sciences",
    name: "Quran Sciences",
    subtitle: "উলূমুল কুরআন",
    icon: FaGraduationCap,
  },
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
    description: "বাংলা তাফসির",
    slug: "bn-tafseer-ibn-e-kaseer",
  },
  {
    id: "abu-bakr-zakaria",
    title: "তাফসির আবু বকর জাকারিয়া",
    description: "বাংলা তাফসির",
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
    <section className="min-h-screen bg-gradient-to-b from-emerald-50/60 via-white to-white px-3 py-10 text-slate-800 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-8 text-center sm:mb-10">
          

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            কুরআন ও তাফসির
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            পবিত্র কুরআন শিখুন, তিলাওয়াত শুনুন, তাফসির পড়ুন এবং
            কুরআনবিষয়ক জ্ঞান অর্জন করুন।
          </p>
        </div>

        {/* Tabs */}
        <div className="mx-auto mb-10 flex w-fit max-w-full flex-wrap justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm sm:mb-12">
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
                className={`flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-all sm:px-5 ${
                  isActive
                    ? "bg-emerald-700 text-white shadow-md shadow-emerald-700/20"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
                }`}
              >
                <Icon className="shrink-0 text-base" />
                <span>{tab.name}</span>
                <span className="hidden text-xs opacity-75 sm:inline">
                  ({tab.subtitle})
                </span>
              </button>
            );
          })}
        </div>

        {/* Learn Quran */}
        {active === "learn" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                কুরআন শিক্ষা
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                ভিডিও লেসন ও ধারাবাহিক পাঠের মাধ্যমে শিখুন।
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <a
                  key={video.id}
                  href={video.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-700/10"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img
                      src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                      alt={video.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-2xl text-white shadow-xl transition-transform group-hover:scale-110">
                        <FaYoutube />
                      </span>
                    </div>
                    <span className="absolute bottom-3 left-3 rounded-md bg-black/70 px-2.5 py-1 text-xs font-semibold text-white">
                      {video.tag}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold text-slate-900">
                      {video.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                      {video.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                      প্লেলিস্ট দেখুন
                      <FaArrowRight className="transition-transform group-hover:translate-x-1" />
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
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                কুরআন তিলাওয়াত
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                অনলাইনে বিভিন্ন কারির তিলাওয়াত শুনুন।
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {audioResources.map((audio) => (
                <a
                  key={audio.id}
                  href={audio.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-700 transition-colors group-hover:bg-emerald-700 group-hover:text-white">
                    <FaHeadphones />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {audio.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                    {audio.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                    তিলাওয়াত শুনুন
                    <FaExternalLinkAlt className="text-xs" />
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
            
            </div>
          </div>
        )}

        {/* Tafsir */}
        {active === "tafsir" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                কুরআনের তাফসির
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                ১১৪টি সূরার মধ্য থেকে সূরা নির্বাচন করে বাংলা তাফসির পড়ুন।
              </p>
            </div>

            {/* Tafsir selector */}
            <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <label
                htmlFor="tafsir-source"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                তাফসির নির্বাচন করুন
              </label>

              <select
                id="tafsir-source"
                value={selectedTafsir}
                onChange={(event) => setSelectedTafsir(event.target.value)}
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 sm:max-w-md"
              >
                {tafsirSources.map((source) => (
                  <option key={source.id} value={source.slug}>
                    {source.title}
                  </option>
                ))}
              </select>

              <div className="relative mt-4">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="সূরার নাম বা নম্বর দিয়ে খুঁজুন..."
                  className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <p className="mt-3 text-xs text-slate-500">
                মোট {filteredSurahs.length}টি সূরা
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSurahs.map((surah) => (
                <article
                  key={surah.id}
                  className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-700/5 sm:p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-sm font-bold text-emerald-800 transition-colors group-hover:bg-emerald-700 group-hover:text-white">
                      {String(surah.id).padStart(3, "0")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-bold text-slate-900">
                        {surah.bn}
                      </h3>
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {surah.en}
                      </p>
                    </div>

                    <p
                      dir="rtl"
                      className="shrink-0 text-xl text-emerald-800"
                    >
                      {surah.ar}
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {tafsirSources.map((source) => (
                      <a
                        key={source.id}
                        href={`https://quran.com/bn/${surah.id}/1/tafsirs/${source.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex min-h-10 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50/60 px-2 py-2 text-center text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-700 hover:text-white"
                      >
                        {source.id === "ibn-kathir"
                          ? "ইবনে কাসির"
                          : "আবু বকর জাকারিয়া"}
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {filteredSurahs.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
                <FaSearch className="mx-auto mb-3 text-2xl text-slate-300" />
                <p className="font-semibold text-slate-700">
                  কোনো সূরা পাওয়া যায়নি
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  অন্য নাম বা সূরার নম্বর দিয়ে চেষ্টা করুন।
                </p>
              </div>
            )}

        
          </div>
        )}

        {/* Sciences of Quran */}
        {active === "sciences" && (
          <div>
          

          <h2 className="text-xl font-bold">Comming Soon</h2>

            
          </div>
        )}
      </div>
    </section>
  );
}
