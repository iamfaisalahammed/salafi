import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home/Home";

import ImanAqeedah from "../Pages/TopicPages/ImanAqeedah";
import PillarsOfIslam from "../Pages/TopicPages/PillarsOfIslam";
import QuranTafsir from "../Pages/TopicPages/QuranTafsir";
import HadithSunnah from "../Pages/TopicPages/HadithSunnah";
import SeerahHistory from "../Pages/TopicPages/SeerahHistory";
import WhyIslam from "../Pages/TopicPages/WhyIslam";
import ExploreLibrary from "../Pages/ExploreLibrary/ExploreLibrary";


export default function Root() {

  return (
    <Routes>

      {/* Home Page */}
      <Route 
        path="/" 
        element={<Home />} 
      />


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
        path="/topics/why-islam" 
        element={<WhyIslam />} 
        // ----ExploreLibrary------
      />
      <Route 
        path="/ExploreLibrary" 
        element={<ExploreLibrary/>}
      />


    </Routes>
  );

}