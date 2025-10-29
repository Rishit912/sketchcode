import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const linkClasses = 'hover:underline font-semibold text-blue-100 transition transform duration-200';

  return (
    <nav className='bg-gray-800 text-white px-6 py-4 flex justify-between items-center border-b-4 border-gray-700 relative'>
      
      {/* Logo */}
      <div className='flex items-center'>
        <Link to="/" aria-label="Go to home">
          <img src={logo} alt="SketchCode logo" className='h-14 w-auto' />
        </Link>
      </div>

      {/* Desktop Menu */}
        <ul className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
        <li><Link to="/" className={`${linkClasses} hover:scale-105`}>Home</Link></li>
        <li><Link to="/services" className={linkClasses}>Services</Link></li>
        <li><Link to="/industries" className={linkClasses}>Industries</Link></li>
        <li><Link to="/portfolio" className={linkClasses}>Portfolio</Link></li>
        <li><Link to="/team" className={linkClasses}>Team</Link></li>
        <li><Link to="/testimonials" className={linkClasses}>Testimonials</Link></li>
        <li><Link to="/about" className={linkClasses}>About</Link></li>
        <li><Link to="/careers" className={linkClasses}>Careers</Link></li>
        <li><Link to="/contact" className={linkClasses}>Contact</Link></li>
      </ul>

      {/* Desktop "Let's Connect" Button */}
      <div className="hidden md:block">
        <Link to="/contact">
          <button className='bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white py-2 px-5 rounded-full font-semibold shadow-lg transition transform hover:scale-105'>
            Get Demo
          </button>
        </Link>
      </div>

      {/* Mobile Hamburger Button (hidden when menu open) */}
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
          <Link to="/" className={linkClasses + ' text-xl'} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/services" className={linkClasses + ' text-xl'} onClick={() => setIsOpen(false)}>Services</Link>
          <Link to="/industries" className={linkClasses + ' text-xl'} onClick={() => setIsOpen(false)}>Industries</Link>
          <Link to="/portfolio" className={linkClasses + ' text-xl'} onClick={() => setIsOpen(false)}>Portfolio</Link>
          <Link to="/team" className={linkClasses + ' text-xl'} onClick={() => setIsOpen(false)}>Team</Link>
          <Link to="/testimonials" className={linkClasses + ' text-xl'} onClick={() => setIsOpen(false)}>Testimonials</Link>
          <Link to="/about" className={linkClasses + ' text-xl'} onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/careers" className={linkClasses + ' text-xl'} onClick={() => setIsOpen(false)}>Careers</Link>
          <Link to="/contact" className={linkClasses + ' text-xl'} onClick={() => setIsOpen(false)}>Contact</Link>

          {/* Mobile "Let's Connect" Button */}
          <Link to="/contact" onClick={() => setIsOpen(false)}>
            <button className='bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white py-2 px-6 rounded-full text-lg font-semibold shadow-lg transition transform hover:scale-105'>
              Get Demo
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
