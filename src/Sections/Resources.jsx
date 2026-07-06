const resources = [
  { title: "Quran.com", desc: "Read and study Qur’an" },
  { title: "Sunnah.com", desc: " Hadith collections" },
  { title: "IslamQA", desc: "Verified Islamic answers" },
  { title: "Hisnul Muslim", desc: "Daily duas & adhkar" },
  { title: "IslamicFinder", desc: "Prayer times & Qibla" },
];

const Resources = () => {
    return (<section className="p-10 bg-base-200">
  <h2 className="text-3xl  text-center mb-10">
    <span className="relative inline-block">
      Resources
      <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-16 h-1 bg-white rounded-full"></span>
    </span>
  </h2>

  <div className="grid md:grid-cols-5 gap-6">
    {resources.map((r, i) => (
      <div
        key={i}
        className="card bg-base-100 backdrop-blur-md p-6 md:p-10 rounded-xl border border-white/20 w-full 
                   hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        <h3 className="font-bold text-lg mb-1">{r.title}</h3>
        <p className="text-sm opacity-70 mb-4">{r.desc}</p>
     
      </div>
    ))}
  </div>
</section> 
    );
};

export default Resources;



