
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipperFormValues, clipperFormSchema } from './registerFormSchema';
import ClipperContactSection from './ClipperContactSection';
import ClipperProfessionalSection from './ClipperProfessionalSection';
import ClipperSkillsSection from './ClipperSkillsSection';

const ClipperRegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  
  const form = useForm<ClipperFormValues>({
    resolver: zodResolver(clipperFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      portfolioUrl: "",
      experience: "",
      availability: "",
      skills: "",
      message: "",
      socialNetworks: [],
    },
  });

  function onSubmit(values: ClipperFormValues) {
    console.log("Form submitted:", values);
    
    // Show success toast
    toast.success("Clipper registration successful! We'll contact you shortly.");
    
    // Redirect to home page after a short delay
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }
  
  const handleSwitchToBrands = () => {
    navigate('/brand-signup');
  };

  return (
    <div className="relative">
      {/* Shadow behind the form - wide spread, blur, 25% opacity */}
      <div className="absolute inset-0 bg-black/25 blur-3xl -z-10 rounded-3xl transform scale-[0.95] translate-y-4"></div>
      
      <Card className="border-0 bg-white/80 dark:bg-charcoal-800/80 backdrop-blur-lg shadow-lg relative z-0">
        <CardHeader className="border-b border-gray-100 dark:border-charcoal-700 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-charcoal-800 dark:text-white">Clipper Registration</CardTitle>
            <CardDescription>
              Tell us about your skills and experience
            </CardDescription>
          </div>
          <Button 
            onClick={handleSwitchToBrands}
            className="brand-button"
          >
            Switch to Brands
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ClipperContactSection />
                <ClipperProfessionalSection />
              </div>
              
              <ClipperSkillsSection />
              
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  className="brand-button py-6 px-8 w-full md:w-auto text-base font-medium"
                >
                  Complete Clipper Registration
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClipperRegistrationForm;
