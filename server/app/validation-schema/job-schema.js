import { z } from "zod";

const optionalText = (max = 150) =>
  z.string().trim().max(max).optional().nullable().or(z.literal(""));

export const jobSchema = z.object({
  title: z.string().trim().min(2, "Job title is required").max(150),
  department: optionalText(),
  location: optionalText(),
  job_type: optionalText(),
  experience: optionalText(),
  salary: optionalText(),
  openings: z.coerce
    .number()
    .int("Openings must be a whole number")
    .min(1, "Openings must be at least 1")
    .optional()
    .nullable(),
  description: z.string().optional().nullable(),
  is_active: z.boolean().optional(),
});

export const jobStatusSchema = z.object({
  is_active: z.boolean({ message: "is_active must be true or false" }),
});

export const jobApplicationSchema = z.object({
  job_id: z.uuid({ message: "Invalid job" }).optional().nullable().or(z.literal("")),
  applying_for: z
    .string()
    .trim()
    .min(2, "Please select the position you are applying for")
    .max(150),
  name: z.string().trim().min(2, "Name is required").max(150),
  email: z.email({ message: "Invalid email address" }),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,15}$/, "Enter a valid phone number"),
  experience: optionalText(50),
  current_location: optionalText(),
  linkedin: optionalText(255),
  message: optionalText(2000),
});

export const JOB_APPLICATION_STATUSES = [
  "new",
  "shortlisted",
  "rejected",
  "hired",
];
