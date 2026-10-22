import PageContainer from "@/components/layout/page-container";
import JobForm from "@/features/jobs/components/job-form";

export const metadata = { title: "Edit Job" };

export default async function EditJobPage({ params }) {
  const { id } = await params;
  return (
    <PageContainer pageTitle={"Edit job"} pageDescription={"Update this job opening."}>
      <JobForm type="edit" id={id} />
    </PageContainer>
  );
}
