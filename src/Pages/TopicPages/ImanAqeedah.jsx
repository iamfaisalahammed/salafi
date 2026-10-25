import { useState } from "react";
import {
  FaPlayCircle,
  FaBook,
  FaStar,
  FaYoutube,
  FaUserTie,
  FaExternalLinkAlt,
  FaArrowRight,
} from "react-icons/fa";

const FONT = { fontFamily: "'Hind Siliguri', sans-serif" };

const tabs = [
  { id: "videos", name: "Videos", subtitle: "ভিডিও", icon: FaPlayCircle },
  { id: "books", name: "Books", subtitle: "বই", icon: FaBook },
  { id: "names", name: "Asmaul Husna", subtitle: "আল্লাহর নাম", icon: FaStar },
];

const videos = [
  {
    id: 1,
    title: "আকীদাহ ভিডিও প্লেলিস্ট",
    speaker: "ডক্টর আবু বক্কর মুহাম্মাদ জাকারিয়া",
    videoId: "Q-SWXifqCaA",
    link: "https://www.youtube.com/watch?v=Q-SWXifqCaA&list=PLJGZ7rO4bSMfzNG1WOgRgBTNKXzVj4tlc",
    tag: "Full Playlist",
  },
  {
    id: 2,
    title: "আকীদাহ ভিডিও প্লেলিস্ট",
    speaker: "ডক্টর ইমাম হোসাইন",
    videoId: "2XKnypZ7H40",
    link: "https://www.youtube.com/watch?v=2XKnypZ7H40&list=PLrIXHGCtjCath5_p7NdZgfWDbcL8W3HTY",
    tag: "Full Playlist",
  },
];

const books = [
  {
    id: 1,
    title: "আল-ফিকহুল আকবার",
    author: "ইমাম আবু হানিফা (রহ.)",
    link: "https://drive.google.com/file/d/1Xvrfps2vIp46DpODeshF5R-FY5SBaB32/view?usp=sharing",
  },
  {
    id: 2,
    title: "ইসলামি আকিদা",
    author: "ড. খোন্দকার আব্দুল্লাহ জাহাঙ্গীর (রহ.)",
    link: "https://drive.google.com/file/d/1WdxHqXuTUou7-QfIc3wp7VycmqTZU8zr/view?usp=drive_link",
  },
];

