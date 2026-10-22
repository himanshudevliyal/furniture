import PageContainer from "@/components/layout/page-container";
import ProductInquiryEditForm from "@/features/product-inquiries/components/product-inquiry-edit-form";

export const metadata = {
  title: "Edit Product Inquiry",
};

export default async function ProductInquiryEditFormPage({ params }) {
  const { id } = await params;

  return (
    <PageContainer
      pageTitle="Edit Product Inquiry"
      pageDescription="Update the details. You will be asked to confirm before saving."
    >
      <ProductInquiryEditForm id={id} />
    </PageContainer>
  );
}
