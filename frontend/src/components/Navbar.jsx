import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Disable both vertical & horizontal scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
  }, [isOpen]);

  const menuItems = [
    "Home",
    "Services",
    "Industries",
    "Portfolio",
    "Team",
    "Testimonials",
    "About",
    "Careers",
    "Contact",
  ];

  const linkClasses =
    "hover:text-purple-400 font-semibold transition duration-200";

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center border-b border-gray-800 sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Flitcode" className="h-12 w-auto" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-8 items-center">
        {menuItems.map((item) => (
          <li key={item}>
            <Link
              to={`/${item === "Home" ? "" : item.toLowerCase()}`}
              className={linkClasses}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop Button */}
      <div className="hidden md:block">
        <Link to="/contact">
          <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 px-5 rounded-full font-semibold shadow-md hover:shadow-purple-500/50 hover:scale-105 transition">
            Get Demo
          </button>
        </Link>
      </div>

      {/* Hamburger Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden text-3xl focus:outline-none z-50 relative"
      >
        ☰
      </button>

      {/* Overlay + Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="fixed top-0 right-0 w-[80%] sm:w-[65%] h-screen bg-gray-900 z-50 flex flex-col items-center justify-center space-y-8 p-6 overflow-hidden"
            >
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 text-white text-3xl hover:rotate-90 transition-transform"
                onClick={() => setIsOpen(false)}
              >
                <FaTimes />
              </button>

              {/* Animated Links */}
              {menuItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.3 }}
                >
                  <Link
                    to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium tracking-wide ${linkClasses}`}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}

              {/* Get Demo Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  <button className="mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 px-6 rounded-full text-lg font-semibold shadow-lg hover:scale-110 transition">
                    Get Demo
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
