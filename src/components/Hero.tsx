
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HoneycombBackground from './HoneycombBackground';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple scroll-based parallax effect
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const translateY = scrollPosition * 0.3; // Adjust the parallax speed
      
      // Apply parallax to background elements
      const titleEl = heroRef.current.querySelector('.hero-title');
      const subtitleEl = heroRef.current.querySelector('.hero-subtitle');
      
      if (titleEl) {
        (titleEl as HTMLElement).style.transform = `translateY(${translateY * 0.1}px)`;
      }
      if (subtitleEl) {
        (subtitleEl as HTMLElement).style.transform = `translateY(${translateY * 0.15}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-gradient"
    >
      <HoneycombBackground density="medium" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center relative z-10">
        <div className="animate-fade-in">
          <span className="inline-block bg-honey-100 dark:bg-charcoal-700 text-honey-600 dark:text-honey-400 px-4 py-1 rounded-full text-sm font-medium mb-8 shadow-sm">
            The Marketplace for Short-Form Video Creators
          </span>
          
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold text-charcoal-800 dark:text-white mb-6 leading-tight transition-transform duration-300">
            <span className="block">Connect Brands with</span>
            <span className="text-honey-500">Content Clippers</span>
          </h1>
          
          <p className="hero-subtitle text-xl md:text-2xl text-charcoal-600 dark:text-charcoal-200 max-w-3xl mx-auto mb-10 transition-transform duration-300">
            Where brands find the perfect content creators to clip, edit, and optimize short-form videos for maximum engagement.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/register?type=brand" className="brand-button group py-3 px-8 text-base font-medium">
              I'm a Brand
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/register?type=clipper" className="secondary-button group py-3 px-8 text-base font-medium">
              I'm a Clipper
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="flex justify-center mt-4">
            <a 
              href="#features" 
              className="animate-float flex flex-col items-center text-charcoal-500 dark:text-charcoal-300 transition hover:text-honey-500 dark:hover:text-honey-400"
            >
              <span className="text-sm font-medium mb-2">Discover More</span>
              <svg
                className="w-6 h-6"
                fill="none"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
