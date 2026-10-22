import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";

import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import QueryDetails from "@/features/queries/components/query-details";

export const metadata = {
  title: "Query",
};

export default async function QueryDetailsPage({ params }) {
  const { id } = await params;

  return (
    <PageContainer
      pageTitle="Query"
      pageDescription="Full details of this query."
      pageHeaderAction={
        <div className="flex gap-2">
          <Link
            href="/queries?page=1&limit=10"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <ArrowLeft /> Back
          </Link>
          <Link
            href={`/queries/${id}/edit`}
            className={buttonVariants({ size: "sm" })}
          >
            <Pencil /> Edit
          </Link>
        </div>
      }
    >
      <QueryDetails id={id} />
    </PageContainer>
  );
}
