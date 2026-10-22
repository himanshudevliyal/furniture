"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Section } from "./layout/section";

import { useCategories } from "@/hooks/use-categories";

import {
  categoryHref,
  getSubCategories,
  subCategoryHref,
  subCategoryLabel,
} from "@/components/category-mega-menu";

import Heading from "./layout/heading";

// ---------------------------------------------------------------------------
// Image URL
// ---------------------------------------------------------------------------

const FILE_BASE = process.env.NEXT_PUBLIC_FILE_BASE || "";

function getImageUrl(value) {
  if (!value) return null;

  const image = typeof value === "string" ? value : value?.url;

  if (!image) return null;

  // Already absolute URL
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  // Remove starting slash before joining
  return `${FILE_BASE.replace(/\/$/, "")}/${image.replace(/^\//, "")}`;
}

// ---------------------------------------------------------------------------
// Sub-category image
// ---------------------------------------------------------------------------

function getSubImage(sub) {
  const value = sub?.pictures?.[0];

  return getImageUrl(value);
}

// ---------------------------------------------------------------------------
// Sub Category Card
// ---------------------------------------------------------------------------

function SubCategoryCard({ category, sub }) {
  const image = getSubImage(sub);
  const label = subCategoryLabel(sub);

  return (
    <Link href={subCategoryHref(category, sub)} className="group block">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
        {image ? (
          <Image
            src={image}
            alt={label}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-neutral-500">
            No image
          </div>
        )}
      </div>

      <h3 className="mt-4 text-lg font-medium tracking-wide text-neutral-800 transition-colors group-hover:text-black md:text-xl">
        {label}
      </h3>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Exclusive Products
// ---------------------------------------------------------------------------

export default function ExclusiveProducts() {
  const { data, isLoading, isError } = useCategories();

  const categories = data?.categories ?? [];

  const [activeId, setActiveId] = useState(null);

  if (isLoading) {
    return (
      <Section>
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-14 min-w-[160px] flex-1 animate-pulse bg-neutral-100"
            />
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[16/10] animate-pulse bg-neutral-100"
            />
          ))}
        </div>
      </Section>
    );
  }

  if (isError || !categories.length) {
    return null;
  }

  const activeCategory =
    categories.find((c) => String(c.id) === String(activeId)) ??
    categories[0];

  const subs = getSubCategories(activeCategory);

  return (
    <Section>
      <Heading
        heading="Office Furniture"
        subheading="Products that fit every workspace"
        headingClassName="text-3xl sm:text-4xl lg:text-5xl"
        className="max-w-5xl "
      />

      {/* CATEGORY TABS */}
{/* CATEGORY TABS */}
<div
  role="tablist"
  aria-label="Product categories"
  className="
    flex
    gap-2.5
    overflow-x-auto
    pb-2
    scroll-smooth
    [scrollbar-width:auto]
    [&::-webkit-scrollbar]:h-1.5
    [&::-webkit-scrollbar-track]:bg-neutral-100
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-neutral-300
  "
>
  {categories.map((category) => {
    const isActive =
      String(category.id) === String(activeCategory.id);

    return (
      <button
        key={category.id}
        type="button"
        role="tab"
        aria-selected={isActive}
        onClick={() => setActiveId(category.id)}
        className={`
          h-12
          min-w-[145px]
          shrink-0
          whitespace-nowrap
          border-b-2
          px-4
          text-sm
          font-medium
          uppercase
          tracking-[0.06em]
          transition-colors
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-black/30
          ${
            isActive
              ? "border-black bg-neutral-200/80 text-neutral-900"
              : "border-transparent bg-neutral-100 text-neutral-700 hover:bg-neutral-200/60"
          }
        `}
      >
        {category.title}
      </button>
    );
  })}
</div>

      {/* SUB-CATEGORY CARDS */}
      <div role="tabpanel" className="mt-8 md:mt-10">
        {subs.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {subs.map((sub) => (
              <SubCategoryCard
                key={sub.id}
                category={activeCategory}
                sub={sub}
              />
            ))}
          </div>
        ) : (
          <p className="py-10 text-neutral-500">
            Is category mein abhi koi sub-category nahi hai.
          </p>
        )}

        <div className="mt-8">
          <Link
            href={categoryHref(activeCategory)}
            className="text-[15px] font-semibold text-neutral-900 underline underline-offset-4 transition-colors hover:text-neutral-600"
          >
            View all {activeCategory.title}
          </Link>
        </div>
      </div>
    </Section>
  );
}