import React from 'react';
import Footer from "@/components/Footer";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const Pricing: React.FC = () => {
  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for exploring what ClipperHive has to offer",
      features: [
        "Browse the marketplace",
        "Create a basic profile",
        "Apply to 3 projects per month",
        "Basic analytics",
        "Community access",
      ],
      buttonText: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "Ideal for serious clippers and growing brands",
      features: [
        "Everything in Free",
        "Premium profile placement",
        "Unlimited project applications",
        "Advanced analytics dashboard",
        "Priority support",
        "Dedicated account manager",
        "Custom branding options",
      ],
      buttonText: "Start Pro Plan",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For established brands with high-volume needs",
      features: [
        "Everything in Pro",
        "API access",
        "White-label solution",
        "Custom workflow integration",
        "Dedicated success team",
        "Guaranteed response times",
        "MSA and custom contracts",
      ],
      buttonText: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <>
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 text-charcoal-800 dark:text-white">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto">
            Choose the perfect plan for your content clipping needs
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.name}
              className={`
                rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex-1 max-w-md
                ${plan.highlighted 
                  ? 'ring-2 ring-honey-500 transform md:-translate-y-4 bg-white dark:bg-charcoal-800'
                  : 'bg-white dark:bg-charcoal-800 hover:transform hover:-translate-y-2'
                }
              `}
            >
              <div className={`px-6 py-12 border-b border-gray-100 dark:border-charcoal-700 ${plan.highlighted ? 'bg-honey-50 dark:bg-charcoal-700' : ''}`}>
                <h3 className="text-2xl font-bold text-charcoal-800 dark:text-white mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-charcoal-800 dark:text-white">{plan.price}</span>
                  {plan.period && (
                    <span className="text-charcoal-500 dark:text-charcoal-400 ml-2">{plan.period}</span>
                  )}
                </div>
                <p className="text-charcoal-600 dark:text-charcoal-300 mb-6">{plan.description}</p>
                <Button 
                  className={`w-full ${plan.highlighted ? 'bg-honey-500 hover:bg-honey-600 text-charcoal-800' : ''}`}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </div>
              <div className="px-6 py-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-honey-500 mr-3 flex-shrink-0" />
                      <span className="text-charcoal-700 dark:text-charcoal-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

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
