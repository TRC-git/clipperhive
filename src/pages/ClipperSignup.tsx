
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ClipperRegistrationForm from '@/components/register/ClipperRegistrationForm';
import HoneycombBackground from '@/components/HoneycombBackground';

const ClipperSignup: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="pt-36 relative overflow-hidden flex-1 flex flex-col">
        {/* Honeycomb Background */}
        <div className="absolute inset-0 z-0">
          <HoneycombBackground density="medium" animated={true} />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col mb-16">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <div className="p-6 inline-block mx-auto">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-charcoal-800 dark:text-white">
                Clipper <span className="text-honey-500">Registration</span>
              </h1>
              <p className="text-lg max-w-2xl mx-auto text-charcoal-600 dark:text-charcoal-300">
                Join our marketplace and monetize your content creation skills
              </p>
            </div>
          </div>
          
          {/* Registration Form */}
          <div className="max-w-4xl mx-auto w-full animate-scale-in opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <ClipperRegistrationForm />
          </div>
          
          {/* Already have an account */}
          <div className="text-center text-sm text-charcoal-600 dark:text-charcoal-400 mt-8 animate-fade-in opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
            Already have an account? <a href="/login" className="text-honey-500 hover:underline">Sign in</a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClipperSignup;
