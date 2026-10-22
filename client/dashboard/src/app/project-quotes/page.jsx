import PageContainer from "@/components/layout/page-container";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { Suspense } from "react";
import ProjectQuoteTableActions from "@/features/project-quotes/components/table/project-quote-table-actions";
import ProjectQuotesListing from "@/features/project-quotes/components/project-quotes-listing";

export const metadata = {
  title: "Project Quotes",
};

export default async function ProjectQuotesPage({ searchParams }) {
  searchParamsCache.parse(await searchParams);
  const key = serialize({ ...(await searchParams) });

  return (
    <PageContainer
      pageTitle={"Project Quotes"}
      pageDescription={"View and manage project quote requests from the website hero section."}
      scrollable={false}
    >
      <ProjectQuoteTableActions />
      <Suspense
        key={key}
        fallback={<DataTableSkeleton columnCount={8} rowCount={10} />}
      >
        <ProjectQuotesListing />
      </Suspense>
    </PageContainer>
  );
}