const names = [
  { ar: "الله", bn: "আল্লাহ", transliteration: "Allah", meaning: "আল্লাহ" },
  { ar: "ٱلرَّحْمَٰنُ", bn: "আর রাহমান", transliteration: "Ar-Rahman", meaning: "পরম দয়ালু, পরম করুণাময়, সবচেয়ে দয়ালু, কল্যাণময়" },
  { ar: "ٱلرَّحِيمُ", bn: "আর-রাহীম", transliteration: "Ar-Rahim", meaning: "অতিশয়-মেহেরবান, অতি দয়ালু" },
  { ar: "ٱلْمَلِكُ", bn: "আল-মালিক", transliteration: "Al-Malik", meaning: "সর্বকর্তৃত্বময়, অধিপতি, মালিক" },
  { ar: "ٱلْقُدُّوسُ", bn: "আল-কুদ্দুস", transliteration: "Al-Quddus", meaning: "নিষ্কলুষ, অতি পবিত্র" },
  { ar: "ٱلسَّلَامُ", bn: "আস-সালাম", transliteration: "As-Salam", meaning: "নিরাপত্তা-দানকারী, শান্তি-দানকারী, ত্রাণকর্তা, দোষমুক্ত" },
  { ar: "ٱلْمُؤْمِنُ", bn: "আল-মু'মিন", transliteration: "Al-Mu'min", meaning: "নিরাপত্তা ও ঈমান দানকারী, জামিনদার, সত্য ঘোষণাকারী" },
  { ar: "ٱلْمُهَيْمِنُ", bn: "আল-মুহাইমিন", transliteration: "Al-Muhaymin", meaning: "পরিপূর্ণ রক্ষণাবেক্ষণকারী, রক্ষক, অভিভাবক, প্রতিপালনকারী" },
  { ar: "ٱلْعَزِيزُ", bn: "আল-আ'জীজ", transliteration: "Al-'Aziz", meaning: "পরাক্রমশালী, অপরাজেয়, সর্বাধিক সম্মানিত, মহাসম্মানিত" },
  { ar: "ٱلْجَبَّارُ", bn: "আল-জাব্বার", transliteration: "Al-Jabbar", meaning: "দুর্নিবার, মহাপ্রতাপশালী, অতীব মহিমান্বিত" },
  { ar: "ٱلْمُتَكَبِّرُ", bn: "আল-মুতাকাব্বিইর", transliteration: "Al-Mutakabbir", meaning: "নিরঙ্কুশ শ্রেষ্ঠত্বের অধিকারী, সর্বশ্রেষ্ঠ, গৌরবান্বিত, অহংকারী" },
  { ar: "ٱلْخَٰلِقُ", bn: "আল-খালিক্ব", transliteration: "Al-Khaliq", meaning: "সৃষ্টিকর্তা, সৃষ্টিকারী" },
  { ar: "ٱلْبَارِئُ", bn: "আল-বারী", transliteration: "Al-Bari'", meaning: "সঠিকভাবে সৃষ্টিকারী" },
  { ar: "ٱلْمُصَوِّرُ", bn: "আল-মুছউইর", transliteration: "Al-Musawwir", meaning: "আকৃতি-দানকারী" },
  { ar: "ٱلْغَفَّارُ", bn: "আল-গফ্ফার", transliteration: "Al-Ghaffar", meaning: "পরম ক্ষমাশীল, অতি ক্ষমাশীল" },
  { ar: "ٱلْقَهَّارُ", bn: "আল-ক্বাহার", transliteration: "Al-Qahhar", meaning: "কঠোর, মহাপ্রতাপশালী, দমনকারী" },
  { ar: "ٱلْوَهَّابُ", bn: "আল-ওয়াহ্হাব", transliteration: "Al-Wahhab", meaning: "সবকিছু দানকারী, দানশীল, স্থাপনাকারী" },
  { ar: "ٱلرَّزَّاقُ", bn: "আর-রজ্জাক্ব", transliteration: "Ar-Razzaq", meaning: "রিযিকদাতা" },
  { ar: "ٱلْفَتَّاحُ", bn: "আল-ফাত্তাহ", transliteration: "Al-Fattah", meaning: "বিজয়দানকারী, শ্রেষ্ঠ ফয়সালাকারী, প্রারম্ভকারী" },
  { ar: "ٱلْعَلِيمُ", bn: "আল-আ'লীম", transliteration: "Al-'Alim", meaning: "সর্বজ্ঞ, মহাজ্ঞানী" },
  { ar: "ٱلْقَابِضُ", bn: "আল-ক্ববিদ্ব'", transliteration: "Al-Qabid", meaning: "নিয়ন্ত্রণকারী, সরল পথ প্রদর্শনকারী" },
  { ar: "ٱلْبَاسِطُ", bn: "আল-বাসিত", transliteration: "Al-Basit", meaning: "প্রশস্তকারী" },
  { ar: "ٱلْخَافِضُ", bn: "আল-খফিদ্বু", transliteration: "Al-Khafid", meaning: "অবনতকারী (কাফির ও মুশরিকদের, অবিশ্বাসীদের অপমানকারী)" },
  { ar: "ٱلْرَّافِعُ", bn: "আর-রফীই'", transliteration: "Ar-Rafi'", meaning: "উন্নতকারী, উঁচুকারী" },
  { ar: "ٱلْمُعِزُّ", bn: "আল-মুই'জ্ব", transliteration: "Al-Mu'iz", meaning: "সম্মান-দানকারী" },
  { ar: "ٱلْمُذِلُّ", bn: "আল-মুদ্বি'ল্লু (আল-মুযিল্ল)", transliteration: "Al-Muzil / Al-Mudhill", meaning: "(অবিশ্বাসীদের) বেইজ্জতকারী, সম্মান হরণকারী" },
  { ar: "ٱلسَّمِيعُ", bn: "আস্-সামিই'", transliteration: "As-Sami'", meaning: "সর্বশ্রোতা" },
  { ar: "ٱلْبَصِيرُ", bn: "আল-বাছীর", transliteration: "Al-Basir", meaning: "সর্ববিষয়-দর্শনকারী, সর্বদ্রষ্টা" },
  { ar: "ٱلْحَكَمُ", bn: "আল-হা'কাম", transliteration: "Al-Hakam", meaning: "অটল বিচারক, মহা বিচারপতি, হুকুমদাতা" },
  { ar: "ٱلْعَدْلُ", bn: "আল-আ'দল", transliteration: "Al-'Adl", meaning: "পরিপূর্ণ ন্যায়বিচারক, নিখুঁত, ন্যায় বিচারক" },
  { ar: "ٱللَّطِيفُ", bn: "আল-লাতীফ", transliteration: "Al-Latif", meaning: "সকল গোপন বিষয়ে অবগত, সূক্ষ্মদর্শী, অমায়িক" },
  { ar: "ٱلْخَبِيرُ", bn: "আল-খ'বীর", transliteration: "Al-Khabir", meaning: "সকল ব্যাপারে জ্ঞাত, সর্বজ্ঞ" },
  { ar: "ٱلْحَلِيمُ", bn: "আল-হা'লীম", transliteration: "Al-Halim", meaning: "অত্যন্ত ধৈর্যশীল, মহা সহনশীল, প্রশ্রয়দাতা" },
  { ar: "ٱلْعَظِيمُ", bn: "আল-আ'জীম", transliteration: "Al-'Azim", meaning: "সর্বোচ্চ মর্যাদাশীল, মহা মর্যাদাপূর্ণ, অতি বিরাট" },
  { ar: "ٱلْغَفُورُ", bn: "আল-গফুর", transliteration: "Al-Ghafoor", meaning: "পরম ক্ষমাশীল, মার্জনাকারী, অতীব ক্ষমাশীল" },
  { ar: "ٱلشَّكُورُ", bn: "আশ্-শাকুর", transliteration: "Ash-Shakur", meaning: "গুণগ্রাহী, সুবিবেচক" },
  { ar: "ٱلْعَلِيُّ", bn: "আল-আ'লিইউ", transliteration: "Al-'Ali", meaning: "উচ্চ-মর্যাদাশীল" },
  { ar: "ٱلْكَبِيرُ", bn: "আল-কাবিইর (আল-কাবীর)", transliteration: "Al-Kabir", meaning: "সুমহান, অতি বিরাট" },
  { ar: "ٱلْحَفِيظُ", bn: "আল-হা'ফীজ", transliteration: "Al-Hafiz", meaning: "সংরক্ষণকারী" },
  { ar: "ٱلْمُقِيتُ", bn: "আল-মুক্বীত", transliteration: "Al-Muqit", meaning: "সকলের জীবনোপকরণ-দানকারী, সংরক্ষণকারী, লালনপালনকারী" },
  { ar: "ٱلْحَسِيبُ", bn: "আল-হাসীব", transliteration: "Al-Hasib", meaning: "হিসাব-গ্রহণকারী, মহা মীমাংসাকারী" },
  { ar: "ٱلْجَلِيلُ", bn: "আল-জালীল", transliteration: "Aj-Jalil", meaning: "পরম মর্যাদার অধিকারী, গৌরবান্বিত" },
  { ar: "ٱلْكَرِيمُ", bn: "আল-কারীম", transliteration: "Al-Karim", meaning: "সুমহান দাতা, মহা সম্মানিত, মহা দয়ালু" },
  { ar: "ٱلْرَّقِيبُ", bn: "আর-রক্বীব", transliteration: "Ar-Raqib", meaning: "তত্ত্বাবধায়ক" },
  { ar: "ٱلْمُجِيبُ", bn: "আল-মুজীব", transliteration: "Al-Mujib", meaning: "জবাব-দানকারী, সাড়া দানকারী, উত্তরদাতা, দো‘আ কবুলকারী" },
  { ar: "ٱلْوَاسِعُ", bn: "আল-ওয়াসি'", transliteration: "Al-Wasi'", meaning: "সর্বব্যাপী, অসীম, ব্যাপক" },
  { ar: "ٱلْحَكِيمُ", bn: "আল-হাকীম", transliteration: "Al-Hakim", meaning: "পরম-প্রজ্ঞাময়, সুবিজ্ঞ, সুদক্ষ" },
  { ar: "ٱلْوَدُودُ", bn: "আল-ওয়াদুদ", transliteration: "Al-Wadud", meaning: "(বান্দাদের প্রতি) সদয়, প্রেমময়, পরম স্নেহশীল" },
  { ar: "ٱلْمَجِيدُ", bn: "আল-মাজীদ", transliteration: "Al-Majid", meaning: "সকল মর্যাদার অধিকারী, মহিমান্বিত, সম্মানিত" },
  { ar: "ٱلْبَاعِثُ", bn: "আল-বাই'ছ'", transliteration: "Al-Ba'ith", meaning: "পুনরুজ্জীবিতকারী" },
  { ar: "ٱلْشَّهِيدُ", bn: "আশ্-শাহীদ", transliteration: "Ash-Shahid", meaning: "সর্বজ্ঞ-সাক্ষী, প্রত্যক্ষদর্শী" },
  { ar: "ٱلْحَقُّ", bn: "আল-হা'ক্ব", transliteration: "Al-Haqq", meaning: "পরম সত্য" },
  { ar: "ٱلْوَكِيلُ", bn: "আল-ওয়াকিল", transliteration: "Al-Wakil", meaning: "পরম নির্ভরযোগ্য কর্ম-সম্পাদনকারী, তত্ত্বাবধায়ক, সহায় প্রদানকারী, আস্থাভাজন উকিল" },
  { ar: "ٱلْقَوِيُّ", bn: "আল-ক্বউইউ", transliteration: "Al-Qawee", meaning: "পরম শক্তির অধিকারী" },
  { ar: "ٱلْمَتِينُ", bn: "আল-মাতীন", transliteration: "Al-Matin", meaning: "সুদৃঢ়, সুস্থির" },
  { ar: "ٱلْوَلِيُ", bn: "আল-ওয়ালিইউ", transliteration: "Al-Walee", meaning: "অভিভাবক ও সাহায্যকারী" },
  { ar: "ٱلْحَمِيدُ", bn: "আল-হা'মীদ", transliteration: "Al-Hamid", meaning: "সকল প্রশংসার অধিকারী, সকল প্রশংসার দাবিদার, মহা প্রশংসনীয়" },
  { ar: "ٱلْمُحْصِي", bn: "আল-মুহছী", transliteration: "Al-Muhsi", meaning: "সকল সৃষ্টির ব্যাপারে অবগত" },
  { ar: "ٱلْمُبْدِئُ", bn: "আল-মুব্দি'", transliteration: "Al-Mubdi'", meaning: "প্রথমবার-সৃষ্টিকর্তা, অগ্রণী, প্রথম প্রবর্তক" },
  { ar: "ٱلْمُعِيدُ", bn: "আল-মুঈ'দ", transliteration: "Al-Mu'eed / Al-Muʿīd", meaning: "পুনরায়-সৃষ্টিকর্তা" },
  { ar: "ٱلْمُحْيِي", bn: "আল-মুহ'য়ী", transliteration: "Al-Muhyee", meaning: "জীবন-দানকারী" },
  { ar: "ٱلْمُمِيتُ", bn: "আল-মুমীত", transliteration: "Al-Mumeet", meaning: "মৃত্যু-দানকারী" },
  { ar: "ٱلْحَيُّ", bn: "আল-হাইয়্যু", transliteration: "Al-Hayy", meaning: "চিরঞ্জীব, যার কোনো শেষ নেই" },
  { ar: "ٱلْقَيُّومُ", bn: "আল-ক্বাইয়্যুম", transliteration: "Al-Qayyum", meaning: "সমস্তকিছুর ধারক ও সংরক্ষণকারী" },
  { ar: "ٱلْوَاجِدُ", bn: "আল-ওয়াজিদ", transliteration: "Al-Wajid", meaning: "অফুরন্ত ভান্ডারের অধিকারী" },
  { ar: "المحيط", bn: "আল-মুহীত", transliteration: "Al-Muhit", meaning: "পরিবেষ্টনকারী, সর্ববেষ্টনকারী" },
  { ar: "ٱلْأَحَدُ | ٱلْوَاحِدُ", bn: "আল-ওয়াহি'দ | আল-আহাদ", transliteration: "Al-Wahid | Al-Aḥad", meaning: "এক ও অদ্বিতীয়" },
  { ar: "ٱلصَّمَدُ", bn: "আছ্-ছমাদ", transliteration: "As-Samad", meaning: "অমুখাপেক্ষী, অবিনশ্বর, চিরন্তন, স্বয়ংসম্পূর্ণ" },
  { ar: "ٱلْقَادِرُ", bn: "আল-ক্বদির", transliteration: "Al-Qadir", meaning: "সর্বশক্তিমান, মহা ক্ষমতাধর" },
  { ar: "ٱلْمُقْتَدِرُ", bn: "আল-মুক্ব্তাদির", transliteration: "Al-Muqtadir", meaning: "নিরঙ্কুশ সিদ্ধান্তের অধিকারী" },
  { ar: "المقدم", bn: "আল-মুক্বদ্দিম", transliteration: "Al-Muqaddim", meaning: "অগ্রসারক, সর্বাগ্রে সহায়তা প্রদানকারী" },
  { ar: "ٱلْمُؤَخِّرُ", bn: "আল-মুয়াক্খির", transliteration: "Al-Mu'akhkhir", meaning: "অবকাশ দানকারী, বিলম্বকারী" },
  { ar: "ٱلْأوَّلُ", bn: "আল-আউয়াল", transliteration: "Al-'Awwal", meaning: "অনাদি, প্রথম" },
  { ar: "ٱلْآخِرُ", bn: "আল-আখির", transliteration: "Al-'Akhir", meaning: "অনন্ত, সর্বশেষ" },
  { ar: "ٱلظَّٰهِرُ", bn: "আজ-জ'হির", transliteration: "Az-Zahir", meaning: "সম্পূর্ণরূপে-প্রকাশিত, প্রকাশ্য" },
  { ar: "ٱلْبَاطِنُ", bn: "আল-বাত্বিন", transliteration: "Al-Batin", meaning: "দৃষ্টি হতে অদৃশ্য, গোপন" },
  { ar: "ٱلْوَالِي", bn: "আল-ওয়ালি", transliteration: "Al-Wali", meaning: "সমস্ত কিছুর অভিভাবক" },
  { ar: "ٱلْمُتَعَالِي", bn: "আল-মুতাআ'লি", transliteration: "Al-Muta'ali", meaning: "সৃষ্টির গুণাবলির ঊর্ধ্বে" },
  { ar: "ٱلْبَرُّ", bn: "আল-বার্", transliteration: "Al-Barr", meaning: "পরম-উপকারী, অনুগ্রহশীল, কল্যাণকারী" },
  { ar: "ٱلتَّوَابُ", bn: "আত্-তাওয়াব", transliteration: "At-Tawwab", meaning: "তাওবার তাওফিক দানকারী এবং কবুলকারী, ক্ষমাকারী" },
  { ar: "ٱلْمُنْتَقِمُ", bn: "আল-মুনতাক্বিম", transliteration: "Al-Muntaqim", meaning: "প্রতিশোধ-গ্রহণকারী" },
  { ar: "ٱلْعَفُوُّ", bn: "আল-আ'ফঊ", transliteration: "Al-'Afuww", meaning: "পরম-উদার, শাস্তি মওকুফকারী, গুনাহ ক্ষমাকারী, পাপ মোচনকারী" },
  { ar: "ٱلْرَّؤُوفُ", bn: "আর-রউফ", transliteration: "Ar-Ra'uf", meaning: "পরম-স্নেহশীল, সদয়, সমবেদনা প্রকাশকারী, দয়াশীল" },
  { ar: "مَالِكُ ٱلْمُلْكِ", bn: "মালিকুল-মুলক", transliteration: "Malik Al-Mulk", meaning: "সমগ্র জগতের বাদশাহ" },
  { ar: "ذُو ٱلْجَلَالِ وَٱلْإِكْرَامِ", bn: "যুল-জালালি-ওয়াল-ইকরাম", transliteration: "Zul-l-Jalal wal-Ikram", meaning: "মহিমান্বিত ও দয়াবান সত্তা, মহা মর্যাদাবান, মহা মহত্ত্ব ও মহা সম্মানিত" },
  { ar: "ٱلْمُقْسِطُ", bn: "আল-মুক্ব্সিত", transliteration: "Al-Muqsit", meaning: "হকদারের হক-আদায়কারী" },
  { ar: "ٱلْجَامِعُ", bn: "আল-জামিই'", transliteration: "Aj-Jami'", meaning: "একত্রকারী, সমবেতকারী" },
  { ar: "ٱلْغَنِيُّ", bn: "আল-গণিই'", transliteration: "Al-Ghanee", meaning: "অমুখাপেক্ষী ধনী" },
  { ar: "ٱلْمُغْنِيُ", bn: "আল-মুগণিই'", transliteration: "Al-Mughnee", meaning: "পরম-অভাবমোচনকারী, সমৃদ্ধকারী, উদ্ধারকারী" },
  { ar: "ٱلْمَانِعُ", bn: "আল-মানিই'", transliteration: "Al-Mani'", meaning: "অকল্যাণরোধক, প্রতিরোধকারী, রক্ষাকর্তা, নিষেধকারী, বারণকারী" },
  { ar: "ٱلضَّارُّ", bn: "আয্-যর", transliteration: "Ad-Darr", meaning: "ক্ষতিসাধনকারী, যন্ত্রণাদানকারী, উৎপীড়নকারী" },
  { ar: "ٱلنَّافِعُ", bn: "আন্-নাফিই'", transliteration: "An-Nafi'", meaning: "কল্যাণকারী, অনুগ্রাহক, উপকারকারী, হিতকারী" },
  { ar: "ٱلْنُورُ", bn: "আন্-নূর", transliteration: "An-Nur", meaning: "পরম-আলো, আলোক" },
  { ar: "ٱلْهَادِي", bn: "আল-হাদী", transliteration: "Al-Hadi", meaning: "পথ-প্রদর্শক, হিদায়েতকারী" },
  { ar: "ٱلْبَدِيعُ", bn: "আল-বাদীই'", transliteration: "Al-Badi'", meaning: "অতুলনীয়" },
  { ar: "ٱلْبَاقِي", bn: "আল-বাক্বী", transliteration: "Al-Baqi", meaning: "চিরস্থায়ী, অবিনশ্বর" },
  { ar: "ٱلْوَارِثُ", bn: "আল-ওয়ারিস'", transliteration: "Al-Warith", meaning: "উত্তরাধিকারী" },
  { ar: "ٱلرَّشِيدُ", bn: "আর-রাশীদ", transliteration: "Ar-Rashid", meaning: "সঠিক পথ-প্রদর্শক, বিচক্ষণ, সচেতন" },
  { ar: "ٱلصَّبُورُ", bn: "আস-সবুর", transliteration: "As-Sabur", meaning: "অত্যধিক ধৈর্যধারণকারী" },
];

