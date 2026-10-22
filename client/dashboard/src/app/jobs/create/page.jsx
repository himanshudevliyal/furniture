import PageContainer from "@/components/layout/page-container";
import JobForm from "@/features/jobs/components/job-form";

export const metadata = { title: "Create Job" };

export default function CreateJobPage() {
  return (
    <PageContainer pageTitle={"Create job"} pageDescription={"Post a new job opening."}>
      <JobForm type="create" />
    </PageContainer>
  );
}
