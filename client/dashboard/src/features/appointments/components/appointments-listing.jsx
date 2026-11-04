"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import ErrorMessage from "@/components/ui/error";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { DataTable } from "@/components/ui/table/data-table";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import {
  useAppointments,
  useDeleteAppointment,
  useUpdateAppointmentStatus,
} from "@/hooks/use-appointments";
import { columns } from "./table/columns";

export default function AppointmentsListing() {
  const [isModal, setIsModal] = useState(false);
  const [id, setId] = useState("");
  const searchParams = useSearchParams();
  // Inline result of the last action (the dashboard has no toast host).
  const [notice, setNotice] = useState(null);

  const { data, isLoading, isError, error } = useAppointments(searchParams.toString());
  const deleteMutation = useDeleteAppointment(id, () => setIsModal(false));
  const statusMutation = useUpdateAppointmentStatus();

  const onStatus = (appointmentId, status) =>
    statusMutation.mutate(
      { id: appointmentId, status },
      {
        onSuccess: () => setNotice({ ok: true, text: `Marked ${status}.` }),
        onError: (err) =>
          setNotice({ ok: false, text: err?.response?.data?.message || "Could not update status." }),
      },
    );

  const onDelete = (appointmentId) => {
    setId(appointmentId);
    setIsModal(true);
  };

  if (isLoading) return <DataTableSkeleton columnCount={8} rowCount={10} />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <>
      {notice && (
        <p
          className={
            notice.ok
              ? "mb-3 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
              : "mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700"
          }
        >
          {notice.text}
        </p>
      )}
      <DataTable
        columns={columns({ onDelete, onStatus })}
        data={data?.appointments ?? []}
        totalItems={data?.total}
      />
      <DeleteDialog deleteMutation={deleteMutation} isOpen={isModal} setIsOpen={setIsModal} />
    </>
  );
}
