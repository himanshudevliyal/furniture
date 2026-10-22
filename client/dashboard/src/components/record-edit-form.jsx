"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FieldError from "@/components/ui/field-error";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { cn } from "@/lib/utils";

// Generic edit form for inquiry-type records (queries, product inquiries,
// project quotes). Validates first, then asks for confirmation before saving.
//
// fields: [{ name, label, type: "text" | "email" | "tel" | "textarea" | "select",
//            options?: [{ value, label }], fullWidth?: boolean, required?: boolean }]
export default function RecordEditForm({
  schema,
  fields,
  defaultValues,
  onSave,
  isSaving,
  cancelHref,
}) {
  const [pendingValues, setPendingValues] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const confirmSave = () => {
    onSave(pendingValues, () => setPendingValues(null));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(setPendingValues)}
        className="grid max-w-3xl grid-cols-1 gap-5 rounded-xl border bg-card p-6 md:grid-cols-2"
        noValidate
      >
        {fields.map((field) => (
          <div
            key={field.name}
            className={cn("space-y-2", field.fullWidth && "md:col-span-2")}
          >
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-destructive">*</span>}
            </Label>

            {field.type === "textarea" ? (
              <Textarea id={field.name} rows={5} {...register(field.name)} />
            ) : field.type === "select" ? (
              <Controller
                control={control}
                name={field.name}
                render={({ field: { value, onChange } }) => (
                  <Select value={value} onValueChange={onChange}>
                    <SelectTrigger id={field.name} className="w-full">
                      <SelectValue placeholder={`Select ${field.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            ) : (
              <Input
                id={field.name}
                type={field.type || "text"}
                {...register(field.name)}
              />
            )}

            <FieldError message={errors[field.name]?.message} />
          </div>
        ))}

        <div className="flex items-center justify-end gap-2 md:col-span-2">
          <Link
            href={cancelHref}
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>
          <Button type="submit" disabled={!isDirty || isSaving}>
            Save changes
          </Button>
        </div>
      </form>

      <ConfirmDialog
        isOpen={!!pendingValues}
        setIsOpen={(open) => !open && setPendingValues(null)}
        title="Save these changes?"
        description="The record will be updated with the edited details. Please confirm before saving."
        confirmLabel="Yes, save"
        onConfirm={confirmSave}
        isPending={isSaving}
      />
    </>
  );
}
