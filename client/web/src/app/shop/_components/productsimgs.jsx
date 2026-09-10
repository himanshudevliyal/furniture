"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils"
import { Section } from "@/components/layout/section";
import Card from "@/components/ui/card";

// ---------------------------------------------------------------------------
// Data — swap images/copy anytime
// ---------------------------------------------------------------------------

const products = [
  {
    key: "sofas",
  
    image: "/img/hero.png",
  },
  {
    key: "dining",
   
    image: "/img/hospitality.jpg",
  },
  {
    key: "office",

    image: "/img/residential.jpg",
  },
  {
    key: "bedroom",
  
    image: "/img/retail.jpg",
  },
];

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export default function FurnitureProductsShowcase() {
  const [api, setApi] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    setActiveIndex(api.selectedScrollSnap());
    api.on("select", () => setActiveIndex(api.selectedScrollSnap()));
  }, [api]);

  return (
    <Section
      aria-labelledby="products-heading"
      className="w-full bg-white py-14 sm:py-16"
    >

      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: false }}
        className="w-full"
      >
        <CarouselContent className="-ml-6">
          {products.map((product) => (
            <CarouselItem
              key={product.key}
              className="basis-[85%] pl-4 sm:basis-[66.666%] sm:pl-6"
            >
              <Card product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3" />
        <CarouselNext className="right-3" />
      </Carousel>

      {/* Dot pagination */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {products.map((product, index) => (
          <button
            key={product.key}
            type="button"
            aria-label={`Go to ${product.title}`}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === activeIndex
                ? "w-4 bg-neutral-900"
                : "bg-neutral-300 hover:bg-neutral-400",
            )}
          />
        ))}
      </div>
    </Section>
  );
}
