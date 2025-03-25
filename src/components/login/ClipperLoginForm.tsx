import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ClipperLoginValues, clipperLoginSchema } from './loginFormSchema';
const ClipperLoginForm: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<ClipperLoginValues>({
    resolver: zodResolver(clipperLoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });
  function onSubmit(values: ClipperLoginValues) {
    console.log("Login submitted:", values);
    toast.success("Login successful! Redirecting to dashboard...");
    setTimeout(() => {
      navigate('/');
    }, 1500);
  }
  return <div className="relative">
      {/* Shadow behind the form */}
      <div className="absolute inset-0 bg-black/25 blur-3xl -z-10 rounded-3xl transform scale-[0.95] translate-y-4"></div>
      
      <Card className="border-0 bg-white/80 dark:bg-charcoal-800/80 backdrop-blur-lg shadow-lg relative z-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-zinc-700 text-left text-base">Clipper Sign In</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="email" render={({
              field
            }) => <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="password" render={({
              field
            }) => <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <div className="flex items-center justify-between">
                <FormField control={form.control} name="rememberMe" render={({
                field
              }) => <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">Remember me</FormLabel>
                    </FormItem>} />
                
                <a href="#" className="text-sm text-honey-500 hover:underline">
                  Forgot password?
                </a>
              </div>
              
              <div className="flex justify-center pt-2">
                <Button type="submit" className="brand-button py-5 px-8 w-full text-base font-medium">
                  Sign In
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>;
};
export default ClipperLoginForm;