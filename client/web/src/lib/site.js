// Public site URL, used for canonical links, Open Graph, robots and sitemap.
// Set NEXT_PUBLIC_URL per environment; falls back to the production domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_URL?.trim() || "https://www.natrajfurniture.com"
).replace(/\/+$/, "");

export const SITE_NAME = "Natraj Office Furniture";

export const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "")
  .trim()
  .replace(/\/+$/, "");

export const FILE_BASE = (process.env.NEXT_PUBLIC_FILE_BASE ?? "")
  .trim()
  .replace(/\/+$/, "");

// "public/images/x.webp" -> absolute URL on the file server.
export function absoluteFileUrl(path) {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  return `${FILE_BASE}/${String(path).replace(/^\/+/, "")}`;
}

// Plain-text, length-limited description from HTML or long text.
export function toDescription(text, max = 160) {
  if (!text) return undefined;
  const plain = String(text).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return plain.length > max ? `${plain.slice(0, max - 1).trimEnd()}…` : plain;
}
