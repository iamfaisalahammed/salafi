
import { Link } from "react-router-dom";
import { FaMoon, FaHome, FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#06140e] via-[#0a2118] to-[#07131b] px-4 py-16 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-amber-400/[0.07] blur-[100px]" />

      <div className="relative w-full max-w-xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.08] shadow-lg shadow-emerald-950/20">
          <FaMoon className="text-3xl text-emerald-300" />
        </div>

        {/* 404 */}
        <h1 className="bg-gradient-to-r from-emerald-300 via-green-200 to-amber-300 bg-clip-text text-8xl font-extrabold tracking-tight text-transparent sm:text-9xl">
          404
        </h1>

        <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-400 to-amber-400" />

        <h2 className="mt-7 text-2xl font-bold sm:text-3xl">
          Page Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-400 sm:text-base">
          The page you are looking for may have been moved, removed, or is
          temporarily unavailable. Let's guide you back to Hikmah.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-[#06140e] shadow-lg shadow-emerald-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            <FaHome />
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-gray-200 transition-all duration-300 hover:border-emerald-400/30 hover:bg-emerald-400/[0.08] hover:text-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>

        <p className="mt-12 text-xs tracking-widest text-gray-500">
          <span className="text-emerald-400">HIKMAH</span>
          {" "}· KNOWLEDGE FOR THE UMMAH
        </p>
      </div>
    </main>
  );
};

export default NotFound;
