
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pan = sessionStorage.getItem("auth")?.replace(/"/g, "").trim();
  const navigate = useNavigate();
  const auth = sessionStorage.getItem("auth");

  const handleLogout = () => {
    sessionStorage.removeItem('auth')
    sessionStorage.removeItem('token')
    navigate('/login')
  }

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Top Mutual Funds", path: "/latest-funds-list" },
    { name: "NFO List", path: "/nfo-list" },
    { name: "Startup Sip", path: "/mutual-funds/mandate-registration" },
    { name: "Portfolio", path: "/mutual-funds/mutual-top" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 pt-5 bg-black/70 text-gray-100 px-6 py-4 shadow-md transition-transform duration-300`}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="cursor-pointer flex flex-col items-start">
          <span className="text-3xl font-bold font-roboto">
            <span className="text-blue-600 font-extrabold">Open</span>
            <span className="text-green-500 font-extrabold">FinServ</span>
          </span>
          <span className="text-xs font-semibold pl-1 text-white mt-1 font-roboto">
            SIP.MUTUALFUNDS
          </span>
        </Link>

        {/* Right side: Menu + Icons */}
        <div className="flex items-center gap-6">
          {/* Desktop Menu */}
          <ul className="hidden xl:flex gap-6">
            {menuItems.map((page, idx) => (
              <li key={idx} className="relative group">
                <Link
                  to={page.path}
                  className="block font-roboto font-semibold text-white text-lg transition-transform duration-200 transform group-hover:-translate-y-1"
                >
                  {page.name}
                  <span className="absolute left-0 -bottom-2 w-0 h-0.5 bg-linear-to-r from-green-500 to-blue-500 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Login/Signup Icons */}
          {!auth ? (
            <div className="hidden xl:flex gap-4 items-center">
              <Link
                to="/login"
                className="px-6 py-3  bg-zinc-900 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transform hover:scale-115 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/sheet"
                className="px-6 py-3  bg-zinc-900 text-white font-semibold rounded-full shadow-lg hover:from-green-500 hover:to-green-700 transform hover:scale-115 transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="hidden xl:flex gap-4 items-center">
              <Link
                to="/login"
                onClick={handleLogout}
                className="px-6 py-3  bg-zinc-900 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transform hover:scale-115 transition-all duration-300"
              >
                Logout
              </Link>
              {pan === "BTFPK2149R" ? (
                <Link
                  to="/admin-panel"
                  className="px-6 py-3 bg-zinc-900 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Admin Panel
                </Link>
              ) : (
                <Link
                  to="/profile"
                  className="px-6 py-3 bg-zinc-900 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Profile
                </Link>
              )}
            </div>
          )}

          {/* Hamburger Menu for mobile */}
          <button
            className="xl:hidden text-2xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 flex flex-col gap-4 xl:hidden bg-black/80 p-4 rounded-md">
          <ul className="flex flex-col gap-4 px-2">
            {menuItems.map((page, idx) => (
              <li key={idx} className="relative group">
                <Link
                  to={page.path}
                  className="block font-roboto font-medium text-gray-100 text-sm transition-transform duration-200 transform group-hover:-translate-y-1"
                >
                  {page.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-500 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Login/Signup */}
          <div className="flex gap-4 justify-center mt-2">
            <Link
              to="/login"
              className="px-6 py-3  bg-zinc-900 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transform hover:scale-115 transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-3  bg-zinc-900 text-white font-semibold rounded-full shadow-lg hover:from-green-500 hover:to-green-700 transform hover:scale-115 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}


    </nav>
  );
}

export default Navbar;