"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";

import { useCategories } from "@/hooks/use-categories";
import { useProducts } from "@/hooks/use-products";
import { useHydrated } from "@/hooks/use-hydrated";
import ProductCard from "@/components/ProductCard";
import CategoryNav from "./category-nav";
import { FilterSidebar } from "./filter-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/section";

export default function ProductFilter() {
  const searchParams = useSearchParams();
  const searchParamsStr = searchParams.toString();

  // MULTIPLE CATEGORY IDS
  const categoryFilters = useMemo(() => {
    return searchParams
      .getAll("categories")
      .flatMap((value) => value.split(","))
      .filter(Boolean);
  }, [searchParamsStr]);

  // MULTIPLE SUB-CATEGORY IDS
  const subCategoryFilters = useMemo(() => {
    return searchParams
      .getAll("sub-categories")
      .flatMap((value) => value.split(","))
      .filter(Boolean);
  }, [searchParamsStr]);

  const isAnyFilterActive =
    categoryFilters.length > 0 || subCategoryFilters.length > 0;

  // Until hydration finishes, render the same "loading" state the server
  // sent, even if the navbar already filled the categories cache.
  const hydrated = useHydrated();

  const {
    data: categoriesData,
    isLoading: categoriesQueryLoading,
  } = useCategories();
  const categoriesLoading = !hydrated || categoriesQueryLoading;

  const {
    data: productsData,
    isLoading: productsQueryLoading,
    isError: productsIsError,
  } = useProducts(searchParamsStr);
  const productsLoading = !hydrated || productsQueryLoading;

  const categories = categoriesData?.categories ?? [];

  const products = useMemo(() => {
    const allProducts = productsData?.products ?? [];

    return allProducts
      .filter((product) => {
        // No category selected = show all
        if (categoryFilters.length === 0) return true;

        return categoryFilters.includes(
          String(product?.category_id ?? "")
        );
      })
      .filter((product) => {
        // No sub-category selected = show all
        if (subCategoryFilters.length === 0) return true;

        return subCategoryFilters.includes(
          String(product?.sub_category_id ?? "")
        );
      })
      .sort(
        (a, b) =>
          (a?.sort_order ?? 0) - (b?.sort_order ?? 0)
      );
  }, [
    productsData,
    categoryFilters,
    subCategoryFilters,
  ]);

  return (
    <div>
      {/* Header */}
      <Section>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
          Shop
        </p>

        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl mb-8">
          All Categories
        </h2>


            {!categoriesLoading && (
        <CategoryNav categories={categories} />
      )}
      </Section>

      {/* Main Categories */}
  

      <Section >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

         
          <aside className="hidden lg:col-span-3 lg:block">
            <div>
              <h2 className="mb-6 text-lg font-semibold text-neutral-900">
                Filters
              </h2>

              {categoriesLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                </div>
              ) : (
                <FilterSidebar categories={categories} />
              )}
            </div>
          </aside>

          {/* Products */}
          <div className="lg:col-span-9">

            {/* Toolbar */}
            <div className="mb-8 flex items-center justify-between gap-4 lg:mb-10">

              <p className="text-sm text-neutral-500">
                {productsLoading
                  ? "Loading products..."
                  : `Showing ${products.length} product${
                      products.length === 1 ? "" : "s"
                    }`}
              </p>

              {/* Mobile Filter */}
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-900">
                    <SlidersHorizontal className="h-4 w-4" />

                    Filters

                    {isAnyFilterActive && (
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-neutral-900"
                      />
                    )}
                  </SheetTrigger>

                  <SheetContent
                    side="left"
                    className="overflow-y-auto p-6"
                  >
                    <SheetHeader className="p-0">
                      <SheetTitle>
                        Filters
                      </SheetTitle>
                    </SheetHeader>

                    <div className="mt-8">
                      <FilterSidebar
                        categories={categories}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Loading */}
            {productsLoading ? (
              <div className="grid grid-cols-1 border-l border-t border-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-4 border-b border-neutral-200 px-5 py-6 sm:border-r sm:px-6"
                  >
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                ))}
              </div>
            ) : productsIsError ? (

              /* Error */
              <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
                <p className="text-base font-medium text-neutral-900">
                  Something went wrong
                </p>

                <p className="text-sm text-neutral-500">
                  We couldn&apos;t load products right now.
                  Please try again.
                </p>
              </div>

            ) : products.length === 0 ? (

              /* No Products */
              <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                <p className="text-base font-medium text-neutral-900">
                  No products found.
                </p>

                {isAnyFilterActive && (
                  <Link
                    href="/shop"
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                      }),
                      "rounded-full border-neutral-300"
                    )}
                  >
                    Clear Filters
                  </Link>
                )}
              </div>

            ) : (

              /* Product Grid */
              <div className="grid grid-cols-1 border-l border-t border-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}