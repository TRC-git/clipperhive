
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import HoneycombBackground from '@/components/HoneycombBackground';
import UserTypeSelector from '@/components/register/UserTypeSelector';
import Testimonials from '@/components/register/Testimonials';

const Register: React.FC = () => {
  const navigate = useNavigate();
  
  // Default user type for the selector
  const [userType, setUserType] = React.useState('brand');
  
  const handleUserTypeChange = (value: string) => {
    setUserType(value);
  };
  
  const handleContinue = () => {
    navigate(userType === 'brand' ? '/brand-signup' : '/clipper-signup');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="pt-36 relative overflow-hidden flex flex-col">
        {/* Honeycomb Background */}
        <div className="absolute inset-0 z-0">
          <HoneycombBackground density="medium" animated={true} />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col pb-0">
          {/* Header and Subheading */}
          <div className="text-center mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <div className="p-6 inline-block mx-auto">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-charcoal-800 dark:text-white">
                Get Started with <span className="text-honey-500">CLIPPERHIVE</span>
              </h1>
              <p className="text-lg max-w-2xl mx-auto text-charcoal-600 dark:text-charcoal-300">
                Join our marketplace and be part of the short-form content revolution.
              </p>
            </div>
          </div>
          
          {/* User Type Selector */}
          <div className="flex justify-center animate-fade-in opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <UserTypeSelector 
              userType={userType} 
              onUserTypeChange={handleUserTypeChange} 
            />
          </div>
          
          {/* Continue Button */}
          <div className="flex justify-center mt-6 mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <button 
              onClick={handleContinue}
              className="brand-button py-3 px-8 text-lg font-medium"
            >
              Continue as {userType === 'brand' ? 'Brand' : 'Clipper'}
            </button>
          </div>
          
          {/* Testimonials Section */}
          <Testimonials />
          
          {/* Already have an account */}
          <div className="text-center text-sm text-charcoal-600 dark:text-charcoal-400 mt-2 mb-6">
            Already have an account? <a href="/login" className="text-honey-500 hover:underline">Sign in</a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
