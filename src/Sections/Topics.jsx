import { Link } from "react-router-dom";

const topics = [
  {
    title: "Iman & Aqeedah",
    path: "/topics/iman-aqeedah",
  },
  {
    title: "Pillars of Islam",
    path: "/topics/pillars-of-islam",
  },
  {
    title: "Quran & Tafsir",
    path: "/topics/quran-tafsir",
  },
  {
    title: "Hadith & Sunnah",
    path: "/topics/hadith-sunnah",
  },
  {
    title: "Seerah & History",
    path: "/topics/seerah-history",
  },
  {
    title: "Why Islam?",
    path: "/topics/why-islam",
  },
];


export default function Topics() {
  return (
    <section className="bg-gradient-to-b from-black via-green-950 to-slate-950 text-white py-20 px-4">

      <h2 className="text-4xl font-bold text-center mb-10">
        Islamic Topics
      </h2>


      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">

        {topics.map((topic) => (

          <Link
            key={topic.path}
            to={topic.path}
            className="
              p-6
              rounded-2xl
              border
              shadow-md
              text-center
              hover:-translate-y-2
              hover:bg-white/10
              transition
              duration-300
              cursor-pointer
            "
          >

            <h3 className="font-semibold text-lg">
              {topic.title}
            </h3>

          </Link>

        ))}

      </div>

    </section>
  );
}