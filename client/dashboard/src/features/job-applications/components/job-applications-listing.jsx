"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import ErrorMessage from "@/components/ui/error";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { DataTable } from "@/components/ui/table/data-table";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import {
  useDeleteJobApplication,
  useJobApplications,
} from "@/hooks/use-job-applications";
import { columns } from "./table/columns";

export default function JobApplicationsListing() {
  const [id, setId] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const searchParams = useSearchParams();
  const { data, isLoading, isError, error } = useJobApplications(
    searchParams.toString(),
  );
  const deleteMutation = useDeleteJobApplication(id, () => {
    toast.success("Application deleted");
    setIsModal(false);
  });

  if (isLoading) return <DataTableSkeleton columnCount={7} rowCount={10} />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <>
      <DataTable
        columns={columns(() => setIsModal(true), setId)}
        data={data?.job_applications ?? []}
        totalItems={data?.total ?? 0}
      />
      <DeleteDialog
        deleteMutation={deleteMutation}
        isOpen={isModal}
        setIsOpen={setIsModal}
      />
    </>
  );
}
