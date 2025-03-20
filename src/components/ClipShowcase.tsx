import React, { useEffect, useRef, useState } from 'react';

interface ClipShowcaseProps {
  className?: string;
}

const ClipShowcase: React.FC<ClipShowcaseProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % 5;
      setActiveIndex(nextIndex);
      
      if (scrollContainerRef.current) {
        const itemWidth = scrollContainerRef.current.querySelector('.clip-item')?.clientWidth || 0;
        const scrollPosition = Math.max(0, (nextIndex - 1) * itemWidth);
        scrollContainerRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  // Initial setup and stagger animation
  useEffect(() => {
    const items = containerRef.current?.querySelectorAll('.clip-item');
    if (!items) return;

    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('is-visible');
      }, index * 150);
    });
  }, []);

  return (
    <div className={`animate-on-scroll ${className}`}>
      <div className="mb-12">
        <h3 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="text-charcoal-800 dark:text-white">2.5M clips made by </span>
          <span className="text-honey-500">1.1M creators</span>
        </h3>
        <p className="text-lg text-charcoal-600 dark:text-charcoal-300 max-w-3xl mx-auto mb-10">
          Grow your audience like the top creators by sharing short-form content daily. ClipperHive
          will help you create engaging video clips from your long videos in just a few clicks.
        </p>
      </div>
      
      <div 
        ref={containerRef}
        className="relative flex items-center justify-center overflow-hidden w-full h-[640px] md:h-[720px] scrollbar-hide"
      >
        {/* Left fade mask - hidden on mobile */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white dark:from-charcoal-900 to-transparent z-10 hidden md:block"></div>
        
        {/* Scrolling clips container */}
        <div 
          ref={scrollContainerRef}
          className="flex md:space-x-6 w-full h-full overflow-x-hidden overflow-y-hidden scroll-smooth scrollbar-hide"
        >
          {[1, 2, 3, 4, 5].map((num, index) => (
            <div 
              key={num}
              className={`clip-item flex-shrink-0 w-full md:w-80 h-full rounded-none md:rounded-xl overflow-hidden shadow-lg transition-transform duration-500 ${
                index === activeIndex ? 'md:scale-105 z-20' : 'md:scale-95'
              }`}
            >
              <div className="relative w-full h-full bg-charcoal-100 dark:bg-charcoal-800 overflow-hidden">
                <video 
                  src={`/sample${num}.mp4`} 
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white font-medium text-sm">@creator{num}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Right fade mask - hidden on mobile */}
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white dark:from-charcoal-900 to-transparent z-10 hidden md:block"></div>

        {/* Mobile progress indicator */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 md:hidden">
          {[0, 1, 2, 3, 4].map((num) => (
            <div 
              key={num} 
              className={`h-1 rounded-full transition-all duration-300 ${
                num === activeIndex ? 'w-6 bg-honey-500' : 'w-1.5 bg-white/30'
              }`}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 text-sm text-charcoal-500 dark:text-charcoal-400">
        Join our growing community of content creators
      </div>
    </div>
  );
};

export default ClipShowcase;
