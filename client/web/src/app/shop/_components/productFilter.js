"use client";

import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useQueryStates } from "nuqs";
import { Loader2, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

import { useCategories } from "@/hooks/use-categories";
import { useInfiniteProducts } from "@/hooks/use-products";
import { useHydrated } from "@/hooks/use-hydrated";
import ProductCard from "@/components/ProductCard";
import CategoryNav from "./category-nav";
import { FilterSidebar, shopFilterParsers } from "./filter-sidebar";
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

const PAGE_SIZE = 12;

// Builds the API query from the URL filters. For each ticked category:
// sub-categories ticked → only those; none ticked → the whole category.
// filter_mode=any makes the API OR the two lists together.
function buildProductQuery({ q, categoryIds, subCategoryIds, categories }) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);

  const wholeCategories = [];
  const subs = new Set();
  for (const id of categoryIds) {
    const cat = categories.find((c) => c.id === id);
    const picked = (cat?.sub_categories ?? [])
      .map((s) => s.id)
      .filter((sid) => subCategoryIds.includes(sid));
    if (picked.length) picked.forEach((sid) => subs.add(sid));
    else wholeCategories.push(id);
  }
  // Sub-categories whose parent isn't ticked (e.g. from a shared link).
  subCategoryIds.forEach((sid) => subs.add(sid));

  if (wholeCategories.length) params.set("category", wholeCategories.join("."));
  if (subs.size) params.set("sub_category", [...subs].join("."));
  if (wholeCategories.length && subs.size) params.set("filter_mode", "any");
  return params.toString();
}

// Calls onVisible when this marker scrolls near the viewport.
function LoadMoreTrigger({ onVisible, disabled }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && onVisible(),
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [onVisible, disabled]);

  return <div ref={ref} aria-hidden className="h-px" />;
}

export default function ProductFilter() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const [{ categories: categoryIds, "sub-categories": subCategoryIds }] =
    useQueryStates(shopFilterParsers);

  const isAnyFilterActive =
    categoryIds.length > 0 || subCategoryIds.length > 0;

  // Until hydration finishes, render the same "loading" state the server
  // sent, even if the navbar already filled the categories cache.
  const hydrated = useHydrated();

  const {
    data: categoriesData,
    isLoading: categoriesQueryLoading,
  } = useCategories();
  const categoriesLoading = !hydrated || categoriesQueryLoading;

  const categories = useMemo(
    () => categoriesData?.categories ?? [],
    [categoriesData],
  );

  const productQuery = useMemo(
    () => buildProductQuery({ q, categoryIds, subCategoryIds, categories }),
    [q, categoryIds, subCategoryIds, categories],
  );

  const {
    data: productsData,
    isLoading: productsQueryLoading,
    isError: productsIsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts(productQuery, PAGE_SIZE);
  // With filters on, the query depends on the categories' sub-category lists.
  const productsLoading =
    !hydrated ||
    productsQueryLoading ||
    (isAnyFilterActive && categoriesLoading);

  // When a filter changes, bring the top of the product list back into view
  // (otherwise you stay scrolled down past a now-shorter list).
  const productsTopRef = useRef(null);
  const lastQueryRef = useRef(productQuery);
  useEffect(() => {
    if (lastQueryRef.current === productQuery) return;
    lastQueryRef.current = productQuery;
    const el = productsTopRef.current;
    // 112px ≈ sticky header height + a little space (matches scroll-mt-28).
    if (el && el.getBoundingClientRect().top < 112) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [productQuery]);

  const products = useMemo(
    () => productsData?.pages.flatMap((page) => page?.products ?? []) ?? [],
    [productsData],
  );
  const total = productsData?.pages?.[0]?.total ?? 0;

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };
  // Stable callback for the observer, always calling the latest loadMore.
  const loadMoreRef = useRef(loadMore);
  useEffect(() => {
    loadMoreRef.current = loadMore;
  });
  const onTriggerVisible = useMemo(() => () => loadMoreRef.current(), []);

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

        {!categoriesLoading && <CategoryNav categories={categories} />}
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-2">
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
          <div
            ref={productsTopRef}
            className="scroll-mt-28 lg:col-span-9"
          >
            {/* Toolbar */}
            <div className="mb-8 flex items-center justify-between gap-4 lg:mb-10">
              <p className="text-sm text-neutral-500">
                {productsLoading
                  ? "Loading products..."
                  : `Showing ${products.length} of ${total} product${
                      total === 1 ? "" : "s"
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

                  <SheetContent side="left" className="overflow-y-auto p-6">
                    <SheetHeader className="p-0">
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>

                    <div className="mt-8">
                      <FilterSidebar categories={categories} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {productsLoading ? (
              /* Loading */
              <div className="grid grid-cols-1 border-l border-t border-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
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
                  We couldn&apos;t load products right now. Please try again.
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
                      buttonVariants({ variant: "outline" }),
                      "rounded-full border-neutral-300",
                    )}
                  >
                    Clear Filters
                  </Link>
                )}
              </div>
            ) : (
              <>
                {/* Product Grid */}
                <div className="grid grid-cols-1 border-l border-t border-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Infinite scroll: the next page loads as you near the
                    bottom; the button is a fallback. */}
                {hasNextPage && (
                  <>
                    <LoadMoreTrigger
                      onVisible={onTriggerVisible}
                      disabled={isFetchingNextPage}
                    />
                    <div className="mt-8 flex justify-center">
                      <button
                        type="button"
                        onClick={loadMore}
                        disabled={isFetchingNextPage}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "rounded-full border-neutral-300",
                        )}
                      >
                        {isFetchingNextPage ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          "Load more"
                        )}
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
