"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FieldError from "@/components/ui/field-error";
import { Plus, Trash } from "lucide-react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import FileUrlUploader from "@/components/file-url-uploader";

// "Features & Options" section on the product page: numbered feature cards,
// each with its own image that shows when the card is clicked.
export default function ProductFeaturesForm() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features.items",
  });

  return (
    <div className="space-y-4">
      <div>
        <Label>Section heading</Label>
        <Input
          {...register("features.heading")}
          placeholder="Features & Options"
        />
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="relative space-y-3 rounded-md border p-4">
          <span className="text-muted-foreground text-sm font-medium">
            Feature {String(index + 1).padStart(2, "0")}
          </span>

          <div>
            <Label>Title *</Label>
            <Input
              {...register(`features.items.${index}.title`)}
              placeholder="e.g. Cable Management"
            />
            {errors?.features?.items?.[index]?.title && (
              <FieldError message={errors.features.items[index].title.message} />
            )}
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              {...register(`features.items.${index}.description`)}
              placeholder="e.g. Floor-entry cabling system with wires running through the mid leg."
              rows={3}
            />
          </div>

          <div className="space-y-1">
            <Label>Image</Label>
            <Controller
              control={control}
              name={`features.items.${index}.image`}
              render={({ field }) => (
                <FileUrlUploader
                  value={field.value}
                  onUploaded={field.onChange}
                  accept="image/*"
                  label="Upload image"
                />
              )}
            />
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
        onClick={() => append({ title: "", description: "", image: "" })}
      >
        <Plus className="h-4 w-4" /> Add feature
      </Button>
    </div>
  );
}
