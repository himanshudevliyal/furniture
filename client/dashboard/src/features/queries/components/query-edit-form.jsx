"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

import RecordEditForm from "@/components/record-edit-form";
import ErrorMessage from "@/components/ui/error";
import { useQueryItem, useUpdateQuery } from "@/hooks/use-queries";

// Server ke userQuerySchema jaisa hi.
const REASONS = [
  { value: "domestic_sales_enquiry", label: "Domestic Sales Enquiry" },
  { value: "export_sales_enquiry", label: "Export Sales Enquiry" },
  { value: "after_sales_services", label: "After Sales Services" },
  { value: "career", label: "Career" },
  { value: "become_a_vendor", label: "Become a Vendor" },
];

const schema = z.object({
  name: z.string().trim().min(1, "Full name is required"),
  email: z.string().trim().email("Invalid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  subject: z.string().trim().min(1, "Subject is required"),
  reason: z.enum(
    REASONS.map((r) => r.value),
    { errorMap: () => ({ message: "Please select a reason for contact" }) },
  ),
  message: z.string().optional().or(z.literal("")),
});

const fields = [
  { name: "name", label: "Name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "subject", label: "Subject", required: true },
  {
    name: "reason",
    label: "Reason for contact",
    type: "select",
    options: REASONS,
    required: true,
  },
  { name: "message", label: "Message", type: "textarea", fullWidth: true },
];

export default function QueryEditForm({ id }) {
  const router = useRouter();
  const { data, isLoading, isError, error } = useQueryItem(id);
  const updateMutation = useUpdateQuery(id);

  const defaultValues = useMemo(
    () => ({
      name: data?.name ?? "",
      email: data?.email ?? "",
      phone: data?.phone ?? "",
      subject: data?.subject ?? "",
      reason: data?.reason ?? "",
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
        toast.success("Query updated");
        done();
        router.push(`/queries/${id}`);
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Failed to update query");
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
      cancelHref={`/queries/${id}`}
    />
  );
}
