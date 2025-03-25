
import React from 'react';
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { BrandFormValues, budgetRanges } from './registerFormSchema';

const ContentSection = () => {
  const form = useFormContext<BrandFormValues>();

  return (
    <div className="border-t border-gray-100 dark:border-charcoal-700 pt-6">
      <h3 className="text-lg font-semibold mb-4 text-charcoal-800 dark:text-white">
        Content Needs
      </h3>
      
      <FormField
        control={form.control}
        name="monthlyBudget"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Monthly Content Budget</FormLabel>
            <FormControl>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                {...field}
              >
                <option value="" disabled>Select a budget range</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </FormControl>
            <FormDescription>
              This helps us match you with appropriate clippers.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem className="mt-4">
            <FormLabel>Additional Information (optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us more about your content needs, target audience, or specific requirements..."
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

export default ContentSection;
