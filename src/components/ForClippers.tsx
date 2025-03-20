
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Video, DollarSign, Calendar, Star } from 'lucide-react';

const ForClippers: React.FC = () => {
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
      className="section-padding bg-honey-50 dark:bg-charcoal-800"
    >
      <div className="max-w-6xl mx-auto">
        <div className="lg:flex lg:items-center lg:space-x-12 flex-row-reverse">
          {/* Left side - Content (now right side visually due to flex-row-reverse) */}
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="animate-on-scroll">
              <span className="inline-block bg-honey-100 dark:bg-charcoal-700 text-honey-600 dark:text-honey-400 px-4 py-1 rounded-full text-sm font-medium mb-4">
                For Clippers
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-charcoal-800 dark:text-white">
                Turn your editing skills into a thriving business
              </h2>
              <p className="text-lg text-charcoal-600 dark:text-charcoal-300 mb-8">
                Showcase your clipping portfolio, find consistent brand clients, and grow your income by doing what you love – creating engaging short-form videos.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Create a comprehensive portfolio to showcase your best work",
                  "Set your rates and availability for client projects",
                  "Get direct access to brands looking for your specific skills",
                  "Build long-term relationships with recurring clients"
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
                to="/register?type=clipper" 
                className="secondary-button group inline-flex items-center"
              >
                Join as a Clipper
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
          
          {/* Right side - Cards (now left side visually) */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              {/* Card 1 */}
              <div className="bg-white dark:bg-charcoal-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-honey-100 dark:bg-charcoal-600 mb-4">
                  <Video className="h-6 w-6 text-honey-500 dark:text-honey-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-charcoal-800 dark:text-white">Showcase Work</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300">
                  Build a professional portfolio that highlights your best clips and editing style.
                </p>
              </div>
              
              {/* Card 2 */}
              <div className="bg-white dark:bg-charcoal-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-honey-100 dark:bg-charcoal-600 mb-4">
                  <DollarSign className="h-6 w-6 text-honey-500 dark:text-honey-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-charcoal-800 dark:text-white">Set Your Rates</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300">
                  Decide what you charge based on project scope, platform, and complexity.
                </p>
              </div>
              
              {/* Card 3 */}
              <div className="bg-white dark:bg-charcoal-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-honey-100 dark:bg-charcoal-600 mb-4">
                  <Calendar className="h-6 w-6 text-honey-500 dark:text-honey-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-charcoal-800 dark:text-white">Flexible Schedule</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300">
                  Work when you want with full control over your availability and workflow.
                </p>
              </div>
              
              {/* Card 4 */}
              <div className="bg-white dark:bg-charcoal-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-honey-100 dark:bg-charcoal-600 mb-4">
                  <Star className="h-6 w-6 text-honey-500 dark:text-honey-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-charcoal-800 dark:text-white">Build Reputation</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300">
                  Earn reviews and build your reputation to attract premium clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForClippers;
