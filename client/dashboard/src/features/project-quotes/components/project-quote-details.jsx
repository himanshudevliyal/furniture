"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { DeleteDialog } from "@/components/ui/delete-dialog";
import { useDeleteProjectQuote } from "@/hooks/use-project-quotes";
import ProjectQuoteView from "./project-quote-view";

export default function ProjectQuoteDetails({ id }) {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const deleteMutation = useDeleteProjectQuote(id, () =>
    router.push("/project-quotes?page=1&limit=10"),
  );

  return (
    <div className="max-w-3xl">
      <ProjectQuoteView
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
