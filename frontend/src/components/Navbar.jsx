import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCode } from 'react-icons/fa'; // Using an icon instead of an imported logo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Note: Added a new navigation item for TechStack
  const linkClasses = 'text-gray-300 hover:text-purple-400 font-medium transition transform duration-200'; // Adjusted class style to match reference site look

  return (
    <nav className='bg-gray-800 text-white px-6 py-4 flex justify-between items-center border-b-4 border-gray-700 relative'>
      
      {/* Logo/Brand Name - NOW DISPLAYS 'RD' */}
      <div className='flex items-center'>
        <Link to="/home" aria-label="Go to home" className="flex items-center gap-2">
            <FaCode className="text-blue-400 text-3xl" aria-hidden="true" />
            <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">RD</span>
        </Link>
      </div>

      {/* Desktop Menu - Aligned to the center/right */}
      <ul className="hidden md:flex space-x-8">
        <li><Link to="/home" className={`${linkClasses} hover:scale-105`}>Home</Link></li>
        <li><Link to="/about" className={linkClasses}>About Me</Link></li>
        <li><Link to="/techstack" className={linkClasses}>TechStack</Link></li>
        <li><Link to="/portfolio" className={linkClasses}>Portfolio</Link></li>
        <li><Link to="/contact" className={linkClasses}>Contact Me</Link></li>
      </ul>

      {/* Desktop "Let's Connect" Button */}
      <div className="hidden md:block">
        <Link to="/contact">
          <button className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition transform hover:scale-105'>
            Let's Connect
          </button>
        </Link>
      </div>

      {/* Mobile Hamburger Button */}
      {!isOpen && (
        <button 
          className='md:hidden text-white text-3xl focus:outline-none relative z-50' 
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          ☰
        </button>
      )}

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div id="mobile-menu" className='md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 flex flex-col items-center justify-center space-y-6 text-center z-40 transition-all duration-300'>
          
          {/* Close Button */}
          <button 
            className='absolute top-6 right-6 text-white text-3xl focus:outline-none'
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>

          {/* Mobile Links */}
          <Link to="/home" className={linkClasses + ' text-xl'} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" className={linkClasses + ' text-xl'} onClick={() => setIsOpen(false)}>About Me</Link>
          <Link to="/techstack" className={linkClasses + ' text-xl'} onClick={() => setIsOpen(false)}>TechStack</Link>
          <Link to="/portfolio" className={linkClasses + ' text-xl'} onClick={() => setIsOpen(false)}>Portfolio</Link>
          <Link to="/contact" className={linkClasses + ' text-xl'} onClick={() => setIsOpen(false)}>Contact Me</Link>

          {/* Mobile "Let's Connect" Button */}
          <Link to="/contact" onClick={() => setIsOpen(false)}>
            <button className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded text-lg transition transform hover:scale-105'>
              Let's Connect
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;