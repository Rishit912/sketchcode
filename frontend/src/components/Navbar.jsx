import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const linkClasses =
    "hover:text-purple-400 font-semibold transition transform duration-200";

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center border-b border-gray-700 relative z-50">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" aria-label="Go to home">
          <img src={logo} alt="SketchCode logo" className="h-14 w-auto" />
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
        <li><Link to="/" className={`${linkClasses}`}>Home</Link></li>
        <li><Link to="/services" className={linkClasses}>Services</Link></li>
        <li><Link to="/industries" className={linkClasses}>Industries</Link></li>
        <li><Link to="/portfolio" className={linkClasses}>Portfolio</Link></li>
        <li><Link to="/team" className={linkClasses}>Team</Link></li>
        <li><Link to="/testimonials" className={linkClasses}>Testimonials</Link></li>
        <li><Link to="/about" className={linkClasses}>About</Link></li>
        <li><Link to="/careers" className={linkClasses}>Careers</Link></li>
        <li><Link to="/contact" className={linkClasses}>Contact</Link></li>
      </ul>

      {/* Desktop Get Demo Button */}
      <div className="hidden md:block">
        <Link to="/contact">
          <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 px-5 rounded-full font-semibold shadow-lg transition transform hover:scale-105 hover:shadow-purple-500/50">
            Get Demo
          </button>
        </Link>
      </div>

      {/* Mobile Hamburger Button */}
      {!isOpen && (
        <button
          className="md:hidden text-white text-3xl focus:outline-none relative z-50"
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          ☰
        </button>
      )}

      {/* Dark Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-full sm:w-4/5 bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center space-y-6 text-center z-50 transform transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 text-white text-4xl focus:outline-none transition-transform duration-300 hover:rotate-90"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>

        {/* Animated Mobile Links */}
        {[
          "Home",
          "Services",
          "Industries",
          "Portfolio",
          "Team",
          "Testimonials",
          "About",
          "Careers",
          "Contact",
        ].map((item, index) => (
          <Link
            key={item}
            to={`/${item === "Home" ? "" : item.toLowerCase()}`}
            className={`text-2xl ${linkClasses} transition-all transform duration-300 hover:scale-110`}
            style={{
              transitionDelay: `${index * 100}ms`,
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
            }}
            onClick={() => setIsOpen(false)}
          >
            {item}
          </Link>
        ))}

        {/* Mobile Get Demo Button */}
        <Link
          to="/contact"
          onClick={() => setIsOpen(false)}
          style={{ transitionDelay: "900ms" }}
        >
          <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 px-8 rounded-full text-xl font-semibold shadow-lg transition transform hover:scale-110 hover:shadow-purple-500/50">
            Get Demo
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
