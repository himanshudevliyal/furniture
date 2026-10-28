import { z } from "zod";

export const projectQuoteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is required")
    .max(150, "Name is too long"),

  // Only name and phone are required — the rest is optional.
  email: z.email({ message: "Invalid email address" }).optional().or(z.literal("")),

  phone: z
    .string()
    .trim()
    .min(1, "Mobile number is required")
    .regex(/^[0-9+\-\s()]{7,15}$/, "Enter a valid mobile number"),

  company: z
    .string()
    .trim()
    .max(150, "Company name is too long")
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .trim()
    .max(2000, "Message is too long")
    .optional()
    .or(z.literal("")),

  category: z.string().trim().max(150).optional().or(z.literal("")),
});

// Admin edit: all fields + status.
export const projectQuoteUpdateSchema = projectQuoteSchema.extend({
  status: z.enum(["pending", "contacted", "closed"], {
    message: "Invalid status",
  }),
});
