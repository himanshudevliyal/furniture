"use client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ui/error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "@/components/loader";
import TextEditor from "@/components/editor";
import { useCreateJob, useJob, useUpdateJob } from "@/hooks/use-jobs";
import { JOB_TYPES, jobSchema } from "@/schemas/job-schema";

const defaultValues = {
  title: "",
  department: "",
  location: "",
  job_type: "Full-time",
  experience: "",
  salary: "",
  openings: "",
  description: "",
  is_active: true,
};

const textFields = [
  { name: "title", label: "Job Title", placeholder: "e.g. Sales Executive", required: true },
  { name: "department", label: "Department", placeholder: "e.g. Sales" },
  { name: "location", label: "Location", placeholder: "e.g. Okhla, New Delhi" },
  { name: "experience", label: "Experience", placeholder: "e.g. 2-4 years" },
  { name: "salary", label: "Salary", placeholder: "e.g. 3-5 LPA (optional)" },
  { name: "openings", label: "No. of Openings", placeholder: "e.g. 2", type: "number" },
];

export default function JobForm({ id, type = "create" }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(jobSchema), defaultValues });

  const handleSuccess = () => {
    toast.success(type === "create" ? "Job created" : "Job updated");
    reset();
    router.replace("/jobs?page=1&limit=10");
  };
  const handleError = (err) =>
    toast.error(err?.response?.data?.message || "Something went wrong");

  const createMutation = useCreateJob(handleSuccess);
  const updateMutation = useUpdateJob(id, handleSuccess);
  const { data, isLoading, isError, error } = useJob(id);

  useEffect(() => {
    if (!data) return;
    reset({
      title: data.title ?? "",
      department: data.department ?? "",
      location: data.location ?? "",
      job_type: data.job_type ?? "",
      experience: data.experience ?? "",
      salary: data.salary ?? "",
      openings: data.openings ?? "",
      description: data.description ?? "",
      is_active: data.is_active ?? true,
    });
  }, [data, reset]);

  const onSubmit = (values) => {
    const payload = {
      ...values,
      openings: values.openings === "" ? null : values.openings,
    };
    type === "create"
      ? createMutation.mutate(payload, { onError: handleError })
      : updateMutation.mutate(payload, { onError: handleError });
  };

  if (type === "edit" && isLoading) return <Loader />;
  if (type === "edit" && isError) return <ErrorMessage error={error} />;

  const isFormPending = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
        {textFields.map((field) => (
          <div className="space-y-1" key={field.name}>
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.name}
              type={field.type ?? "text"}
              min={field.type === "number" ? 1 : undefined}
              placeholder={field.placeholder}
              className={cn({ "border-red-500": errors[field.name] })}
              {...register(field.name)}
            />
            {errors[field.name] && (
              <p className="text-sm text-red-500">
                {errors[field.name].message}
              </p>
            )}
          </div>
        ))}

        <div className="space-y-1">
          <Label>Job Type</Label>
          <Controller
            control={control}
            name="job_type"
            render={({ field }) => (
              <Select value={field.value || undefined} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  {JOB_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label>Job Description</Label>
        <p className="text-xs text-muted-foreground">
          Role overview, responsibilities, requirements, perks etc.
        </p>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <TextEditor value={field.value} onChange={field.onChange} />
          )}
        />
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <Label htmlFor="is_active">Active</Label>
          <p className="text-xs text-muted-foreground">
            Only active jobs are shown on the website careers page.
          </p>
        </div>
        <Controller
          control={control}
          name="is_active"
          render={({ field }) => (
            <Switch
              id="is_active"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
      </div>

      <div className="text-end">
        <Button type="submit" disabled={isFormPending}>
          {isFormPending && <Loader2 className="animate-spin" />} Submit
        </Button>
      </div>
    </form>
  );
}
