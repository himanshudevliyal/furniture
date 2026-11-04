"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  useAppointment,
  useDeleteAppointment,
  useUpdateAppointmentStatus,
} from "@/hooks/use-appointments";
import { APPOINTMENT_STATUSES, formatDate, formatTime, statusStyles } from "./status";

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 whitespace-pre-line break-words text-sm">{value || "-"}</p>
    </div>
  );
}

export default function AppointmentDetails({ id }) {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  // Inline result of the last action (the dashboard has no toast host).
  const [notice, setNotice] = useState(null);

  const { data, isLoading, isError } = useAppointment(id);
  const statusMutation = useUpdateAppointmentStatus();
  const deleteMutation = useDeleteAppointment(id, () =>
    router.push("/appointments?page=1&limit=10"),
  );

  if (isLoading) return <div className="p-6 text-sm text-muted-foreground">Loading...</div>;
  if (isError || !data)
    return <div className="p-6 text-sm text-destructive">Failed to load appointment.</div>;

  const changeStatus = (status) =>
    statusMutation.mutate(
      { id, status },
      {
        onSuccess: () => setNotice({ ok: true, text: `Marked ${status}.` }),
        onError: (err) =>
          setNotice({ ok: false, text: err?.response?.data?.message || "Could not update status." }),
      },
    );

  return (
    <div className="max-w-3xl overflow-hidden rounded-xl border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-6 py-4">
        <div>
          <p className="text-base font-medium">
            {formatDate(data.booking_date)} · {formatTime(data.booking_time)}
          </p>
          <p className="text-xs text-muted-foreground">India time (IST)</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium capitalize",
              statusStyles[data.status],
            )}
          >
            {data.status}
          </span>
          <Select
            value={data.status}
            onValueChange={changeStatus}
            disabled={statusMutation.isPending}
          >
            <SelectTrigger className="h-8 w-36 capitalize">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {APPOINTMENT_STATUSES.map((s) => (
                <SelectItem key={s} value={s} className="capitalize">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {notice && (
        <p
          className={cn(
            "mx-6 mt-4 rounded-md px-3 py-2 text-sm",
            notice.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700",
          )}
        >
          {notice.text}
        </p>
      )}

      <div className="grid gap-5 px-6 py-5 sm:grid-cols-2">
        <Detail label="Name" value={data.name} />
        <Detail label="Phone" value={data.phone} />
        <Detail label="Email" value={data.email} />
        <Detail label="Company" value={data.company} />
        <Detail label="Address" value={data.address} />
        <Detail
          label="Buying for business"
          value={data.for_business === "yes" ? "Yes" : data.for_business === "no" ? "No" : ""}
        />
        <Detail label="Units" value={data.units} />
        <div className="sm:col-span-2">
          <Detail label="Special requests" value={data.message} />
        </div>
        <Detail
          label="Booked on"
          value={data.created_at ? new Date(data.created_at).toLocaleString("en-IN") : "-"}
        />
      </div>

      <div className="flex justify-end border-t px-6 py-4">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setIsDeleteOpen(true)}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? <Loader2 className="animate-spin" /> : <Trash2 />}
          Delete
        </Button>
      </div>

      <DeleteDialog
        deleteMutation={deleteMutation}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
      />
    </div>
  );
}
