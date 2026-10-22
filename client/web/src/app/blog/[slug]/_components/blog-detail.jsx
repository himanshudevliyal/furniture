"use client";

import { useState, useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};
import Link from "next/link";
import FallbackImage from "@/components/ui/fallback-image";
import {
  BLOG_ROUTE,
  PLACEHOLDER_IMG,
  blogDate,
  getImageUrl,
  readTime,
} from "@/utils/blog-helpers";

// components/blog/blog-detail.jsx
export default function BlogDetail({ blog }) {
  const [activeImg, setActiveImg] = useState(0);
  const pictures = blog.pictures?.length ? blog.pictures : [null];
  const date = blogDate(blog);

  return (
    <article className="bg-[#f0ece4] px-4 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href={BLOG_ROUTE}
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#5c564c] transition-colors hover:text-[#3a352f]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          All blogs
        </Link>

        {/* Header */}
        <header className="mb-8">
          {blog.category_title && (
            <span className="mb-4 inline-block rounded-full bg-[#3a352f] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[#f7f5f1]">
              {blog.category_title}
            </span>
          )}
          <h1 className="text-3xl leading-tight text-[#3a352f] sm:text-4xl lg:text-5xl">
            {blog.title}
          </h1>
          <p className="mt-4 text-sm text-[#6b655a]">
            {date}
            {date && " • "}
            {readTime(blog)} read
          </p>
        </header>

        {/* Cover image */}
        <div className="relative aspect-video overflow-hidden rounded-xl bg-[#eeece7]">
          <FallbackImage
            src={getImageUrl(pictures[activeImg])}
            fallbackSrc={PLACEHOLDER_IMG}
            alt={blog.title}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        {/* Thumbnails (agar ek se zyada images hain) */}
        {pictures.length > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
            {pictures.map((pic, i) => (
              <button
                key={pic || i}
                type="button"
                onClick={() => setActiveImg(i)}
                aria-label={`Show image ${i + 1}`}
                className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-md ring-2 transition ${
                  activeImg === i
                    ? "ring-[#3a352f]"
                    : "ring-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <FallbackImage
                  src={getImageUrl(pic)}
                  fallbackSrc={PLACEHOLDER_IMG}
                  alt=""
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="mx-auto mt-10 max-w-3xl">
          {blog.description && (
            <p className="border-l-2 border-[#3a352f] pl-5 text-lg leading-relaxed text-[#3a352f] first-letter:float-left first-letter:mr-2 first-letter:text-5xl first-letter:leading-none">
              {blog.description}
            </p>
          )}

          {blog.content && (
            <div
              className="blog-content mt-10 text-[#4a453d]"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          )}

          <ShareBar title={blog.title} />
        </div>
      </div>

      {/* Rich-text content styling (Tailwind typography plugin ki zarurat nahi) */}
      <style jsx global>{`
        .blog-content { font-size: 1.0625rem; line-height: 1.85; }
        .blog-content > * + * { margin-top: 1.25rem; }
        .blog-content h2 { font-size: 1.75rem; line-height: 1.3; color: #3a352f; margin-top: 2.5rem; }
        .blog-content h3 { font-size: 1.375rem; line-height: 1.35; color: #3a352f; margin-top: 2rem; }
        .blog-content h4 { font-size: 1.125rem; color: #3a352f; margin-top: 1.5rem; }
        .blog-content a { color: #3a352f; text-decoration: underline; text-underline-offset: 3px; }
        .blog-content ul { list-style: disc; padding-left: 1.5rem; }
        .blog-content ol { list-style: decimal; padding-left: 1.5rem; }
        .blog-content li + li { margin-top: 0.5rem; }
        .blog-content img { border-radius: 0.75rem; width: 100%; height: auto; }
        .blog-content blockquote { border-left: 3px solid #3a352f; padding-left: 1.25rem; font-style: italic; color: #3a352f; }
        .blog-content strong { color: #3a352f; font-weight: 600; }
        .blog-content table { width: 100%; border-collapse: collapse; font-size: 0.95rem; }
        .blog-content th, .blog-content td { border: 1px solid #d6d2ca; padding: 0.6rem 0.8rem; text-align: left; }
      `}</style>
    </article>
  );
}

function ShareBar({ title }) {
  const [copied, setCopied] = useState(false);
  // Current page URL on the client, "" during server render.
  const url = useSyncExternalStore(
    noopSubscribe,
    () => window.location.href,
    () => "",
  );

  const enc = encodeURIComponent;
  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${enc(`${title} ${url}`)}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}` },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const chip =
    "rounded-full bg-[#f7f5f1] px-4 py-2 text-sm text-[#3a352f] transition-colors hover:bg-[#3a352f] hover:text-[#f7f5f1]";

  return (
    <div className="mt-14 flex flex-wrap items-center gap-3 border-t border-[#d6d2ca] pt-8">
      <span className="mr-2 text-sm text-[#6b655a]">Share this article</span>
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={chip}>
          {l.label}
        </a>
      ))}
      <button type="button" onClick={copy} className={chip}>
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}