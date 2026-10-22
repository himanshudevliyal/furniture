import { z } from "zod";

export const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

// Server ke jobSchema jaisa hi.
export const jobSchema = z.object({
  title: z.string().trim().min(2, "Job title is required").max(150),
  department: z.string().trim().max(150).optional(),
  location: z.string().trim().max(150).optional(),
  job_type: z.string().trim().max(150).optional(),
  experience: z.string().trim().max(150).optional(),
  salary: z.string().trim().max(150).optional(),
  openings: z
    .union([
      z.literal(""),
      z.coerce.number().int("Whole number only").min(1, "At least 1"),
    ])
    .optional(),
  description: z.string().optional(),
  is_active: z.boolean(),
});

export const JOB_APPLICATION_STATUSES = [
  { value: "new", label: "New" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "rejected", label: "Rejected" },
  { value: "hired", label: "Hired" },
];

export const jobApplicationStatusStyles = {
  new: "bg-blue-100 text-blue-700",
  shortlisted: "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-700",
  hired: "bg-emerald-100 text-emerald-700",
};
