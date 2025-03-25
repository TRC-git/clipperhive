import React, { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ForBrands from '@/components/ForBrands';
import ForClippers from '@/components/ForClippers';
import Footer from '@/components/Footer';
import ClipShowcase from '@/components/ClipShowcase';
import HoneycombBackground from '@/components/HoneycombBackground';
import CountUpNumber from '@/components/CountUpNumber';
import { TrendingUp, ArrowUpRight, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
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

  return (
    <div className="min-h-screen">
      <NavBar />
      <Hero />
      <Features />
      <ForBrands />
      <ForClippers />
      
      {/* Stats Section */}
      <section className="section-padding bg-white dark:bg-charcoal-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-charcoal-800 dark:text-white">
            Trusted by creators and brands worldwide
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              { number: 500, suffix: '+', label: 'Active Clippers' },
              { number: 1200, suffix: '+', label: 'Projects Completed' },
              { number: 50, suffix: 'M+', label: 'Views Generated' },
              { number: 95, suffix: '%', label: 'Client Satisfaction' }
            ].map((stat, index) => (
              <div key={index} className="animate-on-scroll" style={{ transitionDelay: `${index * 100}ms` }}>
                <CountUpNumber 
                  end={stat.number} 
                  suffix={stat.suffix}
                  className="font-display font-bold text-4xl md:text-5xl text-honey-500 mb-2"
                />
                <p className="text-charcoal-600 dark:text-charcoal-300 text-lg">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          
          {/* Growth Section with Honeycomb Background */}
          <section className="relative py-16 mb-20 overflow-hidden rounded-3xl bg-honey-50 dark:bg-charcoal-800 shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
            <HoneycombBackground className="opacity-50" density="medium" animated={true} />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto px-4">
              <div className="md:order-2 animate-on-scroll">
                <div className="relative">
                  {/* Main influencer image */}
                  <img 
                    src="/lovable-uploads/172926b5-ff90-4cef-b2b1-b3a6baa91e2c.png"
                    alt="Content creator growing audience" 
                    className="rounded-2xl shadow-lg relative z-10 mx-auto max-w-full"
                  />
                  
                  {/* Growth indicators */}
                  <div className="absolute -top-4 -right-4 md:top-4 md:right-4 bg-white dark:bg-charcoal-700 rounded-full p-2 shadow-lg animate-float">
                    <TrendingUp className="text-honey-500 w-8 h-8" />
                  </div>
                  
                  <div className="absolute top-1/2 -right-2 md:-right-4 bg-white dark:bg-charcoal-700 rounded-full p-2 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                    <LineChart className="text-honey-500 w-6 h-6" />
                  </div>
                  
                  <div className="absolute -bottom-2 right-8 md:right-16 bg-white dark:bg-charcoal-700 rounded-full p-2 shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                    <ArrowUpRight className="text-honey-500 w-5 h-5" />
                  </div>
                </div>
              </div>
              
              <div className="text-left md:pr-8 animate-on-scroll">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-charcoal-800 dark:text-white">
                  Grow your reach <span className="text-honey-500">without the editing hassle</span>
                </h3>
                <p className="text-lg text-charcoal-600 dark:text-charcoal-300 mb-6">
                  Focus on creating amazing content while our professional clippers transform your long-form videos into 
                  short, engaging clips that attract new audiences.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Save 10+ hours per week on editing",
                    "Increase your content output by 300%",
                    "Reach new audience segments across platforms"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-honey-500 mr-3 mt-1">
                        <TrendingUp className="w-5 h-5" />
                      </span>
                      <span className="text-charcoal-700 dark:text-charcoal-200">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register?type=creator" className="brand-button py-3 px-8 hover-lift">
                  Start Growing Today
                </Link>
              </div>
            </div>
          </section>
          
          {/* Clip Showcase Section */}
          <ClipShowcase />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding bg-honey-50 dark:bg-charcoal-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-white dark:bg-charcoal-700 rounded-2xl p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-gray-100 dark:border-charcoal-600 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal-800 dark:text-white">
              Ready to transform your content strategy?
            </h2>
            <p className="text-lg text-charcoal-600 dark:text-charcoal-300 mb-8 max-w-2xl mx-auto">
              Join the ClipperHive community today and connect with the perfect match for your next viral video.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/marketplace?tab=clippers" className="brand-button py-3 px-8">
                I'm a Brand
              </Link>
              <Link to="/marketplace?tab=brands" className="secondary-button py-3 px-8">
                I'm a Clipper
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
