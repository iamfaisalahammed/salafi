import { Link } from "react-scroll";

const Nav = () => {
  const link = (
    <>
      <Link
        to="apps"
        smooth={true}
        duration={500}
        className="cursor-pointer font-semibold hover:text-gray-300"
      >
        Apps
      </Link>
      <Link
        to="resources"
        smooth={true}
        duration={500}
        className="cursor-pointer font-semibold hover:text-gray-300"
      >
        Resources
      </Link>

      <Link
        to="topics"
        smooth={true}
        duration={500}
        className="cursor-pointer font-semibold hover:text-gray-300"
      >
        Topics
      </Link>
      <Link
        to="scholars"
        smooth={true}
        duration={500}
        className="cursor-pointer font-semibold hover:text-gray-300"
      >
        Scholars
      </Link>
      <Link
        to="channels"
        smooth={true}
        duration={500}
        className="cursor-pointer font-semibold hover:text-gray-300"
      >
        Channels
      </Link>
    </>
  );

  return (
    <div>
      {/* Navbar */}
      <div className="navbar fixed top-0 left-0 w-full bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-white lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content gap-y-3  bg-white/10 backdrop-blur-lg text-white rounded-box z-50 mt-3 w-52 p-2 shadow-lg border border-white/20"
            >
              {link}
            </ul>
          </div>
          <h3
            className="text-2xl text-white font-bold flex items-center justify-center gap-2"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            HIKMAH
          </h3>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white gap-6">{link}</ul>
        </div>
        <div className="navbar-end">
          {/* Dark/Light */}
          🌙
        </div>
      </div>
    </div>
  );
};

export default Nav;
