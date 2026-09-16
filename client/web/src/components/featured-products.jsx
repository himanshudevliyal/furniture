"use client";

import { ArrowUpRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Section } from "./layout/section";
import ProductCard from "./ProductCard";

const products = [
  {
    title: "Alder Sofa",
    category: "Sofas",
    description:
      "A refined balance of comfort and contemporary design, crafted to elevate modern living spaces.",
    price: "$1,240",
    thumbnail: "/public/images/1789055843473_EL-001.png",
  },
  {
    title: "Wren Lounge Chair",
    category: "Chairs",
    description:
      "Relaxed proportions and elegant detailing come together to create a timeless seating experience.",
    price: "$540",
    thumbnail: "/public/images/1789055843473_EL-001.png",
  },
  {
    title: "Moss Pouf",
    category: "Poufs",
    description:
      "A versatile accent piece designed to bring softness, comfort, and character to your interior.",
    price: "$180",
    thumbnail: "/public/images/1789055843473_EL-001.png",
  },
  {
    title: "Reed Vase Set",
    category: "Decor",
    description:
      "Thoughtfully designed decorative pieces that add subtle texture and personality to every space.",
    price: "$95",
    thumbnail: "/public/images/1789055843473_EL-001.png",
  },
];



export default function FeaturedProducts() {
  return (
    <Section  className="bg-gray-100">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              Relative Products
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
