"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import FallbackImage from "@/components/ui/fallback-image";
import {
  PLACEHOLDER_IMG,
  blogDate,
  blogHref,
  getCoverImage,
  readTime,
  stripHtml,
} from "@/utils/blog-helpers";

// "12 Oct 2026" -> { day: "12", month: "Oct" } for the date badge.
const splitDate = (date) => {
  const [day, month] = String(date || "").split(" ");
  return day && month ? { day, month } : null;
};

// components/blog/blog-card.jsx
export default function BlogCard({ blog }) {
  const date = blogDate(blog);
  const badge = splitDate(date);

  return (
    <Link
      href={blogHref(blog)}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#eeece7]">
        <FallbackImage
          src={getCoverImage(blog)}
          fallbackSrc={PLACEHOLDER_IMG}
          alt={blog.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {badge && (
          <span className="absolute left-4 top-4 flex flex-col items-center rounded-md bg-white px-2.5 py-1.5 text-center shadow-md">
            <span className="text-lg font-semibold leading-none text-neutral-900">{badge.day}</span>
            <span className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-[#E87717]">
              {badge.month}
            </span>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {blog.category_title && (
          <span className="mb-3 self-start rounded-full bg-[#E87717]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#E87717]">
            {blog.category_title}
          </span>
        )}

        <h3 className="line-clamp-2 type-post-title text-neutral-900 transition-colors group-hover:text-[#E87717]">
          {blog.title}
        </h3>

        {blog.description && (
          <p className="mt-2.5 line-clamp-3 type-body text-neutral-500">
            {stripHtml(blog.description)}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-neutral-100 pt-4 text-sm">
          <span className="flex items-center gap-1.5 text-neutral-500">
            <Clock className="h-4 w-4" aria-hidden />
            {readTime(blog)}
            {!badge && date && <span className="text-neutral-400">· {date}</span>}
          </span>
          <span className="flex items-center gap-1.5 font-medium text-neutral-900 transition-colors group-hover:text-[#E87717]">
            Read more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl bg-white ring-1 ring-black/5">
      <div className="aspect-[16/10] bg-[#e6e3dc]" />
      <div className="p-5 sm:p-6">
        <div className="h-4 w-20 rounded-full bg-[#e6e3dc]" />
        <div className="mt-4 h-5 w-full rounded bg-[#e6e3dc]" />
        <div className="mt-2 h-5 w-2/3 rounded bg-[#e6e3dc]" />
        <div className="mt-3 h-3 w-full rounded bg-[#e6e3dc]" />
        <div className="mt-6 h-px w-full bg-[#eeece7]" />
        <div className="mt-4 h-3 w-24 rounded bg-[#e6e3dc]" />
      </div>
    </div>
  );
}
