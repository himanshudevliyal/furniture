"use client";

import Image from "next/image";
import { resolveFileUrl } from "@/utils/resolve-file-url";

export default function CategoryHero({ category }) {
  if (!category) return null;

  const imageSrc = resolveFileUrl(category.pictures?.[0]);
  const description = category.meta_description || "";

  return (
    <section className="relative flex h-[55vh] min-h-[420px] w-full items-end overflow-hidden bg-neutral-900 sm:h-[65vh]">
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={category.title || "Category"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* BEAUTIFUL OVERLAY - top light, bottom dark */}
     <div
  aria-hidden="true"
  className="
    absolute inset-0 z-0
    bg-gradient-to-b
    from-black/65
    via-black/20
    to-black/70
  "
/>


      {/* Extra bottom gradient for heading */}
      <div
        aria-hidden="true"
        className="
          absolute inset-x-0 bottom-0 z-0 h-1/2
          bg-gradient-to-t from-black/70 via-black/30 to-transparent
        "
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-12 sm:pb-16 md:px-10">
        <h1 className="max-w-2xl font-serif text-4xl font-semibold tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
          {category.title}
        </h1>

        {description && (
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/90 drop-shadow-md sm:text-base">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
