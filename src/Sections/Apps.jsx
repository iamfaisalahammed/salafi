import { useState } from "react";

import html from "../assets/mongo.png";

const skillsData = [
  {
    name: "HADIS",
    img: html,
    color: "#E44D26",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "QURAN",
    img: html,
    color: "#E44D26",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "HADIS",
    img: html,
    color: "#E44D26",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "QURAN",
    img: html,
    color: "#E44D26",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "HADIS vdvfdjj mgsljg gfsjoi",
    img: html,
    color: "#E44D26",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "QURAN",
    img: html,
    color: "#E44D26",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
];

const App = () => {
  const [techName, setTechName] = useState("Mobile Application");
  const [techColor, setTechColor] = useState("#FFFFFF");

  return (
    <div className=" overflow-hidden">
    

      <div className="bg-base-200 flex justify-center ">
        <div className="bg-white/10 backdrop-blur-md p-6 md:p-10 rounded-xl border border-white/20 w-full ">
          <p
            className="text-center text-xl   mb-8 transition-all"
            style={{ color: techColor }}
          >
            {techName}
          </p>
             

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skillsData.map((skill, index) => (
              <a
                key={index}
                href={skill.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl px-3 py-2 transition-all duration-300"
                onMouseEnter={() => {
                  setTechName(skill.name);
                  setTechColor(skill.color);
                }}
                onMouseLeave={() => {
                  setTechName("Mobile Application");
                  setTechColor("#FFFFFF");
                }}
              >
                <img
                  className="size-8 shrink-0"
                  src={skill.img}
                  alt={skill.name}
                />
                <span className="text-white text-sm font-medium truncate">
                  {skill.name}
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