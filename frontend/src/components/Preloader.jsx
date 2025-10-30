import React, { useState, useEffect } from 'react';
// 💡 IMPORTANT: Update this path to your actual logo file location!
import Logo from '../assets/logo.png'; 

// Define the total time the preloader should display (for perceived quality)
const MIN_LOAD_TIME = 3200; 

function Preloader({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true); 
    }, MIN_LOAD_TIME);

    const hideTimer = setTimeout(() => {
        setIsLoading(false);
    }, MIN_LOAD_TIME + 1200); 

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <div
      className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center 
                  bg-gray-950 transition-opacity duration-1000 ease-in-out ${
                    isFading ? 'opacity-0' : 'opacity-100'
                  }`}
    >
        <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>

        <div className="text-center relative z-10 p-8 rounded-lg flex flex-col items-center">
            
            {/* 1. Logo Animation Container - Larger canvas for orbit effect */}
            <div className="w-40 h-40 relative mb-8 flex items-center justify-center">

                {/* --- Outer Neon Orbit Rings --- */}
                {/* Ring 1: Blue/Purple Spin */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent transform animate-orbit-spin-slow">
                    <div className="absolute inset-0 rounded-full border-2 border-blue-500/50 animate-pulse-light"></div>
                </div>

                {/* Ring 2: Purple/Pink Fast Orbit (Slightly smaller) */}
                <div className="absolute w-32 h-32 rounded-full border-2 border-transparent transform animate-orbit-spin-fast">
                    <div className="absolute inset-0 rounded-full border-2 border-purple-500/50 animate-pulse-light delay-300"></div>
                </div>
                {/* ----------------------------- */}

                {/* Logo Capsule (Inner Focus) */}
                <div className="w-20 h-20 bg-gray-900/80 rounded-xl shadow-2xl flex items-center justify-center relative 
                              opacity-0 animate-reveal-2 animate-glow transform scale-100 animate-logo-pulse-subtle">
                    
                    {/* Inner Content - Logo Image */}
                    <img 
                        src={Logo} 
                        alt="Sketchcode Logo" 
                        className="w-full h-full object-contain p-2" 
                    />
                </div>
            </div>
            
            {/* 2. Brand Text Reveal */}
            <div className="mt-4 opacity-0 animate-reveal-3">
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-widest leading-none text-white">
                    Sketch
                    <span 
                      className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                    >
                      code
                    </span>
                </h1>
                <p className="mt-2 text-lg font-medium text-blue-300">
                    Building the Future, One Line at a Time.
                </p>
            </div>
        </div>
      
      {/* Custom Tailwind Animations - Moved into a style tag for easy copy/paste */}
      <style>{`
        /* 1. Logo Pulse and Glow */
        @keyframes logo-pulse-subtle { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 10px #4f46e5, 0 0 5px #a78bfa; } 50% { box-shadow: 0 0 15px #3b82f6, 0 0 7px #c084fc; } }
        
        .animate-logo-pulse-subtle { animation: logo-pulse-subtle 3s infinite ease-in-out; }
        .animate-glow { animation: glow 4s infinite alternate; }

        /* 2. Orbit/Spin Animations for Rings */
        @keyframes orbit-spin-slow {
            0% { transform: rotate(0deg) scale(1.0); } 
            100% { transform: rotate(360deg) scale(1.0); }
        }
        @keyframes orbit-spin-fast {
            0% { transform: rotate(0deg) scale(1.0); }
            100% { transform: rotate(-360deg) scale(1.0); }
        }
        .animate-orbit-spin-slow { animation: orbit-spin-slow 20s linear infinite; }
        .animate-orbit-spin-fast { animation: orbit-spin-fast 12s linear infinite; }

        /* 3. Layered Reveal Timings (Text and Logo entrance) */
        @keyframes reveal-fade { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        
        .animate-reveal-2 { animation: reveal-fade 0.8s ease-out 0.6s forwards; }
        .animate-reveal-3 { animation: reveal-fade 1s ease-out 1.2s forwards; }

        /* 4. Pulse Light (for rings) */
        @keyframes pulse-light { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .animate-pulse-light { animation: pulse-light 2s infinite ease-in-out; }

        /* 5. Grid Pattern */
        .bg-grid-pattern {
            background-image: linear-gradient(to right, rgba(99, 102, 241, 0.04) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(99, 102, 241, 0.04) 1px, transparent 1px);
            background-size: 30px 30px;
        }
      `}</style>
    </div>
  );
}

export default Preloader;