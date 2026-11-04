import { z } from "zod";

export const REASON_FOR_CONTACT = [
  "domestic_sales_enquiry",
  "export_sales_enquiry",
  "after_sales_services",
  "career",
  "become_a_vendor",
];

// Contact Us: only the mobile number is required.
export const userQuerySchema = z.object({
  name: z.string().trim().max(150).optional().or(z.literal("")),
  email: z.email({ message: "Invalid email address" }).optional().or(z.literal("")),
  phone: z
    .string({ message: "Mobile number is required" })
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().optional().or(z.literal("")),

  reason: z
    .enum(REASON_FOR_CONTACT, { message: "Please select a reason for contact" })
    .optional()
    .or(z.literal("")),

  // Optional reference image/PDF, already uploaded via /upload/files.
  attachment: z.string().optional().or(z.literal("")),
});
