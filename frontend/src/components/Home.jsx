import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaCodeBranch ,FaServer ,FaDesktop ,FaCloud, FaLaptopCode, FaCogs, FaExternalLinkAlt } from 'react-icons/fa';
import AnimateOnScroll from './AnimateOnScroll';
import AboutUs from './AboutUs';
import TechStack from './TechStack';
import ContactUs from './ContactUs';
import Portfolio from './Portfolio';

// Array of taglines to rotate through
const taglines = [
  "B.E. I.T",
  "Freelancer",
  "Tech Enthusiast",
  "Web Developer",
  "UI/UX Designer",
  "Creative Thinker",
  "Open Source Contributor",
  "Problem Solver",
  "Lifelong Learner",
];

// Exact skill tags from the reference website
const skillTags = [
  'Nextjs',
  'React',
  'Javascript',
  'Node.js',
  'Tailwind',
];

const Home = () => {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    // Set the interval to change the tagline every 3000ms (3 seconds)
    const intervalId = setInterval(() => {
      setTaglineIndex(prevIndex => (prevIndex + 1) % taglines.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  // --- Animation Delay Definitions ---
  const delayStep = 150;
  let currentDelay = 0;

  const getNextDelay = () => {
    currentDelay += delayStep;
    return `delay-${currentDelay}`;
  };
  // ------------------------------------

  return (
    <>
<<<<<<< HEAD
      {/* Outer wrapper: This should generally use the default 'up' direction for the first element */}
      <AnimateOnScroll duration="duration-1500" direction="up"> 
        <section 
          id="home" 
          // 💡 Responsive fix: Added pt-20 (for fixed navbar) and px-4 (for mobile padding)
          className="relative z-10 bg-gray-900/95 flex flex-col md:flex-row justify-center md:justify-between items-center h-full text-gray-200 px-4 sm:px-6 md:px-12 pt-14 pb-12 md:py-12 border-b-0 md:border-b-4 md:border-gray-700 overflow-hidden"
        >
          
          {/* Left Content Column */}
          {/* 💡 FIX: Changed 'text-center sm:text-left' to 'text-center md:text-left' 
             to enforce left alignment on desktop/tablet while keeping it centered on mobile. */}
        <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto md:mx-0 md:items-start text-left mb-10 md:mb-0">
    
    {/* Tagline - Slide Down */}
    <AnimateOnScroll duration="duration-700" delay={200} direction="down">
        {/* The 'inline-flex' and lack of text-alignment classes here means it aligns with the parent's text-alignment (now text-left) */}
        <span className="inline-flex items-center gap-2 bg-gray-800 border border-gray-700 text-gray-400 font-semibold text-sm md:text-base rounded-full px-3 py-1 shadow-md mb-3 md:mb-5 hover:scale-105 transition-transform duration-200">
            <span className="text-yellow-400 text-base md:text-lg">★</span>
            Powered by FlitCode
        </span>
    </AnimateOnScroll>
    
    
    {/* Title - Slide Right */}
    <AnimateOnScroll duration="duration-700" delay={400} direction="right">
        {/* Inherits text-left from parent */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-gray-50">
            Build Beautiful Websites & Apps
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">That Grow Your Business</span>
        </h1>
    </AnimateOnScroll>
=======
    <section className="flex flex-col md:flex-row justify-center md:justify-between items-center min-h-screen bg-gray-900 text-gray-200 px-6 md:px-12 py-8 md:py-12 border-b-0 md:border-b-4 border-gray-700">
      
      {/* 1. LEFT CONTENT: Slides in sequentially from the right */}
      <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left mb-10 md:mb-0 max-w-2xl">
        
        {/* 'Ready to Innovate' Tag */}
        <AnimateOnScroll duration="duration-700" direction="right" delay={getNextDelay()}> 
          <span className="bg-gray-800 shadow-md px-4 py-1 rounded-full text-purple-400 font-semibold mb-4 md:mb-6 flex items-center gap-2 text-sm md:text-base border border-purple-500/30">
            <span className="text-white text-base md:text-lg">✨</span> Ready to Innovate
          </span>
        </AnimateOnScroll>
        
        {/* Title and Role */}
        <AnimateOnScroll duration="duration-700" direction="right" delay={getNextDelay()}>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-2 text-gray-50">
            <span className="text-gray-200">Software</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Developer
            </span>
          </h1>
        </AnimateOnScroll>
>>>>>>> 4bdeffe547b302a19f3c8e7e4dbd2ef32a76a35d

        {/* Rotating Tagline */}
        <AnimateOnScroll duration="duration-700" direction="right" delay={getNextDelay()}>
          <h2 
            key={taglineIndex} 
            className="text-xl md:text-3xl font-light mb-6 text-purple-300 tagline-slide-fade"
          >
            {taglines[taglineIndex]}
          </h2>
        </AnimateOnScroll>

        {/* Description */}
        <AnimateOnScroll duration="duration-700" direction="right" delay={getNextDelay()}> 
          <p className="text-gray-400 text-base md:text-lg mb-8 px-4 md:px-0 max-w-lg">
            Crafting ideas with passion, turning visions into tangible experiences.
          </p>
        </AnimateOnScroll>

        {/* Skill Tags */}
        <AnimateOnScroll duration="duration-700" direction="right" delay={getNextDelay()}> 
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-10">
            {skillTags.map((tag, i) => (
              <span 
                key={i}
                className="bg-gray-800 shadow-md px-3 py-1 rounded text-purple-400 font-medium text-sm border border-gray-700 hover:scale-105 transition-transform duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Buttons (Matching reference labels and look) */}
        <AnimateOnScroll duration="duration-700" direction="right" delay={getNextDelay()}> 
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-10">
            <Link to="/portfolio">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg transition transform hover:scale-105 text-base flex items-center gap-2">
                Projects <FaExternalLinkAlt size={12} />
              </button>
            </Link>
            <Link to="/contact">
              <button className="bg-gray-700 hover:bg-gray-600 text-purple-400 font-semibold px-6 py-2.5 rounded-lg shadow-lg border border-purple-400 transition transform hover:scale-105 text-base flex items-center gap-2">
                Contact ✉️
              </button>
            </Link>
          </div>
        </AnimateOnScroll>

        {/* Social Links */}
        <AnimateOnScroll duration="duration-700" direction="right" delay={getNextDelay()}> 
          <div className="flex justify-center md:justify-start gap-6 mt-4">
            <a href="https://github.com/Rishit912" target="_blank" rel="noopener noreferrer" aria-label="Github" className="text-gray-400 hover:text-purple-400 transition transform hover:scale-110">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/authwall?trk=gf&trkInfo=AQFR4XPBUrYmYQAAAZpUomBY0vmALK3V41xfhGL2MNiQq4KxLpfAh8L15kGtVag2tkv7J-if5GN2Sjmtd2XfG_0v2Cg86cLilHaoNZqiQQYB9X883o5fXwv4ZcxQeg3Jl1F2RL4=&original_referer=https://rishit912.github.io/&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Frishit-dangi-266aa4216" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-purple-400 transition transform hover:scale-110">
              <FaLinkedin size={24} />
            </a>
            <a href="https://www.instagram.com/rishit_dangi/?igsh=cHo4MHdvbTMybXBw#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-purple-400 transition transform hover:scale-110">
              <FaInstagram size={24} />
            </a>
            <a href="[Your Facebook URL]" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-purple-400 transition transform hover:scale-110">
              <FaFacebook size={24} />
            </a>
          </div>
        </AnimateOnScroll>
      </div>

      {/* 2. RIGHT VISUAL: Slides in once from the left */}
      <AnimateOnScroll duration="duration-1000" direction="left" delay="delay-400"> 
        <div className=" lg:flex flex-1 justify-center items-center mt-10 md:mt-0 relative md:ml-2">
          <div className="relative w-[300px] md:w-[500px] h-[300px] md:h-[500px] perspective-1000">
            {/* Main Device Frame */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-64 md:h-80 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 transform rotate-y-45 rotate-x-10 animate-float">
              {/* Screen Content - Company Info */}
              <div className="absolute inset-2 bg-blue-900/30 rounded-lg overflow-hidden backdrop-blur-sm p-4 flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                
                {/* Content - Must have z-index to be clickable */}
                <div className="relative z-10 text-center"> 
                  <h3 className="text-xl md:text-2xl font-bold text-gray-50 mb-1 animate-pulse-light">Rishit Dangi</h3> <br />
                  <p className="text-xs md:text-sm text-blue-200 mb-3">Hi Everyone, I am Rishit Dangi from Rajkot, India. I am currently pursuing B.E I.T at V.V.P Engineering College.</p>
                  <div className="bg-blue-600/50 h-1.5 w-3/4 mx-auto rounded-full mb-2 animate-pulse-slow"></div>
                  <div className="bg-purple-600/50 h-1.5 w-1/2 mx-auto rounded-full animate-pulse-slow delay-300"></div>
                </div>

                {/* FIXED BUTTON AREA */}
                <div className="relative z-20 text-center">
                  <Link to="/about" className="relative inline-block"> {/* Ensure Link is the wrapper */}
                    <span className="bg-white text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold shadow-md hover:scale-105 transition-transform transform-gpu animate-fade-in-up cursor-pointer">
                      About Me
                    </span>
                  </Link>
                </div>
              </div>

              {/* Floating Elements (Icons/Dots) */}
              <div className="absolute -right-16 -top-8 animate-float-delayed rotate-z-5"><div className="bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-700"><FaCodeBranch className="text-blue-400 text-xl" /></div></div>
              <div className="absolute -left-12 top-1/4 animate-float-slow rotate-z--5"><div className="bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-700"><FaCloud className="text-purple-400 text-xl" /></div></div>
              <div className="absolute -right-24 top-1/3 w-24 h-px bg-gradient-to-r from-blue-500 to-transparent animate-expand"></div>
              <div className="absolute -left-20 top-1/2 w-20 h-px bg-gradient-to-l from-purple-500 to-transparent animate-expand-delayed"></div>
              <div className="absolute -right-32 top-1/3 animate-float-fast rotate-z-3"><div className="bg-gray-800 p-2 rounded-lg shadow-xl border border-gray-700"><div className="h-2 w-16 bg-blue-400/30 rounded-full"></div><div className="h-2 w-12 bg-blue-400/30 rounded-full mt-1"></div></div></div>
              <div className="absolute -left-28 bottom-1/4 animate-float-medium rotate-z--7"><div className="bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-700"><FaServer className="text-purple-400 text-xl animate-spin-slow" /></div></div>
              <div className="absolute -right-12 bottom-1/4 animate-bounce-slow"><div className="bg-gray-800 p-3 rounded-full shadow-xl border border-gray-700"><FaDesktop className="text-blue-400 text-xl" /></div></div>
            </div>

            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          </div>
        </div>
      </AnimateOnScroll>

<<<<<<< HEAD
          {/* Animated Isometric Scene (Right Content) - Slide Down */}
          {/* Hiding on mobile: hidden lg:flex */}
          <div className=" lg:flex flex-1 justify-center items-center mt-10 md:mt-0 relative md:ml-2">
            <AnimateOnScroll duration="duration-1000" delay={800} direction="down">
              <div className="relative w-[300px] md:w-[500px] h-[300px] md:h-[500px] perspective-1000">
                {/* Main Device Frame */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-64 md:h-80 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 transform rotate-y-45 rotate-x-10 animate-float">
                  {/* Screen Content - Company Info */}
                  <div className="absolute inset-2 bg-blue-900/30 rounded-lg overflow-hidden backdrop-blur-sm p-4 flex flex-col justify-between">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                    <div className="relative z-10 text-center">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-50 mb-1 animate-pulse-light">FlitCode</h3> {/* Your Company Name */} <br />
                      <p className="text-xs md:text-sm text-blue-200 mb-3"> we turn visionary ideas into exceptional digital realities. Our mission: to create powerful digital solutions that are a joy to build and use.</p> {/* Your Tagline */}
                      <div className="bg-blue-600/50 h-1.5 w-3/4 mx-auto rounded-full mb-2 animate-pulse-slow"></div>
                      <div className="bg-purple-600/50 h-1.5 w-1/2 mx-auto rounded-full animate-pulse-slow delay-300"></div>
                    </div>
                    <div className="relative z-10 text-center">
                      <button className="bg-white text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold shadow-md hover:scale-105 transition-transform transform-gpu animate-fade-in-up">
                        Client Portal
                      </button>
                    </div>
                  </div>
=======
      {/* Custom Styles */}
      <style>
        {`
          /* --- ANIMATION SETUP --- */
          .perspective-1000 { perspective: 1000px; }
          .rotate-y-45 { transform: rotateY(45deg); }
          .rotate-x-10 { transform: rotateX(10deg); }
>>>>>>> 4bdeffe547b302a19f3c8e7e4dbd2ef32a76a35d

          /* Main Device Float Animation */
          @keyframes float { 0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotateY(45deg) rotateX(10deg); } 50% { transform: translate(-50%, -50%) translateY(-10px) rotateY(45deg) rotateX(10deg); } }
          .animate-float { animation: float 6s ease-in-out infinite; }

          /* Floating Elements Animation */
          @keyframes floatSlow { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-15px) rotate(5deg); } }
          @keyframes floatFast { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-8px) rotate(-5deg); } }
          @keyframes floatMedium { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-12px) rotate(3deg); } }
          @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

          .animate-float-slow { animation: floatSlow 7s ease-in-out infinite; }
          .animate-float-fast { animation: floatFast 4s ease-in-out infinite; }
          .animate-float-medium { animation: floatMedium 5s ease-in-out infinite; }
          .animate-float-delayed { animation: floatSlow 6s ease-in-out infinite 1s; } 
          .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }

          /* Line Expand Animation */
          @keyframes expand { 0% { transform: scaleX(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: scaleX(1); opacity: 0.7; } }
          .animate-expand { animation: expand 2.5s ease-out infinite alternate; }
          .animate-expand-delayed { animation: expand 2.5s ease-out infinite alternate 1s; }

          /* Spin Animation */
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          .animate-spin-slow { animation: spin 10s linear infinite; } 

          /* Pulse for text on screen */
          @keyframes pulse-light { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
          .animate-pulse-light { animation: pulse-light 3s ease-in-out infinite; }
          .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }

          /* Fade In Up for Button */
          @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
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

          /* Rotating Tagline Animation */
          @keyframes slide-fade {
              0% { opacity: 0; transform: translateY(10px); }
              10% { opacity: 1; transform: translateY(0); }
              90% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(-10px); }
          }
          .tagline-slide-fade {
              animation: slide-fade 3s ease-in-out infinite; /* Matches the JS interval */
          }
        `}
      </style>
    </section>

      <AboutUs  />
      <TechStack  />
      <Portfolio  />
      <ContactUs />
    </>
  );
}

export default Home;