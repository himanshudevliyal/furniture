"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Loader2,
  Mail,
  MapPin,
  Phone,
  UploadCloud,
  X,
} from "lucide-react";

import Heading from "@/components/layout/heading";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const GENERAL = "general";
const GENERAL_LABEL = "General Application";

// ---------------------------------------------------------------------------
// Schema (backend jobApplicationSchema jaisa hi)
// ---------------------------------------------------------------------------
const careerSchema = z.object({
  position: z.string().min(1, "Choose the position you are applying for"),
  name: z.string().trim().min(2, "Enter your full name").max(150),
  email: z.email({ message: "Enter a valid email address" }),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,15}$/, "Enter a valid phone number"),
  experience: z.string().optional().or(z.literal("")),
  current_location: z.string().trim().max(150).optional().or(z.literal("")),
  linkedin: z
    .string()
    .trim()
    .max(255)
    .refine((v) => !v || /^https?:\/\/\S+\.\S+/.test(v), {
      message: "Enter the full link, starting with https://",
    })
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .max(2000, "Keep the message under 2000 characters")
    .optional()
    .or(z.literal("")),
});

const EMPTY_VALUES = {
  position: GENERAL,
  name: "",
  email: "",
  phone: "",
  experience: "",
  current_location: "",
  linkedin: "",
  message: "",
};

const EXPERIENCE_OPTIONS = [
  "Fresher",
  "Less than 1 year",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];

