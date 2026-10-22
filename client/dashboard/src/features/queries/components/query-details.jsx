"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { DeleteDialog } from "@/components/ui/delete-dialog";
import { useDeleteQuery } from "@/hooks/use-queries";
import QueryView from "./query-view";

export default function QueryDetails({ id }) {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const deleteMutation = useDeleteQuery(id, () =>
    router.push("/queries?page=1&limit=10"),
  );

  return (
    <div className="max-w-3xl">
      <QueryView
        id={id}
        onDelete={() => setIsDeleteOpen(true)}
        isDeleting={deleteMutation.isPending}
      />

      <DeleteDialog
        deleteMutation={deleteMutation}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
      />
    </div>
  );
}
