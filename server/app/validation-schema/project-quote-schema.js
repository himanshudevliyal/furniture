import { z } from "zod";

export const projectQuoteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is required")
    .max(150, "Name is too long"),

  email: z.email({ message: "Invalid email address" }),

  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,15}$/, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),

  company: z
    .string()
    .trim()
    .min(2, "Company name is required")
    .max(150, "Company name is too long"),

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
