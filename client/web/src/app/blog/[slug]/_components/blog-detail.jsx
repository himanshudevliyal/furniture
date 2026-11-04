"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Check, Clock, Link2 } from "lucide-react";

import FallbackImage from "@/components/ui/fallback-image";
import {
  BLOG_ROUTE,
  PLACEHOLDER_IMG,
  blogDate,
  getImageUrl,
  readTime,
} from "@/utils/blog-helpers";

const noopSubscribe = () => () => {};

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Gives every <h2>/<h3> in the article an id and returns the list for the
// "In this article" box.
function withHeadingIds(html) {
  const toc = [];
  const used = new Set();
  const out = (html || "").replace(/<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi, (match, tag, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
    if (!text) return match;
    let id = slugify(text) || "section";
    while (used.has(id)) id += "-1";
    used.add(id);
    toc.push({ id, text, level: tag.toLowerCase() === "h3" ? 3 : 2 });
    const cleanAttrs = attrs.replace(/\sid="[^"]*"/i, "");
    return `<${tag}${cleanAttrs} id="${id}">${inner}</${tag}>`;
  });
  return { html: out, toc };
}

// Thin bar at the top that fills as the reader scrolls the article.
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("blog-article");
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const total = height - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, Math.max(0, (-top / total) * 100)) : 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[10001] h-1 bg-transparent" aria-hidden>
      <div className="h-full bg-[#E87717] transition-[width] duration-150" style={{ width: `${progress}%` }} />
    </div>
  );
}

