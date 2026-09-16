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
import { cn } from "@/lib/utils";
import { Section } from "./layout/section";
import Card from "./card";
import Heading from "./layout/heading";

// ---------------------------------------------------------------------------
// Data — swap images/copy anytime
// ---------------------------------------------------------------------------

const products = [
  {
    key: "sofas",
    title: "Sofa Collection",
    subtitle: "Handcrafted comfort for your living room",
    image: "/img/hero.png",
  },
  {
    key: "dining",
    title: "Dining Tables",
    subtitle: "Solid wood tables built to last generations",
    image: "/img/hospitality.jpg",
  },
  {
    key: "office",
    title: "Office Chairs",
    subtitle: "Ergonomic seating for all-day comfort",
    image: "/img/residential.jpg",
  },
  {
    key: "bedroom",
    title: "Bedroom Furniture",
    subtitle: "Beds, wardrobes and storage that feel like home",
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
   
<Heading
  heading="Our Projects"
  subheading="Explore our completed workspace projects, featuring thoughtfully designed office furniture solutions built for modern, functional, and professional environments."
  eyebrowClassName="justify-center"
  className="text-center  max-w-5xl mx-auto"
/>
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
