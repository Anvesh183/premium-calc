import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHealthDropdownOpen, setIsHealthDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsHealthDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsHealthDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      isActive
        ? "text-teal-500 font-semibold"
        : "text-gray-500 hover:text-teal-500"
    }`;

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" onClick={closeAllMenus} className="flex-shrink-0">
              <img
                src="/quote-assist.png"
                alt="Quote Assist Logo"
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/fire-insurance" className={navLinkClasses}>
                Fire Insurance
              </NavLink>
              <NavLink to="/gipsa-gmc" className={navLinkClasses}>
                GIPSA GMC
              </NavLink>
              <NavLink to="/travel-insurance" className={navLinkClasses}>
                Travel Insurance
              </NavLink>

              {/* Health Insurance Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsHealthDropdownOpen(!isHealthDropdownOpen)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-teal-500 focus:outline-none flex items-center"
                >
                  Health Insurance
                  <svg
                    className="ml-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isHealthDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <NavLink
                        to="/floater-mediclaim"
                        onClick={() => setIsHealthDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Floater Mediclaim
                      </NavLink>
                      <NavLink
                        to="/new-india-mediclaim"
                        onClick={() => setIsHealthDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        New India Mediclaim
                      </NavLink>
                      <NavLink
                        to="/yuva-bharat"
                        onClick={() => setIsHealthDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Yuva Bharat Policy
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/fire-insurance"
              onClick={closeAllMenus}
              className={navLinkClasses}
            >
              Fire Insurance
            </NavLink>
            <NavLink
              to="/gipsa-gmc"
              onClick={closeAllMenus}
              className={navLinkClasses}
            >
              GIPSA GMC
            </NavLink>
            <NavLink
              to="/travel-insurance"
              onClick={closeAllMenus}
              className={navLinkClasses}
            >
              Travel Insurance
            </NavLink>
            <h3 className="px-3 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Health Insurance
            </h3>
            <NavLink
              to="/floater-mediclaim"
              onClick={closeAllMenus}
              className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 border-transparent"
            >
              Floater Mediclaim
            </NavLink>
            <NavLink
              to="/new-india-mediclaim"
              onClick={closeAllMenus}
              className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 border-transparent"
            >
              New India Mediclaim
            </NavLink>
            <NavLink
              to="/yuva-bharat"
              onClick={closeAllMenus}
              className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 border-transparent"
            >
              Yuva Bharat Policy
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
