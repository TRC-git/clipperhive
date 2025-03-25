
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import HoneycombBackground from '@/components/HoneycombBackground';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrandLoginForm from '@/components/login/BrandLoginForm';
import ClipperLoginForm from '@/components/login/ClipperLoginForm';

const Login: React.FC = () => {
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
          <div className="text-center mb-8 mt-10 animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <div className="p-6 inline-block mx-auto">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-charcoal-800 dark:text-white">
                Sign In to <span className="text-honey-500">CLIPPERHIVE</span>
              </h1>
              <p className="text-lg max-w-2xl mx-auto text-charcoal-600 dark:text-charcoal-300">
                Access your account and manage your short-form content journey.
              </p>
            </div>
          </div>
          
          {/* Login Forms with Tabs */}
          <div className="max-w-md mx-auto w-full mb-10 animate-fade-in opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <Tabs defaultValue="brand" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="brand">Brand</TabsTrigger>
                <TabsTrigger value="clipper">Clipper</TabsTrigger>
              </TabsList>
              
              <TabsContent value="brand">
                <BrandLoginForm />
              </TabsContent>
              
              <TabsContent value="clipper">
                <ClipperLoginForm />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Register account link */}
          <div className="text-center text-sm text-charcoal-600 dark:text-charcoal-400 mt-2 mb-6">
            Don't have an account? <a href="/register" className="text-honey-500 hover:underline">Sign up</a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
