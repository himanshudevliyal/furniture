import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import CategoriesTableActions from "../../features/categories/components/table/categories-table-actions";
import CategoriesListing from "../../features/categories/components/categories-listing";
import CategoriesReorderDialog from "../../features/categories/components/categories-reorder-dialog";

export const metadata = {
  title: "Categories",
};

export default async function Categories({ searchParams }) {
  searchParamsCache.parse(await searchParams);
  const key = serialize({ ...(await searchParams) });

  return (
    <PageContainer
      pageTitle={"Categories"}
      pageDescription={"Manage categories (Create, Update, Delete)."}
      scrollable={false}
      pageHeaderAction={
        <div className="flex items-center gap-2">
          <CategoriesReorderDialog />
          <Link
            href={"/categories/create"}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <Plus /> Add
          </Link>
        </div>
      }
    >
      <CategoriesTableActions />
      <Suspense
        key={key}
        fallback={<DataTableSkeleton columnCount={4} rowCount={10} />}
      >
        <CategoriesListing />
      </Suspense>
    </PageContainer>
  );
}
