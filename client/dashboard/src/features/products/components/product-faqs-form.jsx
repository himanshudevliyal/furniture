"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FieldError from "@/components/ui/field-error";
import { Plus, Trash } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

// FAQ section on the product page: question + answer pairs.
export default function ProductFaqsForm() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs",
  });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="relative space-y-3 rounded-md border p-4">
          <div className="pr-12">
            <Label>Question *</Label>
            <Input
              {...register(`faqs.${index}.question`)}
              placeholder="e.g. Can I customise the size of this workstation?"
            />
            {errors?.faqs?.[index]?.question && (
              <FieldError message={errors.faqs[index].question.message} />
            )}
          </div>

          <div>
            <Label>Answer *</Label>
            <Textarea
              {...register(`faqs.${index}.answer`)}
              placeholder="e.g. Yes, we make workstations to your exact layout and dimensions."
              rows={3}
            />
            {errors?.faqs?.[index]?.answer && (
              <FieldError message={errors.faqs[index].answer.message} />
            )}
          </div>

          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => remove(index)}
            className="absolute top-2 right-2"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => append({ question: "", answer: "" })}
      >
        <Plus className="h-4 w-4" /> Add FAQ
      </Button>
    </div>
  );
}
