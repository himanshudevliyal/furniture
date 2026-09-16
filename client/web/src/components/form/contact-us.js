"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod Schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccess("");
    setApiError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/queries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message || "Message sent successfully!");
        reset();
      } else {
        setApiError(result.message || "Failed to submit enquiry");
      }
    } catch (error) {
      console.error("API Error:", error);
      setApiError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      {/* Name */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="text-sm text-[#3a352f]"
        >
          Your Name
        </label>

        <input
          id="name"
          type="text"
          placeholder="John Doe"
          {...register("name")}
          className="rounded-sm border border-transparent bg-[#eeece7] px-4 py-3 text-[#3a352f] placeholder:text-[#8a8478] focus:border-[#8a8478] focus:outline-none"
        />

        {errors.name && (
          <p className="text-xs text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-sm text-[#3a352f]"
        >
          Email Address
        </label>

        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          className="rounded-sm border border-transparent bg-[#eeece7] px-4 py-3 text-[#3a352f] placeholder:text-[#8a8478] focus:border-[#8a8478] focus:outline-none"
        />

        {errors.email && (
          <p className="text-xs text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="phone"
          className="text-sm text-[#3a352f]"
        >
          Phone Number
        </label>

        <input
          id="phone"
          type="tel"
          placeholder="+91 9810438876"
          {...register("phone")}
          className="rounded-sm border border-transparent bg-[#eeece7] px-4 py-3 text-[#3a352f] placeholder:text-[#8a8478] focus:border-[#8a8478] focus:outline-none"
        />

        {errors.phone && (
          <p className="text-xs text-red-600">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="subject"
          className="text-sm text-[#3a352f]"
        >
          Subject
        </label>

        <input
          id="subject"
          type="text"
          placeholder="How can we help?"
          {...register("subject")}
          className="rounded-sm border border-transparent bg-[#eeece7] px-4 py-3 text-[#3a352f] placeholder:text-[#8a8478] focus:border-[#8a8478] focus:outline-none"
        />

        {errors.subject && (
          <p className="text-xs text-red-600">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <label
          htmlFor="message"
          className="text-sm text-[#3a352f]"
        >
          Message
        </label>

        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about your project..."
          {...register("message")}
          className="resize-none rounded-sm border border-transparent bg-[#eeece7] px-4 py-3 text-[#3a352f] placeholder:text-[#8a8478] focus:border-[#8a8478] focus:outline-none"
        />

        {errors.message && (
          <p className="text-xs text-red-600">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Success */}
      {success && (
        <div className="md:col-span-2">
          <p className="text-sm text-green-600">
            {success}
          </p>
        </div>
      )}

      {/* API Error */}
      {apiError && (
        <div className="md:col-span-2">
          <p className="text-sm text-red-600">
            {apiError}
          </p>
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