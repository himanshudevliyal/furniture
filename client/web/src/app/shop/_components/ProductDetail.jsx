"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

function resolveImage(path) {
  if (!path) return null;

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const base = (process.env.NEXT_PUBLIC_FILE_BASE ?? "").replace(/\/+$/, "");
  const clean = String(path).replace(/^\/+/, "");

  return `${base}/${clean}`;
}

export default function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const hero = product.hero ?? {};

  const heading =
    hero.heading ?? product.title ?? "Untitled product";

  const subheading = hero.subheading ?? "";

  const description =
    hero.descriptions?.filter(Boolean).join(" ") ??
    product.short_description ??
    "";

  const images = hero.images?.length ? hero.images : [];

  const breadcrumb = [
    product.category_title,
    product.sub_category_title,
  ]
    .filter(Boolean)
    .join(" / ");

  return (
    <div className="bg-[#FBF1E7]">
      <Section className="py-16 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Text */}
          <div className="flex flex-col gap-4">
            {breadcrumb && (
              <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
                {breadcrumb}
              </p>
            )}

            <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              {heading}
            </h1>

            {subheading && (
              <p className="text-xl font-medium text-neutral-900">
                {subheading}
              </p>
            )}

            {description && (
              <p className="max-w-md text-[15px] leading-relaxed text-neutral-500">
                {description}
              </p>
            )}

            <div className="mt-6 flex items-center gap-4">
              {/* Quantity */}
              <div className="flex h-12 shrink-0 items-center gap-2 rounded-full border border-neutral-200 bg-white px-3">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
                  aria-label="Decrease quantity"
                  className="flex h-8 w-8 items-center justify-center text-neutral-700 transition hover:text-neutral-900"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <span className="w-6 text-center text-sm font-medium text-neutral-900">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="flex h-8 w-8 items-center justify-center text-neutral-700 transition hover:text-neutral-900"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                size="lg"
                className="h-12 flex-1 rounded-full bg-neutral-900 px-10 text-sm font-medium uppercase tracking-[0.15em] text-white hover:bg-neutral-800"
              >
                Add to cart
              </Button>
            </div>
          </div>

          {/* Product Image Carousel */}
          <div className="w-full">
            {images.length > 0 ? (
              <Carousel
                opts={{
                  align: "start",
                  loop: images.length > 1,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {images.map((img, index) => {
                    const imageSrc = resolveImage(img);

                    return (
                      <CarouselItem key={img ?? index}>
                        <div className="relative aspect-[4/3] w-full lg:aspect-square">
                          {imageSrc && (
                            <Image
                              src={imageSrc}
                              alt={`${heading} ${index + 1}`}
                              fill
                              sizes="(min-width: 1024px) 45vw, 100vw"
                              className="object-contain"
                              priority={index === 0}
                            />
                          )}
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
              </Carousel>
            ) : (
              <div className="relative aspect-[4/3] w-full lg:aspect-square" />
            )}
          </div>

        </div>
      </Section>
    </div>
  );
}
