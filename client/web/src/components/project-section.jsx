"use client";

import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

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


// `projects` comes from the server (lib/projects.js), read from /img/projects.
export default function FurnitureProductsShowcase({ projects = [] }) {
  const [api, setApi] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const products = projects;

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
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
        className="text-center max-w-5xl mx-auto"
      />

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-6">
          {products.map((product) => (
            <CarouselItem
              key={product.image}
              className="basis-[85%] pl-4 sm:basis-[66.666%] sm:pl-6"
            >
              <Card product={product} fitOnMobile />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-3" />
        <CarouselNext className="right-3" />
      </Carousel>

      {/* Dot pagination */}
      <div className="mt-4 flex items-center justify-center">
        {products.map((product, index) => (
          // 24px hit area (touch target) around the small visual dot.
          <button
            key={product.image}
            type="button"
            aria-label={`Go to project ${index + 1}`}
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
                  : "bg-neutral-300 group-hover:bg-neutral-400",
              )}
            />
          </button>
        ))}
      </div>
    </Section>
  );
}