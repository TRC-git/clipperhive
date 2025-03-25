import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="section-padding bg-honey-50 dark:bg-charcoal-800">
      <div className="max-w-5xl mx-auto text-center">
        <div className="bg-white dark:bg-charcoal-700 rounded-2xl p-8 md:p-12 shadow-[0_10px_50px_rgba(0,0,0,0.2)] border border-gray-100 dark:border-charcoal-600 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal-800 dark:text-white">
            Ready to get started?
          </h2>
          <p className="text-lg text-charcoal-600 dark:text-charcoal-300 mb-8 max-w-2xl mx-auto">
            Join the ClipperHive community today and revolutionize your content strategy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/brand-signup" className="brand-button py-3 px-8">
              I'm a Brand
            </Link>
            <Link to="/clipper-signup" className="secondary-button py-3 px-8">
              I'm a Clipper
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
