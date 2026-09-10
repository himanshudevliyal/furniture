"use clinet"

import { notFound } from "next/navigation";

import FeaturedProducts from "@/components/featured-products";
import ProductDetail from "../_components/ProductDetail";
import FurnitureProductsShowcase from "../_components/productsimgs";
import ProductTabs from "../_components/ProductTabs";


async function getProduct(slug) {
  const base = (process.env.NEXT_PUBLIC_API_URL ?? "")
    .trim()
    .replace(/\/+$/, "");

  const res = await fetch(`${base}/products/get-by-slug/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data?.data ?? null;
}

export default async function ProductPage({ params }) {
  const { slug } = await params; // In Next.js 15, params is a Promise

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductDetail product={product} />
      <ProductTabs product={product} />
      <FurnitureProductsShowcase />
      <FeaturedProducts />
    </>
  );
}
