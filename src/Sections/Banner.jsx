import { useEffect, useState } from "react";
import { FaBookOpen, FaMosque } from "react-icons/fa";
import { IoLocationOutline, IoSettingsOutline } from "react-icons/io5"
import { Link } from "react-router-dom";

const Banner = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const [school, setSchool] = useState(() => {
  const savedMadhhab = localStorage.getItem("madhhab");
  return savedMadhhab !== null ? Number(savedMadhhab) : 1;
});

  const [showSettings, setShowSettings] = useState(false);

  const formatTime = (time24) => {
    if (!time24) return "--";

    const cleanTime = time24.split(" ")[0];
    const [hours, minutes] = cleanTime.split(":");

    const date = new Date();

    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };


  // Prayer End Time
  const getEndTime = (currentPrayer) => {
    const order = [
      "Fajr",
      "Dhuhr",
      "Asr",
      "Maghrib",
      "Isha",
    ];


    let nextPrayer;


    // Fajr ends before Sunrise
    if (currentPrayer === "Fajr") {
      return formatTime(prayerTimes.Sunrise);
    }


    const index = order.indexOf(currentPrayer);


    if (index === -1) return "--";


    // Isha ends before next Fajr
    if (currentPrayer === "Isha") {
      nextPrayer = "Fajr";
    } else {
      nextPrayer = order[index + 1];
    }


    const nextTime = prayerTimes[nextPrayer];


    if (!nextTime) return "--";


    const cleanTime = nextTime.split(" ")[0];
    const [hours, minutes] = cleanTime.split(":");


    const date = new Date();

    date.setHours(Number(hours));
    date.setMinutes(Number(minutes) - 1);


    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };



  const getLocation = () => {
    setLoadingLocation(true);


    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const {
            latitude,
            longitude,
          } = position.coords;


          const res = await fetch(
            `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=1&school=${school}`,
          );


          const data = await res.json();


          setPrayerTimes(data.data.timings);



          const locationRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );


          const locationData = await locationRes.json();


          const address = locationData.address;


          setLocationName(
            `${address.city || address.town || address.village || "Unknown"}, ${
              address.country || ""
            }`,
          );


        } catch (error) {
          console.log(error);

        } finally {
          setLoadingLocation(false);
        }
      },


      (error) => {
        console.log(error);
        setLoadingLocation(false);
      },
    );
  };



  useEffect(() => {
    localStorage.setItem("madhhab", school);

    getLocation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [school]);



  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-green-950 to-slate-950 text-white py-24 px-6">

      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent)]"></div>


      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">


        {/* Left Side */}

        <div>

          <h1
            className="text-5xl md:text-7xl leading-tight font-bold"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Seek Knowledge,
            <br />
            Follow The Sunnah
          </h1>


          <p className="mt-6 text-lg text-gray-300 max-w-lg leading-relaxed">
            Learn Islam From Authentic Sources — Qur'an, Hadith, Scholars,
            Islamic Apps and Resources, All In One Place.
          </p>


       
<div className="mt-8 flex flex-wrap gap-4">
  <Link
    to="/ExploreLibrary"
    className="btn btn-lg rounded-xl border-2 border-white/30 bg-white px-6 text-gray-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/90 hover:shadow-xl"
    style={{ fontFamily: "inherit" }}
  >
    <FaBookOpen className="text-lg" />
    Explore the Library
    <span className="transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  </Link>
</div>


        </div>



        {/* Right Side */}


        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">


          <div className="flex items-center justify-between mb-5">


            <div>

              <h3 className="text-2xl  flex gap-2">
                <FaMosque></FaMosque> Today's Prayer Times
              </h3>


              <p className="text-sm text-gray-300 mt-2 flex items-center gap-2">

                <IoLocationOutline ></IoLocationOutline>

                {loadingLocation
                  ? "Detecting location..."
                  : locationName || "Location not found"}


                <span className="badge badge-sm badge-outline text-white border-white/40">

                  {school === 1 ? "Hanafi" : "Shafi • Maliki • Hanbali"}

                </span>


              </p>


            </div>



            <div className="flex gap-2">


              <button
                onClick={getLocation}
                className="btn bg-white/1 btn-circle"
                title="Detect Location"
              >
                <IoLocationOutline ></IoLocationOutline>
              </button>


              <button
                onClick={() => setShowSettings(!showSettings)}
                className="btn bg-white/1  btn-circle"
                title="Prayer Settings"
              >
                <IoSettingsOutline></IoSettingsOutline>
              </button>


            </div>


          </div>




          {showSettings && (

            <div className="absolute right-8 top-24 bg-white text-black rounded-xl p-4 shadow-xl z-50 w-56">


              <p className="font-bold mb-3">
                Select Madhhab
              </p>



              <button
                onClick={() => {
                  setSchool(1);
                  setShowSettings(false);
                }}
                className="btn btn-sm w-full mb-2"
              >
                Hanafi
              </button>



              <button
                onClick={() => {
                  setSchool(0);
                  setShowSettings(false);
                }}
                className="btn btn-sm w-full"
              >
                Shafi / Hanbali / Maliki
              </button>



            </div>

          )}





          {prayerTimes ? (

            <div className="space-y-4">


              {[
                ["Fajr", "Fajr"],
                ["Dhuhr", "Dhuhr"],
                ["Asr", "Asr"],
                ["Maghrib", "Maghrib"],
                ["Isha", "Isha"],

              ].map(([name, key]) => (


                <div
                  key={key}
                  className="flex justify-between items-center border-b border-white/10 pb-2"
                >


                  <span className="font-medium">
                    {name}
                  </span>



                  <span className="text-sm">


                    {formatTime(prayerTimes[key])}



                    <span className="mx-2 text-gray-400">
                      -
                    </span>



                    <span className="text-gray-300">
                      {getEndTime(key)}
                    </span>



                  </span>



                </div>


              ))}


            </div>


          ) : (


            <div className="flex justify-center py-8">

              <span className="loading loading-spinner loading-lg"></span>

            </div>


          )}


        </div>


      </div>


    </section>
  );
};


export default Banner;