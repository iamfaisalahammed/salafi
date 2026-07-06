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
      <h2 className="text-2xl pt-4 mb-6 text-center ">Islamic Topics</h2>

      <div className=" bg-white/10 backdrop-blur-md p-6 md:p-10 rounded-xl border border-white/20 w-full    grid md:grid-cols-5 gap-4">
        {topics.map((t, i) => (
          <div key={i} className="card p-4 text-center bg-base-100">
            <h3 className="font-semibold">{t}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}