
import { EnterprisePlan, PricingPlan } from "./types";

// Calculate discount percentage for annual billing
const annualDiscountPercent = 20;

export const calculateAnnualPrice = (monthlyPrice: number) => {
  if (typeof monthlyPrice !== 'number') return 'Custom';
  const annualPrice = (monthlyPrice * 12 * (100 - annualDiscountPercent)) / 100;
  return `$${annualPrice}`;
};

export const getClipperPricingPlans = (billingPeriod: 'monthly' | 'annual'): PricingPlan[] => [
  {
    name: "Free",
    price: "$0",
    annualPrice: "$0",
    description: "Perfect for exploring what ClipperHive has to offer",
    features: [
      "Browse the Marketplace",
      "Create a Basic Profile",
      "Apply to 3 Projects/Month",
      "Basic Analytics",
      "Community Access",
    ],
    buttonText: "Sign Up Now",
    buttonVariant: "outline",
    highlighted: false,
  },
  {
    name: "Premier",
    price: "$69",
    annualPrice: calculateAnnualPrice(69),
    period: billingPeriod === 'monthly' ? "per month" : "per year",
    description: "For serious clippers ready to take their work to the next level",
    features: [
      "Everything in Free",
      "Premium Profile",
      "5 Projects/Month",
      "1 Sponsored Post/Month",
      "Advanced Analytics",
      "Live Support",
      "Better Visibility",
    ],
    buttonText: "Sign Up Now",
    buttonVariant: "default",
    highlighted: true,
  },
  {
    name: "Promote",
    price: "$99",
    annualPrice: calculateAnnualPrice(99),
    period: billingPeriod === 'monthly' ? "per month" : "per year",
    description: "For professional clippers seeking maximum visibility",
    features: [
      "Everything in Premier",
      "Profile Placement (Be Seen First)",
      "3 Sponsored Posts",
      "Unlimited Projects/Month",
      "Dedicated Support",
    ],
    buttonText: "Sign Up Now",
    buttonVariant: "outline",
    highlighted: false,
  },
];

export const clipperEnterprisePlan: EnterprisePlan = {
  name: "Enterprise",
  description: "Tailored solution for large organizations with custom needs. Branding agencies to host their own branding team and platform. White-label Solution.",
  features: [
    "Everything in Promote",
    "White-Label Solution",
    "Dedicated Support Team",
    "API Access",
    "Custom Workflows",
    "MSA & Custom Contracts",
  ],
  buttonText: "Contact Sales",
};

export const getBrandPricingPlans = (billingPeriod: 'monthly' | 'annual'): PricingPlan[] => [
  {
    name: "Free",
    price: "$0",
    annualPrice: "$0",
    period: "/month",
    description: "For brands just getting started with content clipping",
    features: [
      "Browse the Marketplace",
      "Create a Basic Profile",
      "Post 1 Campaign/Month",
      "Basic Analytics",
      "Community Access",
    ],
    buttonText: "Sign Up Now",
    buttonVariant: "outline",
    highlighted: false,
  },
  {
    name: "Premier",
    price: "$99",
    annualPrice: calculateAnnualPrice(99),
    period: billingPeriod === 'monthly' ? "/month" : "/year",
    description: "For growing brands with regular content needs",
    features: [
      "Everything in Free",
      "Post 5 Campaigns/Month",
      "Premium Profile",
      "1 Sponsored Campaign/Month",
      "Advanced Analytics",
      "Live Support",
      "Better Visibility",
    ],
    buttonText: "Sign Up Now",
    buttonVariant: "default",
    highlighted: true,
  },
  {
    name: "Promote",
    price: "$189",
    annualPrice: calculateAnnualPrice(189),
    period: billingPeriod === 'monthly' ? "/month" : "/year",
    description: "For established brands with sophisticated content needs",
    features: [
      "Everything in Premier",
      "Unlimited Campaigns",
      "2 Sponsored Campaigns/Month",
      "Profile Placement (Top of Category)",
    ],
    buttonText: "Sign Up Now",
    buttonVariant: "outline",
    highlighted: false,
  },
];

export const brandEnterprisePlan: EnterprisePlan = {
  name: "Enterprise",
  description: "Tailored solution for large organizations with custom needs. Branding agencies to host their own branding team and platform. White-label Solution.",
  features: [
    "Everything in Promote",
    "White-Label Solution",
    "Dedicated Success Team",
    "MSA & Custom Contracts",
    "API Access",
    "Custom Workflow Integration",
    "Guaranteed Response Times",
  ],
  buttonText: "Contact Sales",
};

export const annualDiscountPercentage = annualDiscountPercent;
