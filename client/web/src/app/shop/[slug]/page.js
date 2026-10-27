import { notFound } from "next/navigation";
import { absoluteFileUrl, toDescription } from "@/lib/site";
import ProductDetail from "./_components/ProductDetail";
import FurnitureProductsShowcase from "./_components/productsimgs";
import ProductTabs from "./_components/ProductTabs";
import ProductFeatures from "./_components/ProductFeatures";
import ProductFaqs from "./_components/ProductFaqs";
import CustomizationOptions from "./_components/CustomizationOptions";
import RelatedProducts from "./_components/related-products";
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

// Same request as the page; Next.js dedupes it within one render.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found" };

  const title = product.meta_title || product.title;
  const description =
    toDescription(product.meta_description) ||
    toDescription(product.short_description) ||
    `${product.title} by Natraj Office Furniture.`;
  const image = absoluteFileUrl(product.thumbnail);

  return {
    title,
    description,
    ...(product.meta_keywords ? { keywords: product.meta_keywords } : {}),
    alternates: { canonical: `/shop/${slug}` },
    openGraph: {
      title,
      description,
      url: `/shop/${slug}`,
      ...(image ? { images: [{ url: image, alt: product.title }] } : {}),
    },
  };
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
      {/* Sections up to the FAQs go inside ProductTabs so its tab bar stays
          sticky through them (Features / FAQs are jump links in that bar). */}
      <ProductTabs product={product}>
        <ProductFeatures product={product} />
        <FurnitureProductsShowcase product={product}></FurnitureProductsShowcase>
        <CustomizationOptions product={product} />

        <RelatedProducts product={product} />
        <ProductFaqs product={product} />
      </ProductTabs>
      <FurnitureProductsShowcase />
    </>
  );
}