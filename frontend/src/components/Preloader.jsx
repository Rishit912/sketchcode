import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png"; // No longer needed

const MIN_LOAD_TIME = 3500;

function Preloader({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fade out after minimum load time
    const timer = setTimeout(() => setIsFading(true), MIN_LOAD_TIME);
    // Completely hide component after fade out duration (1200ms)
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
        {/* Smooth dark-blue gradient breathing */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.12),_rgba(0,0,0,0.9))] animate-bg-breathe"></div>

        {/* Soft glowing grid lines (No changes needed) */}
        <div className="absolute inset-0 opacity-[0.08]">
          {[...Array(15)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent animate-gridLine"
              style={{ top: `${i * 6}%`, animationDelay: `${i * 0.4}s` }}
            ></div>
          ))}
          {[...Array(15)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-400/30 to-transparent animate-gridLine"
              style={{ left: `${i * 6}%`, animationDelay: `${i * 0.5}s` }}
            ></div>
          ))}
        </div>

        {/* Floating digital particles (No changes needed) */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[3px] h-[3px] bg-blue-400/40 rounded-full animate-particleFloat"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${6 + Math.random() * 5}s`,
            }}
          ></div>
        ))}

        {/* Occasional tech streaks (data movement lines) (No changes needed) */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[1px] w-[120px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent animate-streakMove"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
              transform: `rotate(${Math.random() * 60 - 30}deg)`,
            }}
          ></div>
        ))}
      </div>

      {/* === MAIN CONTENT === */}
      <div className="text-center relative z-10 flex flex-col items-center">
        {/* LOGO AREA - Now displays RD text */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-10">
          {/* Glow aura */}
          <div className="absolute inset-0 rounded-full blur-3xl bg-blue-500/10 animate-glowPulse"></div>

          {/* Logo Core (Text based) */}
          <div className="relatāive w-28 h-28 bg-[#0b0b1a]/90 rounded-2xl border border-blue-400/40 shadow-[0_0_40px_rgba(59,130,246,0.6)] flex items-center justify-center overflow-hidden animate-glow-breathe">
            <img
              src={Logo}
              alt="FlitCode Logo"
              className="w-20 h-20 object-contain animate-logoFloat"
            />
            
            {/* --- RD Text Logo --- */}
            <span className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-logoFloat">
              RD
            </span>
            {/* ---------------------- */}

            {/* Light sweep */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-2/3 h-full left-[-100%] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-light-sweep"></div>
            </div>
          </div>
        </div>

        {/* TEXT AREA (Customized for Rishit Dangi) */}
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

      {/* === ANIMATIONS (No changes needed) === */}
      <style>{`
        /* BACKGROUND */
        @keyframes bg-breathe {
          0%,100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.06); opacity: 1; }
        }
        .animate-bg-breathe { animation: bg-breathe 18s infinite ease-in-out; }

        /* GRID LINE shimmer */
        @keyframes gridLine {
          0%,100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-gridLine { animation: gridLine 6s ease-in-out infinite; }

        /* PARTICLE FLOAT */
        @keyframes particleFloat {
          0% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.8; }
          100% { transform: translateY(0px) scale(1); opacity: 0.3; }
        }
        .animate-particleFloat { animation: particleFloat linear infinite; }

        /* STREAK MOVEMENT */
        @keyframes streakMove {
          0% { transform: translateX(-150%) rotate(var(--angle)); opacity: 0; }
          30% { opacity: 0.6; }
          100% { transform: translateX(150%) rotate(var(--angle)); opacity: 0; }
        }
        .animate-streakMove { animation: streakMove ease-in-out infinite; }

        /* LOGO EFFECTS */
        @keyframes glow-breathe {
          0%,100% { box-shadow: 0 0 25px rgba(59,130,246,0.4), 0 0 60px rgba(147,51,234,0.3); }
          50% { box-shadow: 0 0 50px rgba(59,130,246,0.8), 0 0 100px rgba(147,51,234,0.6); }
        }
        .animate-glow-breathe { animation: glow-breathe 4s infinite ease-in-out; }

        @keyframes glowPulse {
          0%,100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        .animate-glowPulse { animation: glowPulse 6s infinite ease-in-out; }

        @keyframes logoFloat {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-logoFloat { animation: logoFloat 4s ease-in-out infinite; }

        @keyframes light-sweep {
          0% { left: -100%; opacity: 0; }
          20% { opacity: 0.8; }
          50% { left: 120%; opacity: 0; }
          100% { left: 120%; opacity: 0; }
        }
        .animate-light-sweep { animation: light-sweep 3.5s ease-in-out infinite; }

        /* TEXT */
        @keyframes brand-reveal {
          0% { opacity: 0; transform: translateY(20px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-brand-reveal { animation: brand-reveal 1.6s ease-out 1s forwards; }

        @keyframes text-glow {
          0%,100% { filter: drop-shadow(0 0 8px rgba(59,130,246,0.6)); }
          50% { filter: drop-shadow(0 0 18px rgba(147,51,234,0.8)); }
        }
        .animate-text-glow { animation: text-glow 3s infinite ease-in-out; }

        @keyframes sub-reveal {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-sub-reveal { animation: sub-reveal 1.4s ease-out 2s forwards; }
      `}</style>
    </div>
  );
}

export default Preloader;