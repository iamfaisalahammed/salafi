const topics = [
  "Iman & Aqeedah",
  "Pillars of Islam",
  "Quran & Tafsir",
  "Hadith & Sunnah",
  "Seerah & History",
  "Why Islam?",
];

export default function Topics() {
  return (
    <section className=" bg-gradient-to-b from-black via-green-950 to-slate-950 text-white py-20 px-4 bg-base-200">

      <h2 className="text-4xl font-bold text-center mb-10">
        Islamic Topics
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">

        {topics.map((topic, index) => (
          <div
            key={index}
            className="
              p-6 
              rounded-2xl
             
              border
              shadow-md
              text-center
              hover:-translate-y-2
              transition
              duration-300
            "
          >
            <h3 className="font-semibold text-lg">
              {topic}
            </h3>
          </div>
        ))}

      </div>

    </section>
  );
}