
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Expand } from "lucide-react";

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

  const galleryImages = useMemo(() => product?.gallery?.images ?? [], [product]);

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

  // Click (not drag) on a slide opens it full size, same lightbox as /cases.
  useEffect(() => {
    Fancybox.bind("[data-fancybox=product-gallery]", {
      animated: true,
      showClass: "f-fadeIn",
      hideClass: "f-fadeOut",
      Thumbs: { autoStart: false },
    });
    return () => {
      Fancybox.unbind("[data-fancybox=product-gallery]");
      Fancybox.close();
    };
  }, []);

  // Image bhi nahi hai to pura section hide
  if (items.length === 0) return null;

  return (
    <Section id="product-applications" className="w-full scroll-mt-[140px] bg-white py-14 sm:py-16 md:scroll-mt-[150px]">
      <Carousel
        setApi={handleSetApi}
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 sm:-ml-6">
          {items.map((item, index) => (
            <CarouselItem
              key={item.key}
              className="basis-full pl-4 sm:basis-[66.666%] sm:pl-6"
            >
              <a
                href={item.image}
                data-fancybox="product-gallery"
                aria-label={`Open image ${index + 1} of ${items.length}`}
                className="group relative block cursor-zoom-in"
              >
                <Card product={item} fit />
                <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <Expand className="h-4 w-4" aria-hidden />
                </span>
              </a>
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
        <div className="mt-4 flex items-center justify-center">
          {items.map((item, index) => (
            // 24px hit area (touch target) around the small visual dot.
            <button
              key={item.key}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeIndex}
              onClick={() => api?.scrollTo(index)}
              className="group flex h-6 min-w-6 items-center justify-center"
            >
              <span
                aria-hidden
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  index === activeIndex
                    ? "w-4 bg-neutral-900"
                    : "bg-neutral-300 group-hover:bg-neutral-400"
                )}
              />
            </button>
          ))}
        </div>
      )}
    </Section>
  );
}