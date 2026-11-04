import { z } from "zod";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

// "How many units are you looking to purchase?" choices.
export const UNIT_OPTIONS = ["1-10", "11-50", "51-100", "101-500", "500+"];

// Website "Book an Appointment" form. Only name, phone and the slot are
// required; whether the slot is free is checked in the controller.
export const appointmentSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(150, "Name is too long"),

  phone: z
    .string()
    .trim()
    .min(1, "Mobile number is required")
    .regex(/^[0-9+\-\s()]{7,15}$/, "Enter a valid mobile number"),

  email: z.email({ message: "Invalid email address" }).optional().or(z.literal("")),

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

  address: z.string().trim().max(300, "Address is too long").optional().or(z.literal("")),

  for_business: z.enum(["yes", "no"]).optional().or(z.literal("")),

  units: z.enum(UNIT_OPTIONS).optional().or(z.literal("")),

  booking_date: z.string({ message: "Please choose a date" }).regex(DATE_RE, "Please choose a date"),
  booking_time: z.string({ message: "Please choose a time" }).regex(TIME_RE, "Please choose a time"),
});

// Admin: status change.
export const appointmentStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "completed", "cancelled"], {
    message: "Invalid status",
  }),
});

// Admin: switch a whole day (no time) or one slot off.
export const appointmentSlotBlockSchema = z.object({
  date: z.string().regex(DATE_RE, "Invalid date"),
  time: z.string().regex(TIME_RE, "Invalid time").nullable().optional(),
  reason: z.string().trim().max(150).optional().or(z.literal("")),
});
