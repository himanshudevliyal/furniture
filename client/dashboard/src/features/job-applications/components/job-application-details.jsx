"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Download, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import config from "@/config";
import {
  useDeleteJobApplication,
  useJobApplication,
  useUpdateJobApplicationStatus,
} from "@/hooks/use-job-applications";
import { JOB_APPLICATION_STATUSES } from "@/schemas/job-schema";

function getInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function JobApplicationDetails({ id }) {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { data, isLoading, isError } = useJobApplication(id);
  const updateStatusMutation = useUpdateJobApplicationStatus(id, () =>
    toast.success("Status updated"),
  );
  const deleteMutation = useDeleteJobApplication(id, () =>
    router.push("/job-applications?page=1&limit=10"),
  );

  if (isLoading)
    return <div className="p-6 text-muted-foreground text-sm">Loading...</div>;
  if (isError)
    return (
      <div className="p-6 text-destructive text-sm">
        Failed to load application.
      </div>
    );

  const resumeUrl = `${config.file_base}/${data.resume}`;

  return (
    <div className="max-w-3xl">
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-medium text-sm shrink-0">
            {getInitials(data.name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-base">{data.name}</p>
            <p className="text-xs text-muted-foreground">
              Applying for {data.applying_for}
            </p>
          </div>

          <Select
            value={data.status}
            onValueChange={(status) => updateStatusMutation.mutate(status)}
          >
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {JOB_APPLICATION_STATUSES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium mb-3">
              Candidate details
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <Detail label="Email" value={data.email} />
              <Detail label="Phone" value={data.phone} />
              <Detail label="Experience" value={data.experience || "-"} />
              <Detail
                label="Current location"
                value={data.current_location || "-"}
              />
              <Detail
                label="LinkedIn / Portfolio"
                value={
                  data.linkedin ? (
                    <a
                      href={data.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline"
                    >
                      {data.linkedin}
                    </a>
                  ) : (
                    "-"
                  )
                }
              />
            </div>
          </div>

          {data.message && (
            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium mb-3">
                Message
              </p>
              <div className="border-l-2 border-border pl-3">
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {data.message}
                </p>
              </div>
            </div>
          )}

          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium mb-3">
              CV / Resume
            </p>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <Download /> Open CV
            </a>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-xs text-muted-foreground">
              {format(new Date(data.created_at), "MMM d, yyyy · h:mm a")}
            </span>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => setIsDeleteOpen(true)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Trash2 />
              )}
            </Button>
          </div>
        </div>
      </div>

      <DeleteDialog
        deleteMutation={deleteMutation}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
      />
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-[11px] text-muted-foreground mb-0.5">{label}</p>
      <div className="text-sm break-all">{value}</div>
    </div>
  );
}
