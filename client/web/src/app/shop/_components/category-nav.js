"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import { resolveFileUrl } from "@/utils/resolve-file-url";
import { Section } from "@/components/layout/section";

export default function CategoryNav({ categories = [] }) {
  if (!categories.length) return null;

  return (
    <Section className="border-b border-neutral-200">
        <Carousel
          opts={{
            align: "start",
            dragFree: true,
            containScroll: "trimSnaps",
          }}
        >
        <CarouselContent className=" mx-start -ml-4">
  {categories.map((cat) => {
    const imageSrc = resolveFileUrl(cat.pictures?.[0]);

    return (
      <CarouselItem
        key={cat.id}
        className=" pl-4"
      >
        <Link
          href={`/categories/${cat.slug}`}
          className="group w-h-30 flex  flex-col items-center gap-3 sm:w-[160px]"
        >
          <div
            className="
              h-25
              w-25
              shrink-0
              overflow-hidden
              rounded-full
              bg-neutral-100
              ring-1
              ring-neutral-200
              transition-transform
              duration-300
              ease-out
              group-hover:scale-105
              "
          >
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={cat.title || "Category"}
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <span className="line-clamp-2 text-center text-sm text-neutral-600">
            {cat.title}
          </span>
        </Link>
      </CarouselItem>
    );
  })}
</CarouselContent>

          <CarouselPrevious className="hidden -left-4 lg:flex" />
          <CarouselNext className="hidden -right-4 lg:flex" />
        </Carousel>
      </Section>
  );
}