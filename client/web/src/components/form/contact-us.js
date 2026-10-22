"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  AlertCircle,
  Paperclip,
  UploadCloud,
  X,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ---------------------------------------------------------------------------
// Schema (backend userQuerySchema jaisa hi)
// ---------------------------------------------------------------------------
export const REASON_FOR_CONTACT = [
  "domestic_sales_enquiry",
  "export_sales_enquiry",
  "after_sales_services",
  "career",
  "become_a_vendor",
];

const REASON_LABELS = {
  domestic_sales_enquiry: "Domestic Sales Enquiry",
  export_sales_enquiry: "Export Sales Enquiry",
  after_sales_services: "After Sales Services",
  career: "Career",
  become_a_vendor: "Become a Vendor",
};

const contactSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.email({ message: "Invalid email address" }),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().optional().or(z.literal("")),
  reason: z.enum(REASON_FOR_CONTACT, {
    message: "Please select a reason for contact",
  }),
});

// ---------------------------------------------------------------------------
// Attachment rules
// ---------------------------------------------------------------------------
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// /upload/files ke response me se file URL/path nikalta hai, shape kuch bhi ho
const URL_KEYS = [
  "url", "fileUrl", "file_url", "secure_url", "location", "Location",
  "path", "filePath", "file_path", "key", "Key", "filename", "fileName", "file",
];
const looksLikeFile = (s) =>
  typeof s === "string" && (/^https?:\/\//.test(s) || s.includes("/") || /\.\w{2,5}$/.test(s));

function extractUploadedUrl(result, depth = 0) {
  if (result == null || depth > 5) return "";
  if (typeof result === "string") return looksLikeFile(result) ? result : "";
  if (Array.isArray(result)) {
    for (const item of result) {
      const found = extractUploadedUrl(item, depth + 1);
      if (found) return found;
    }
    return "";
  }
  if (typeof result === "object") {
    for (const key of URL_KEYS) {
      if (typeof result[key] === "string" && result[key]) return result[key];
    }
    for (const [key, value] of Object.entries(result)) {
      if (["message", "error", "status", "success"].includes(key)) continue;
      const found = extractUploadedUrl(value, depth + 1);
      if (found) return found;
    }
  }
  return "";
}

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const inputClass =
  "w-full rounded-md border border-[#e3ded4] bg-white px-4 py-3 text-[#3a352f] shadow-sm transition placeholder:text-[#b0a99c] hover:border-[#cfc8bb] focus:border-[#e30613] focus:outline-none focus:ring-4 focus:ring-[#e30613]/10";

const errorInputClass =
  "border-red-400 focus:border-red-500 focus:ring-red-500/10";

function FieldLabel({ htmlFor, children, optional }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-[#3a352f]">
      {children}{" "}
      {optional ? (
        <span className="font-normal text-[#6b655a]">(optional)</span>
      ) : (
        <span className="text-[#e30613]">*</span>
      )}
    </label>
  );
}

function FieldError({ error }) {
  if (!error) return null;
  return <p className="text-xs font-medium text-red-600">{error.message}</p>;
}

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [apiError, setApiError] = useState("");

  const [file, setFile] = useState(null); // selected File object
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      reason: undefined,
    },
  });

  const selectedReason = watch("reason");

  // ---------------------------------------------------------------------
  // File select (sirf state me rakhte hain, upload nahi)
  // ---------------------------------------------------------------------
  const clearFile = () => {
    setFile(null);
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    setFileError("");
    if (!selected) return;

    if (!ALLOWED_TYPES.includes(selected.type)) {
      setFileError("Only JPG, PNG, WEBP or PDF files are allowed");
      e.target.value = "";
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setFileError("File must be 5 MB or smaller");
      e.target.value = "";
      return;
    }

    setFile(selected);
  };

  // ---------------------------------------------------------------------
  // Submit — saare fields + file ek hi request me /queries par
  // ---------------------------------------------------------------------
  const onSubmit = async (data) => {
    setLoading(true);
    setSuccess("");
    setApiError("");

    try {
      // 1) File ho to pehle /upload/files par bhejo aur uska URL/path lo
      let attachment = "";
      if (file) {
        const fd = new FormData();
        fd.append("files", file); // backend ka field naam alag ho to yahan badlo

        const upRes = await fetch(`${API_URL}/upload/files`, {
          method: "POST",
          body: fd,
        });
        const upText = await upRes.text();
        let upResult;
        try {
          upResult = JSON.parse(upText);
        } catch {
          upResult = upText;
        }
        console.log("Upload response:", upResult);

        if (!upRes.ok) {
          throw new Error(upResult?.message || "File upload failed");
        }
        attachment = extractUploadedUrl(upResult);
        if (!attachment) {
          throw new Error("File upload hua par URL nahi mila (console check karo)");
        }
      }

      // 2) /queries par JSON bhejo (backend JSON hi padhta hai)
      const response = await fetch(`${API_URL}/queries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, attachment }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setSuccess(result.message || "Message sent successfully!");
        reset();
        clearFile();
      } else {
        setApiError(result.message || "Failed to submit enquiry");
      }
    } catch (error) {
      console.error("API Error:", error);
      setApiError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
      noValidate
    >
      {/* Header */}
      <div className="md:col-span-2">
        <h3 className="text-2xl font-semibold text-[#3a352f]">
          Send us a message
        </h3>
        <p className="mt-1 text-sm text-[#6b655a]">
          Fields marked with <span className="text-[#e30613]">*</span> are
          required.
        </p>
      </div>

      {/* Reason for Contact */}
      <fieldset className="md:col-span-2">
        <legend className="mb-3 text-sm font-medium text-[#3a352f]">
          Reason for Contact <span className="text-[#e30613]">*</span>
        </legend>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {REASON_FOR_CONTACT.map((value) => {
            const active = selectedReason === value;
            return (
              <label
                key={value}
                className={`relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 px-3 py-5 text-center transition-all duration-200 ${
                  active
                    ? "border-[#e30613] bg-[#e30613]/5 shadow-md shadow-[#e30613]/10"
                    : "border-[#e3ded4] bg-white hover:-translate-y-0.5 hover:border-[#e30613]/40 hover:shadow-sm"
                }`}
              >
                <input
                  type="radio"
                  value={value}
                  {...register("reason")}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors peer-focus-visible:ring-4 peer-focus-visible:ring-[#e30613]/20 ${
                    active ? "border-[#e30613]" : "border-[#cfc8bb]"
                  }`}
                >
                  {active && (
                    <span className="h-3 w-3 rounded-full bg-[#e30613]" />
                  )}
                </span>
                <span
                  className={`text-sm leading-snug ${
                    active ? "font-medium text-[#e30613]" : "text-[#5c564c]"
                  }`}
                >
                  {REASON_LABELS[value]}
                </span>
              </label>
            );
          })}
        </div>

        <div className="mt-2">
          <FieldError error={errors.reason} />
        </div>
      </fieldset>

      {/* Name */}
      <div className="flex flex-col gap-2">
        <FieldLabel htmlFor="name">Full Name</FieldLabel>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          {...register("name")}
          className={`${inputClass} ${errors.name ? errorInputClass : ""}`}
        />
        <FieldError error={errors.name} />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <FieldLabel htmlFor="email">Email Address</FieldLabel>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          className={`${inputClass} ${errors.email ? errorInputClass : ""}`}
        />
        <FieldError error={errors.email} />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-2">
        <FieldLabel htmlFor="phone">Mobile Number</FieldLabel>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center border-r border-[#e3ded4] px-3 text-sm text-[#6b655a]">
            +91
          </span>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="9810438876"
            {...register("phone")}
            className={`${inputClass} pl-16 ${errors.phone ? errorInputClass : ""}`}
          />
        </div>
        <FieldError error={errors.phone} />
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-2">
        <FieldLabel htmlFor="subject">Subject</FieldLabel>
        <input
          id="subject"
          type="text"
          placeholder="How can we help?"
          {...register("subject")}
          className={`${inputClass} ${errors.subject ? errorInputClass : ""}`}
        />
        <FieldError error={errors.subject} />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <FieldLabel htmlFor="message" optional>
          Message
        </FieldLabel>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about your requirement..."
          {...register("message")}
          className={`resize-none ${inputClass}`}
        />
        <FieldError error={errors.message} />
      </div>

      {/* Attachment */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <span className="text-sm font-medium text-[#3a352f]">
          Attachment{" "}
          <span className="font-normal text-[#6b655a]">
            (optional · image or PDF, max 5 MB)
          </span>
        </span>

        {!file ? (
          <label
            htmlFor="attachment-file"
            className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#e3ded4] bg-white px-4 py-7 text-center transition-colors hover:border-[#e30613]/50 hover:bg-[#e30613]/[0.03]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e30613]/10 text-[#e30613] transition-transform group-hover:scale-110">
              <UploadCloud className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-sm text-[#3a352f]">
              <span className="font-medium text-[#e30613]">Click to upload</span>{" "}
              a reference file
            </span>
            <span className="text-xs text-[#6b655a]">JPG, PNG, WEBP or PDF</span>
          </label>
        ) : (
          <div className="flex items-center justify-between gap-4 rounded-lg border border-[#e3ded4] bg-white px-4 py-3 shadow-sm">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#e30613]/10 text-[#e30613]">
                <Paperclip className="h-4 w-4" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#3a352f]">
                  {file.name}
                </p>
                <p className="text-xs text-[#6b655a]">
                  {file.type === "application/pdf" ? "PDF" : "Image"} ·{" "}
                  {formatSize(file.size)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={clearFile}
              aria-label="Remove file"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#6b655a] transition-colors hover:bg-[#e30613]/10 hover:text-[#e30613]"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        )}

        <input
          id="attachment-file"
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          onChange={handleFileChange}
          className="sr-only"
        />

        {fileError && (
          <p className="text-xs font-medium text-red-600">{fileError}</p>
        )}
      </div>

      {/* Success */}
      {success && (
        <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 md:col-span-2">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p>{success}</p>
        </div>
      )}

      {/* API Error */}
      {apiError && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 md:col-span-2">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p>{apiError}</p>
        </div>
      )}

      {/* Submit */}
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-sm bg-[#3a352f] px-8 py-3 text-[#f7f5f1] transition-colors hover:bg-[#4a453d] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
