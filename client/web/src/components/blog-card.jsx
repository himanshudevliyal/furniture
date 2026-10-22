"use client";

import Link from "next/link";
import FallbackImage from "@/components/ui/fallback-image";
import {
  PLACEHOLDER_IMG,
  blogDate,
  blogHref,
  getCoverImage,
  readTime,
  stripHtml,
} from "@/utils/blog-helpers";

// components/blog/blog-card.jsx
export default function BlogCard({ blog }) {
  const date = blogDate(blog);

  return (
    <Link href={blogHref(blog)} className="group flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#eeece7]">
        <FallbackImage
          src={getCoverImage(blog)}
          fallbackSrc={PLACEHOLDER_IMG}
          alt={blog.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {blog.category_title && (
          <span className="absolute left-3 top-3 rounded-full bg-[#f7f5f1]/95 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[#3a352f] backdrop-blur">
            {blog.category_title}
          </span>
        )}
      </div>

      <p className="mt-4 text-xs text-[#6b655a]">
        {date}
        {date && " • "}
        {readTime(blog)}
      </p>

      <h3 className="mt-2 line-clamp-2 text-lg font-medium leading-snug text-[#3a352f] transition-colors group-hover:text-[#6b6356]">
        {blog.title}
      </h3>

      {blog.description && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#5c564c]">
          {stripHtml(blog.description)}
        </p>
      )}
    </Link>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[16/10] rounded-xl bg-[#e6e3dc]" />
      <div className="mt-4 h-3 w-28 rounded bg-[#e6e3dc]" />
      <div className="mt-3 h-5 w-full rounded bg-[#e6e3dc]" />
      <div className="mt-2 h-5 w-2/3 rounded bg-[#e6e3dc]" />
      <div className="mt-3 h-3 w-full rounded bg-[#e6e3dc]" />
    </div>
  );
}