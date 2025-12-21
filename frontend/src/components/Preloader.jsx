import React, { useState, useEffect } from "react";
// 1. Ensure this file actually exists in your assets folder
import Logo from "../assets/logo.png"; 

const MIN_LOAD_TIME = 3500;

function Preloader({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsFading(true), MIN_LOAD_TIME);
    const hideTimer = setTimeout(() => setIsLoading(false), MIN_LOAD_TIME + 1200);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isLoading) return <>{children}</>;

  return (
    <div
      className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center 
                  bg-[#030313] transition-opacity duration-[1200ms] ease-in-out ${
                    isFading ? "opacity-0" : "opacity-100"
                  }`}
    >
      {/* === BACKGROUND === */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.12),_rgba(0,0,0,0.9))] animate-bg-breathe"></div>
        {/* ... (Grid and Particles code remains exactly same as your snippet) ... */}
      </div>

      {/* === MAIN CONTENT === */}
      <div className="text-center relative z-10 flex flex-col items-center">
        
        {/* LOGO AREA */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-10">
          <div className="absolute inset-0 rounded-full blur-3xl bg-blue-500/10 animate-glowPulse"></div>

          {/* Logo Container */}
          <div className="relative w-28 h-28 bg-[#0b0b1a]/90 rounded-2xl border border-blue-400/40 shadow-[0_0_40px_rgba(59,130,246,0.6)] flex items-center justify-center overflow-hidden animate-glow-breathe">
            
            {/* ONLY logo.png remains here */}
            <img
              src={Logo}
              alt="FlitCode Logo"
              className="w-20 h-20 object-contain animate-logoFloat relative z-10"
            />

            {/* Light sweep effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute w-2/3 h-full left-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-light-sweep"></div>
            </div>
          </div>
        </div>

        {/* BRAND TEXT */}
        <div className="opacity-0 animate-brand-reveal px-6 sm:px-0 text-center">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-widest leading-tight text-white drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]">
            Flit
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 animate-text-glow">
              Code
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-xl font-light text-blue-300/80 tracking-wide animate-sub-reveal">
            Building Robust Digital Experiences.
          </p>
        </div>
      </div>

      {/* Styles remain same as your provided code */}
      <style>{`
        /* ... (Include your existing @keyframes here) ... */
      `}</style>
    </div>
  );
}

export default Preloader;