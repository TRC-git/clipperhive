
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BrandFormValues, brandFormSchema } from './registerFormSchema';
import ContactSection from './ContactSection';
import CompanySection from './CompanySection';
import ContentSection from './ContentSection';

const BrandRegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  
  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      website: "",
      industry: "",
      monthlyBudget: "",
      message: "",
    },
  });

  function onSubmit(values: BrandFormValues) {
    console.log("Form submitted:", values);
    
    // Show success toast
    toast.success("Brand registration successful! We'll contact you shortly.");
    
    // Redirect to home page after a short delay
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }
  
  const handleSwitchToClipper = () => {
    navigate('/clipper-signup');
  };

  return (
    <div className="relative">
      {/* Shadow behind the form - wide spread, blur, 25% opacity */}
      <div className="absolute inset-0 bg-black/25 blur-3xl -z-10 rounded-3xl transform scale-[0.95] translate-y-4"></div>
      
      <Card className="border-0 bg-white/80 dark:bg-charcoal-800/80 backdrop-blur-lg shadow-lg relative z-0">
        <CardHeader className="border-b border-gray-100 dark:border-charcoal-700 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-charcoal-800 dark:text-white">Brand Registration</CardTitle>
            <CardDescription>
              Tell us about your company and content needs
            </CardDescription>
          </div>
          <Button 
            onClick={handleSwitchToClipper}
            className="brand-button"
          >
            Switch to Clipper
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ContactSection />
                <CompanySection />
              </div>
              
              <ContentSection />
              
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  className="brand-button py-6 px-8 w-full md:w-auto text-base font-medium"
                >
                  Complete Brand Registration
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandRegistrationForm;
