
import React, { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';

type TimelineStep = {
  title: string;
  description: string;
  icon: React.ReactNode;
  items: string[];
  position: 'left' | 'right';
};

interface ProcessTimelineProps {
  steps: TimelineStep[];
}

const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ steps }) => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a small delay before starting animations
            setTimeout(() => {
              const stepElements = timelineRef.current?.querySelectorAll('.timeline-step');
              stepElements?.forEach((el, index) => {
                // Stagger the animations based on index
                setTimeout(() => {
                  el.classList.add('is-visible');
                }, index * 150); // 150ms stagger between each step
              });
            }, 100);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  return (
    <div className="relative" ref={timelineRef}>
      {/* Timeline Line */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-honey-200 dark:bg-charcoal-700 -translate-x-1/2"></div>
      
      {/* Steps */}
      {steps.map((step, index) => (
        <div 
          key={index}
          className={`timeline-step flex flex-col ${
            step.position === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
          } items-center ${
            index < steps.length - 1 ? 'mb-16 md:mb-24' : ''
          } relative opacity-0 translate-y-8`}
        >
          {step.position === 'left' ? (
            <>
              <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-right">
                <h3 className="text-2xl font-bold mb-3 text-charcoal-800 dark:text-white">{step.title}</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300">
                  {step.description}
                </p>
              </div>
              
              <div className="z-10 flex items-center justify-center bg-honey-500 w-14 h-14 rounded-full shadow-md">
                {step.icon}
              </div>
              
              <div className="md:w-1/2 md:pl-12">
                <div className="bg-honey-50 dark:bg-charcoal-800 p-5 rounded-lg shadow-sm">
                  <ul className="space-y-3">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-honey-500 mr-2 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0">
                <h3 className="text-2xl font-bold mb-3 text-charcoal-800 dark:text-white">{step.title}</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300">
                  {step.description}
                </p>
              </div>
              
              <div className="z-10 flex items-center justify-center bg-honey-500 w-14 h-14 rounded-full shadow-md">
                {step.icon}
              </div>
              
              <div className="md:w-1/2 md:pr-12 text-right">
                <div className="bg-honey-50 dark:bg-charcoal-800 p-5 rounded-lg shadow-sm">
                  <ul className="space-y-3">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-start justify-end">
                        <span>{item}</span>
                        <CheckCircle className="h-5 w-5 text-honey-500 ml-2 mt-0.5" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProcessTimeline;
