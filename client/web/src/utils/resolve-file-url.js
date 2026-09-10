import config from "@/config";

// API returns relative storage paths like "public/images/xxx.png".
// Prefix them with the file server base; leave absolute URLs untouched.
export function resolveFileUrl(path) {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;

  const base = (config.file_base ?? "").replace(/\/+$/, "");
  const clean = String(path).replace(/^\/+/, "");
  return `${base}/${clean}`;
}
