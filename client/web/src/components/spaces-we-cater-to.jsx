"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  ConciergeBell,
  Headphones,
  House,
  Layers3,
  PencilRuler,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Section } from "./layout/section";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const featuredSpace = {
  key: "hospitality",
  title: "OFFICE WORKSPACES",
  description:
    "Smart and functional furniture solutions designed for modern offices, workspaces and professional environments.",
  image: "/img/hospitality.jpg",
  href: "/spaces/hospitality",
  icon: ConciergeBell,
  cta: "EXPLORE",
};

const secondarySpaces = [
  {
    key: "corporate",
    title: "EXECUTIVE SPACES",
    description:
      "Premium desks and workspace furniture designed for productive and professional corporate environments.",
    image: "/img/corporate.jpg",
    href: "/spaces/corporate",
    icon: BriefcaseBusiness,
  },
  {
    key: "residential",
    title: "OFFICE SEATING",
    description:
      "Ergonomic and comfortable seating solutions designed for everyday work and professional spaces.",
    image: "/img/residential.jpg",
    href: "/spaces/residential",
    icon: House,
  },
  {
    key: "retail",
    title: "STORAGE SOLUTIONS",
    description:
      "Practical and stylish storage furniture that keeps modern workspaces organized and efficient.",
    image: "/img/retail.jpg",
    href: "/spaces/retail",
    icon: ShoppingBag,
  },
];

const featureStrip = [
  {
    key: "bespoke",
    title: "BESPOKE SOLUTIONS",
    description: "Furniture tailored to your workspace",
    icon: PencilRuler,
  },
  {
    key: "quality",
    title: "PREMIUM QUALITY",
    description: "Built for durability and everyday use",
    icon: BadgeCheck,
  },
  {
    key: "solutions",
    title: "COMPLETE WORKSPACE SOLUTIONS",
    description: "From furniture selection to setup",
    icon: Layers3,
  },
  {
    key: "support",
    title: "DEDICATED SUPPORT",
    description: "Reliable assistance for every project",
    icon: Headphones,
  },
];

// ---------------------------------------------------------------------------
// Card sub-component
// ---------------------------------------------------------------------------

function SpaceCard({
  space,
  minHeightClass,
  priority = false,
  variant = "default",
}) {
  const Icon = space.icon;

  return (
    <div
      className={cn(
        "group relative block w-full overflow-hidden rounded-sm shadow-[0_20px_50px_-20px_rgba(20,14,8,0.45)] outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#B08D57] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F4EF]",
        minHeightClass,
      )}
      aria-label={`Explore furniture solutions for ${space.title.toLowerCase()}`}
    >
      {/* Background image */}
      <Image
        src={space.image}
        alt={`${space.title} interior furnished by MAC — ${space.description}`}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.05]"
      />

      {/* Gradient overlay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-500 group-hover:opacity-95"
      />

      {/* Icon badge */}
      <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A165]/60 bg-[#C9A165]/25 text-[#F1E4C9] backdrop-blur-sm sm:left-8 sm:top-8">
        <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
      </div>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:p-8">
        <h3 className="font-serif text-2xl tracking-wide text-white sm:text-3xl">
          {space.title}
        </h3>

        {variant === "featured" && (
          <span className="h-px w-12 bg-[#C9A165]" aria-hidden />
        )}

        <p className="max-w-[34ch] text-sm leading-relaxed text-white/85 sm:text-[15px]">
          {space.description}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main section
// ---------------------------------------------------------------------------

export default function SpacesWeCaterTo() {
  return (
    <Section
      aria-labelledby="spaces-we-cater-to-heading"
      className="w-full bg-[#F7F4EF] "
    >
      {/* Heading */}
<div className="mx-auto flex max-w-2xl flex-col items-center text-center">
  <span className="text-xs font-medium tracking-[0.3em] text-[#B08D57]">
    FURNITURE FOR MODERN WORKSPACES
  </span>

  <h2
    id="spaces-we-cater-to-heading"
    className="mt-4 font-serif text-4xl leading-tight text-[#1C1710] sm:text-5xl lg:text-6xl"
  >
    Furniture Solutions for Every Workspace
  </h2>

  <p className="mt-5 text-balance text-base leading-relaxed text-[#5B5347] sm:text-lg">
    From executive offices and workstations to seating and storage, we create
    functional furniture solutions designed for modern, productive, and
    professional workspaces.
  </p>
</div>

      {/* Content grid */}
      <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
        {/* Featured — Hospitality */}
        <SpaceCard
          space={featuredSpace}
          minHeightClass="h-[420px] sm:h-[480px] lg:h-[520px]"
          variant="featured"
          priority
        />

        {/* Corporate + Residential/Retail */}
        <div className="grid grid-cols-1 gap-5 lg:gap-6">
          <SpaceCard
            space={secondarySpaces[0]}
            minHeightClass="h-[240px] sm:h-[250px] lg:h-[248px]"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
            <SpaceCard
              space={secondarySpaces[1]}
              minHeightClass="h-[240px] sm:h-[260px] lg:h-[252px]"
            />
            <SpaceCard
              space={secondarySpaces[2]}
              minHeightClass="h-[240px] sm:h-[260px] lg:h-[252px]"
            />
          </div>
        </div>
      </div>

      {/* Feature strip */}
      <div className="mt-16 rounded-2xl bg-[#EFEAE0] px-6 py-8 sm:mt-20 sm:px-10">
        <ul className="grid grid-cols-2 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
          {featureStrip.map((item, index) => {
            const Icon = item.icon;
            const isLastInRow = (index + 1) % 4 === 0;
            return (
              <li
                key={item.key}
                className={cn(
                  "flex items-start gap-3 px-2 sm:px-4",
                  "lg:border-l lg:border-[#D8CFBC] lg:first:border-l-0",
                  isLastInRow && "lg:border-l lg:border-[#D8CFBC]",
                )}
              >
                <Icon
                  className="mt-0.5 h-6 w-6 shrink-0 text-[#B08D57]"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <div>
                  <p className="text-xs font-semibold tracking-[0.1em] text-[#1C1710] sm:text-sm">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-[#6B6255] sm:text-sm">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
