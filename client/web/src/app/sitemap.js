import { unstable_rethrow } from "next/navigation";
import { API_BASE, SITE_URL } from "@/lib/site";

// Regenerated at most once an hour.
export const revalidate = 3600;

const STATIC_ROUTES = [
  { path: "/", priority: 1 },
  { path: "/shop", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/projects", priority: 0.7 },
  { path: "/blog", priority: 0.6 },
  { path: "/clients", priority: 0.6 },
  { path: "/careers", priority: 0.5 },
  { path: "/contact", priority: 0.7 },
];

async function fetchList(path, key) {
  try {
    const res = await fetch(`${API_BASE}${path}`, { next: { revalidate } });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data?.[key] ?? [];
  } catch (error) {
    unstable_rethrow(error);
    console.error(`sitemap: failed to load ${path}`, error);
    return [];
  }
}

export default async function sitemap() {
  const [categories, products, blogs] = await Promise.all([
    fetchList("/categories", "categories"),
    fetchList("/products", "products"),
    fetchList("/blogs", "blogs"),
  ]);

  const entry = (path, lastModified, priority) => ({
    url: `${SITE_URL}${path}`,
    ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
    priority,
  });

  return [
    ...STATIC_ROUTES.map((r) => entry(r.path, undefined, r.priority)),
    ...categories
      .filter((c) => c.slug)
      .map((c) => entry(`/categories/${c.slug}`, c.updated_at, 0.8)),
    ...products
      .filter((p) => p.slug && p.is_active !== false)
      .map((p) => entry(`/shop/${p.slug}`, p.updated_at, 0.7)),
    ...blogs
      .filter((b) => b.slug)
      .map((b) => entry(`/blog/${b.slug}`, b.date || b.created_at, 0.5)),
  ];
}
