import { unstable_rethrow } from "next/navigation";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "")
  .trim()
  .replace(/\/+$/, "");

// Only active jobs come back from this endpoint. Not cached, so toggling a
// job in the dashboard shows up on the website immediately.
export async function getActiveJobs() {
  try {
    const res = await fetch(`${API_BASE}/careers/jobs`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data?.jobs ?? [];
  } catch (error) {
    // Let Next.js handle its own control-flow errors (dynamic rendering etc.).
    unstable_rethrow(error);
    console.error("getActiveJobs error:", error);
    return [];
  }
}
