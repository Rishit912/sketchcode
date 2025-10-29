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
import { FaMobileAlt, FaLaptopCode, FaPalette, FaGamepad, FaCode, FaRegSmile, FaRegLightbulb, FaRegHandshake, FaArrowLeft, FaArrowRight, FaUser, FaComments, FaChartBar, FaCog, FaEnvelope } from 'react-icons/fa';

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
  <section id="home" className="relative z-10 flex flex-col md:flex-row justify-center md:justify-between items-center min-h-screen text-gray-200 px-6 md:px-12 py-8 md:py-12 border-b-0 md:border-b-4 md:border-gray-700">      
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

      {/* Animated Isometric Scene */}
      <div className="flex-1 flex justify-center items-center mt-10 md:mt-0 relative md:ml-2">
        <div className="relative w-[300px] md:w-[500px] h-[300px] md:h-[500px] perspective-1000">
          {/* Main Device Frame */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-64 md:h-80 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 transform rotate-y-45 rotate-x-10 animate-float">
            {/* Screen Content */}
            <div className="absolute inset-2 bg-blue-900/30 rounded-lg overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
              <div className="p-4">
                <FaUser className="text-blue-400 text-2xl md:text-3xl mb-3 animate-pulse" />
                <div className="h-2 bg-blue-400/30 rounded-full w-3/4 mb-2 animate-pulse"></div>
                <div className="h-2 bg-blue-400/30 rounded-full w-1/2 animate-pulse"></div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -right-16 -top-8 animate-float-delayed">
              <div className="bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-700">
                <FaChartBar className="text-blue-400 text-xl" />
              </div>
            </div>

            <div className="absolute -left-12 top-1/4 animate-float-slow">
              <div className="bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-700">
                <FaComments className="text-purple-400 text-xl" />
              </div>
            </div>

            {/* Connecting Lines */}
            <div className="absolute -right-24 top-1/3 w-24 h-px bg-gradient-to-r from-blue-500 to-transparent animate-expand"></div>
            <div className="absolute -left-20 top-1/2 w-20 h-px bg-gradient-to-l from-purple-500 to-transparent animate-expand-delayed"></div>

            {/* Floating Data Elements */}
            <div className="absolute -right-32 top-1/3 animate-float-fast">
              <div className="bg-gray-800 p-2 rounded-lg shadow-xl border border-gray-700">
                <div className="h-2 w-16 bg-blue-400/30 rounded-full"></div>
                <div className="h-2 w-12 bg-blue-400/30 rounded-full mt-1"></div>
              </div>
            </div>

            <div className="absolute -left-28 bottom-1/4 animate-float-medium">
              <div className="bg-gray-800 p-2 rounded-lg shadow-xl border border-gray-700">
                <FaCog className="text-purple-400 text-xl animate-spin-slow" />
              </div>
            </div>

            {/* Additional Interactive Elements */}
            <div className="absolute -right-12 bottom-1/4 animate-bounce-slow">
              <div className="bg-gray-800 p-3 rounded-full shadow-xl border border-gray-700">
                <FaEnvelope className="text-blue-400 text-xl" />
              </div>
            </div>
          </div>

          {/* Background Grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .perspective-1000 {
            perspective: 1000px;
          }
          .rotate-y-45 {
            transform: rotateY(45deg);
          }
          .rotate-x-10 {
            transform: rotateX(10deg);
          }
          @keyframes float {
            0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotateY(45deg) rotateX(10deg); }
            50% { transform: translate(-50%, -50%) translateY(-10px) rotateY(45deg) rotateX(10deg); }
          }
          @keyframes floatSlow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          @keyframes floatFast {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          @keyframes floatMedium {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
          @keyframes expand {
            0% { transform: scaleX(0); opacity: 0; }
            100% { transform: scaleX(1); opacity: 1; }
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-slow {
            animation: floatSlow 7s ease-in-out infinite;
          }
          .animate-float-fast {
            animation: floatFast 4s ease-in-out infinite;
          }
          .animate-float-medium {
            animation: floatMedium 5s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: floatSlow 6s ease-in-out infinite 1s;
          }
          .animate-expand {
            animation: expand 2s ease-out infinite alternate;
          }
          .animate-expand-delayed {
            animation: expand 2s ease-out infinite alternate 1s;
          }
          .animate-bounce-slow {
            animation: bounce-slow 3s ease-in-out infinite;
          }
          .animate-spin-slow {
            animation: spin 8s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .bg-grid-pattern {
            background-image: linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
          }
        `}
      </style>
    </section>

  {/* Page sections rendered on Home (single-page style) - reordered to match navbar */}
  <Industries />
  <AboutUs />
  <Careers />
  <ContactUs />
</>
  );
}

export default Home;
