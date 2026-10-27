
import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home/Home";

import ImanAqeedah from "../Pages/TopicPages/ImanAqeedah";
import PillarsOfIslam from "../Pages/TopicPages/PillarsOfIslam";
import QuranTafsir from "../Pages/TopicPages/QuranTafsir";
import HadithSunnah from "../Pages/TopicPages/HadithSunnah";
import SeerahHistory from "../Pages/TopicPages/SeerahHistory";
import WhyIslam from "../Pages/TopicPages/WhyIslam";
import DuaDhikr from "../Pages/TopicPages/DuaDhikr";

import ExploreLibrary from "../Pages/ExploreLibrary/ExploreLibrary";
import NotFound from "../Pages/NotFound";

// Tools Pages
import QiblaFinder from "../Pages/Tools/QiblaFinder";
import PrayerTimes from "../Pages/Tools/PrayerTimes";
import Tasbih from "../Pages/Tools/Tasbih";
import SacredMosques from "../Pages/Tools/SacredMosques";
import IslamicCalendar from "../Pages/Tools/IslamicCalendar";
import MuslimMap from "../Pages/Tools/MuslimMap";
import SeerahTimeline from "../Pages/Tools/SeerahTimeline";
import Prophets from "../Pages/Tools/Prophets";

export default function Root() {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* Topics Pages */}
      <Route
        path="/topics/iman-aqeedah"
        element={<ImanAqeedah />}
      />

      <Route
        path="/topics/pillars-of-islam"
        element={<PillarsOfIslam />}
      />

      <Route
        path="/topics/quran-tafsir"
        element={<QuranTafsir />}
      />

      <Route
        path="/topics/hadith-sunnah"
        element={<HadithSunnah />}
      />

      <Route
        path="/topics/seerah-history"
        element={<SeerahHistory />}
      />

      <Route
        path="/topics/dua-dhikr"
        element={<DuaDhikr />}
      />

      <Route
        path="/topics/why-islam"
        element={<WhyIslam />}
      />

      {/* Explore Library */}
      <Route
        path="/ExploreLibrary"
        element={<ExploreLibrary />}
      />

      {/* Islamic Tools */}
      <Route
        path="/tools/qibla-finder"
        element={<QiblaFinder />}
      />

      <Route
        path="/tools/prayer-times"
        element={<PrayerTimes />}
      />

      <Route
        path="/tools/tasbih"
        element={<Tasbih />}
      />

      <Route
        path="/tools/sacred-mosques"
        element={<SacredMosques />}
      />

      <Route
        path="/tools/islamic-calendar"
        element={<IslamicCalendar />}
      />
      <Route
        path="/tools/muslim-map"
        element={<MuslimMap />}
      />
      <Route
        path="/tools/seerah-timeline"
        element={<SeerahTimeline />}
      />
      <Route
        path="/tools/prophets"
        element={<Prophets />}
      />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
