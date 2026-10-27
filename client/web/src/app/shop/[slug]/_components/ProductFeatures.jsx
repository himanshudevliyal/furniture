"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import Heading from "@/components/layout/heading";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";
import { resolveFileUrl } from "@/utils/resolve-file-url";

// "Features & Options": numbered feature cards on the left, and the selected
// feature's image on the right. Clicking a card (or the arrows) swaps the image.

export default function ProductFeatures({ product }) {
  const items = (product?.features?.items ?? []).filter((item) => item?.title);
  const heading = product?.features?.heading?.trim() || "Features & Options";

  const [active, setActive] = useState(0);

  if (!items.length) return null;

  const current = items[active] ?? items[0];
  // A feature without its own image keeps showing the first one that has one.
  const imageSrc =
    resolveFileUrl(current.image) ||
    resolveFileUrl(items.find((item) => item.image)?.image);

  const go = (step) =>
    setActive((i) => (i + step + items.length) % items.length);

  return (
    <Section className="bg-[#f4f0eb]">
      <Heading
        eyebrow="FEATURES"
        heading={heading}
        eyebrowClassName="text-[#e30613]"
        headingClassName="text-3xl sm:text-4xl lg:text-5xl"
        className="mx-auto mb-10 max-w-3xl text-center lg:mb-12"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
        {/* Image — shown first on mobile */}
        {imageSrc && (
          <div className="lg:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-white lg:sticky lg:top-28">
              <Image
                key={imageSrc}
                src={imageSrc}
                alt={current.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="animate-in fade-in object-contain p-4 duration-500"
              />

              <span className="absolute left-4 top-4 bg-white/90 px-3 py-1 text-xs font-medium tracking-wide text-neutral-700">
                {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>

              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous feature"
                    className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-colors hover:border-[#e30613] hover:bg-[#e30613] hover:text-white"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next feature"
                    className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-colors hover:border-[#e30613] hover:bg-[#e30613] hover:text-white"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Feature cards */}
        <div
          className={cn(
            "grid grid-cols-1 gap-4 self-start sm:grid-cols-2 lg:order-1 lg:gap-5",
            !imageSrc && "lg:col-span-2 lg:grid-cols-3",
          )}
        >
          {items.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={`${item.title}-${i}`}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={cn(
                  "group relative flex flex-col bg-white p-6 text-left transition-all duration-300",
                  "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-[#e30613] after:transition-transform after:duration-300 after:origin-left",
                  isActive
                    ? "shadow-md after:scale-x-100"
                    : "after:scale-x-0 hover:shadow-md",
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "text-lg font-medium transition-colors",
                      isActive ? "text-[#e30613]" : "text-neutral-400",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-300",
                      isActive
                        ? "bg-[#e30613] text-white"
                        : "bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200",
                    )}
                  >
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-medium leading-snug text-neutral-900">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="mt-3 max-h-24 overflow-y-auto pr-2 text-sm leading-6 text-neutral-600 [scrollbar-color:#d4d4d4_transparent] [scrollbar-width:thin]">
                    {item.description}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
