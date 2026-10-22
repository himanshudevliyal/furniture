import PageContainer from "@/components/layout/page-container";
import QueryEditForm from "@/features/queries/components/query-edit-form";

export const metadata = {
  title: "Edit Query",
};

export default async function QueryEditFormPage({ params }) {
  const { id } = await params;

  return (
    <PageContainer
      pageTitle="Edit Query"
      pageDescription="Update the details. You will be asked to confirm before saving."
    >
      <QueryEditForm id={id} />
    </PageContainer>
  );
}
