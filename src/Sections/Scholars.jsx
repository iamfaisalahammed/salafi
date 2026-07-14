import { useEffect, useState } from "react";
import { FaYoutube, FaTimes } from "react-icons/fa";

export default function Scholars() {
  const [scholars, setScholars] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("data/scholars.json")
      .then((res) => res.json())
      .then((data) => setScholars(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="p-10 ">
      <h2 className="text-3xl md:text-3xl font-bold text-center mb-10">
        Islamic Scholars
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
        {scholars.map((scholar, index) => (
          <div
            key={index}
            onClick={() => setSelected(scholar)}
            className="   border-2  border-white/30 shadow-md p-5
              cursor-pointer hover:shadow-xl
              transition duration-300
              text-center
            "
          >
            {/* Scholar Image */}
            <img
              src={scholar.image}
              alt={scholar.name}
              className="
                w-24 h-24 mx-auto
                rounded-full
                object-cover
                border-2 border-white/80
              "
            />

            {/* Name */}
            <h3 className="mt-4 text-sm">{scholar.name}</h3>
          </div>
        ))}
      </div>

      {/* Popup Modal */}

      {selected && (
        <div
          className="
            fixed inset-0 
            bg-black/60
            flex items-center justify-center
            z-50
            px-4
          "
        >
          <div
            className=" card bg-base-100 backdrop-blur-md p-6 md:p-10 rounded-xl border border-white/20 w-full 
                   hover:shadow-xl hover:-translate-y-1 transition-all duration-300
             
              max-w-md
             
              relative
            "
          >
            {/* Close Button */}

            <button
              onClick={() => setSelected(null)}
              className="
                absolute
                top-4
                right-4
                text-red-600
                text-2xl
              "
            >
              <FaTimes />
            </button>

            {/* Image */}

            <img
              src={selected.image}
              alt={selected.name}
              className="
                w-28 h-28
                mx-auto
                rounded-full
                object-cover
              "
            />

            {/* Name */}

            <h2
              className="
                text-center
               
                
                mt-4
              "
            >
              {selected.name}
            </h2>

            {/* Education */}

            <div className="mt-5 space-y-2">
              <p>
                <span className="font-bold"></span> {selected.information}
              </p>
            </div>

            {/* Youtube Button */}

            <a
              href={selected.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-6
                flex
                items-center
                justify-center
                gap-2
                bg-red-600
                text-white
                py-3
                rounded-lg
                font-semibold
                hover:bg-red-700
                transition
              "
            >
              <FaYoutube size={22} />
              Watch YouTube
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
