"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// Loaded on first click: the form (zod + react-hook-form) is not needed to
// render the hero, so it stays out of the homepage's initial JavaScript.
const ProjectQuoteDialog = dynamic(
  () => import("@/components/project-quote-dialog"),
  { ssr: false },
);

// Images /public/img/hero/ mein hain (1920px wide, landscape).
// `category` quote form ke saath server par jaata hai, `href` "View" button ka link hai.
const slides = [
  {
    image: "/img/hero/office-furniture.jpg",
    title: "Commercial Office Furniture for Every Project",
    subtitle:
      "Desks, workstations, seating, partitions and storage for corporate offices and commercial projects.",
    category: "Office Furniture",
    href: "/shop",
  },
  {
    image: "/img/hero/workstations.jpg",
    title: "Workstations Designed Around Your Team",
    subtitle:
      "Modular workstations that balance focus, privacy and collaboration for every team size.",
    category: "Workstations",
    href: "/categories/workstations",
  },
  {
    image: "/img/hero/office-storage.webp",
    title: "Office Storage That Brings Order to Work",
    subtitle:
      "Cabinets, lockers, pedestals and shelving that keep workspaces organised and uncluttered.",
    category: "Office Storage",
    href: "/categories/office-storage",
  },
  {
    image: "/img/hero/desk-and-table.webp",
    title: "Office Desks & Tables for Modern Workspaces",
    subtitle:
      "From individual desks to conference and cabin tables, built to fit how your office works.",
    category: "Desk & Table",
    href: "/categories/desk-and-table",
  },
  {
    image: "/img/hero/office-partitions.webp",
    title: "Office Partitions & Cubicles",
    subtitle:
      "Define focused work zones and private areas with flexible partition and cubicle systems.",
    category: "Office Partitions",
    href: "/categories/office-partitions",
  },
];

const AUTOPLAY_MS = 3000;

// Only the first slide title is the page <h1>; the rest are <h2>.
function SlideTitle({ as: Tag, ...props }) {
  return <Tag {...props} />;
}

export default function HeroSlider() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteRequested, setQuoteRequested] = useState(false);
  const [quoteCategory, setQuoteCategory] = useState("");

  // Images of slides 2+ are fetched shortly after the first paint, so they
  // don't compete with the first slide (the page's LCP image) for bandwidth.
  // Autoplay only moves after AUTOPLAY_MS, so they are ready well before.
  const [restSlidesReady, setRestSlidesReady] = useState(false);

  // Track active slide
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      if (api.selectedScrollSnap() !== 0) setRestSlidesReady(true);
    };
    onSelect();

    api.on("select", onSelect);
    api.on("reInit", onSelect);
    const loadRest = setTimeout(() => setRestSlidesReady(true), 1200);

    return () => {
      clearTimeout(loadRest);
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  // Autoplay. The hero fills the screen, so it does NOT pause on hover (the
  // cursor is almost always over it). It pauses only while a keyboard user is
  // focused inside it or the quote dialog is open. Reduced-motion users still
  // get the rotation, just as an instant switch instead of a slide.
  useEffect(() => {
    if (!api || paused || quoteOpen) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const id = setInterval(() => {
      if (document.hidden) return;
      const next = (api.selectedScrollSnap() + 1) % api.scrollSnapList().length;
      api.scrollTo(next, reduceMotion);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [api, paused, quoteOpen]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured products"
      onFocus={(e) => {
        if (e.target.matches?.(":focus-visible")) setPaused(true);
      }}
      onBlur={() => setPaused(false)}
      className="relative w-full overflow-hidden bg-neutral-200"
    >
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem
              key={slide.title}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              className="pl-0"
            >
              {/* Full screen minus navbar: 68px / 80px (md) + 1px border */}
              <div className="relative h-[calc(100svh-69px)] min-h-[440px] w-full md:h-[calc(100svh-81px)]">
                {(index === 0 || restSlidesReady) && (
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="100vw"
                    priority={index === 0}
                    className="object-cover"
                  />
                )}

                {/* Legibility overlays — light photos pe bhi white text padhne layak rahe */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />

                <div className="absolute inset-0 mx-auto flex max-w-[1600px] flex-col justify-end px-5 pb-28 md:px-10 md:pb-24">
                 <SlideTitle
  as={index === 0 ? "h1" : "h2"}
  className="
    max-w-[16ch]
    text-2xl
    font-semibold
    leading-[1.1]
    tracking-tight
    text-white
    sm:text-3xl
    md:text-4xl
    lg:text-4xl
    xl:text-5xl
  "
>
  {slide.title}
</SlideTitle>

<p
  className="
    mt-4
    max-w-md
    text-sm
    font-medium
    leading-relaxed
    text-white
    sm:text-base
    md:text-lg
    lg:text-base
    xl:text-lg
  "
>
  {slide.subtitle}
</p>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap items-center gap-3 md:mt-8">
                    <Link
                      href={slide.href}
                      className="group inline-flex items-center gap-2 rounded-sm border border-white px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-neutral-900 md:px-6 md:text-[15px]"
                    >
                      View {slide.category}
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setQuoteCategory(slide.category);
                        setQuoteRequested(true);
                        setQuoteOpen(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-sm border border-[#e30613] bg-[#e30613] px-5 py-3 text-sm font-medium text-white transition-colors hover:border-[#b8050f] hover:bg-[#b8050f] md:px-6 md:text-[15px]"
                    >
                      Request Project Quote
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>


      {/* Dots */}
      <div className="pointer-events-none absolute inset-x-0 bottom-16 mx-auto w-full max-w-[1600px] px-5 md:bottom-8 md:px-10">
        <div className="pointer-events-auto -ml-2 flex items-center">
          {slides.map((slide, index) => (
            // 24px hit area (touch target) around a 10px visual dot.
            <button
              key={slide.title}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={current === index}
              onClick={() => api?.scrollTo(index)}
              className="group flex h-6 w-6 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span
                aria-hidden
                className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                  current === index
                    ? "bg-white"
                    : "bg-white/70 group-hover:bg-white"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Mounted after the first request, then kept so closing can animate. */}
      {quoteRequested && (
        <ProjectQuoteDialog
          open={quoteOpen}
          onOpenChange={setQuoteOpen}
          category={quoteCategory}
        />
      )}
    </section>
  );
}