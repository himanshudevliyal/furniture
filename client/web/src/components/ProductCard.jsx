"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { resolveFileUrl } from "@/utils/resolve-file-url";

export default function ProductCard({ product }) {
  if (!product) return null;

  const imageSrc = resolveFileUrl(product.thumbnail);

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="
        group flex flex-col bg-white
        border-b border-neutral-200 px-5 py-6
        transition-colors duration-300 hover:bg-neutral-50
        sm:border-r sm:px-6
        sm:[&:nth-child(2n)]:border-r-0
        lg:border-r
        lg:[&:nth-child(4n)]:border-r-0
      "
    >
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={product.title || "Product"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 22vw"
            className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-3 text-center text-xs font-medium text-neutral-400">
            {product.title}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-5 flex flex-1 flex-col">
        <h3 className="text-base font-semibold tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-neutral-600">
          {product.title}
        </h3>

        {product.short_description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">
            {product.short_description}
          </p>
        )}

        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-900">
          View product
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        </span>
      </div>
    </Link>
  );
}
