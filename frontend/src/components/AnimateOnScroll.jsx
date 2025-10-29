// src/components/AnimateOnScroll.jsx

import React, { useRef, useEffect, useState } from 'react';

const AnimateOnScroll = ({ children, delay = 0, duration = 'duration-1000' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the element is intersecting (visible), set isVisible to true
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once visible to prevent re-triggering
          observer.unobserve(entry.target);
        }
      },
      // Threshold and margin define when the animation triggers
      { rootMargin: '0px', threshold: 0.1 } 
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // Use a temp variable for current as ref.current might be null in cleanup
        const currentRef = ref.current; 
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      }
    };
  }, []);

  // Tailwind classes for the animation effect:
  const transitionClass = `transition-all transform ${duration} ease-out`;

  const animationClasses = isVisible
    ? 'opacity-100 translate-y-0' // End state: fully visible, no vertical shift
    : 'opacity-0 translate-y-16'; // Start state: invisible, shifted down 16 units (4rem)

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