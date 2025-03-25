
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import HoneycombBackground from '@/components/HoneycombBackground';
import BrandLoginForm from '@/components/login/BrandLoginForm';

const BrandLogin: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="pt-20 pb-16 relative overflow-hidden flex-1 flex flex-col">
        {/* Honeycomb Background */}
        <div className="absolute inset-0 z-0">
          <HoneycombBackground density="medium" animated={true} />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col">
          {/* Header */}
          <div className="text-center mb-8 mt-10">
            <div className="p-6 inline-block mx-auto">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-charcoal-800 dark:text-white">
                Brand <span className="text-honey-500">Login</span>
              </h1>
              <p className="text-lg max-w-2xl mx-auto text-charcoal-600 dark:text-charcoal-300">
                Access your brand dashboard and manage your content campaigns
              </p>
            </div>
          </div>
          
          {/* Login Form */}
          <div className="max-w-md mx-auto w-full mb-10">
            <BrandLoginForm />
          </div>
          
          {/* Don't have an account */}
          <div className="text-center text-sm text-charcoal-600 dark:text-charcoal-400 my-6">
            Don't have an account? <a href="/brand-signup" className="text-honey-500 hover:underline">Sign up</a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BrandLogin;
