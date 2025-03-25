
import React from 'react';
import { Switch } from "@/components/ui/switch";

interface BillingToggleProps {
  billingPeriod: 'monthly' | 'annual';
  setBillingPeriod: (period: 'monthly' | 'annual') => void;
  discountPercentage: number;
}

const BillingToggle: React.FC<BillingToggleProps> = ({ 
  billingPeriod, 
  setBillingPeriod,
  discountPercentage
}) => {
  return (
    <div className="flex items-center justify-center mb-12 animate-fade-in opacity-0" 
         style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
      <span className={`mr-3 text-sm font-medium ${billingPeriod === 'monthly' ? 'text-charcoal-800 dark:text-white' : 'text-charcoal-500 dark:text-charcoal-400'}`}>
        Monthly
      </span>
      <Switch 
        checked={billingPeriod === 'annual'} 
        onCheckedChange={(checked) => setBillingPeriod(checked ? 'annual' : 'monthly')}
        className="data-[state=checked]:bg-honey-500"
      />
      <span className={`ml-3 text-sm font-medium ${billingPeriod === 'annual' ? 'text-charcoal-800 dark:text-white' : 'text-charcoal-500 dark:text-charcoal-400'}`}>
        Annual <span className="text-honey-500 font-semibold">({discountPercentage}% off)</span>
      </span>
    </div>
  );
};

export default BillingToggle;
