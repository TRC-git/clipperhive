
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PricingPlan } from './types';
import { useNavigate } from 'react-router-dom';

interface PricingCardProps {
  plan: PricingPlan;
  billingPeriod: 'monthly' | 'annual';
  userType: 'brands' | 'clippers';
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, billingPeriod, userType }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (userType === 'brands') {
      navigate('/brand-signup');
    } else {
      navigate('/clipper-signup');
    }
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 hover:shadow-xl shadow-[0_10px_30px_rgba(0,0,0,0.25)] flex flex-col ${
        plan.highlighted 
          ? 'ring-2 ring-honey-500 transform md:-translate-y-4'
          : 'hover:transform hover:-translate-y-2'
      }`}
    >
      <CardHeader className={`px-6 py-6 ${plan.highlighted ? 'bg-honey-50 dark:bg-charcoal-700' : ''}`}>
        <h3 className="text-2xl font-bold text-charcoal-800 dark:text-white mb-1">{plan.name}</h3>
        <div className="mb-2">
          <span className="text-4xl font-bold text-charcoal-800 dark:text-white">
            {billingPeriod === 'monthly' ? plan.price : plan.annualPrice}
          </span>
          {plan.period && (
            <span className="text-charcoal-500 dark:text-charcoal-400 ml-2 text-sm">{plan.period}</span>
          )}
        </div>
        <p className="text-charcoal-600 dark:text-charcoal-300 text-sm">{plan.description}</p>
      </CardHeader>
      
      <CardContent className="px-6 py-4 flex-grow">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-honey-500 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-charcoal-700 dark:text-charcoal-300">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="px-6 py-6 border-t border-gray-100 dark:border-charcoal-700 mt-auto">
        <Button 
          className={`w-full ${plan.highlighted ? 'bg-honey-500 hover:bg-honey-600 text-charcoal-800' : ''}`}
          variant={plan.buttonVariant}
          onClick={handleButtonClick}
        >
          {plan.buttonText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
