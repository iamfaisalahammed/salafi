

const Banner = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-b from-black to-white/50 text-white py-28 px-4">
      
      {/* Soft glow background effect */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent)]"></div>

      <div className="relative max-w-4xl mx-auto text-center">
        
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Authentic{" "}
          <span className="text-yellow-300 drop-shadow-md">
            Islamic ilm
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-gray-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
        Learn Islam From Authentic source__All In One Place
        </p>

        {/* Search Box */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <input
            type="text"
            placeholder="Search scholars, topics, lectures..."
            className="input input-bordered w-full sm:w-[420px] text-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <button className="btn btn-warning px-6">
            Search
          </button>
        </div>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="badge badge-outline px-3 py-2 text-sm">Qur’an</span>
          <span className="badge badge-outline px-3 py-2 text-sm">Sunnah</span>
          <span className="badge badge-outline px-3 py-2 text-sm">Scholars</span>
          <span className="badge badge-outline px-3 py-2 text-sm">Lectures</span>
          <span className="badge badge-outline px-3 py-2 text-sm">Fiqh</span>
          <span className="badge badge-outline px-3 py-2 text-sm">Aqeedah</span>
        </div>

      </div>
    </div>
    );
};

export default Banner;

