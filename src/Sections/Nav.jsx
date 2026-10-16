
import { useState } from "react";
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

  const navLinkClass =
    "cursor-pointer whitespace-nowrap text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-emerald-300";

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-emerald-400/15 bg-[#071810]/85 text-white shadow-lg shadow-black/10 backdrop-blur-xl">
      <nav className="navbar mx-auto min-h-[72px] max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Logo and mobile menu */}
        <div className="navbar-start gap-1">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="btn btn-ghost btn-circle text-gray-300 hover:bg-emerald-400/10 hover:text-emerald-300 lg:hidden"
          >
            {menuOpen ? (
              <FaTimes className="text-lg" />
            ) : (
              <FaBars className="text-lg" />
            )}
          </button>

          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("home")?.scrollIntoView({
                behavior: "smooth",
              });
              setMenuOpen(false);
            }}
            className="flex items-center gap-2"
            aria-label="Hikmah home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-lg text-emerald-300">
              <FaMoon />
            </span>

            <span className="text-xl font-extrabold tracking-[0.15em] sm:text-2xl">
              HIK<span className="text-emerald-300">MAH</span>
            </span>
          </a>
        </div>

        {/* Desktop navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  smooth={true}
                  duration={500}
                  offset={-75}
                  spy={true}
                  activeClass="!text-emerald-300"
                  className={navLinkClass}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Install app */}
        <div className="navbar-end">
          <InstallApp />
        </div>
      </nav>

      {/* Mobile navigation */}
      <div
        className={`overflow-hidden border-t border-emerald-400/10 bg-[#071810]/95 transition-all duration-300 lg:hidden ${
          menuOpen
            ? "max-h-96 opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-3 sm:px-8">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                smooth={true}
                duration={500}
                offset={-75}
                onClick={handleLinkClick}
                className="block cursor-pointer rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition-colors duration-200 hover:bg-emerald-400/10 hover:text-emerald-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Nav;
