import { unstable_rethrow } from "next/navigation";
import { API_BASE, absoluteFileUrl, toDescription } from "@/lib/site";

// The category page itself is a client component, so its metadata lives here.
async function getCategory(slug) {
  try {
    const res = await fetch(`${API_BASE}/categories`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return (data?.data?.categories ?? []).find((c) => c.slug === slug) ?? null;
  } catch (error) {
    unstable_rethrow(error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: "Category" };

  const title = category.meta_title || category.title;
  const description =
    toDescription(category.meta_description) ||
    `Explore ${category.title} by Natraj Office Furniture — designed and manufactured for modern workplaces.`;
  const image = absoluteFileUrl(category.pictures?.[0]);

  return {
    title,
    description,
    ...(category.meta_keywords ? { keywords: category.meta_keywords } : {}),
    alternates: { canonical: `/categories/${slug}` },
    openGraph: {
      title,
      description,
      url: `/categories/${slug}`,
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}

export default function CategoryLayout({ children }) {
  return children;
}
