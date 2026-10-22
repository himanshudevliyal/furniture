import { unstable_rethrow } from "next/navigation";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "")
  .trim()
  .replace(/\/+$/, "");

// Blog list changes rarely, so it is cached and refreshed every 60s (ISR).
// This keeps pages that show it (home, /blog) fast and static.
const BLOG_LIST_REVALIDATE = 60;

export async function getBlogs(searchParams = "") {
  const qs = searchParams ? `?${searchParams}` : "";
  try {
    const res = await fetch(`${API_BASE}/blogs${qs}`, {
      next: { revalidate: BLOG_LIST_REVALIDATE },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const list =
      data?.blogs ??
      data?.data?.blogs ??
      (Array.isArray(data?.data) ? data.data : null) ??
      (Array.isArray(data) ? data : []);
    return list;
  } catch (error) {
    // Let Next.js handle its own control-flow errors (dynamic rendering etc.).
    unstable_rethrow(error);
    console.error("getBlogs error:", error);
    return [];
  }
}

export async function getBlog(slug) {
  try {
    const res = await fetch(`${API_BASE}/blogs/get-by-slug/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data ?? null;
  } catch (error) {
    unstable_rethrow(error);
    console.error("getBlog error:", error);
    return null;
  }
}
