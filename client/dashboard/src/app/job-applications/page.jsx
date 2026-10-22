import { Suspense } from "react";
import PageContainer from "@/components/layout/page-container";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import StatusFilterActions from "@/features/jobs/components/table/status-filter-actions";
import JobApplicationsListing from "@/features/job-applications/components/job-applications-listing";
import { JOB_APPLICATION_STATUSES } from "@/schemas/job-schema";

export const metadata = { title: "Job Applications" };

export default async function JobApplicationsPage({ searchParams }) {
  searchParamsCache.parse(await searchParams);
  const key = serialize({ ...(await searchParams) });

  return (
    <PageContainer
      pageTitle={"Job Applications"}
      pageDescription={"CVs submitted from the website careers page."}
      scrollable={false}
    >
      <StatusFilterActions statusOptions={JOB_APPLICATION_STATUSES} />
      <Suspense
        key={key}
        fallback={<DataTableSkeleton columnCount={7} rowCount={10} />}
      >
        <JobApplicationsListing />
      </Suspense>
    </PageContainer>
  );
}
