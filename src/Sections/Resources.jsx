import { useEffect, useState } from "react";

const Resources = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch("data/resources.json")
      .then((res) => res.json())
      .then((data) => setResources(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="py-16 px-5 md:px-10 bg-base-200">

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
        <span className="relative inline-block">
          Resources

          <span className="absolute left-1/2 -bottom-3 
          -translate-x-1/2 w-20 h-1 
          bg-white rounded-full"></span>

        </span>
      </h2>


      {/* Cards */}
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        gap-8
      ">

        {resources.map((r) => (

          <div
            key={r.id}
            className="
              group
              bg-base-100/70
              backdrop-blur-lg
              rounded-2xl
              border border-white/20
              overflow-hidden
              shadow-md
              hover:shadow-2xl
              transition-all
              duration-500
              hover:-translate-y-2
            "
          >

            {/* Image */}
            <div className="overflow-hidden">

              <img
                src={r.image}
                alt={r.name}
                className="
                  w-full
                  h-80
                  object-cover
                  group-hover:scale-110
                  transition duration-500

                "
              />

            </div>


            {/* Content */}
            <div className="p-6">

              <h3 className="
                text-xl
                font-bold
                mb-3
                group-hover:text-[#29514F]
                transition
              ">
                {r.name}
              </h3>


              <p className="
                text-sm
                opacity-70
                mb-6
                line-clamp-3
              ">
                {r.description}
              </p>


              {/* Button */}
              {r.link && (

                <a
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    btn
                     bg-[#29514F]
                    btn-sm
                    rounded-full
                    px-6
                  "
                >
                  Visit Website
                </a>

              )}

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default Resources;