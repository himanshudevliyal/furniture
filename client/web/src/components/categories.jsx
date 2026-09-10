"use client";

import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@tanstack/react-query";

import CategoriesCard from "./categories-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Section } from "./layout/section";
import Heading from "./layout/heading";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";



export default function ExclusiveProducts() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await http().get(endpoints.categories.getAll);
      return response.data;
    },
  });
  

  const categories = data?.categories ?? [];

  if (isLoading) {
    return (
      <Section>
        <Heading
          heading="Explore Our Product Categories"
          subheading="Discover our thoughtfully curated range of premium products, designed to bring quality, style, and functionality to every space."
          eyebrowClassName="justify-center"
          headingClassName="text-3xl sm:text-4xl lg:text-5xl"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[400px] animate-pulse rounded-xl bg-muted"
            />
          ))}
        </div>
      </Section>
    );
  }

  if (isError || !categories.length) {
    return null;
  }

  return (
    <Section>
      <Heading
        heading="Explore Our Product Categories"
        subheading="Discover our thoughtfully curated range of premium products, designed to bring quality, style, and functionality to every space."
        eyebrowClassName="justify-center"
        headingClassName="text-3xl sm:text-4xl lg:text-5xl"
      />

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2500,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {categories.map((category) => (
            <CarouselItem
              key={category.id}
              className="basis-full pl-4 sm:basis-1/2 lg:basis-1/4"
            >
              <CategoriesCard product={category} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Section>
  );
}