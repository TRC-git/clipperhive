
import * as z from "zod";

export const brandFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(5, {
    message: "Please enter a valid phone number.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Confirm password must be at least 8 characters.",
  }),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  website: z.string().url({
    message: "Please enter a valid URL.",
  }).optional().or(z.literal('')),
  industry: z.string().min(2, {
    message: "Please specify your industry.",
  }),
  monthlyBudget: z.string({
    required_error: "Please select a budget range.",
  }),
  message: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const clipperFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(5, {
    message: "Please enter a valid phone number.",
  }),
  portfolioUrl: z.string().url({
    message: "Please enter a valid portfolio URL.",
  }).optional().or(z.literal('')),
  experience: z.string({
    required_error: "Please select your experience level.",
  }),
  availability: z.string({
    required_error: "Please select your availability.",
  }),
  skills: z.string().min(2, {
    message: "Please list your key skills.",
  }),
  message: z.string().optional(),
  socialNetworks: z.array(z.string()).optional(),
});

export const budgetRanges = [
  "Under $1,000",
  "$1,000 - $3,000",
  "$3,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $20,000",
  "Above $20,000"
];

export const experienceLevels = [
  "Less than 1 year",
  "1-2 years",
  "3-5 years",
  "5+ years",
  "10+ years"
];

export const availabilityOptions = [
  "Part-time (less than 20hrs/week)",
  "Full-time (20-40hrs/week)",
  "Contract work only",
  "Flexible"
];

export const socialNetworkOptions = [
  "TikTok",
  "YouTube",
  "Instagram",
  "Twitch",
  "Telegram",
  "X.com",
  "Discord"
];

export type BrandFormValues = z.infer<typeof brandFormSchema>;
export type ClipperFormValues = z.infer<typeof clipperFormSchema>;
