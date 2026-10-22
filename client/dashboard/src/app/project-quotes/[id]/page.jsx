import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";

import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import ProjectQuoteDetails from "@/features/project-quotes/components/project-quote-details";

export const metadata = {
  title: "Project Quote",
};

export default async function ProjectQuoteDetailsPage({ params }) {
  const { id } = await params;

  return (
    <PageContainer
      pageTitle="Project Quote"
      pageDescription="Full details of this project quote."
      pageHeaderAction={
        <div className="flex gap-2">
          <Link
            href="/project-quotes?page=1&limit=10"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <ArrowLeft /> Back
          </Link>
          <Link
            href={`/project-quotes/${id}/edit`}
            className={buttonVariants({ size: "sm" })}
          >
            <Pencil /> Edit
          </Link>
        </div>
      }
    >
      <ProjectQuoteDetails id={id} />
    </PageContainer>
  );
}
