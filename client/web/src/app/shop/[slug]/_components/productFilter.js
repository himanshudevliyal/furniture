"use client";

import { useState, useMemo } from "react";
import { FilterSidebar } from "./filter-sidebar";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import {
  useQueryState,
  parseAsArrayOf,
  parseAsString,
  useQueryStates,
  parseAsInteger,
} from "nuqs";
import { useSearchParams } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import ProductCards from "@/components/ui/product-card";

export default function ProductFilter() {
  const searchParams = useSearchParams();
  const searchParamsStr = searchParams.toString();

  const [range, setRange] = useQueryStates({
    price_from: parseAsInteger.withOptions({ throttleMs: 500 }),
    price_to: parseAsInteger.withOptions({ throttleMs: 500 }),
  });

  const { price_from, price_to } = range;

  const [categoriesQ, setCategoriesQ] = useQueryState(
    "category",
    parseAsString.withDefault(""),
  );

  // PRODUCTS
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", searchParamsStr],
    queryFn: async () => {
      const { data } = await http().get(
        `${endpoints.products.getAll}?${searchParamsStr}`,
      );
      return data?.products ?? [];
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await http().get(endpoints.categories.getAll);
      return data?.categories ?? [];
    },
  });

  // CLEAR FILTERS
  const clearFilters = () => {
    setCategoriesQ(null);
    setRange({ price_from: null, price_to: null });
  };

  const isAnyFilterActive = useMemo(() => {
    return !!categoriesQ || !!price_from || !!price_to;
  }, [categoriesQ, price_from, price_to]);

  return (
    <main className="container mx-auto px-4 py-6 md:py-8">
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-3  ">
          <FilterSidebar
            title="Filters"
            categories={categories}
            categoriesQ={categoriesQ}
            onCategoriesChange={setCategoriesQ}
            onClear={clearFilters}
            isAnyFiltterActive={isAnyFilterActive}
            range={range}
            setRange={setRange}
          />
        </aside>

        {/* Mobile Sidebar */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger className="flex justify-between w-full">
              <h4 className="text-xl font-semibold pb-2 mb-4 border-b-2">
                Filter Products
              </h4>
              <Menu />
            </SheetTrigger>

            <SheetContent
              SheetTitle="categories"
              side="left"
              className="w-[90%]"
            >
              <SheetHeader>
                <FilterSidebar
                  title="Filter Products"
                  categories={categories}
                  categoriesQ={categoriesQ}
                  onCategoriesChange={setCategoriesQ}
                  onClear={clearFilters}
                  isAnyFiltterActive={isAnyFilterActive}
                  range={range}
                  setRange={setRange}
                />
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        {/* Products */}
        <section className="col-span-full lg:col-span-9">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No products found.
              </p>
            </div>
          ) : (
            <>
              <p className="mb-4 text-sm text-muted-foreground">
                Showing {products.length} products
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCards key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
