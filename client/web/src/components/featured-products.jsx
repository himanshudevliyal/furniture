"use client";

import { ArrowUpRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Section } from "./layout/section";

const products = [
  {
    name: "Alder Sofa",
    category: "Sofas",
    description:
      "A refined balance of comfort and contemporary design, crafted to elevate modern living spaces.",
    price: "$1,240",
    image: "/1.png",
  },
  {
    name: "Wren Lounge Chair",
    category: "Chairs",
    description:
      "Relaxed proportions and elegant detailing come together to create a timeless seating experience.",
    price: "$540",
    image: "/1.png",
  },
  {
    name: "Moss Pouf",
    category: "Poufs",
    description:
      "A versatile accent piece designed to bring softness, comfort, and character to your interior.",
    price: "$180",
    image: "/1.png",
  },
  {
    name: "Reed Vase Set",
    category: "Decor",
    description:
      "Thoughtfully designed decorative pieces that add subtle texture and personality to every space.",
    price: "$95",
    image: "/1.png",
  },
];

function ProductCard({ product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
        <Image
          width={700}
          height={850}
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Category Badge */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-800 shadow-sm backdrop-blur-sm">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        {/* Product Name */}
        <h3 className="text-xl font-semibold tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-neutral-600 sm:text-2xl">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-500">
          {product.description}
        </p>

        {/* Bottom Row */}
        <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
          <span className="text-base font-semibold text-neutral-900">
            {product.price}
          </span>

          <button
            type="button"
            className="group/button inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 transition-all duration-300"
          >
            <span>Read More</span>

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 transition-all duration-300 group-hover/button:bg-neutral-900 group-hover/button:text-white">
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover/button:rotate-45"
                strokeWidth={2}
              />
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedProducts() {
  return (
    <Section  className="bg-gray-100">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm text-neutral-500">Products</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              Featured products
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-neutral-400 sm:text-right">
            Handpicked pieces our customers keep coming back for, made for
            comfort and built to last.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </Section>
  );
}
