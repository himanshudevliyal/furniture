"use client";

import Image from "next/image";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const industries = [
  "Pharmaceutical",
  "Information Technology",
  "Marketing & Advertising",
  "Textile",
  "Banking & Finance",
  "Gems and Jewellery",
  "Insurance",
  "Architecture & Interior",
  "Real Estate",
  "Construction",
  "Automobile",
  "Auto Components",
  "FMCG",
  "Retail & E-Commerce",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Agriculture",
  "Food & Beverages",
  "Roads & Highways",
  "Telecom",
  "Tourism & Hospitality",
  "MSME",
  "Media and Entertainment",
];

// Existing images already in /public — reused cyclically, no new assets needed
const images = [
  "/img/corporate.jpg",
  "/img/hero.png",
  "/img/hospitality.jpg",
  "/img/residential.jpg",
  "/img/retail.jpg",
  "/demo/imgi_16_h2-cate06.jpg",
  "/demo/imgi_32_h2-brand03.jpg",
  "/demo/imgi_33_h2-brand04.jpg",
  "/demo/imgi_34_h2-brand05.jpg",
  "/demo/imgi_35_h2-brand06.jpg",
  "/demo/imgi_36_h2-brand01.jpg",
  "/demo/imgi_37_h2-brand02.jpg",
  "/demo/imgi_228_slider-2-banner-2.jpg",
];

const industryCards = industries.map((title, index) => ({
  title,
  image: images[index % images.length],
}));

const rowOne = industryCards.filter((_, i) => i % 2 === 0);
const rowTwo = industryCards.filter((_, i) => i % 2 === 1);

// ---------------------------------------------------------------------------
// Card — same visual language as the other image cards (overlay + bold title)
// ---------------------------------------------------------------------------

function IndustryCard({ title, image }) {
  return (
    <div className="relative h-56 w-72 shrink-0 overflow-hidden rounded-[20px] ">
      <Image
        src={image}
        alt={`${title} industry`}
        fill
        sizes="288px"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="text-lg font-semibold leading-snug text-white">
          {title}
        </h3>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export default function IndustriesWeServe() {
  return (
    <section
      aria-labelledby="industries-heading"
      className="w-full bg-[#F7F4EF] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1400px] px-5 text-center sm:px-8">
        <h2
          id="industries-heading"
          className="text-3xl font-semibold tracking-tight text-[#1C1710] sm:text-4xl"
        >
          Industries We Serve
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[#5B5347]">
          Trusted across sectors — built for the way each industry actually
          works.
        </p>
      </div>

      <ScrollVelocityContainer className="mt-12 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <ScrollVelocityRow baseVelocity={3} className="py-2">
          {rowOne.map((card) => (
            <IndustryCard key={card.title} {...card} />
          ))}
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={-3} gap={4} className="mt-4 py-2">
          {rowTwo.map((card) => (
            <IndustryCard key={card.title} {...card} />
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </section>
  );
}
