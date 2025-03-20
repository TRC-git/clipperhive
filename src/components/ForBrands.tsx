
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, Award, TrendingUp } from 'lucide-react';

const ForBrands: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.animate-on-scroll');
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
      className="section-padding bg-white dark:bg-charcoal-900"
    >
      <div className="max-w-6xl mx-auto">
        <div className="lg:flex lg:items-center lg:space-x-12">
          {/* Left side - Hexagon grid */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 animate-on-scroll">
            <div className="relative h-96 lg:h-[500px] overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* First row */}
                <div className="flex -ml-10 mb-20">
                  <div className="hexagon-small bg-honey-100 dark:bg-charcoal-700 flex items-center justify-center shadow-sm">
                    <div className="text-center p-4">
                      <Search className="h-8 w-8 text-honey-500 mx-auto mb-2" />
                      <span className="text-xs font-medium text-charcoal-800 dark:text-white">Find Clippers</span>
                    </div>
                  </div>
                  <div className="hexagon-small bg-honey-500/10 dark:bg-charcoal-700/50 flex items-center justify-center">
                    <span className="text-sm font-bold text-honey-600 dark:text-honey-400">+200%</span>
                  </div>
                </div>
                
                {/* Second row */}
                <div className="flex absolute" style={{ top: '35%' }}>
                  <div className="hexagon-large bg-honey-500 flex items-center justify-center shadow-md">
                    <div className="text-center p-8">
                      <Briefcase className="h-10 w-10 text-white mx-auto mb-3" />
                      <h3 className="text-xl font-bold text-white mb-1">For Brands</h3>
                      <p className="text-white/90 text-sm">Find the perfect creators for your short-form content</p>
                    </div>
                  </div>
                </div>
                
                {/* Third row */}
                <div className="flex ml-24 mt-32">
                  <div className="hexagon-small bg-honey-100 dark:bg-charcoal-700 flex items-center justify-center shadow-sm">
                    <div className="text-center p-4">
                      <Award className="h-8 w-8 text-honey-500 mx-auto mb-2" />
                      <span className="text-xs font-medium text-charcoal-800 dark:text-white">Premium Quality</span>
                    </div>
                  </div>
                  <div className="hexagon-small bg-honey-100 dark:bg-charcoal-700 flex items-center justify-center shadow-sm">
                    <div className="text-center p-4">
                      <TrendingUp className="h-8 w-8 text-honey-500 mx-auto mb-2" />
                      <span className="text-xs font-medium text-charcoal-800 dark:text-white">Drive Growth</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Content */}
          <div className="lg:w-1/2">
            <div className="animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              <span className="inline-block bg-honey-100 dark:bg-charcoal-700 text-honey-600 dark:text-honey-400 px-4 py-1 rounded-full text-sm font-medium mb-4">
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
                  <li key={index} className="flex items-start">
                    <div className="bg-honey-100 dark:bg-charcoal-700 rounded-full p-1 mt-1 mr-3">
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
                to="/register?type=brand" 
                className="brand-button group inline-flex items-center"
              >
                Post a Project
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
