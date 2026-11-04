import Link from "next/link";
import { Suspense } from "react";
import { CalendarCog } from "lucide-react";

import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import ProjectQuoteTableActions from "@/features/project-quotes/components/table/project-quote-table-actions";
import AppointmentsListing from "@/features/appointments/components/appointments-listing";

export const metadata = {
  title: "Appointments",
};

export default async function AppointmentsPage({ searchParams }) {
  searchParamsCache.parse(await searchParams);
  const key = serialize({ ...(await searchParams) });

  return (
    <PageContainer
      pageTitle="Appointments"
      pageDescription="Slots booked from the Book Your Slot form on the website."
      scrollable={false}
      pageHeaderAction={
        <Link href="/appointments/slots" className={buttonVariants({ size: "sm" })}>
          <CalendarCog /> Manage slots
        </Link>
      }
    >
      {/* Search + reset (same generic filters as Project Quotes) */}
      <ProjectQuoteTableActions />
      <Suspense key={key} fallback={<DataTableSkeleton columnCount={8} rowCount={10} />}>
        <AppointmentsListing />
      </Suspense>
    </PageContainer>
  );
}
