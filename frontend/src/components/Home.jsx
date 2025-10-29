import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Services from './Services';
import AboutUs from './AboutUs';
import Industries from './Industries';
import Team from './Team';
import Portfolio from './Portfolio';
import Testimonials from './Testimonials';
import Careers from './Careers';
import ContactUs from './ContactUs';
import { FaMobileAlt, FaLaptopCode, FaPalette, FaGamepad, FaCode, FaRegSmile, FaRegLightbulb, FaRegHandshake, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const outerIcons = [
  { icon: <FaLaptopCode size={24} color="#818cf8" />, label: 'Web Dev' },
  { icon: <FaMobileAlt size={24} color="#818cf8" />, label: 'Mobile Apps' },
  { icon: <FaPalette size={24} color="#818cf8" />, label: 'Design' },
  { icon: <FaGamepad size={24} color="#818cf8" />, label: 'Game Dev' },
  { icon: <FaCode size={24} color="#818cf8" />, label: 'Custom Code' },
];

const goals = [
  { text: 'Client Satisfaction', icon: <FaRegHandshake size={20} color="#60a5fa" /> },
  { text: 'Happy Clients', icon: <FaRegSmile size={20} color="#60a5fa" /> },
  { text: 'Innovative Solutions', icon: <FaRegLightbulb size={20} color="#60a5fa" /> },
];

const Home = () => {
  const [radius, setRadius] = useState(180);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setRadius(120);
      } else {
        setRadius(180);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
<>
  <section id="home" className="flex flex-col md:flex-row justify-center md:justify-between items-center min-h-screen bg-gray-900 text-gray-200 px-6 md:px-12 py-8 md:py-12 border-b-0 md:border-b-4 md:border-gray-700">
      
      {/* Left Content */}
      <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left mb-10 md:mb-0">
        <span className="bg-gray-800 shadow-md px-4 py-1 rounded-full text-gray-400 font-semibold mb-4 md:mb-6 flex items-center gap-2 text-sm md:text-base border border-gray-700">
          <span className="text-yellow-400 text-base md:text-lg">★</span> Powered by Sketchcode
        </span>
        <h1 className="text-3xl md:text-6xl font-extrabold leading-tight mb-4 text-gray-50">
          Build Beautiful Websites & Apps
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">That Grow Your Business</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-lg mb-6 md:mb-8 px-4 md:px-0">
          We design and build high-quality websites, mobile applications, and digital products —
          from brand-forward UI/UX to robust backend systems and e‑commerce platforms.
          Fast delivery, reliable maintenance, and real results.
        </p>

        {/* Service Tags (updated to match JustGeTech content) */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 mb-6 md:mb-8">
          {[
            'Web Development',
            'App Development',
            'UI/UX & Web Design',
            'E‑commerce',
            'Custom Software',
            'Maintenance & Support'
          ].map((label, i) => (
            <span 
              key={i}
              className="bg-gray-800 shadow-md px-3 py-2 rounded-full flex items-center gap-2 text-blue-400 font-medium text-sm md:text-base hover:scale-105 transition-transform duration-200 border border-gray-700"
            >
              {label}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 mb-8 md:mb-10">
          <a href="/contact">
            <button className="flex items-center  gap-2 bg-white text-blue-600 font-semibold px-5 md:px-6 py-2.5 md:py-3 rounded-full shadow transition transform hover:scale-105 text-sm md:text-base">
              Get a Free Demo
            </button>
          </a>
          <a href="/contact">
            <button className="bg-gray-800 hover:bg-gray-700 text-blue-400 font-semibold px-5 md:px-6 py-2.5 md:py-3 rounded-full shadow border border-blue-400 transition transform hover:scale-105 text-sm md:text-base">
              Schedule a Call
            </button>
          </a>
        </div>

        {/* Goals */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
          <span className="text-2xl md:text-4xl font-extrabold text-blue-400 tracking-wide font-poppins animate-pulse-fast">
            Our Goals:
          </span>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
            {goals.map((goal, index) => (
              <span 
                key={index} 
                className="bg-gray-800 shadow-md px-4 py-3 rounded-full flex items-center gap-2 text-blue-400 font-semibold text-sm md:text-base hover:scale-105 transition-transform duration-200 border border-gray-700"
              >
                {goal.icon} {goal.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Circle */}
      <div className="flex-1 flex justify-center items-center mt-10 md:mt-[-1] relative md:ml-2 ">
        <div className="relative w-[220px] md:w-[340px] h-[220px] md:h-[340px] flex items-center justify-center">
          {/* Gradient Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-[220px] md:w-[340px] h-[220px] md:h-[340px] rounded-full p-4 md:p-6 flex items-center justify-center"
              style={{ background: 'conic-gradient(#3b82f6, #818cf8 80%, #3b82f6 100%)' }}
            >
              <div className="w-[180px] md:w-[304px] h-[180px] md:h-[304px] rounded-full bg-gray-800 flex flex-col items-center justify-center shadow-xl border border-gray-700 p-4">
                <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  SketchCode
                </h1>
                <FaCode size={56} className="md:w-[72px] md:h-[72px] mt-4 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Outer Icons */}
          <div className="absolute left-[40%] top-[45%] -translate-x-1/2 -translate-y-1/2 w-full h-full">
            {outerIcons.map((item, i) => {
              const angle = (i * 360) / outerIcons.length;
              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ transform: `rotate(${angle}deg) translateY(-${radius}px)` }}
                >
                  <div 
                    className="bg-gray-800 rounded-full shadow-xl flex items-center justify-center w-12 h-12 md:w-16 md:h-16 spin-slow-icon border border-gray-700"
                    style={{ transform: `rotate(-${angle}deg)` }}
                  >
                    {item.icon}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .spin-slow-icon {
            animation: spin 6s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes pulse-fast {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .animate-pulse-fast {
            animation: pulse-fast 1.5s ease-in-out infinite;
          }
        `}
      </style>
    </section>

  {/* Page sections rendered on Home (single-page style) - reordered to match navbar */}
  <Services />
  <Industries />
  <Portfolio />
  <Team />
  <Testimonials />
  <AboutUs />
  <Careers />
  <ContactUs />
</>
  );
}

export default Home;
