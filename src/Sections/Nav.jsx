
import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { FaMoon, FaBars, FaTimes } from "react-icons/fa";
import InstallApp from "../components/InstallApp";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Apps", to: "apps" },
    { name: "Resources", to: "resources" },
    { name: "Topics", to: "topics" },
    { name: "Scholars", to: "scholars" },
    { name: "Channels", to: "channels" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  const scrollToHome = (event) => {
    event.preventDefault();
    document.getElementById("home")?.scrollIntoView({
      behavior: "smooth",
    });
    setMenuOpen(false);
  };

  const navLinkClass =
    "cursor-pointer whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-emerald-400/10 hover:text-emerald-300";

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/[0.08] bg-[#081b22]/95 text-white shadow-lg shadow-black/10 backdrop-blur-xl">
      <nav className="navbar mx-auto min-h-[64px] max-w-7xl px-3 sm:min-h-[72px] sm:px-6 lg:px-8">
        {/* Logo and Mobile Menu */}
        <div className="navbar-start min-w-0 gap-1">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="btn btn-ghost btn-circle mr-1 text-slate-200 hover:bg-emerald-400/10 hover:text-emerald-300 lg:hidden"
          >
            {menuOpen ? (
              <FaTimes className="text-lg" />
            ) : (
              <FaBars className="text-lg" />
            )}
          </button>

          <a
            href="#home"
            onClick={scrollToHome}
            className="flex min-w-0 items-center gap-2.5"
            aria-label="Hikmah home"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-400/10 text-lg text-emerald-300 sm:h-10 sm:w-10">
              <FaMoon />
            </span>

            <span className="text-lg font-extrabold tracking-[0.12em] sm:text-xl">
              HIK<span className="text-[#d6aa62]">MAH</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  smooth
                  duration={500}
                  offset={-75}
                  spy
                  activeClass="!bg-emerald-400/10 !text-emerald-300"
                  className={navLinkClass}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Install App */}
        <div className="navbar-end min-w-0 gap-1">
          <InstallApp />
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-white/[0.08] bg-[#0b2028] transition-all duration-300 ease-in-out lg:hidden ${
          menuOpen
            ? "max-h-[calc(100dvh-64px)] overflow-y-auto opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-3 py-3 sm:px-6 sm:py-4">
          {navItems.map((item, index) => (
            <li key={item.to}>
              <Link
                to={item.to}
                smooth
                duration={500}
                offset={-75}
                onClick={handleLinkClick}
                tabIndex={menuOpen ? 0 : -1}
                className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-emerald-300/10 hover:bg-emerald-400/[0.07] hover:text-emerald-300"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.04] text-xs font-semibold text-[#d6aa62]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="border-t border-white/[0.07] px-4 py-4 text-center text-xs text-slate-500">
          <span className="font-semibold text-slate-300">HIK</span>
          <span className="font-semibold text-[#d6aa62]">MAH</span>
          <span className="mx-2 text-slate-600">•</span>
          জ্ঞানের ঠিকানা
        </div>
      </div>
    </header>
  );
};

export default Nav;
