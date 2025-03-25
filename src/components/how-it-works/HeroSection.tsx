
import React from 'react';

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-honey-50 dark:from-charcoal-900 dark:to-charcoal-800">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal-800 dark:text-white mb-6 animate-fade-in">
          How ClipperHive Works
        </h1>
        <p className="text-xl text-charcoal-600 dark:text-charcoal-300 max-w-3xl mx-auto mb-8 animate-fade-in">
          We've built a streamlined platform that connects brands with professional content clippers for short-form video creation.
        </p>
        <div className="flex justify-center gap-4 animate-fade-in">
          <a href="#for-brands" className="brand-button">For Brands</a>
          <a href="#for-clippers" className="secondary-button">For Clippers</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
