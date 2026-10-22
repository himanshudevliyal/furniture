"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

import RecordEditForm from "@/components/record-edit-form";
import ErrorMessage from "@/components/ui/error";
import {
  useProductInquiry,
  useUpdateProductInquiry,
} from "@/hooks/use-product-inquiries";

const STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "contacted", label: "Contacted" },
  { value: "closed", label: "Closed" },
];

// Server ke productInquiryUpdateSchema jaisa hi (products edit nahi hote).
const schema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(150, "Full name is too long"),
  company_name: z
    .string()
    .trim()
    .max(150, "Company name is too long")
    .optional()
    .or(z.literal("")),
  email: z.string().trim().email("Invalid email address"),
  contact_number: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit contact number"),
  city: z.string().trim().min(2, "City is required").max(100),
  state: z.string().trim().min(2, "State is required").max(100),
  status: z.enum(
    STATUSES.map((s) => s.value),
    { errorMap: () => ({ message: "Invalid status" }) },
  ),
  message: z
    .string()
    .trim()
    .max(2000, "Message is too long")
    .optional()
    .or(z.literal("")),
});

const fields = [
  { name: "full_name", label: "Full name", required: true },
  { name: "company_name", label: "Company" },
  { name: "email", label: "Email", type: "email", required: true },
  {
    name: "contact_number",
    label: "Contact number",
    type: "tel",
    required: true,
  },
  { name: "city", label: "City", required: true },
  { name: "state", label: "State", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: STATUSES,
    required: true,
  },
  { name: "message", label: "Message", type: "textarea", fullWidth: true },
];

export default function ProductInquiryEditForm({ id }) {
  const router = useRouter();
  const { data, isLoading, isError, error } = useProductInquiry(id);
  const updateMutation = useUpdateProductInquiry(id);

  const defaultValues = useMemo(
    () => ({
      full_name: data?.full_name ?? "",
      company_name: data?.company_name ?? "",
      email: data?.email ?? "",
      contact_number: data?.contact_number ?? "",
      city: data?.city ?? "",
      state: data?.state ?? "",
      status: data?.status ?? "pending",
      message: data?.message ?? "",
    }),
    [data],
  );

  if (isLoading)
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  if (isError) return <ErrorMessage error={error} />;

  const handleSave = (values, done) => {
    updateMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Inquiry updated");
        done();
        router.push(`/product-inquiries/${id}`);
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message || "Failed to update inquiry",
        );
        done();
      },
    });
  };

  return (
    <RecordEditForm
      schema={schema}
      fields={fields}
      defaultValues={defaultValues}
      onSave={handleSave}
      isSaving={updateMutation.isPending}
      cancelHref={`/product-inquiries/${id}`}
    />
  );
}
