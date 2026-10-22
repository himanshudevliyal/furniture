import PageContainer from "@/components/layout/page-container";
import ProjectQuoteEditForm from "@/features/project-quotes/components/project-quote-edit-form";

export const metadata = {
  title: "Edit Project Quote",
};

export default async function ProjectQuoteEditFormPage({ params }) {
  const { id } = await params;

  return (
    <PageContainer
      pageTitle="Edit Project Quote"
      pageDescription="Update the details. You will be asked to confirm before saving."
    >
      <ProjectQuoteEditForm id={id} />
    </PageContainer>
  );
}
