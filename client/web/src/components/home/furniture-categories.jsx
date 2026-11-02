import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/layout/section";

// Static homepage category grid. Images live in /public/img/home-categories.
const CATEGORIES = [
  {
    title: "Office Desks",
    text: "Modular workstation, executive & adjustable desk",
    image: "/img/home-categories/office-desks.webp",
    href: "/categories/desk-and-table",
  },
  {
    title: "Office Partitions",
    text: "Cubicle & call center workstations",
    image: "/img/home-categories/office-partitions.webp",
    href: "/categories/office-partitions",
  },
  {
    title: "Partition Wall",
    text: "Booth & space division",
    image: "/img/home-categories/partition-wall.webp",
    href: "/categories/office-partitions#office-pod",
  },
  {
    title: "Office Chair",
    text: "Task, executive & meeting chairs",
    image: "/img/home-categories/office-chair.webp",
    href: "/categories/seating",
  },
  {
    title: "Office Storage",
    text: "Cabinets, lockers & shelving systems",
    image: "/img/home-categories/office-storage.webp",
    href: "/categories/office-storage",
  },
  {
    title: "Conference Tables",
    text: "Meeting & boardroom tables",
    image: "/img/home-categories/conference-tables.webp",
    href: "/categories/desk-and-table#meeting-table",
  },
  {
    title: "Office Sofas",
    text: "Reception & lounge seatings",
    image: "/img/home-categories/office-sofas.webp",
    href: "/categories/soft-seating",
  },
  {
    title: "Accessories",
    text: "Desk accessories & workspace essentials",
    image: "/img/home-categories/accessories.webp",
    href: "/categories/office-furniture-accessories",
  },
];

export default function FurnitureCategories() {
  return (
    <Section aria-labelledby="furniture-categories-heading" className="bg-white">
      <div className="flex items-end justify-between gap-4">
        <h2
          id="furniture-categories-heading"
          className="text-3xl font-medium text-neutral-900 sm:text-4xl"
        >
          Office Furniture Categories
        </h2>
        <Link
          href="/shop"
          className="shrink-0 text-sm text-neutral-600 transition-colors hover:text-[#E87717]"
        >
          View All Products →
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {CATEGORIES.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="group relative block aspect-[386/280] overflow-hidden"
          >
            <Image
              src={category.image}
              alt={category.title}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-3 pb-3 pt-10 text-white sm:px-4">
              <h3 className="text-base font-medium sm:text-lg">{category.title}</h3>
              <p className="mt-0.5 hidden text-xs text-white/85 sm:block">
                {category.text}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
