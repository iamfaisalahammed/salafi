
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
    "cursor-pointer whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-emerald-50 hover:text-emerald-800";

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-100 bg-white/95 text-gray-900 shadow-sm backdrop-blur-lg">
      <nav className="navbar mx-auto min-h-[68px] max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Logo and Mobile Menu */}
        <div className="navbar-start gap-1">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="btn btn-ghost btn-circle text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 lg:hidden"
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
            className="flex items-center gap-2"
            aria-label="Hikmah home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-lg text-white">
              <FaMoon />
            </span>

            <span className="text-xl font-extrabold tracking-[0.12em] sm:text-2xl">
              HIK<span className="text-emerald-700">MAH</span>
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
                  activeClass="!bg-emerald-50 !text-emerald-800"
                  className={navLinkClass}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Install App */}
        <div className="navbar-end">
          <InstallApp />
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 lg:hidden ${
          menuOpen
            ? "max-h-[calc(100dvh-68px)] overflow-y-auto opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-8">
          {navItems.map((item, index) => (
            <li key={item.to}>
              <Link
                to={item.to}
                smooth
                duration={500}
                offset={-75}
                onClick={handleLinkClick}
                tabIndex={menuOpen ? 0 : -1}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-800"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-xs font-semibold text-emerald-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-100 px-5 py-3 text-center text-xs text-gray-400">
          Hikmah — জ্ঞানের ঠিকানা
        </div>
      </div>
    </header>
  );
};

export default Nav;
