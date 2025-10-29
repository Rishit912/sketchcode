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
import AnimateOnScroll from './AnimateOnScroll'; // ADDED

import {
  FaMobileAlt,
  FaPalette,
  FaCode,
  FaRegSmile,
  FaRegLightbulb,
  FaRegHandshake,
  FaArrowLeft,
  FaArrowRight,
  FaUser,
  FaComments,
  FaChartBar,
  FaCog,
  FaEnvelope,
  FaCloud, // New: for cloud services/deployment
  FaServer, // New: for backend/server
  FaCodeBranch, // New: for version control/development
  FaDesktop, // New: for web/desktop development
} from 'react-icons/fa';

const outerIcons = [
  { icon: <FaDesktop size={24} color="#818cf8" />, label: 'Web Dev' },
  { icon: <FaMobileAlt size={24} color="#818cf8" />, label: 'Mobile Apps' },
  { icon: <FaPalette size={24} color="#818cf8" />, label: 'UI/UX Design' },
  { icon: <FaCodeBranch size={24} color="#818cf8" />, label: 'Custom Dev' },
  { icon: <FaCloud size={24} color="#818cf8" />, label: 'Cloud Solutions' },
];

const goals = [
  { text: 'Client Satisfaction', icon: <FaRegHandshake size={20} color="#60a5fa" /> },
  { text: 'Innovative Solutions', icon: <FaRegLightbulb size={20} color="#60a5fa" /> },
  { text: 'Happy Clients', icon: <FaRegSmile size={20} color="#60a5fa" /> },
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
      {/* WRAP THE MAIN SECTION with the animation component */}
      {/* Setting duration to 1500ms for a slower, smoother hero entrance */}
      <AnimateOnScroll duration="duration-1000"> 
        <section 
          id="home" 
          // Added required z-index and opaque background for visibility over fixed background animation
          className="relative z-10 bg-gray-900/95 flex flex-col md:flex-row justify-center md:justify-between items-center min-h-screen text-gray-200 px-6 md:px-12 py-8 md:py-12 border-b-0 md:border-b-4 md:border-gray-700 overflow-hidden"
        >
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

            {/* Service Tags */}
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
              <Link to="/contact"> {/* Using Link for internal navigation */}
                <button className="flex items-center gap-2 bg-white text-blue-600 font-semibold px-5 md:px-6 py-2.5 md:py-3 rounded-full shadow transition transform hover:scale-105 text-sm md:text-base">
                  Get a Free Demo
                </button>
              </Link>
              <Link to="/contact"> {/* Using Link for internal navigation */}
                <button className="bg-gray-800 hover:bg-gray-700 text-blue-400 font-semibold px-5 md:px-6 py-2.5 md:py-3 rounded-full shadow border border-blue-400 transition transform hover:scale-105 text-sm md:text-base">
                  Schedule a Call
                </button>
              </Link>
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

          {/* Animated Isometric Scene - Enhanced */}
          <div className="flex-1 flex justify-center items-center mt-10 md:mt-0 relative md:ml-2">
            <div className="relative w-[300px] md:w-[500px] h-[300px] md:h-[500px] perspective-1000">
              {/* Main Device Frame */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-64 md:h-80 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 transform rotate-y-45 rotate-x-10 animate-float">
                {/* Screen Content - Company Info */}
                <div className="absolute inset-2 bg-blue-900/30 rounded-lg overflow-hidden backdrop-blur-sm p-4 flex flex-col justify-between">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                  <div className="relative z-10 text-center">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-50 mb-1 animate-pulse-light">Sketchcode</h3> {/* Your Company Name */}
                    <p className="text-xs md:text-sm text-blue-200 mb-3">Crafting Digital Excellence</p> {/* Your Tagline */}
                    <div className="bg-blue-600/50 h-1.5 w-3/4 mx-auto rounded-full mb-2 animate-pulse-slow"></div>
                    <div className="bg-purple-600/50 h-1.5 w-1/2 mx-auto rounded-full animate-pulse-slow delay-300"></div>
                  </div>
                  <div className="relative z-10 text-center">
                    <button className="bg-white text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold shadow-md hover:scale-105 transition-transform transform-gpu animate-fade-in-up">
                      Client Portal
                    </button>
                  </div>
                </div>

                {/* Floating Elements (more relevant to dev services) */}
                <div className="absolute -right-16 -top-8 animate-float-delayed rotate-z-5">
                  <div className="bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-700">
                    <FaCodeBranch className="text-blue-400 text-xl" /> {/* Represents code/version control */}
                  </div>
                </div>

                <div className="absolute -left-12 top-1/4 animate-float-slow rotate-z--5">
                  <div className="bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-700">
                    <FaCloud className="text-purple-400 text-xl" /> {/* Represents cloud deployment */}
                  </div>
                </div>

                {/* Connecting Lines */}
                <div className="absolute -right-24 top-1/3 w-24 h-px bg-gradient-to-r from-blue-500 to-transparent animate-expand"></div>
                <div className="absolute -left-20 top-1/2 w-20 h-px bg-gradient-to-l from-purple-500 to-transparent animate-expand-delayed"></div>

                {/* Floating Data/Process Elements */}
                <div className="absolute -right-32 top-1/3 animate-float-fast rotate-z-3">
                  <div className="bg-gray-800 p-2 rounded-lg shadow-xl border border-gray-700">
                    <div className="h-2 w-16 bg-blue-400/30 rounded-full"></div>
                    <div className="h-2 w-12 bg-blue-400/30 rounded-full mt-1"></div>
                  </div>
                </div>

                <div className="absolute -left-28 bottom-1/4 animate-float-medium rotate-z--7">
                  <div className="bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-700">
                    <FaServer className="text-purple-400 text-xl animate-spin-slow" /> {/* Represents backend */}
                  </div>
                </div>

                {/* Additional Interactive Elements */}
                <div className="absolute -right-12 bottom-1/4 animate-bounce-slow">
                  <div className="bg-gray-800 p-3 rounded-full shadow-xl border border-gray-700">
                    <FaDesktop className="text-blue-400 text-xl" /> {/* Represents web/desktop */}
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

              /* Main Device Float Animation */
              @keyframes float {
                0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotateY(45deg) rotateX(10deg); }
                50% { transform: translate(-50%, -50%) translateY(-10px) rotateY(45deg) rotateX(10deg); }
              }
              .animate-float {
                animation: float 6s ease-in-out infinite;
              }

              /* Floating Elements Animation */
              @keyframes floatSlow {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-15px) rotate(5deg); }
              }
              @keyframes floatFast {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-8px) rotate(-5deg); }
              }
              @keyframes floatMedium {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-12px) rotate(3deg); }
              }
              @keyframes bounce-slow {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }

              .animate-float-slow { animation: floatSlow 7s ease-in-out infinite; }
              .animate-float-fast { animation: floatFast 4s ease-in-out infinite; }
              .animate-float-medium { animation: floatMedium 5s ease-in-out infinite; }
              .animate-float-delayed { animation: floatSlow 6s ease-in-out infinite 1s; } /* slightly delayed start */
              .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }

              /* Line Expand Animation */
              @keyframes expand {
                0% { transform: scaleX(0); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: scaleX(1); opacity: 0.7; }
              }
              .animate-expand { animation: expand 2.5s ease-out infinite alternate; }
              .animate-expand-delayed { animation: expand 2.5s ease-out infinite alternate 1s; }

              /* Spin Animation */
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              .animate-spin-slow { animation: spin 10s linear infinite; } /* slower spin */

              /* Pulse for text on screen */
              @keyframes pulse-light {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.8; }
              }
              .animate-pulse-light { animation: pulse-light 3s ease-in-out infinite; }
              .animate-pulse-slow { animation: pulse-light 2s ease-in-out infinite; }

              /* Fade In Up for Button */
              @keyframes fade-in-up {
                0% { opacity: 0; transform: translateY(10px); }
                100% { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }


              /* Grid Background */
              .bg-grid-pattern {
                background-image: linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px),
                                  linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 1px, transparent 1px);
                background-size: 20px 20px;
              }

              /* Custom rotations for floating elements */
              .rotate-z-5 { transform: rotateZ(5deg); }
              .rotate-z--5 { transform: rotateZ(-5deg); }
              .rotate-z-3 { transform: rotateZ(3deg); }
              .rotate-z--7 { transform: rotateZ(-7deg); }

            `}
          </style>
        </section>
      </AnimateOnScroll> {/* WRAPPED SECTION */}

      {/* Page sections rendered on Home (single-page style) - reordered to match navbar */}
      <Industries />
      <AboutUs />
      <Careers />
      <ContactUs />
    </>
  );
}

export default Home;