import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaCode } from 'react-icons/fa'

const Footer = () => {
  const handleNavClick = () => {
    // smooth scroll to top on navigation (works together with client-side routing)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 text-gray-200 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" onClick={handleNavClick} className="inline-flex items-center gap-3 mb-4 no-underline">
              <FaCode className="text-blue-400 text-3xl" aria-hidden="true" />
              <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">FlitCode</span>
            </Link>
            <p className="text-sm text-gray-400">Empowering businesses with elegant digital experiences — Web, Mobile & Design.</p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="text-sm font-semibold text-gray-100 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" onClick={handleNavClick} className="text-gray-300 hover:text-blue-400 transition">Home</Link></li>

              <li><Link to="/services" onClick={handleNavClick} className="text-gray-300 hover:text-blue-400 transition">Services</Link></li>
              <li><Link to="/portfolio" onClick={handleNavClick} className="text-gray-300 hover:text-blue-400 transition">Portfolio</Link></li>
              <li><Link to="/team" onClick={handleNavClick} className="text-gray-300 hover:text-blue-400 transition">Team</Link></li>
              <li><Link to="/about" onClick={handleNavClick} className="text-gray-300 hover:text-blue-400 transition">About</Link></li>
              <li><Link to="/careers" onClick={handleNavClick} className="text-gray-300 hover:text-blue-400 transition">Careers</Link></li>
              <li><Link to="/contact" onClick={handleNavClick} className="text-gray-300 hover:text-blue-400 transition">Contact</Link></li>
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-gray-100 mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/services#web" onClick={handleNavClick} className="hover:text-blue-400 transition">Web Development</Link></li>
              <li><Link to="/services#apps" onClick={handleNavClick} className="hover:text-blue-400 transition">Mobile Apps</Link></li>
              <li><Link to="/services#design" onClick={handleNavClick} className="hover:text-blue-400 transition">UI / UX Design</Link></li>
              <li><Link to="/services#custom" onClick={handleNavClick} className="hover:text-blue-400 transition">Custom Solutions</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-semibold text-gray-100 mb-4">Get in touch</h3>
            <p className="text-sm text-gray-300 mb-4">Gujarat, India<br />
              <a className="text-blue-400 hover:underline" href="mailto:flitcode.dev@gmail.com">flitcode.dev@gmail.com</a>
            </p>
            <div className="flex gap-4">
              {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-300 hover:text-blue-400"><FaFacebook /></a> */}
              {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-300 hover:text-blue-400"><FaTwitter /></a> */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-300 hover:text-blue-400"><FaLinkedin /></a>
              <a href="https://www.instagram.com/FlitCode?igsh=ejcxb2Y0MnpnMHlj" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-300 hover:text-blue-400"><FaInstagram /></a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <div className="mb-3 md:mb-0">© {new Date().getFullYear()} <span className="font-semibold text-blue-400">FlitCode</span>. All rights reserved.</div>
          <div className="flex gap-4">
            <Link to="/privacy" onClick={handleNavClick} className="hover:text-blue-400 transition">Privacy</Link>
            <Link to="/terms" onClick={handleNavClick} className="hover:text-blue-400 transition">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
