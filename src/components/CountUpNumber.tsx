
import React, { useState, useEffect, useRef } from 'react';

interface CountUpNumberProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

const CountUpNumber: React.FC<CountUpNumberProps> = ({ 
  end, 
  suffix = '', 
  duration = 2000,
  className
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const currentCount = Math.floor(percentage * end);
      setCount(currentCount);

      if (percentage < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isVisible, end, duration]);

  return (
    <div ref={countRef} className={className}>
      {count}{suffix}
    </div>
  );
};

export default CountUpNumber;
