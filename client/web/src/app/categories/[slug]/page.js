"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { useCategories } from "@/hooks/use-categories";
import { useProducts } from "@/hooks/use-products";
import { Skeleton } from "@/components/ui/skeleton";
import CategoryHero from "./_components/CategoryHero";
import SubCategorySection from "./_components/SubCategorySection";

export default function CategoryPage() {
  const { slug } = useParams();

  // Category API already returns each category with its sub_categories
  // embedded, so we reuse the existing categories list hook instead of
  // introducing a new "get category by slug" endpoint.
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesIsError,
  } = useCategories();

  // Products are fetched once and filtered per sub-category below, so we
  // don't fire a separate request for every sub-category section.
  const { data: productsData, isLoading: productsLoading } = useProducts();

  const categories = categoriesData?.categories ?? [];
  const products = productsData?.products ?? [];

  const category = useMemo(
    () => categories.find((c) => c.slug === slug) ?? null,
    [categories, slug],
  );

  // ---------------- Loading state ----------------
  if (categoriesLoading) {
    return (
      <div>
        <Skeleton className="h-[55vh] min-h-[420px] w-full rounded-none sm:h-[65vh]" />

        <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10">
          <Skeleton className="h-8 w-48" />

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ---------------- Error state ----------------
  if (categoriesIsError) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 px-4 text-center">
        <h1 className="text-2xl font-semibold text-neutral-900">
          Something went wrong
        </h1>
        <p className="max-w-md text-neutral-500">
          We couldn&apos;t load this category right now. Please try again.
        </p>
      </div>
    );
  }

  // ---------------- Not found state ----------------
  if (!category) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-semibold text-neutral-900">
          Category not found
        </h1>
        <p className="max-w-md text-neutral-500">
          We couldn&apos;t find the category you&apos;re looking for. It may
          have been removed, or the link is incorrect.
        </p>
        <Link
          href="/shop"
          className="rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  const subCategories = category.sub_categories ?? [];

  return (
    <div>
      <CategoryHero category={category} />

      {subCategories.length === 0 ? (
        <div className="mx-auto max-w-[1600px] px-5 py-16 text-center text-sm text-neutral-500 md:px-10">
          No sub-categories available for this category yet.
        </div>
      ) : (
        subCategories.map((subCategory) => (
          <SubCategorySection
            key={subCategory.id}
            category={category}
            subCategory={subCategory}
            products={products}
            productsLoading={productsLoading}
          />
        ))
      )}
    </div>
  );
}