const ImanAqeedah = () => {
  const [active, setActive] = useState("videos");

  return (
    <section
      style={FONT}
      className="min-h-screen bg-[#081b22] px-3 py-8 text-slate-200 sm:px-6 sm:py-12 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-8 text-center sm:mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            আকিদা ও ঈমান
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            ইসলামী বিশ্বাসের মৌলিক বিষয়গুলো জানুন, বিশুদ্ধ আকিদা অর্জন করুন এবং
            কুরআন ও সুন্নাহর আলোকে নিজের ঈমানকে আরও দৃঢ় করুন।
          </p>
        </div>

        {/* Mobile-friendly Tabs */}
        <div className="mx-auto mb-8 grid w-full max-w-2xl grid-cols-3 gap-2 rounded-2xl border border-emerald-400/15 bg-[#10252d] p-2 sm:mb-10 sm:flex sm:w-fit sm:justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                aria-pressed={isActive}
                className={`flex min-h-[76px] min-w-0 flex-col items-center justify-center gap-1.5 rounded-xl px-1.5 py-3 text-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 sm:min-h-11 sm:flex-row sm:gap-2 sm:px-5 sm:py-2 ${
                  isActive
                    ? "bg-emerald-400 text-[#081b22] shadow-md shadow-emerald-950/30"
                    : "text-slate-400 hover:bg-white/5 hover:text-emerald-300"
                }`}
              >
                <Icon className="shrink-0 text-lg sm:text-base" />
                <span className="text-xs font-bold leading-tight sm:text-sm">
                  {tab.name}
                </span>
                <span className="text-[10px] leading-tight opacity-80 sm:text-xs">
                  {tab.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Videos */}
        {active === "videos" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {videos.map((video) => (
              <a
                key={video.id}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-emerald-400/15 bg-[#10252d] transition-colors duration-200 hover:border-emerald-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-[#081b22]">
                  <img
                    src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                    alt={video.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-xl text-white shadow-lg sm:h-14 sm:w-14">
                      <FaYoutube />
                    </span>
                  </div>

                  {video.tag && (
                    <span className="absolute bottom-3 left-3 rounded-lg border border-white/10 bg-black/70 px-2.5 py-1 text-xs font-semibold text-white">
                      {video.tag}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h2 className="text-base font-bold leading-snug text-white sm:text-lg">
                    {video.title}
                  </h2>

                  <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-slate-400">
                    <FaUserTie className="mt-1 shrink-0 text-emerald-400" />
                    <span>{video.speaker}</span>
                  </p>

                  <span className="mt-5 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-300 transition-colors group-hover:bg-emerald-400 group-hover:text-[#081b22] sm:mt-6">
                    YouTube-এ দেখুন
                    <FaArrowRight className="text-xs" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Books */}
        {active === "books" && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {books.map((book, i) => (
              <article
                key={book.id}
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-emerald-400/15 bg-[#10252d] p-4 transition-colors duration-200 hover:border-emerald-400/40 sm:p-5"
              >
                <span className="absolute right-4 top-3 text-sm font-bold text-[#d6aa62]/50">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/10 text-lg text-emerald-300 sm:h-12 sm:w-12">
                  <FaBook />
                </div>

                <h2 className="pr-7 text-base font-bold leading-7 text-white sm:text-lg">
                  {book.title}
                </h2>

                <p className="mt-1.5 flex-1 text-sm leading-6 text-slate-400">
                  {book.author}
                </p>

                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2.5 text-sm font-semibold text-emerald-300 transition-colors hover:bg-emerald-400 hover:text-[#081b22] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 sm:mt-6"
                >
                  পড়ুন / ডাউনলোড
                  <FaExternalLinkAlt className="shrink-0 text-xs" />
                </a>
              </article>
            ))}
          </div>
        )}

        {/* Names of Allah */}
        {active === "names" && (
          <>
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white sm:text-xl">
                  আল্লাহর সুন্দর নামসমূহ
                </h2>
                <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
                  প্রতিটি নামের আরবি, বাংলা নাম ও অর্থ পড়ুন।
                </p>
              </div>

              <span className="shrink-0 rounded-full border border-[#d6aa62]/25 bg-[#d6aa62]/10 px-3 py-1.5 text-xs font-semibold text-[#d6aa62]">
                {names.length} নাম
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {names.map((name, i) => (
                <article
                  key={name.bn}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-emerald-400/15 bg-[#10252d] px-3 pb-4 pt-5 text-center transition-colors duration-200 hover:border-emerald-400/40 hover:bg-[#14313a] sm:px-3.5 sm:pb-5 sm:pt-6"
                >
                  <span className="absolute left-2 top-2 text-[10px] font-semibold text-[#d6aa62]/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <p
                    className="break-words text-2xl font-bold leading-relaxed text-emerald-300 sm:text-3xl"
                    dir="rtl"
                    lang="ar"
                  >
                    {name.ar}
                  </p>

                  <p className="mt-2 break-words text-sm font-bold leading-6 text-white">
                    {name.bn}
                  </p>

                  <p className="mt-1 break-words text-xs leading-5 text-slate-400">
                    {name.meaning}
                  </p>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ImanAqeedah;