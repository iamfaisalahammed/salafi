import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";


const Channel = () => {
  const [data, setData] = useState({
    sectionTitle: "",
    channels: [],
  });


  useEffect(() => {
    fetch("/data/channels.json")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => console.log(error));
  }, []);


  return (
    <section className="py-10 px-4 overflow-hidden">

      {/* Title */}
      <h2 className="text-3xl md:text-3xl font-bold text-center mb-10">
        {data.sectionTitle}
      </h2>


      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={30}
        slidesPerView={2}
        freeMode={true}
        loop={true}

        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}

        breakpoints={{
          320: {
            slidesPerView: 3,
            spaceBetween: 20,
          },

          640: {
            slidesPerView: 4,
            spaceBetween: 25,
          },

          1024: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        }}
      >


        {data.channels.map((channel) => (
          <SwiperSlide key={channel.id}>

            <a
              href={channel.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center group"
            >

              <img
                src={channel.image}
                alt={channel.name}
                className="
                  w-20 h-20
                  md:w-24 md:h-24
                  rounded-full
                  object-cover
                  mx-auto
                  border-2 border-gray-200
                  group-hover:scale-110
                  transition
                "
              />


              <h3 className="
                mt-3
                text-sm
            
                whitespace-nowrap
              ">
                {channel.name}
              </h3>


            </a>

          </SwiperSlide>
        ))}


      </Swiper>

    </section>
  );
};


export default Channel;