
import React, { useEffect } from 'react';

interface AnimationWrapperProps {
  children: React.ReactNode;
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({ children }) => {
  useEffect(() => {
    // Add the intersection observer for animation-on-scroll elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe all elements with the animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      // Clean up the observer when the component unmounts
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return <>{children}</>;
};

export default AnimationWrapper;
