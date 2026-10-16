
import { FaHeart, FaMoon, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-emerald-400/15 bg-gradient-to-b from-[#0a2118] to-[#06140e] px-4 py-10 text-white sm:px-6">
      <div className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[90px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.08] text-xl text-emerald-300">
            <FaMoon />
          </div>

          <h2 className="text-2xl font-bold tracking-wide">
            <span className="text-emerald-300">H</span>ikmah
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-400">
            Discover authentic Islamic knowledge and strengthen your
            understanding of Islam.
          </p>
        </div>

        <div className="mx-auto my-7 h-px max-w-2xl bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent" />

        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-gray-500 sm:text-sm">
            © {currentYear} Hikmah. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-xs text-gray-400 sm:text-sm">
            Built with
            <FaHeart className="animate-pulse text-red-400" />
            for the Ummah
            <FaMoon className="ml-1 text-amber-300" />
          </p>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 transition-all duration-300 hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}
