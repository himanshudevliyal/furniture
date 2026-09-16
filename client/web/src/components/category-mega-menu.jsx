"use client";

import Image from "next/image";
import Link from "next/link";

const FILE_BASE = process.env.NEXT_PUBLIC_FILE_BASE;

export default function CategoryMegaMenu({
  category,
  onMouseEnter,
  onMouseLeave,
}) {
  if (!category) return null;

  // Support both API naming styles
  const subCategories =
    category?.sub_categories ?? category?.subCategories ?? [];

  const categorySlug = category.slug ?? category.id;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute inset-x-0 top-full z-40 border-t-2 border-black/50 bg-white text-black shadow-xl"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-8 md:px-10">
        {subCategories.length === 0 ? (
          <p className="text-sm text-neutral-500">
            No sub-categories found for this category.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 lg:grid-cols-6">
            {subCategories.map((sub) => {
              const image =
                sub?.pictures?.[0] || sub?.picture || sub?.image || null;

              const imageSrc = image
                ? image.startsWith("http")
                  ? image
                  : `${FILE_BASE}/${image}`
                : null;

              const subSlug = sub.slug ?? sub.id;

              return (
                <Link
                  key={sub.id}
                  href={`/categories/${categorySlug}#${subSlug}`}
                  className="group block "
                >
                  {/* Image */}
                  <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={sub.title || "Category"}
                        fill
                        sizes="(max-width: 768px) 45vw, (max-width: 1024px) 25vw, 15vw"
                        className="object-cover    rounded-md transition-transform duration-300 group-hover:scale-105"
                      />  
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-neutral-100 px-3 text-center">
                        <span className="text-xs font-medium text-neutral-500">
                          {sub.title}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <p className="mt-3 text-center text-[13px] font-bold uppercase tracking-wide text-neutral-900 transition-colors group-hover:text-black">
                    {sub.title}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}