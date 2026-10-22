"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { DeleteDialog } from "@/components/ui/delete-dialog";
import { useDeleteProductInquiry } from "@/hooks/use-product-inquiries";
import ProductInquiryView from "./product-inquiry-view";

export default function ProductInquiryDetails({ id }) {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const deleteMutation = useDeleteProductInquiry(id, () =>
    router.push("/product-inquiries?page=1&limit=10"),
  );

  return (
    <div className="max-w-3xl">
      <ProductInquiryView
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
