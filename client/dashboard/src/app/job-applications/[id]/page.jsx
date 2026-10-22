import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import JobApplicationDetails from "@/features/job-applications/components/job-application-details";

export const metadata = { title: "Job Application" };

export default async function JobApplicationPage({ params }) {
  const { id } = await params;

  return (
    <PageContainer
      pageTitle="Job Application"
      pageDescription="Full details of this application."
      pageHeaderAction={
        <Link
          href="/job-applications?page=1&limit=10"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <ArrowLeft /> Back
        </Link>
      }
    >
      <JobApplicationDetails id={id} />
    </PageContainer>
  );
}
