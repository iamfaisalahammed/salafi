import { useState } from "react";

const scholars = [
  { name: "Mufti Menk", bio: "Practical reminders for daily life", lang: "English", initials: "MM" },
  { name: "Yasir Qadhi", bio: "Seerah & Aqeedah scholar", lang: "English", initials: "YQ" },
  { name: "Omar Suleiman", bio: "Heart touching reminders", lang: "English", initials: "OS" },
];

export default function Scholars() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="p-10">
        
      <div className="grid md:grid-cols-4 gap-4">
        {scholars.map((s, i) => (
          <div
            key={i}
            className="card bg-base-100 p-4 text-center cursor-pointer"
            onClick={() => setSelected(s)}
          >
            <div className="w-16 h-16 mx-auto bg-white/80 text-white rounded-full flex items-center justify-center">
              {s.initials}
            </div>
            <h3 className="font-bold mt-2">{s.name}</h3>
            <p className="text-sm opacity-70">{s.bio}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{selected.name}</h3>
            <p className="py-4">{selected.bio}</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setSelected(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}