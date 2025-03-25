
import React from 'react';
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Instagram, Youtube, Tv, MessageCircle, Twitter, MessagesSquare } from "lucide-react";
import { ClipperFormValues, socialNetworkOptions } from './registerFormSchema';

const ClipperSkillsSection = () => {
  const form = useFormContext<ClipperFormValues>();

  // Social network icons mapping
  const socialNetworkIcons = {
    TikTok: () => (
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="mr-2"
      >
        <path d="M21 8v2a5.997 5.997 0 0 1-3-1V15a7 7 0 1 1-7-7v4c0 1.1.9 2 2 2s2-.9 2-2V3h3a3 3 0 0 0 3 3V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    YouTube: () => <Youtube size={16} className="mr-2" />,
    Instagram: () => <Instagram size={16} className="mr-2" />,
    Twitch: () => <Tv size={16} className="mr-2" />,
    Telegram: () => <MessageCircle size={16} className="mr-2" />,
    "X.com": () => <Twitter size={16} className="mr-2" />,
    Discord: () => <MessagesSquare size={16} className="mr-2" />
  };

  return (
    <div className="border-t border-gray-100 dark:border-charcoal-700 pt-6">
      <h3 className="text-lg font-semibold mb-4 text-charcoal-800 dark:text-white">
        Skills & Expertise
      </h3>
      
      <FormField
        control={form.control}
        name="skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Key Skills</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Video editing, motion graphics, storytelling, etc."
                className="min-h-24"
                {...field}
              />
            </FormControl>
            <FormDescription>
              List your main skills and areas of expertise, separated by commas.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Social Networks Selection */}
      <div className="mt-6">
        <FormLabel className="block mb-2">Social Networks</FormLabel>
        <FormDescription className="mb-3">
          Select the platforms where you create content.
        </FormDescription>
        
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {socialNetworkOptions.map((network) => (
            <FormField
              key={network}
              control={form.control}
              name="socialNetworks"
              render={({ field }) => {
                return (
                  <FormItem
                    key={network}
                    className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-3"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(network)}
                        onCheckedChange={(checked) => {
                          const currentValue = field.value || [];
                          return checked
                            ? field.onChange([...currentValue, network])
                            : field.onChange(
                                currentValue.filter((value) => value !== network)
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="flex items-center font-normal cursor-pointer">
                      {socialNetworkIcons[network as keyof typeof socialNetworkIcons]?.()}
                      {network}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
        </div>
      </div>
      
      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem className="mt-6">
            <FormLabel>Additional Information (optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us more about your experience, software proficiency, or anything else you'd like us to know..."
                className="min-h-32"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ClipperSkillsSection;
