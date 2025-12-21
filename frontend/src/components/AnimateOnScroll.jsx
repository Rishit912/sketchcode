// src/components/AnimateOnScroll.jsx

import React, { useRef, useEffect, useState } from 'react';

// Define the component, accepting a new 'direction' prop
const AnimateOnScroll = ({ children, delay = 0, duration = 'duration-1000', direction = 'up' }) => {
  const ref = useRef(null);
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      // Trigger when 10% of the element is visible
      { rootMargin: '0px', threshold: 0.1 } 
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // Safe cleanup
        observer.unobserve(ref.current); 
      }
    };
  }, []);

  // Tailwind classes for the animation effect
  const transitionClass = `transition-all transform ${duration} ease-out`;

  // --- Dynamic Start Position (Hidden State) ---
  let startClasses;
  switch (direction.toLowerCase()) {
    case 'left':
      // Start hidden far right, end at normal position (x=0)
      startClasses = 'opacity-0 translate-x-16'; 
      break;
    case 'right':
      // Start hidden far left, end at normal position (x=0)
      startClasses = 'opacity-0 -translate-x-16'; 
      break;
    case 'down':
      // Start hidden far up, end at normal position (y=0)
      startClasses = 'opacity-0 -translate-y-16'; 
      break;
    case 'up':
    default:
      // Start hidden far down, end at normal position (y=0)
      startClasses = 'opacity-0 translate-y-16'; 
      break;
  }
  
  // End state (Visible State)
  const endClasses = 'opacity-100 translate-x-0 translate-y-0';

  // Apply the correct classes based on visibility
  const animationClasses = isVisible ? endClasses : startClasses;

  return (
    <div
      ref={ref}
      className={`${transitionClass} ${animationClasses}`}
      style={{ transitionDelay: `${delay}ms` }} // Apply delay in milliseconds
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;