// components/blog/blog-detail.jsx
export default function BlogDetail({ blog }) {
  const [activeImg, setActiveImg] = useState(0);
  const pictures = blog.pictures?.length ? blog.pictures : [null];
  const date = blogDate(blog);
  const { html, toc } = useMemo(() => withHeadingIds(blog.content), [blog.content]);

  return (
    <>
      <ReadingProgress />

      {/* Hero: cover image with title on top */}
      <header className="relative isolate overflow-hidden bg-neutral-900">
        <FallbackImage
          src={getImageUrl(pictures[0])}
          fallbackSrc={PLACEHOLDER_IMG}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-60"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />

        <div className="mx-auto flex min-h-[420px] max-w-5xl flex-col justify-end px-4 pb-12 pt-28 sm:min-h-[480px] lg:px-0 lg:pb-16">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/70">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <span aria-hidden>/</span>
            <Link href={BLOG_ROUTE} className="transition-colors hover:text-white">Blogs</Link>
          </nav>

          {blog.category_title && (
            <span className="mb-4 self-start rounded-full bg-[#E87717] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
              {blog.category_title}
            </span>
          )}

          <h1 className="max-w-4xl type-display text-white">{blog.title}</h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
            {date && (
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" aria-hidden />
                {date}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" aria-hidden />
              {readTime(blog)} read
            </span>
          </div>
        </div>
      </header>

      <article id="blog-article" className="bg-white px-4 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* Main column */}
          <div className="min-w-0">
            {/* Extra images, when the blog has more than one */}
            {pictures.length > 1 && (
              <div className="mb-10">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-[#eeece7]">
                  <FallbackImage
                    src={getImageUrl(pictures[activeImg])}
                    fallbackSrc={PLACEHOLDER_IMG}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                </div>
                <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
                  {pictures.map((pic, i) => (
                    <button
                      key={pic || i}
                      type="button"
                      onClick={() => setActiveImg(i)}
                      aria-label={`Show image ${i + 1}`}
                      className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md ring-2 transition ${
                        activeImg === i ? "ring-[#E87717]" : "ring-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <FallbackImage
                        src={getImageUrl(pic)}
                        fallbackSrc={PLACEHOLDER_IMG}
                        alt=""
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {blog.description && (
              <p className="rounded-r-lg border-l-4 border-[#E87717] bg-[#fbf1e7] px-6 py-5 text-lg leading-relaxed text-neutral-800 sm:text-xl">
                {blog.description}
              </p>
            )}

            {html && (
              <div className="blog-content mt-10 text-neutral-700" dangerouslySetInnerHTML={{ __html: html }} />
            )}

            <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-8">
              <Link
                href={BLOG_ROUTE}
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 transition-colors hover:text-[#E87717]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                All blogs
              </Link>
              <ShareButtons title={blog.title} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {toc.length > 1 && (
              <nav aria-label="In this article" className="rounded-xl border border-neutral-200 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">In this article</p>
                <ol className="mt-3 space-y-2 text-sm">
                  {toc.map((item) => (
                    <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                      <a
                        href={`#${item.id}`}
                        className="block leading-snug text-neutral-700 transition-colors hover:text-[#E87717]"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="rounded-xl border border-neutral-200 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Share this article</p>
              <div className="mt-3">
                <ShareButtons title={blog.title} />
              </div>
            </div>

            <div className="overflow-hidden rounded-xl bg-neutral-900 p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#E87717]">Planning your office?</p>
              <p className="mt-2 text-lg font-medium leading-snug">
                Visit our Experience Centre and see the furniture in person.
              </p>
              <Link
                href="/book-your-slot"
                className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E87717] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#C9620E]"
              >
                <CalendarDays aria-hidden="true" className="h-5 w-5 animate-cal-ring [--cal-lift:-22px] group-hover:[animation-duration:1.3s] motion-reduce:animate-none" strokeWidth={2} />
                Book Your Slot
              </Link>
            </div>
          </aside>
        </div>
      </article>

      {/* Rich-text content styling (no typography plugin needed) */}
      <style jsx global>{`
        .blog-content { font-size: 1.0625rem; line-height: 1.85; }
        .blog-content > * + * { margin-top: 1.25rem; }
        .blog-content h2 { font-size: 1.75rem; line-height: 1.3; font-weight: 600; color: #171717; margin-top: 2.75rem; scroll-margin-top: 7rem; }
        .blog-content h3 { font-size: 1.3rem; line-height: 1.35; font-weight: 600; color: #171717; margin-top: 2rem; scroll-margin-top: 7rem; }
        .blog-content h4 { font-size: 1.1rem; font-weight: 600; color: #171717; margin-top: 1.5rem; }
        .blog-content a { color: #c9620e; text-decoration: underline; text-underline-offset: 3px; }
        .blog-content a:hover { color: #e87717; }
        .blog-content ul { list-style: disc; padding-left: 1.5rem; }
        .blog-content ol { list-style: decimal; padding-left: 1.5rem; }
        .blog-content li + li { margin-top: 0.5rem; }
        .blog-content li::marker { color: #e87717; }
        .blog-content img { border-radius: 0.75rem; width: 100%; height: auto; }
        .blog-content blockquote { border-left: 4px solid #e87717; background: #fbf1e7; padding: 1rem 1.25rem; border-radius: 0 0.5rem 0.5rem 0; font-style: italic; color: #262626; }
        .blog-content strong { color: #171717; font-weight: 600; }
        .blog-content table { width: 100%; border-collapse: collapse; font-size: 0.95rem; }
        .blog-content th { background: #f5f5f5; }
        .blog-content th, .blog-content td { border: 1px solid #e5e5e5; padding: 0.6rem 0.8rem; text-align: left; }
        .blog-content hr { border-color: #e5e5e5; margin: 2.5rem 0; }
      `}</style>
    </>
  );
}

function ShareButtons({ title }) {
  const [copied, setCopied] = useState(false);
  // Current page URL on the client, "" during server render.
  const url = useSyncExternalStore(noopSubscribe, () => window.location.href, () => "");

  const enc = encodeURIComponent;
  const links = [
    { label: "WhatsApp", short: "WA", href: `https://wa.me/?text=${enc(`${title} ${url}`)}` },
    { label: "LinkedIn", short: "in", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { label: "Facebook", short: "f", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { label: "X", short: "X", href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}` },
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

  const circle =
    "flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-sm font-semibold text-neutral-700 transition-colors hover:border-[#E87717] hover:bg-[#E87717] hover:text-white";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${l.label}`}
          title={l.label}
          className={circle}
        >
          {l.short}
        </a>
      ))}
      <button type="button" onClick={copy} aria-label="Copy link" title="Copy link" className={circle}>
        {copied ? <Check className="h-4 w-4" aria-hidden /> : <Link2 className="h-4 w-4" aria-hidden />}
      </button>
    </div>
  );
}
