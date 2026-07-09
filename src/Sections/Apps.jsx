
import { useState, useEffect } from "react";

const App = () => {
  const [setapp, setsetapp] = useState("Mobile Application");
  const [appColor, setappColor] = useState("#FFFFFF");
  const [apps, setapps] = useState([]);

  useEffect(() => {
    fetch("data/apps.json")
      .then((res) => res.json())
      .then((data) => setapps(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="bg-base-200 flex justify-center">
        <div className="bg-white/1 backdrop-blur-md p-6 md:p-10 rounded-xl border border-white/20 w-full">

          <p
            className="text-center text-xl mb-8 transition-all"
            style={{ color: appColor }}
          >
            {setapp}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            {apps.map((app) => (
              <a
                key={app.id}
                href={app.link}
                target="_blank"
                rel="noopener noreferrer"

                onMouseEnter={() => {
                  setsetapp(app.description);
                  setappColor("#ffffff");
                }}

                onMouseLeave={() => {
                  setsetapp("Mobile Application");
                  setappColor("#FFFFFF");
                }}

                className="
                  group 
                  flex 
                  items-center 
                  gap-2 
                  bg-white/5 
                  hover:bg-white/15 
                  border 
                  border-white/10 
                  rounded-xl 
                  px-3 
                  py-2 
                  transition-all 
                  duration-300
                  cursor-pointer
                "
              >

                <img
                  className="size-8 shrink-0"
                  src={app.image}
                  alt={app.name}
                />

                <span className="text-white text-sm font-medium truncate">
                  {app.name}
                </span>

              </a>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
};

export default App;
