import React from 'react';

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid-animation"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="floating-element"
              style={{
                '--delay': `${Math.random() * 5}s`,
                '--duration': `${10 + Math.random() * 20}s`,
                '--x-offset': `${Math.random() * 100}vw`,
                '--y-offset': `${Math.random() * 100}vh`,
                '--size': `${Math.random() * 10 + 5}px`,
                '--opacity': Math.random() * 0.5
              }}
            />
          ))}
        </div>

        {/* Light Streaks */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="light-streak"
              style={{
                '--delay': `${Math.random() * 3}s`,
                '--top': `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        {/* Glowing Orbs */}
        <div className="absolute inset-0">
          <div className="glow-orb glow-orb-1"></div>
          <div className="glow-orb glow-orb-2"></div>
          <div className="glow-orb glow-orb-3"></div>
        </div>

        {/* Wave Pattern */}
        <div className="absolute inset-0">
          <div className="wave-pattern"></div>
        </div>

        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-radial-vignette"></div>
      </div>

      {/* Animation Styles */}
      <style jsx="true">{`
        .grid-animation {
          background-image: 
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          width: 200%;
          height: 200%;
          position: absolute;
          top: -50%;
          left: -50%;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-20%, -20%) rotate(1deg); }
        }

        .floating-element {
          position: absolute;
          width: var(--size);
          height: var(--size);
          background: radial-gradient(circle at center, rgba(147, 197, 253, var(--opacity)), transparent 70%);
          border-radius: 50%;
          left: var(--x-offset);
          top: var(--y-offset);
          animation: float var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(50px, -50px); }
          50% { transform: translate(100px, 0); }
          75% { transform: translate(50px, 50px); }
        }

        .light-streak {
          position: absolute;
          top: var(--top);
          left: -10%;
          width: 120%;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(147, 197, 253, 0.2), 
            rgba(147, 197, 253, 0.5), 
            rgba(147, 197, 253, 0.2), 
            transparent
          );
          animation: streakMove 8s ease-in-out infinite;
          animation-delay: var(--delay);
        }

        @keyframes streakMove {
          0% { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateX(100%) skewX(-15deg); opacity: 0; }
        }

        .glow-orb {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          animation: orbFloat 20s ease-in-out infinite;
        }

        .glow-orb-1 {
          background: radial-gradient(circle at 30% 30%, rgba(56, 189, 248, 0.8), transparent 70%);
          top: 10%;
          left: 20%;
          animation-delay: 0s;
        }

        .glow-orb-2 {
          background: radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.8), transparent 70%);
          top: 50%;
          right: 20%;
          animation-delay: -5s;
        }

        .glow-orb-3 {
          background: radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.8), transparent 70%);
          bottom: 10%;
          left: 30%;
          animation-delay: -10s;
        }

        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(50px, 50px) scale(1.1); }
          50% { transform: translate(0, 100px) scale(1); }
          75% { transform: translate(-50px, 50px) scale(0.9); }
        }

        .wave-pattern {
          position: absolute;
          width: 200%;
          height: 200%;
          background-image: repeating-linear-gradient(
            45deg,
            rgba(99, 102, 241, 0.03) 0px,
            rgba(99, 102, 241, 0.03) 1px,
            transparent 1px,
            transparent 10px
          );
          animation: waveMove 15s linear infinite;
        }

        @keyframes waveMove {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .bg-radial-vignette {
          background: radial-gradient(
            circle at center,
            transparent 0%,
            rgba(17, 24, 39, 0.4) 100%
          );
        }
      `}</style>
    </div>
  );
};

export default BackgroundAnimation;