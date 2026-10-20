import { z } from "zod";

/** Shared by the client form (react-hook-form) and the API route. */
export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address").max(160),
  countryCode: z.string().trim().regex(/^\+\d{1,4}$/, "Invalid country code"),
  phone: z
    .string()
    .trim()
    .max(20)
    .refine((v) => v === "" || /^[\d\s().-]{6,20}$/.test(v), "Enter a valid phone number"),
  message: z.string().trim().max(5000, "Message is too long"),
  /** Honeypot: real users never see it. Any value is accepted here and silently dropped by the API route. */
  company: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address").max(160),
  company: z.string().max(200).optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
