
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileCheck, Award, TrendingUp, Briefcase } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ForBrands: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-bottom');
            elements.forEach((el) => {
              el.classList.add('is-visible');
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-white to-honey-50/50 dark:from-charcoal-900 dark:to-charcoal-800/80 relative overflow-hidden"
    >
      {/* Glassmorphic background elements */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-honey-300/20 dark:bg-honey-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-40 -right-20 w-80 h-80 bg-honey-200/30 dark:bg-honey-400/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="lg:flex lg:items-center lg:space-x-12">
          {/* Left side - Modern graphic display */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 animate-on-scroll-left">
            <div className="relative h-96 lg:h-[500px] overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Central element - Main black content area */}
                <div className="relative z-10 animate-on-scroll-bottom" style={{ transitionDelay: '300ms' }}>
                  <div className="w-[280px] h-[200px] bg-charcoal-900 dark:bg-charcoal-800 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:scale-105">
                    <div className="flex items-center justify-center h-full relative">
                      {/* Content placeholder */}
                      <div className="text-center p-6">
                        <Briefcase className="h-10 w-10 text-honey-500 mx-auto mb-3" />
                        <h3 className="text-xl font-bold text-white mb-1">For Brands</h3>
                        <p className="text-white/70 text-sm">Find the perfect creators</p>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-honey-500"></div>
                      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-honey-300"></div>
                      <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-honey-400"></div>
                      <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-honey-600"></div>
                      
                      {/* Center decoration */}
                      <div className="absolute -right-10 -bottom-10 w-20 h-20 rotate-45 bg-honey-500/20"></div>
                    </div>
                  </div>
                </div>
                
                {/* Surrounding glassmorphic elements */}
                <div className="absolute grid grid-cols-2 gap-6 w-full h-full place-items-center">
                  {/* Top left - Find Clippers */}
                  <div className={`animate-on-scroll-left ${isMobile ? 'z-20 -translate-x-10 -translate-y-16' : '-translate-x-32 -translate-y-20'}`} style={{ transitionDelay: '100ms' }}>
                    <div className="flex items-center space-x-3 bg-white/80 dark:bg-charcoal-700/60 backdrop-blur-md rounded-full pl-3 pr-6 py-3 shadow-lg transition-all duration-300 hover:bg-white/90 dark:hover:bg-charcoal-600/70 hover:scale-105">
                      <div className="bg-honey-50 dark:bg-honey-500/20 p-2 rounded-full">
                        <Search className="h-5 w-5 text-honey-500" />
                      </div>
                      <span className="text-sm font-medium text-charcoal-800 dark:text-white">Find Clippers</span>
                    </div>
                  </div>
                  
                  {/* Top right - +200% */}
                  <div className={`animate-on-scroll-right ${isMobile ? 'z-20 translate-x-10 -translate-y-16' : 'translate-x-24 -translate-y-24'}`} style={{ transitionDelay: '200ms' }}>
                    <div className="bg-white/80 dark:bg-charcoal-700/60 backdrop-blur-md rounded-full px-6 py-3 shadow-lg transition-all duration-300 hover:bg-white/90 dark:hover:bg-charcoal-600/70 hover:scale-105">
                      <span className="text-lg font-bold text-honey-600 dark:text-honey-400">+200%</span>
                    </div>
                  </div>
                  
                  {/* Bottom left - Premium Quality */}
                  <div className={`animate-on-scroll-left ${isMobile ? 'z-20 -translate-x-10 translate-y-16' : '-translate-x-16 translate-y-32'}`} style={{ transitionDelay: '400ms' }}>
                    <div className="flex items-center space-x-3 bg-white/80 dark:bg-charcoal-700/60 backdrop-blur-md rounded-full pl-3 pr-6 py-3 shadow-lg transition-all duration-300 hover:bg-white/90 dark:hover:bg-charcoal-600/70 hover:scale-105">
                      <div className="bg-honey-50 dark:bg-honey-500/20 p-2 rounded-full">
                        <FileCheck className="h-5 w-5 text-honey-500" />
                      </div>
                      <span className="text-sm font-medium text-charcoal-800 dark:text-white">Premium Quality</span>
                    </div>
                  </div>
                  
                  {/* Bottom right - Drive Growth */}
                  <div className={`animate-on-scroll-right ${isMobile ? 'z-20 translate-x-10 translate-y-16' : 'translate-x-20 translate-y-28'}`} style={{ transitionDelay: '500ms' }}>
                    <div className="flex items-center space-x-3 bg-white/80 dark:bg-charcoal-700/60 backdrop-blur-md rounded-full pl-3 pr-6 py-3 shadow-lg transition-all duration-300 hover:bg-white/90 dark:hover:bg-charcoal-600/70 hover:scale-105">
                      <div className="bg-honey-50 dark:bg-honey-500/20 p-2 rounded-full">
                        <TrendingUp className="h-5 w-5 text-honey-500" />
                      </div>
                      <span className="text-sm font-medium text-charcoal-800 dark:text-white">Drive Growth</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Content */}
          <div className="lg:w-1/2">
            <div className="animate-on-scroll-right" style={{ transitionDelay: '200ms' }}>
              <span className="inline-block bg-honey-100/80 dark:bg-charcoal-700/80 backdrop-blur-sm text-honey-600 dark:text-honey-400 px-4 py-1 rounded-full text-sm font-medium mb-4 border border-honey-200/30 dark:border-charcoal-600/30 shadow-sm">
                For Brands
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-charcoal-800 dark:text-white">
                Find the perfect content creator for your brand
              </h2>
              <p className="text-lg text-charcoal-600 dark:text-charcoal-300 mb-8">
                Post your project and connect with specialized clipper talent that knows how to make your content go viral. From TikTok to YouTube Shorts, get content that resonates with your audience.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Browse portfolios of verified content clippers",
                  "Set your budget and timeline requirements",
                  "Review proposals and select the best match",
                  "Get optimized content for multiple platforms"
                ].map((item, index) => (
                  <li key={index} className="flex items-start animate-on-scroll-right" style={{ transitionDelay: `${300 + (index * 100)}ms` }}>
                    <div className="bg-honey-100/80 dark:bg-charcoal-700/80 backdrop-blur-sm rounded-full p-1 mt-1 mr-3 shadow-sm">
                      <svg 
                        className="h-4 w-4 text-honey-500" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-charcoal-700 dark:text-charcoal-300">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                to="/marketplace?tab=clippers" 
                className="brand-button group inline-flex items-center bg-gradient-to-r from-honey-400 to-honey-500 hover:from-honey-500 hover:to-honey-600 shadow-[0_4px_14px_rgba(247,183,51,0.35)] hover:shadow-[0_6px_20px_rgba(247,183,51,0.5)]"
              >
                Go to Clipper Marketplace
                <svg 
                  className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForBrands;
