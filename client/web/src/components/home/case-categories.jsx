import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import Heading from "@/components/layout/heading";

// Homepage "Our Cases": one card per project category (first photo of each
// folder in /img/projects), linking to the cases page.
// `categories` comes from the server (lib/projects.js).
export default function CaseCategories({ categories = [] }) {
  if (!categories.length) return null;

  return (
    <Section aria-labelledby="cases-heading" className="w-full bg-white py-14 sm:py-16">
      <Heading
        heading="Our Cases"
        subheading="Explore our completed workspace projects, featuring thoughtfully designed office furniture solutions built for modern, functional, and professional environments."
        className="mx-auto max-w-5xl text-center"
      />

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/cases?category=${category.slug}`}
            className="group block overflow-hidden rounded-lg bg-[#E87717] transition-colors hover:bg-[#C9620E]"
          >
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={category.cover}
                alt={`${category.label} project`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between px-3 py-2 text-white">
              <span className="text-base">{category.label}</span>
              <ChevronRight
                className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
