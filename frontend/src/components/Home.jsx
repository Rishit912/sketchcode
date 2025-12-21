import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaGithub, FaLinkedin, FaInstagram, FaFacebook, 
  FaCodeBranch, FaServer, FaDesktop, FaCloud, 
  FaExternalLinkAlt 
} from 'react-icons/fa';
import AnimateOnScroll from './AnimateOnScroll';
import AboutUs from './AboutUs';
import TechStack from './TechStack';
import ContactUs from './ContactUs';
import Portfolio from './Portfolio';

// Company-focused taglines
const taglines = [
  "Enterprise Software Solutions",
  "High-Performance Web Apps",
  "Scalable Cloud Architecture",
  "Modern UI/UX Design",
  "MERN Stack Experts",
  "Next.js Performance",
  "Problem Solvers",
];

const skillTags = ['Next.js', 'React', 'Node.js', 'Tailwind', 'Cloud Native'];

const Home = () => {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTaglineIndex(prevIndex => (prevIndex + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <section 
        id="home" 
        className="relative z-10 bg-gray-900 flex flex-col md:flex-row justify-center md:justify-between items-center min-h-screen text-gray-200 px-6 md:px-12 pt-20 pb-12 border-b-4 border-gray-800 overflow-hidden"
      >
        {/* LEFT CONTENT: Text & CTA */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left mb-10 md:mb-0 max-w-2xl">
          
          <AnimateOnScroll duration="duration-700" direction="down" delay={200}> 
            <span className="bg-gray-800 border border-purple-500/30 px-4 py-1.5 rounded-full text-purple-400 font-semibold mb-6 flex items-center gap-2 text-sm md:text-base">
              <span className="text-white text-lg">✨</span> Ready to Innovate
            </span>
          </AnimateOnScroll>
          
          <AnimateOnScroll duration="duration-700" direction="right" delay={400}>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 text-gray-50">
              Build Beautiful <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Apps That Scale
              </span>
            </h1>
          </AnimateOnScroll>

          <div className="h-12 mb-6"> {/* Fixed height to prevent layout shift */}
            <h2 className="text-xl md:text-3xl font-light text-purple-300 tagline-slide-fade">
              {taglines[taglineIndex]}
            </h2>
          </div>

          <AnimateOnScroll duration="duration-700" direction="right" delay={600}> 
            <p className="text-gray-400 text-base md:text-lg mb-8 max-w-lg">
              At FlitCode, we turn visionary ideas into exceptional digital realities. Engineering powerful solutions that are built to perform.
            </p>
          </AnimateOnScroll>

          {/* Skill Tags */}
          <AnimateOnScroll duration="duration-700" direction="right" delay={700}> 
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-10">
              {skillTags.map((tag, i) => (
                <span key={i} className="bg-gray-800 px-3 py-1 rounded text-purple-400 font-medium text-sm border border-gray-700">
                  {tag}
                </span>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Action Buttons */}
          <AnimateOnScroll duration="duration-700" direction="right" delay={800}> 
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-10">
              <Link to="/portfolio">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2">
                  View Projects <FaExternalLinkAlt size={12} />
                </button>
              </Link>
              <Link to="/contact">
                <button className="bg-transparent border border-gray-600 hover:border-purple-400 text-gray-300 hover:text-purple-400 font-semibold px-8 py-3 rounded-lg transition transform hover:scale-105">
                  Let's Connect
                </button>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>

        {/* RIGHT VISUAL: Isometric Device Frame */}
        <AnimateOnScroll duration="duration-1000" direction="left" delay={400}> 
          <div className="flex flex-1 justify-center items-center mt-10 md:mt-0 relative">
            <div className="relative w-[300px] md:w-[450px] h-[300px] md:h-[450px] perspective-1000">
              
              {/* Floating Device Frame */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 md:w-72 h-72 md:h-96 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 transform rotate-y-45 rotate-x-10 animate-float">
                <div className="absolute inset-2 bg-blue-900/20 rounded-xl overflow-hidden backdrop-blur-md p-6 flex flex-col justify-between border border-white/5">
                  <div className="relative z-10 text-center">
                    <h3 className="text-2xl font-bold text-gray-50 mb-2">FlitCode</h3>
                    <p className="text-xs text-blue-200">High Performance Engineering</p>
                    <div className="mt-8 space-y-2">
                       <div className="h-1 w-full bg-blue-500/40 rounded-full animate-pulse"></div>
                       <div className="h-1 w-2/3 bg-purple-500/40 rounded-full animate-pulse delay-75"></div>
                    </div>
                  </div>
                  <div className="relative z-10 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 animate-spin-slow"></div>
                  </div>
                </div>

                {/* Floating Tech Icons */}
                <div className="absolute -right-12 -top-4 animate-float-delayed"><div className="bg-gray-800 p-3 rounded-xl border border-gray-700 shadow-xl"><FaCodeBranch className="text-blue-400" /></div></div>
                <div className="absolute -left-10 top-1/3 animate-float-slow"><div className="bg-gray-800 p-3 rounded-xl border border-gray-700 shadow-xl"><FaCloud className="text-purple-400" /></div></div>
                <div className="absolute -right-16 bottom-1/4 animate-bounce-slow"><div className="bg-gray-800 p-3 rounded-full border border-gray-700 shadow-xl"><FaDesktop className="text-blue-400" /></div></div>
                <div className="absolute -left-16 bottom-10 animate-float-medium"><div className="bg-gray-800 p-3 rounded-xl border border-gray-700 shadow-xl"><FaServer className="text-green-400" /></div></div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        <style>
          {`
            .perspective-1000 { perspective: 1000px; }
            .rotate-y-45 { transform: rotateY(45deg); }
            .rotate-x-10 { transform: rotateX(10deg); }
            
            @keyframes float { 
              0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotateY(45deg) rotateX(10deg); } 
              50% { transform: translate(-50%, -50%) translateY(-20px) rotateY(45deg) rotateX(10deg); } 
            }
            .animate-float { animation: float 6s ease-in-out infinite; }

            @keyframes slide-fade {
              0% { opacity: 0; transform: translateY(10px); }
              15% { opacity: 1; transform: translateY(0); }
              85% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(-10px); }
            }
            .tagline-slide-fade { animation: slide-fade 3s ease-in-out infinite; }

            .animate-float-slow { animation: float 8s ease-in-out infinite; }
            .animate-float-medium { animation: float 5s ease-in-out infinite; }
            .animate-float-delayed { animation: float 6s ease-in-out infinite 1s; }
            .animate-bounce-slow { animation: bounce 4s ease-in-out infinite; }
            @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .animate-spin-slow { animation: spin-slow 12s linear infinite; }
          `}
        </style>
      </section>

      {/* COMPONENT SECTIONS */}
      <AboutUs />
      <TechStack />
      <Portfolio />
      <ContactUs />
    </>
  );
}

export default Home;