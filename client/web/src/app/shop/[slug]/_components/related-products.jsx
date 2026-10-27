"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import Heading from "@/components/layout/heading";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/use-products";

const PAGE_SIZE = 8;

export default function RelatedProducts({ product }) {
  const [page, setPage] = useState(1);

  // Same sub-category if the product has one, otherwise same category.
  const filterKey = product?.sub_category_id ? "sub_category" : "category";
  const filterValue = product?.sub_category_id || product?.category_id;
  const heading = product?.sub_category_title || product?.category_title;

  const searchParams = `${filterKey}=${filterValue}&page=${page}&limit=${PAGE_SIZE}`;

  const { data, isLoading } = useProducts(
    filterValue ? searchParams : "",
  );

  const products = useMemo(
    () => (data?.products ?? []).filter((p) => p.id !== product?.id),
    [data, product?.id],
  );

  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  if (!filterValue) return null;
  if (!isLoading && products.length === 0) return null;

  return (
    <Section id="product-related" className="scroll-mt-[140px] bg-neutral-50/60 md:scroll-mt-[150px]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Heading
          heading="Related Products"
          subheading={heading ? `More from ${heading}` : undefined}
          className="mb-0"
        
        />

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="text-muted-foreground text-sm">
              Page {page} of {totalPages}
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] w-full animate-pulse rounded-2xl bg-neutral-200"
              />
            ))
          : products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </Section>
  );
}