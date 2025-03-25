
export type PlanFeature = string;

export interface PricingPlan {
  name: string;
  price: string;
  annualPrice: string;
  period?: string;
  description: string;
  features: PlanFeature[];
  buttonText: string;
  buttonVariant: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive" | null;
  highlighted: boolean;
}

export interface EnterprisePlan {
  name: string;
  description: string;
  features: PlanFeature[];
  buttonText: string;
}
