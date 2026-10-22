import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { cn } from "@/lib/utils";
import JobsListing from "@/features/jobs/components/jobs-listing";
import StatusFilterActions from "@/features/jobs/components/table/status-filter-actions";

export const metadata = { title: "Jobs" };

const JOB_STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export default async function JobsPage({ searchParams }) {
  searchParamsCache.parse(await searchParams);
  const key = serialize({ ...(await searchParams) });

  return (
    <PageContainer
      pageTitle={"Jobs"}
      pageDescription={
        "Manage job openings for the careers page. Only active jobs are visible on the website."
      }
      scrollable={false}
      pageHeaderAction={
        <Link
          href={"/jobs/create"}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          <Plus /> Add Job
        </Link>
      }
    >
      <StatusFilterActions statusOptions={JOB_STATUS_OPTIONS} />
      <Suspense
        key={key}
        fallback={<DataTableSkeleton columnCount={7} rowCount={10} />}
      >
        <JobsListing />
      </Suspense>
    </PageContainer>
  );
}
