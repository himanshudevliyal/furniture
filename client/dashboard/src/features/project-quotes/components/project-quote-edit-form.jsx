"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

import RecordEditForm from "@/components/record-edit-form";
import ErrorMessage from "@/components/ui/error";
import {
  useProjectQuote,
  useUpdateProjectQuote,
} from "@/hooks/use-project-quotes";

const STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "contacted", label: "Contacted" },
  { value: "closed", label: "Closed" },
];

// Server ke projectQuoteUpdateSchema jaisa hi.
const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(150),
  email: z.string().trim().email("Invalid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,15}$/, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
  company: z.string().trim().min(2, "Company name is required").max(150),
  category: z.string().trim().max(150).optional().or(z.literal("")),
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
  { name: "name", label: "Name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "company", label: "Company", required: true },
  { name: "category", label: "Category" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: STATUSES,
    required: true,
  },
  { name: "message", label: "Content", type: "textarea", fullWidth: true },
];

export default function ProjectQuoteEditForm({ id }) {
  const router = useRouter();
  const { data, isLoading, isError, error } = useProjectQuote(id);
  const updateMutation = useUpdateProjectQuote(id);

  const defaultValues = useMemo(
    () => ({
      name: data?.name ?? "",
      email: data?.email ?? "",
      phone: data?.phone ?? "",
      company: data?.company ?? "",
      category: data?.category ?? "",
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
        toast.success("Quote request updated");
        done();
        router.push(`/project-quotes/${id}`);
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message || "Failed to update quote request",
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
      cancelHref={`/project-quotes/${id}`}
    />
  );
}
