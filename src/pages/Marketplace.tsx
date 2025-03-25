import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Scissors, Briefcase } from "lucide-react";
import ClippersListing from '@/components/marketplace/ClippersListing';
import BrandsListing from '@/components/marketplace/BrandsListing';
import { allClippers, allBrands } from '@/components/marketplace/MarketplaceData';
import { useAuth } from '@/hooks/useAuth';

const Marketplace: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); // Get authentication state
  
  // Pagination state
  const [clippersPage, setClippersPage] = useState(1);
  const [brandsPage, setBrandsPage] = useState(1);
  const itemsPerPage = 6;

  // Get the tab from URL query params
  const [activeTab, setActiveTab] = useState<string>("clippers");

  useEffect(() => {
    // Parse the query string to check for a 'tab' parameter
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    
    // If the tab parameter exists and is valid, set it as the active tab
    if (tabParam === 'brands' || tabParam === 'clippers') {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  // Logic for pagination
  const displayedClippers = allClippers.slice(0, clippersPage * itemsPerPage);
  const displayedBrands = allBrands.slice(0, brandsPage * itemsPerPage);
  
  const hasMoreClippers = displayedClippers.length < allClippers.length;
  const hasMoreBrands = displayedBrands.length < allBrands.length;

  const handleLoadMoreClippers = () => {
    setClippersPage(prev => prev + 1);
  };

  const handleLoadMoreBrands = () => {
    setBrandsPage(prev => prev + 1);
  };

  // Handle non-authenticated interactions
  const handleNonAuthClick = () => {
    navigate('/register');
  };

  // Wrap items with authentication check
  const wrapWithAuthCheck = (component: React.ReactNode) => {
    if (!user) {
      return (
        <div onClick={handleNonAuthClick} className="cursor-pointer">
          {component}
        </div>
      );
    }
    return component;
  };

  return (
    <>
      <NavBar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 text-charcoal-800 dark:text-white">
            CLIPPERHIVE Marketplace
          </h1>
          <p className="text-lg text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto">
            Connect with skilled clippers who can transform your content into viral short-form videos
          </p>
        </div>

        {/* Tab Selector */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10 animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="clippers" className="flex items-center gap-2">
              <Scissors className="h-4 w-4" />
              Clippers Marketplace
            </TabsTrigger>
            <TabsTrigger value="brands" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Brand Marketplace
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="clippers">
            {wrapWithAuthCheck(
              <ClippersListing 
                clippers={displayedClippers} 
                hasMore={hasMoreClippers} 
                onLoadMore={handleLoadMoreClippers} 
              />
            )}
          </TabsContent>
          
          <TabsContent value="brands">
            {wrapWithAuthCheck(
              <BrandsListing 
                brands={displayedBrands} 
                hasMore={hasMoreBrands} 
                onLoadMore={handleLoadMoreBrands} 
              />
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </>
  );
};

export default Marketplace;
