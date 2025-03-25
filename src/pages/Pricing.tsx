
import React, { useState } from 'react';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Scissors, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import PricingGrid from '@/components/pricing/PricingGrid';
import EnterprisePlan from '@/components/pricing/EnterprisePlan';
import BillingToggle from '@/components/pricing/BillingToggle';
import { 
  getClipperPricingPlans, 
  getBrandPricingPlans, 
  clipperEnterprisePlan, 
  brandEnterprisePlan,
  annualDiscountPercentage
} from '@/components/pricing/pricingData';

const Pricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  
  // Get pricing plans based on the current billing period
  const clipperPricingPlans = getClipperPricingPlans(billingPeriod);
  const brandPricingPlans = getBrandPricingPlans(billingPeriod);

  return (
    <>
      <NavBar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 text-charcoal-800 dark:text-white">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto">
            Choose the perfect plan for your content clipping needs
          </p>
        </div>

        {/* Billing Period Toggle */}
        <BillingToggle 
          billingPeriod={billingPeriod} 
          setBillingPeriod={setBillingPeriod}
          discountPercentage={annualDiscountPercentage}
        />

        {/* Tab Selector */}
        <Tabs defaultValue="brands" className="mb-12 animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="brands" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              For Brands
            </TabsTrigger>
            <TabsTrigger value="clippers" className="flex items-center gap-2">
              <Scissors className="h-4 w-4" />
              For Clippers
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="brands">
            <PricingGrid plans={brandPricingPlans} billingPeriod={billingPeriod} userType="brands" />
            <EnterprisePlan plan={brandEnterprisePlan} />
          </TabsContent>
          
          <TabsContent value="clippers">
            <PricingGrid plans={clipperPricingPlans} billingPeriod={billingPeriod} userType="clippers" />
            <EnterprisePlan plan={clipperEnterprisePlan} />
          </TabsContent>
        </Tabs>

        <div className="mt-16 bg-gray-50 dark:bg-charcoal-700/30 rounded-lg p-8 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal-800 dark:text-white mb-4">Need a custom solution?</h2>
          <p className="text-charcoal-600 dark:text-charcoal-300 mb-6">
            Contact our sales team for a tailored plan that meets your specific requirements
          </p>
          <Button className="bg-honey-500 hover:bg-honey-600 text-charcoal-800">
            Contact Sales
          </Button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Pricing;
