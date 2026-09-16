
"use client";

import { useCallback, useMemo, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/section";
import Card from "@/components/card";

export default function FurnitureProductsShowcase({ product }) {
  const [api, setApi] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const galleryImages = product?.gallery?.images ?? [];
  const galleryHeading = product?.gallery?.heading?.trim() || "";

  const imageBaseUrl =
    process.env.NEXT_PUBLIC_FILE_BASE || "";

const items = useMemo( () => galleryImages .map((file, index) => { if (!file) return null; const imageSrc = file.startsWith("http") ? file : `${imageBaseUrl}/${file}`.replace(/([^:]\/)\/+/g, "$1"); return { key: `gallery-${index}`, image: imageSrc, }; }) .filter(Boolean), [galleryImages, imageBaseUrl] );

  const handleSetApi = useCallback((carouselApi) => {
    if (!carouselApi) return;

    setApi(carouselApi);

    const onSelect = () => {
      setActiveIndex(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", onSelect);

    queueMicrotask(onSelect);
  }, []);

  // Image bhi nahi hai to pura section hide
  if (items.length === 0) return null;

  return (
    <Section className="w-full bg-white py-14 sm:py-16">
      {/* Heading sirf tab show hoga jab heading available ho */}
      {galleryHeading && (
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          {galleryHeading}
        </h2>
      )}

      <Carousel
        setApi={handleSetApi}
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-6">
          {items.map((item) => (
            <CarouselItem
              key={item.key}
              className="basis-[85%] pl-4 sm:basis-[66.666%] sm:pl-6"
            >
              <Card product={item} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {items.length > 1 && (
          <>
            <CarouselPrevious className="left-3" />
            <CarouselNext className="right-3" />
          </>
        )}
      </Carousel>

      {/* Dots only when multiple images */}
      {items.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {items.map((item, index) => (
            <button
              key={item.key}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeIndex}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                index === activeIndex
                  ? "w-4 bg-neutral-900"
                  : "bg-neutral-300 hover:bg-neutral-400"
              )}
            />
          ))}
        </div>
      )}
    </Section>
  );
}