
import React from 'react';
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnterprisePlan as EnterprisePlanType } from './types';

interface EnterprisePlanProps {
  plan: EnterprisePlanType;
}

const EnterprisePlan: React.FC<EnterprisePlanProps> = ({ plan }) => {
  return (
    <Card className="mt-8 overflow-hidden transition-all duration-300 hover:shadow-xl shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8">
          <h3 className="text-3xl font-bold text-charcoal-800 dark:text-white mb-4">{plan.name}</h3>
          <p className="text-charcoal-600 dark:text-charcoal-300 mb-6">{plan.description}</p>
          <Button className="bg-charcoal-800 hover:bg-charcoal-900 text-white">
            {plan.buttonText}
          </Button>
        </div>
        
        <div className="p-8 bg-gray-50 dark:bg-charcoal-800/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <Check className="h-5 w-5 text-honey-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-charcoal-700 dark:text-charcoal-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EnterprisePlan;
