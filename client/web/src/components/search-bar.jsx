"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, Search, X } from "lucide-react";
import { fetchProducts } from "@/services/product-service";
import { resolveFileUrl } from "@/utils/resolve-file-url";
import { categoryHref } from "@/components/category-mega-menu";

const MIN_CHARS = 2;

// Bold the part of `text` that matches `query` (case-insensitive).
function Highlight({ text = "", query }) {
  const i = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-transparent font-semibold text-neutral-900">
        {text.slice(i, i + query.length)}
      </mark>
      {text.slice(i + query.length)}
    </>
  );
}

function ResultSkeleton() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className="flex items-center gap-4 rounded-md p-2">
          <div className="h-16 w-16 shrink-0 animate-pulse rounded-md bg-neutral-100" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-3/4 animate-pulse rounded bg-neutral-100" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-neutral-100" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function SearchBar({ open, onClose, categories = [] }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  // Results remember which query they belong to, so "loading" is derived.
  const [results, setResults] = useState({ query: "", items: [] });
  const inputRef = useRef(null);
  const router = useRouter();

  // Focus the input the moment the panel opens
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Reset on close (state adjusted during render instead of in an effect).
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (!open) {
      setQuery("");
      setDebouncedQuery("");
      setResults({ query: "", items: [] });
    }
  }

  // Debounce typing
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Fetch live results — only once the user has typed something meaningful
  useEffect(() => {
    if (debouncedQuery.length < MIN_CHARS) return;

    let cancelled = false;
    const q = debouncedQuery;

    fetchProducts(`q=${encodeURIComponent(debouncedQuery)}&limit=6`)
      .then((data) => {
        if (!cancelled) setResults({ query: q, items: data?.products ?? [] });
      })
      .catch(() => {
        if (!cancelled) setResults({ query: q, items: [] });
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const goToAllResults = () => {
    if (!query.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    goToAllResults();
  };

  const clearQuery = () => {
    setQuery("");
    setDebouncedQuery("");
    setResults({ query: "", items: [] });
    inputRef.current?.focus();
  };

  if (!open) return null;

  const trimmed = query.trim();
  const hasQuery = debouncedQuery.length >= MIN_CHARS;
  // Results shown only for the current (debounced) query.
  const visibleResults = hasQuery ? results.items : [];
  const waiting =
    hasQuery && (results.query !== debouncedQuery || trimmed !== debouncedQuery);

  return (
    <>
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close search"
        tabIndex={-1}
        onClick={onClose}
        className="fixed inset-0 top-[69px] z-[9998] cursor-default bg-black/40 animate-in fade-in-0 duration-300 md:top-[81px]"
      />

      {/* panel */}
      <div
        role="dialog"
        aria-label="Search products"
        className="absolute inset-x-0 top-full z-[9999] border-b border-neutral-200 bg-white shadow-[0_24px_40px_-20px_rgba(0,0,0,0.25)] animate-in fade-in-0 slide-in-from-top-2 duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:animate-none"
      >
        <div className="mx-auto max-h-[calc(100svh-90px)] max-w-[1200px] overflow-y-auto px-5 pb-24 pt-6 md:px-10 md:py-8">
          {/* Search field */}
          <form onSubmit={handleSubmit} role="search" className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500"
                strokeWidth={1.8}
                aria-hidden
              />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search workstations, chairs, storage..."
                aria-label="Search products"
                autoComplete="off"
                className="h-14 w-full rounded-md border border-neutral-300 bg-[#f7f5f1] pl-12 pr-24 text-base text-neutral-900 transition-colors placeholder:text-neutral-500 hover:border-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-neutral-900/5 md:text-lg [&::-webkit-search-cancel-button]:hidden"
              />
              <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
                {query && (
                  <button
                    type="button"
                    onClick={clearQuery}
                    aria-label="Clear search"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-900"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                )}
                <kbd className="hidden rounded border border-neutral-300 bg-white px-1.5 py-0.5 font-sans text-[11px] text-neutral-500 sm:block">
                  Esc
                </kbd>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            >
              <X className="h-5 w-5" strokeWidth={1.8} aria-hidden />
            </button>
          </form>

          {/* Body */}
          <div className="mt-6" aria-live="polite">
            {!trimmed && categories.length > 0 && (
              <div>
                <p className="mb-3 text-sm font-medium text-neutral-700">
                  Browse by category
                </p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={categoryHref(category)}
                      onClick={onClose}
                      className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-800 transition-colors hover:border-neutral-900 hover:text-neutral-900"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {trimmed && trimmed.length < MIN_CHARS && (
              <p className="text-sm text-neutral-600">
                Keep typing to see matching products…
              </p>
            )}

            {hasQuery &&
              (waiting && visibleResults.length === 0 ? (
                <ResultSkeleton />
              ) : visibleResults.length > 0 ? (
                <>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium text-neutral-700">Products</p>
                  </div>
                  <ul
                    className={`grid gap-3 transition-opacity duration-200 sm:grid-cols-2 lg:grid-cols-3 ${
                      waiting ? "opacity-60" : "opacity-100"
                    }`}
                  >
                    {visibleResults.map((product) => {
                      const image = resolveFileUrl(
                        product.thumbnail || product.hero?.images?.[0],
                      );
                      return (
                        <li key={product.id}>
                          <Link
                            href={`/shop/${product.slug}`}
                            onClick={onClose}
                            className="group flex items-center gap-4 rounded-md border border-transparent p-2 transition-colors duration-300 hover:border-neutral-200 hover:bg-[#f7f5f1]"
                          >
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                              {image && (
                                <Image
                                  src={image}
                                  alt=""
                                  fill
                                  sizes="64px"
                                  className="object-contain p-1.5 mix-blend-multiply"
                                />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="line-clamp-2 text-sm leading-snug text-neutral-700">
                                <Highlight text={product.title} query={debouncedQuery} />
                              </p>
                              {product.category_title && (
                                <p className="mt-1 truncate text-xs text-neutral-500">
                                  {product.category_title}
                                </p>
                              )}
                            </div>
                            <ArrowUpRight
                              className="h-4 w-4 shrink-0 text-neutral-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900"
                              aria-hidden
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-6 border-t border-neutral-100 pt-6">
                    <button
                      type="button"
                      onClick={goToAllResults}
                      className="group inline-flex items-center gap-3 rounded-md bg-black py-2.5 pl-5 pr-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-neutral-800"
                    >
                      View all results for &ldquo;{trimmed}&rdquo;
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-700 transition-transform duration-300 group-hover:translate-x-0.5">
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
                      </span>
                    </button>
                  </div>
                </>
              ) : (
                !waiting && (
                  <div className="py-6 text-center">
                    <p className="text-base font-medium text-neutral-900">
                      No products found for &ldquo;{debouncedQuery}&rdquo;
                    </p>
                    <p className="mt-1 text-sm text-neutral-600">
                      Try a different word, or browse all products.
                    </p>
                    <Link
                      href="/shop"
                      onClick={onClose}
                      className="mt-4 inline-block text-sm font-semibold text-neutral-900 underline decoration-neutral-400 underline-offset-[6px] hover:decoration-neutral-900"
                    >
                      Browse all products
                    </Link>
                  </div>
                )
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
