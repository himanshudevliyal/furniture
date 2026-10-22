"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ---------------------------------------------------------------------------
// Schema (backend projectQuoteSchema jaisa hi)
// ---------------------------------------------------------------------------
const quoteSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.email({ message: "Enter a valid email address" }),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,15}$/, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
  company: z.string().trim().min(2, "Company name is required"),
  message: z
    .string()
    .trim()
    .max(2000, "Message is too long")
    .optional()
    .or(z.literal("")),
});

const inputClass =
  "w-full rounded-md border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 shadow-sm transition placeholder:text-neutral-500 hover:border-neutral-300 focus:border-[#e30613] focus:outline-none focus:ring-4 focus:ring-[#e30613]/10";

const errorInputClass =
  "border-red-400 focus:border-red-500 focus:ring-red-500/10";

function Field({ id, label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-medium text-neutral-800">
        {label}{" "}
        {required ? (
          <span className="text-[#e30613]">*</span>
        ) : (
          <span className="font-normal text-neutral-500">(optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p className="text-xs font-medium text-red-600">{error.message}</p>
      )}
    </div>
  );
}

export default function ProjectQuoteForm({ category, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");

    try {
      const response = await fetch(`${API_URL}/project-quotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, category: category || "" }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit your request");
      }

      reset();
      setSubmitted(true);
      onSuccess?.();
    } catch (error) {
      console.error("Project quote error:", error);
      setApiError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center px-2 py-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-neutral-900">
          Thank you!
        </h3>
        <p className="mt-1.5 max-w-xs text-sm text-neutral-500">
          Your quote request has been received. Our team will get back to you
          within one working day.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-5 text-sm font-medium text-[#e30613] underline-offset-4 hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      noValidate
    >
      <Field id="quote-name" label="Name" required error={errors.name}>
        <input
          id="quote-name"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          {...register("name")}
          className={`${inputClass} ${errors.name ? errorInputClass : ""}`}
        />
      </Field>

      <Field id="quote-email" label="Email address" required error={errors.email}>
        <input
          id="quote-email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          {...register("email")}
          className={`${inputClass} ${errors.email ? errorInputClass : ""}`}
        />
      </Field>

      <Field id="quote-phone" label="Telephone number" error={errors.phone}>
        <input
          id="quote-phone"
          type="tel"
          autoComplete="tel"
          placeholder="+91 98104 38876"
          {...register("phone")}
          className={`${inputClass} ${errors.phone ? errorInputClass : ""}`}
        />
      </Field>

      <Field id="quote-company" label="Company name" required error={errors.company}>
        <input
          id="quote-company"
          type="text"
          autoComplete="organization"
          placeholder="Your company"
          {...register("company")}
          className={`${inputClass} ${errors.company ? errorInputClass : ""}`}
        />
      </Field>

      <div className="sm:col-span-2">
        <Field id="quote-message" label="Content" error={errors.message}>
          <textarea
            id="quote-message"
            rows={4}
            placeholder="Tell us about your project — space size, quantities, timeline..."
            {...register("message")}
            className={`resize-none ${inputClass} ${errors.message ? errorInputClass : ""}`}
          />
        </Field>
      </div>

      {apiError && (
        <div className="flex items-start gap-2.5 rounded-md border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700 sm:col-span-2">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p>{apiError}</p>
        </div>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#e30613] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#e30613]/20 transition-all hover:bg-[#b8050f] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Sending...
            </>
          ) : (
            <>
              Request Quote
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
