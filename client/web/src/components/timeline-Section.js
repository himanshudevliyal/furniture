"use client";

import { useEffect, useMemo, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Heading from "./layout/heading";
import { Section } from "./layout/section";
import Image from "next/image";



const timelineData = [
  {
    year: "1989",
    title: "The Beginning",
    description:
      "Natraj began its journey in the office furniture industry with a focus on quality, service and practical workplace solutions.",
    image: "/img/timeline/natraj-1989.jpg",
  },
  {
    year: "1990s",
    title: "Building Trust",
    description:
      "During its early years, Natraj continued building long-term customer relationships while delivering dependable office furniture solutions.",
    image: "/img/timeline/natraj-1990.jpg",
  },
  {
    year: "2000s",
    title: "Expanding Solutions",
    description:
      "The product range evolved across workstations, desks, seating and storage solutions to support the changing needs of modern workplaces.",
    image: "/img/timeline/natraj-2000.jpg",
  },
  {
    year: "2010s",
    title: "Customised Workspaces",
    description:
      "Natraj strengthened its approach to customised workplace solutions, helping businesses create functional, productive and comfortable offices.",
    image: "/img/timeline/natraj-2010.jpg",
  },
  {
    year: "2020s",
    title: "Modern Workplaces",
    description:
      "With a broader portfolio, Natraj continues to provide modular workstations, executive desks, seating, storage and other workplace solutions.",
    image: "/img/timeline/natraj-2020.jpg",
  },
  {
    year: "Today",
    title: "Creating Better Workspaces",
    description:
      "Today, Natraj combines quality manufacturing, customisation and dependable service to create workplaces designed around the way people work.",
    image: "/img/timeline/natraj-today.jpg",
  },
];

export default function NatrajTimeline() {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  /*
   * IMPORTANT:
   * Do NOT use useRef().current inside JSX.
   * useMemo creates the autoplay plugin once
   * without accessing a ref during render.
   */
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 3500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    []
  );

  /*
   * Track active carousel slide
   */
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  /*
   * Progress percentage
   */
  const progress =
    ((current + 1) / timelineData.length) * 100;

  return (
    <Section className="bg-[#f7f7f5] py-20 lg:py-28 overflow-hidden">
      {/* =========================
          SECTION HEADING
      ========================== */}
      <Heading
        eyebrow="OUR JOURNEY"
        heading="BUILT AROUND BETTER WORKPLACES"
        subheading="From our beginnings to today's evolving workplaces, our journey has always been shaped by quality, functionality, customisation and dependable service."
        eyebrowClassName="justify-center"
        headingClassName="text-3xl sm:text-4xl lg:text-5xl"
        className="max-w-4xl mx-auto text-center"
      />

      {/* =========================
          TIMELINE CAROUSEL
      ========================== */}
 <div className="relative mt-12 lg:mt-16">
  <Carousel
    setApi={setApi}
    opts={{
      align: "start",
      loop: true,
    }}
    plugins={[autoplay]}
    className="w-full"
  >
    <CarouselContent className="-ml-4">
      {timelineData.map((item, index) => (
        <CarouselItem
          key={item.year}
          className="
            pl-4
            basis-full
            sm:basis-1/2
            lg:basis-1/4
          "
        >
          <div className="relative h-full px-2">

            {/* IMAGE */}
            <div className="aspect-square w-full overflow-hidden rounded-2xl">
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={500}
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-105
                "
              />
            </div>

            {/* TIMELINE */}
            <div className="relative mt-10 h-[18px]">

              {/* Left line */}
              {index !== 0 && (
                <span
                  className="
                    absolute
                    left-0
                    top-1/2
                    h-px
                    w-1/2
                    -translate-y-1/2
                    bg-neutral-300
                  "
                />
              )}

              {/* Right line */}
              {index !== timelineData.length - 1 && (
                <span
                  className="
                    absolute
                    right-0
                    top-1/2
                    h-px
                    w-1/2
                    -translate-y-1/2
                    bg-neutral-300
                  "
                />
              )}

              {/* Dot */}
              <span
                className="
                  absolute
                  left-1/2
                  top-1/2
                  z-10
                  h-4
                  w-4
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-black
                  ring-4
                  ring-white
                "
              />
            </div>

            {/* CONTENT */}
            <div className="pt-6 pb-5">

              {/* Year */}
              <h3
                className="
                  text-2xl
                  font-semibold
                  tracking-tight
                  text-black
                  lg:text-3xl
                "
              >
                {item.year}
              </h3>

              {/* Title */}
              <h4
                className="
                  mt-3
                  text-lg
                  font-medium
                  text-black
                  lg:text-xl
                "
              >
                {item.title}
              </h4>

              {/* Description */}
              <p
                className="
                  mt-2
                  max-w-[360px]
                  text-sm
                  leading-6
                  text-neutral-600
                  lg:text-base
                  lg:leading-7
                "
              >
                {item.description}
              </p>
            </div>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>

    {/* ARROWS */}
    {/* <CarouselPrevious
      className="
        hidden
        lg:flex
        -left-6
        border-neutral-300
        bg-white
        text-black
        hover:bg-neutral-100
      "
    />

    <CarouselNext
      className="
        hidden
        lg:flex
        -right-6
        border-neutral-300
        bg-white
        text-black
        hover:bg-neutral-100
      "
    /> */}
  </Carousel>

  {/* PROGRESS BAR */}
  <div className="mt-8 px-2 lg:mt-10">

    <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-neutral-200">
      <div
        className="
          absolute
          left-0
          top-0
          h-full
          rounded-full
          bg-black
          transition-[width]
          duration-700
          ease-out
        "
        style={{
          width: `${progress}%`,
        }}
      />
    </div>

    <div className="mt-3 flex items-center justify-between">
      <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">
        Our Journey
      </span>

      <span className="text-xs text-neutral-500">
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(timelineData.length).padStart(2, "0")}
      </span>
    </div>
  </div>
</div>
    </Section>
  );
}