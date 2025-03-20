
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface HoneycombBackgroundProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
  animated?: boolean;
}

const HoneycombBackground: React.FC<HoneycombBackgroundProps> = ({
  className,
  density = 'medium',
  animated = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hexagonsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!animated || !containerRef.current) return;

    const container = containerRef.current;
    const hexagons = Array.from(container.querySelectorAll('.hex-cell')) as HTMLDivElement[];
    hexagonsRef.current = hexagons;

    // Add shimmer animation to hexagons with random delays
    hexagons.forEach(hex => {
      const delay = Math.random() * 5; // Random delay between 0-5s
      hex.style.animationDelay = `${delay}s`;
    });

    // Optional: Add parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      hexagons.forEach((hex, index) => {
        const depth = index % 3 + 1; // Depth factor (1, 2, or 3)
        const moveX = (clientX - windowWidth / 2) / (windowWidth / 2) * depth * 2;
        const moveY = (clientY - windowHeight / 2) / (windowHeight / 2) * depth * 2;
        
        hex.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [animated]);

  // Determine number of hexagons based on density
  const getHexagonCount = () => {
    switch (density) {
      case 'low': return 15;
      case 'high': return 50;
      case 'medium':
      default: return 30;
    }
  };

  const hexagonCount = getHexagonCount();

  return (
    <div 
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none z-0",
        className
      )}
    >
      {Array.from({ length: hexagonCount }).map((_, index) => {
        // Random positioning
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const size = Math.random() * 40 + 80; // Size between 80-120px
        const opacity = Math.random() * 0.15 + 0.05; // Opacity between 0.05-0.2
        
        return (
          <div
            key={index}
            className={cn(
              "hex-cell absolute hexagon",
              animated && "animate-honeycomb-shimmer"
            )}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size * 0.866}px`, // Hexagon height ratio
              background: `rgba(247, 183, 51, ${opacity})`,
              transition: 'transform 0.3s ease'
            }}
          />
        );
      })}
    </div>
  );
};

export default HoneycombBackground;
