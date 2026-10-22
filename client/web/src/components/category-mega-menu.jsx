"use client";

import Link from "next/link";

/* ------------------------------------------------------------------ */
/* Helpers — shared with mobile-menu.jsx                               */
/* ------------------------------------------------------------------ */

// Sub-categories come from the `sub_categories` table.
// Fallback keys are here in case the API serialises them differently.
export function getSubCategories(category) {
  const list =
    category?.sub_categories ??
    category?.subCategories ??
    category?.subcategories ??
    category?.children ??
    [];

  return Array.isArray(list) ? list : [];
}

export function categoryHref(category) {
  return `/categories/${category.slug ?? category.id}`;
}

// ⚠️ Agar tumhara sub-category route alag hai to sirf yahi ek line badlo.
export function subCategoryHref(category, sub) {
  return `/categories/${category.slug}#${
    sub.slug
  }`;
}

export function subCategoryLabel(sub) {
  return sub.title ?? sub.name ?? "";
}

/* ------------------------------------------------------------------ */
/* Desktop mega menu                                                   */
/* ------------------------------------------------------------------ */

export default function CategoryMegaMenu({
  open = false,
  categories = [],
  loading = false,
  onMouseEnter,
  onMouseLeave,
  onNavigate,
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      inert={!open}
      aria-hidden={!open}
      // Panel unrolls from the navbar edge (clip-path), content follows a beat
      // later. Closing is quicker than opening so it never feels in the way.
      className={`absolute inset-x-0 top-full hidden border-b border-t border-neutral-200 bg-white shadow-[0_18px_30px_-12px_rgba(0,0,0,0.12)] transition-[clip-path,opacity,visibility] motion-reduce:transition-none lg:block ${
        open
          ? "visible opacity-100 [clip-path:inset(0_0_0_0)] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          : "invisible opacity-0 [clip-path:inset(0_0_100%_0)] duration-300 ease-[cubic-bezier(0.7,0,0.84,0)]"
      }`}
    >
      <div
        className={`mx-auto max-h-[calc(100vh-130px)] max-w-[1400px] overflow-y-auto px-10 py-10 transition-[opacity,transform] motion-reduce:transition-none ${
          open
            ? "translate-y-0 opacity-100 delay-100 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            : "-translate-y-2 opacity-0 duration-200 ease-in"
        }`}
      >
        {loading ? (
          <div className="grid grid-cols-5 gap-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-5 w-28 animate-pulse rounded bg-neutral-200" />
                <div className="h-4 w-36 animate-pulse rounded bg-neutral-100" />
                <div className="h-4 w-24 animate-pulse rounded bg-neutral-100" />
                <div className="h-4 w-32 animate-pulse rounded bg-neutral-100" />
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <p className="text-[15px] text-neutral-500">
            No categories available.
          </p>
        ) : (
          <div
            className="grid gap-x-8 gap-y-10"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 0.5fr))",
            }}
          >
            {categories.map((category) => {
              const subs = getSubCategories(category);

              return (
                <div key={category.id} className="min-w-0">
                  <Link
                    href={categoryHref(category)}
                    onClick={onNavigate}
                    className="block text-[15px] font-semibold leading-snug text-neutral-900 transition-colors hover:text-neutral-600"
                  >
                    {category.title}
                  </Link>

                  {subs.length > 0 && (
                    <ul className="mt-5 space-y-4">
                      {subs.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            href={subCategoryHref(category, sub)}
                            onClick={onNavigate}
                            className="block text-[15px] leading-tight text-neutral-500 transition-colors hover:text-neutral-900"
                          >
                            {subCategoryLabel(sub)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}