// ---------------------------------------------------------------------------
// CV rules
// ---------------------------------------------------------------------------
const CV_EXTENSIONS = ["pdf", "doc", "docx"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validateCv(file) {
  const ext = file.name.split(".").pop().toLowerCase();
  if (!CV_EXTENSIONS.includes(ext)) return "Only PDF, DOC or DOCX files are allowed.";
  if (file.size > MAX_FILE_SIZE) return "File must be 5 MB or smaller.";
  return "";
}

// Same input style as the Contact page form.
const inputClass =
  "w-full rounded-md border border-[#e3ded4] bg-white px-4 py-3 text-neutral-900 shadow-sm transition-colors duration-300 placeholder:text-neutral-500 hover:border-[#cfc8bb] focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/5";

const errorInputClass = "border-red-400 focus:border-red-500 focus:ring-red-500/10";

function Field({ id, label, optional, error, className = "", children }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-neutral-900">
        {label}{" "}
        {optional ? (
          <span className="font-normal text-neutral-500">(optional)</span>
        ) : (
          <span className="text-[#e30613]">*</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email your CV",
    value: "sales@natrajfurniture.com",
    href: "mailto:sales@natrajfurniture.com?subject=Job%20Application",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+91 9810438876",
    href: "tel:+919810438876",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "Plot No C 40, DDA Sheds, Okhla Industrial Estate, Phase I, New Delhi 110020",
  },
];

export default function CareerForm({ jobs, selectedJobId, onSelectedJobChange }) {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [dragging, setDragging] = useState(false);
  // Bumping the key remounts the file input, clearing its value.
  const [fileInputKey, setFileInputKey] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(careerSchema),
    defaultValues: { ...EMPTY_VALUES, position: selectedJobId || GENERAL },
  });

  // "Apply Now" on a job card preselects that job here.
  useEffect(() => {
    if (selectedJobId) setValue("position", selectedJobId, { shouldValidate: true });
  }, [selectedJobId, setValue]);

  const positionField = register("position");

  const pickFile = (selected) => {
    setFileError("");
    if (!selected) return;
    const error = validateCv(selected);
    if (error) {
      setFileError(error);
      setFileInputKey((k) => k + 1);
      return;
    }
    setFile(selected);
  };

  const clearFile = () => {
    setFile(null);
    setFileError("");
    setFileInputKey((k) => k + 1);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    pickFile(e.dataTransfer.files?.[0]);
  };

  const onSubmit = async (data) => {
    if (!file) {
      setFileError("Please attach your CV.");
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      const job = jobs.find((j) => j.id === data.position);
      const { position, ...fields } = data;

      const fd = new FormData();
      Object.entries(fields).forEach(([key, value]) => fd.append(key, value ?? ""));
      fd.append("job_id", job?.id ?? "");
      fd.append("applying_for", job?.title ?? GENERAL_LABEL);
      fd.append("resume", file);

      const response = await fetch(`${API_URL}/careers/apply`, {
        method: "POST",
        body: fd,
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "We couldn't send your application.");
      }

      reset({ ...EMPTY_VALUES, position: GENERAL });
      onSelectedJobChange?.(GENERAL);
      clearFile();
      setSubmitted(true);
    } catch (error) {
      console.error("Career apply error:", error);
      setApiError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const describedBy = (name) => (errors[name] ? `career-${name}-error` : undefined);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
      {/* Left: heading + contact details */}
      <div>
        <div className="lg:sticky lg:top-28">
          <Heading
            eyebrow="APPLY NOW"
            heading="INTERESTED IN JOINING US?"
            subheading="Submit your CV, we will contact you as soon as we have relevant openings."
            headingClassName="text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.05]"
            subheadingClassName="text-base sm:text-lg leading-[1.7] text-neutral-700"
            className="text-left"
          />

          <p className="text-base leading-[1.7] text-neutral-700">
            Not sure which role fits you? Choose{" "}
            <span className="font-medium text-neutral-900">General Application</span>{" "}
            and tell us what you are good at.
          </p>

          <ul className="mt-8 space-y-5 border-t border-gray-200 pt-8">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f4f0eb]">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-neutral-500">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-base font-medium text-neutral-900 underline-offset-4 hover:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-base font-medium leading-snug text-neutral-900">
                      {value}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right: form card (same treatment as the Contact page card) */}
      <div className="rounded-md border-t-4 border-[#e30613] bg-[#f7f5f1] p-6 shadow-sm ring-1 ring-[#e3ded4] sm:p-8 lg:p-10">
        {submitted ? (
          <div className="flex flex-col items-center py-12 text-center" role="status">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
              <CheckCircle2 className="h-8 w-8" aria-hidden />
            </span>
            <h3 className="mt-6 text-2xl font-semibold text-neutral-900">
              Application received!
            </h3>
            <p className="mt-2 max-w-sm text-base leading-7 text-neutral-700">
              Thank you for your interest. Our team will review your CV and get
              in touch if your profile matches an opening.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-6 text-sm font-semibold text-neutral-900 underline decoration-neutral-400 underline-offset-[6px] hover:decoration-neutral-900"
            >
              Submit another application
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            noValidate
          >
            <div className="md:col-span-2">
              <h3 className="text-2xl font-semibold text-neutral-900">
                Submit your application
              </h3>
              <p className="mt-1 text-sm text-neutral-600">
                Fields marked with <span className="text-[#e30613]">*</span> are
                required.
              </p>
            </div>

            <Field
              id="career-position"
              label="Applying For"
              error={errors.position}
              className="md:col-span-2"
            >
              <select
                id="career-position"
                {...positionField}
                onChange={(e) => {
                  positionField.onChange(e);
                  onSelectedJobChange?.(e.target.value);
                }}
                aria-invalid={!!errors.position}
                aria-describedby={describedBy("position")}
                className={`${inputClass} cursor-pointer ${errors.position ? errorInputClass : ""}`}
              >
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                    {job.location ? ` (${job.location})` : ""}
                  </option>
                ))}
                <option value={GENERAL}>{GENERAL_LABEL}</option>
              </select>
            </Field>

            <Field id="career-name" label="Full Name" error={errors.name}>
              <input
                id="career-name"
                type="text"
                autoComplete="name"
                placeholder="John Doe"
                aria-invalid={!!errors.name}
                aria-describedby={describedBy("name")}
                {...register("name")}
                className={`${inputClass} ${errors.name ? errorInputClass : ""}`}
              />
            </Field>

            <Field id="career-email" label="Email Address" error={errors.email}>
              <input
                id="career-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={describedBy("email")}
                {...register("email")}
                className={`${inputClass} ${errors.email ? errorInputClass : ""}`}
              />
            </Field>

            <Field id="career-phone" label="Mobile Number" error={errors.phone}>
              <input
                id="career-phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="9810438876"
                aria-invalid={!!errors.phone}
                aria-describedby={describedBy("phone")}
                {...register("phone")}
                className={`${inputClass} ${errors.phone ? errorInputClass : ""}`}
              />
            </Field>

            <Field id="career-experience" label="Experience" optional>
              <select
                id="career-experience"
                {...register("experience")}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="">Select experience</option>
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </Field>

            <Field id="career-location" label="Current City" optional>
              <input
                id="career-location"
                type="text"
                autoComplete="address-level2"
                placeholder="e.g. New Delhi"
                {...register("current_location")}
                className={inputClass}
              />
            </Field>

            <Field
              id="career-linkedin"
              label="LinkedIn / Portfolio"
              optional
              error={errors.linkedin}
            >
              <input
                id="career-linkedin"
                type="url"
                placeholder="https://linkedin.com/in/..."
                aria-invalid={!!errors.linkedin}
                aria-describedby={describedBy("linkedin")}
                {...register("linkedin")}
                className={`${inputClass} ${errors.linkedin ? errorInputClass : ""}`}
              />
            </Field>

            <Field
              id="career-message"
              label="Message"
              optional
              error={errors.message}
              className="md:col-span-2"
            >
              <textarea
                id="career-message"
                rows={4}
                placeholder="Tell us a little about yourself..."
                aria-invalid={!!errors.message}
                aria-describedby={describedBy("message")}
                {...register("message")}
                className={`resize-none ${inputClass} ${errors.message ? errorInputClass : ""}`}
              />
            </Field>

            {/* CV upload — same drop zone as the Contact form attachment */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <span id="career-cv-label" className="text-sm font-medium text-neutral-900">
                Upload CV <span className="text-[#e30613]">*</span>{" "}
                <span className="font-normal text-neutral-500">
                  (PDF, DOC or DOCX, max 5 MB)
                </span>
              </span>

              {!file ? (
                <label
                  htmlFor="career-cv"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  className={`group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-7 text-center transition-colors duration-300 has-focus-visible:border-neutral-900 ${
                    dragging
                      ? "border-neutral-900 bg-white"
                      : fileError
                        ? "border-red-300 bg-white"
                        : "border-[#e3ded4] bg-white hover:border-neutral-400"
                  }`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f4f0eb] text-neutral-900 transition-transform duration-300 group-hover:-translate-y-0.5">
                    <UploadCloud className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="text-sm text-neutral-700">
                    <span className="font-semibold text-neutral-900 underline underline-offset-4">
                      Click to upload
                    </span>{" "}
                    or drag and drop your CV
                  </span>
                  <input
                    id="career-cv"
                    key={fileInputKey}
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(e) => pickFile(e.target.files?.[0])}
                    aria-labelledby="career-cv-label"
                    aria-describedby={fileError ? "career-cv-error" : undefined}
                    className="sr-only"
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between gap-4 rounded-lg border border-[#e3ded4] bg-white px-4 py-3 shadow-sm">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#f4f0eb]">
                      <FileText className="h-4 w-4" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-neutral-900">{file.name}</p>
                      <p className="text-xs text-neutral-500">
                        {file.name.split(".").pop().toUpperCase()} · {formatSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={clearFile}
                    aria-label={`Remove ${file.name}`}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-[#f4f0eb] hover:text-neutral-900"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              )}

              {fileError && (
                <p id="career-cv-error" className="text-xs font-medium text-red-600">
                  {fileError}
                </p>
              )}
            </div>

            {apiError && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 md:col-span-2"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <p>{apiError}</p>
              </div>
            )}

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="group inline-flex items-center gap-3 rounded-md bg-black py-2.5 pl-6 pr-2.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Application"}
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-700 transition-transform duration-300 group-hover:translate-x-0.5">
                  {loading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
                  )}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
