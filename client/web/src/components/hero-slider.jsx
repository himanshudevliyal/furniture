"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { heroSlides } from "@/lib/hero-slides";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const AUTOPLAY_INTERVAL = 6500;

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef(null);

  const total = heroSlides.length;

  const goTo = useCallback(
    (index) => {
      setActiveIndex(((index % total) + total) % total);
    },
    [total],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      goTo(activeIndex + 1);
    }, AUTOPLAY_INTERVAL);
    return () => clearTimeout(timeoutRef.current);
  }, [activeIndex, goTo]);

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-black">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          aria-hidden={index !== activeIndex}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            index === activeIndex
              ? "z-10 opacity-100"
              : "pointer-events-none z-0 opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-[center_30%] md:object-center"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50" />

          <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
            <div
              className={`flex max-w-4xl flex-col items-center text-center ${
                index === activeIndex ? "animate-fade-in" : ""
              }`}
            >
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-white/95 sm:text-base">
                {slide.eyebrow}
              </p>
              <h1 className="select-none font-serif font-semibold leading-[0.85] text-white text-[4rem] sm:text-[6rem] md:text-[9rem] lg:text-[13rem]">
                {slide.title}
              </h1>
              <p className="mx-auto mt-6 max-w-[850px] text-balance text-[15px] leading-relaxed text-white/90 sm:text-lg md:text-xl">
                {slide.description}
              </p>
              <Link
                href={slide.ctaHref}
                className={buttonVariants({
                  className:
                    "mt-9 rounded-[2px] text-xs tracking-[0.2em] sm:text-sm",
                })}
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-white transition-colors hover:text-white/70 sm:left-8 sm:h-11 sm:w-11 sm:border sm:border-white/40"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-white transition-colors hover:text-white/70 sm:right-8 sm:h-11 sm:w-11 sm:border sm:border-white/40"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2.5 sm:bottom-9">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-white"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
