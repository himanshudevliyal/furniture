"use client";

import { useMemo, useState } from "react";
import BlogCard from "@/components/blog-card";
import { stripHtml } from "@/utils/blog-helpers";

// components/blog/blog-list.jsx
// Server se aaye blogs par search, category filter aur "Load more"
const PAGE_SIZE = 9;

export default function BlogList({ blogs = [] }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const categories = useMemo(() => {
    const set = new Set(blogs.map((b) => b.category_title).filter(Boolean));
    return ["All", ...set];
  }, [blogs]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return blogs.filter((b) => {
      if (category !== "All" && b.category_title !== category) return false;
      if (!q) return true;
      return (
        b.title?.toLowerCase().includes(q) ||
        stripHtml(b.description).toLowerCase().includes(q)
      );
    });
  }, [blogs, category, search]);

  const shown = filtered.slice(0, visible);

  return (
    <>
      {/* Heading + search */}
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#6b655a]">
            Insights
          </p>
          <h2 className="text-3xl leading-tight text-[#3a352f] lg:text-4xl">
            Ideas for better workspaces
          </h2>
        </div>

        <div className="relative w-full lg:w-80">
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b655a]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            placeholder="Search articles..."
            aria-label="Search articles"
            className="w-full rounded-full border border-transparent bg-[#f7f5f1] py-3 pl-11 pr-4 text-sm text-[#3a352f] placeholder:text-[#6b655a] focus:border-[#8a8478] focus:outline-none"
          />
        </div>
      </div>

      {/* Category chips */}
      {categories.length > 1 && (
        <div className="mb-10 flex gap-2 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCategory(c);
                setVisible(PAGE_SIZE);
              }}
              className={`shrink-0 rounded-full px-4 py-2 text-sm capitalize transition-colors ${
                category === c
                  ? "bg-[#3a352f] text-[#f7f5f1]"
                  : "bg-[#f7f5f1] text-[#5c564c] hover:bg-[#e6e3dc]"
              }`}
            >
              {c.toLowerCase()}
            </button>
          ))}
        </div>
      )}

      {shown.length === 0 ? (
        <div className="rounded-md bg-[#f7f5f1] p-10 text-center text-[#5c564c]">
          No articles found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          {visible < filtered.length && (
            <div className="mt-14 text-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="rounded-sm border border-[#3a352f] px-8 py-3 text-sm text-[#3a352f] transition-colors hover:bg-[#3a352f] hover:text-[#f7f5f1]"
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}