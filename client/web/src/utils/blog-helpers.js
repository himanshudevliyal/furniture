// utils/blog-helpers.js

const FILE_BASE = (process.env.NEXT_PUBLIC_FILE_BASE || "").replace(/\/+$/, "");

export const PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect width="400" height="250" fill="#eeece7"/><text x="50%" y="50%" fill="#8a8478" font-family="sans-serif" font-size="16" text-anchor="middle" dominant-baseline="middle">No image</text></svg>`
  );

// "public/images/abc.jpg" -> `${NEXT_PUBLIC_FILE_BASE}/public/images/abc.jpg`
export function getImageUrl(path) {
  if (!path) return PLACEHOLDER_IMG;
  if (/^(https?:|data:)/.test(path)) return path;
  return `${FILE_BASE}/${String(path).replace(/^\/+/, "")}`;
}

export function getCoverImage(blog) {
  return getImageUrl(blog?.pictures?.[0]);
}

export function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }); // 5 Aug 2024
}

export function stripHtml(html = "") {
  return String(html).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function readTime(blog) {
  const text = stripHtml(`${blog?.description || ""} ${blog?.content || ""}`);
  const words = text ? text.split(" ").length : 0;
  return `${Math.max(1, Math.ceil(words / 200))} mins`;
}

export function blogDate(blog) {
  return formatDate(blog?.date || blog?.created_at);
}

// Site par blog ka route (app/blog). Folder ka naam badlo to yahan bhi badlo.
export const BLOG_ROUTE = "/blog";

// Detail page URL -> /blog/<slug>
export function blogHref(blog) {
  return `${BLOG_ROUTE}/${blog?.slug || blog?.id}`;
}

// List API response ko array me normalise karta hai
export function extractBlogs(data) {
  if (Array.isArray(data)) return data;
  return data?.blogs ?? data?.data?.blogs ?? (Array.isArray(data?.data) ? data.data : []);
}

// Single API response -> blog object ({ status, data: {...} })
export function extractBlog(data) {
  return data?.data ?? data?.blog ?? data ?? null;
}