"use client";

import Image from "next/image";

import { resolveFileUrl } from "@/utils/resolve-file-url";
import { Section } from "@/components/layout/section";
import ProductCard from "@/components/product-card";

export default function SubCategorySection({
  category,
  subCategory,
  products,
  productsLoading,
}) {
  if (!subCategory) return null;

  const imageSrc = resolveFileUrl(subCategory.pictures?.[0]);

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
    <Section containerClassName="max-w-[1600px]">
      {/* Sub-category header */}
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center">
        {imageSrc && (
          <div className="relative h-40 w-full shrink-0 overflow-hidden bg-neutral-100 sm:h-32 sm:w-32">
            <Image
              src={imageSrc}
              alt={subCategory.title || "Sub-category"}
              fill
              sizes="(max-width: 640px) 100vw, 128px"
              className="object-cover"
            />
          </div>
        )}

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
      </div>

      {/* Products */}
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
    </Section>
  );
}
