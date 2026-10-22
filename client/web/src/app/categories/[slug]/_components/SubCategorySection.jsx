"use client";

import { useState } from "react";

import { ChevronDown } from "lucide-react";

import { Section } from "@/components/layout/section";

import ProductCard from "@/components/ProductCard";

export default function SubCategorySection({
  category,
  subCategory,
  products,
  productsLoading,
}) {
  const [isOpen, setIsOpen] = useState(true);

  if (!subCategory) return null;

  // product.sub_category_id === subCategory.id is the primary relationship;
  // product.category_id === category.id guards against cross-category leaks.
  const subCategoryProducts = (products ?? [])
    .filter(
      (product) =>
        product?.is_active === true &&
        product?.sub_category_id === subCategory.id &&
        product?.category_id === category?.id,
    )
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  return (
<Section
  className="bg-gray-50"
  id={subCategory.slug}
>      {/* Sub-category header */}
      <div className="mb-8">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between gap-4 text-left"
        >
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              {subCategory.title}
            </h2>

            {subCategory.meta_description && (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-500">
                {subCategory.meta_description}
              </p>
            )}
          </div>

          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center border border-neutral-200 bg-white transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <ChevronDown className="h-5 w-5 text-neutral-700" />
          </span>
        </button>
      </div>

      {/* Products Dropdown */}
      {isOpen && (
        <>
          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-4 border-b border-neutral-200 px-5 py-6 sm:border-r sm:px-6"
                >
                  <div className="aspect-square w-full animate-pulse bg-neutral-100" />
                  <div className="h-4 w-2/3 animate-pulse bg-neutral-100" />
                  <div className="h-3 w-full animate-pulse bg-neutral-100" />
                </div>
              ))}
            </div>
          ) : subCategoryProducts.length === 0 ? (
            <p className="text-sm text-neutral-500">
              No products available in this sub-category yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 border-t border-l border-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
              {subCategoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </Section>
  );
}