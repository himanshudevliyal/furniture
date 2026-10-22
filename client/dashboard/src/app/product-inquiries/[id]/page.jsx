import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";

import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import ProductInquiryDetails from "@/features/product-inquiries/components/product-inquiry-details";

export const metadata = {
  title: "Product Inquiry",
};

export default async function ProductInquiryDetailsPage({ params }) {
  const { id } = await params;

  return (
    <PageContainer
      pageTitle="Product Inquiry"
      pageDescription="Full details of this product inquiry."
      pageHeaderAction={
        <div className="flex gap-2">
          <Link
            href="/product-inquiries?page=1&limit=10"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <ArrowLeft /> Back
          </Link>
          <Link
            href={`/product-inquiries/${id}/edit`}
            className={buttonVariants({ size: "sm" })}
          >
            <Pencil /> Edit
          </Link>
        </div>
      }
    >
      <ProductInquiryDetails id={id} />
    </PageContainer>
  );
}
