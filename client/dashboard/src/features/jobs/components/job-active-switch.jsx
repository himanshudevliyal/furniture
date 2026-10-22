"use client";

import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { useUpdateJobStatus } from "@/hooks/use-jobs";

export default function JobActiveSwitch({ id, isActive }) {
  const mutation = useUpdateJobStatus(id);

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isActive}
        disabled={mutation.isPending}
        onCheckedChange={(checked) =>
          mutation.mutate(checked, {
            onSuccess: () =>
              toast.success(checked ? "Job is now live" : "Job hidden from website"),
            onError: (err) =>
              toast.error(err?.response?.data?.message || "Failed to update"),
          })
        }
        aria-label="Toggle active"
      />
      <span
        className={
          isActive ? "text-xs text-emerald-600" : "text-xs text-muted-foreground"
        }
      >
        {isActive ? "Active" : "Inactive"}
      </span>
    </div>
  );
}
