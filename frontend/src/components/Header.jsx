import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/contact", label: "Contact" },
    { path: "/about", label: "About Us" },
    // { path: "/login", label: "Login" },
  ];

  return (
    <header className="sticky top-0 z-10 right-0 left-0 bg-gray-800 text-white p-4 shadow-md">
      <div className="md:container md:mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-teal-400">
          <Link to="/">Virtual-Zoana</Link>
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 font-medium">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "text-teal-400"
                      : "hover:text-teal-300"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {user ? (
              // <span className="text-teal-400">Hi, {user.username}</span>
              <div className="flex items-center space-x-3">
                <span>Hi, {user.username}</span>
                <button
                  onClick={logout}
                  className="text-sm text-gray-300 hover:text-red-400"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`transition-colors duration-200 ${
                  location.pathname === "/login"
                    ? "text-teal-400"
                    : "hover:text-teal-300"
                }`}
              >
                Login
              </Link>
            )}
          </ul>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-gray-800 shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col p-4 space-y-4 font-medium">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={closeMenu}
                className={`block py-2 px-4 transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-teal-400 bg-gray-700 rounded"
                    : "hover:text-teal-300 hover:bg-gray-700 rounded"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
