
import React from 'react';
import PricingCard from './PricingCard';
import { PricingPlan } from './types';

interface PricingGridProps {
  plans: PricingPlan[];
  billingPeriod: 'monthly' | 'annual';
  userType: 'brands' | 'clippers';
}

const PricingGrid: React.FC<PricingGridProps> = ({ plans, billingPeriod, userType }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
      {plans.map((plan) => (
        <PricingCard 
          key={plan.name}
          plan={plan}
          billingPeriod={billingPeriod}
          userType={userType}
        />
      ))}
    </div>
  );
};

export default PricingGrid;
