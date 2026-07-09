const topics = [
  "Aqeedah",
  "Tawheed",
  "Shirk",
  "Salah",
  "Zakat",
  "Hajj",
  "Dua",
  "Hadith",
  "Tafsir",
];

export default function Topics() {
  return (
    <section className=" bg-base-200">
      <h2 className="text-3xl font-bold pt-4 mb-6 text-center ">Islamic Topics</h2>

      <div className=" bg-white/1   backdrop-blur-md p-6 md:p-10 rounded-xl border border-white/20 w-full  
      
      grid 
        grid-cols-3
        sm:grid-cols-4
        lg:grid-cols-5 gap-4">
        {topics.map((t, i) => (
          <div key={i} className="card hover-3d p-4 border-2  border-white/30 text-center bg-base-100">
            <h3 className="font-semibold">{t}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}