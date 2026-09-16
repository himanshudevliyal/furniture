"use client";
 
import { useMemo } from "react";
import { parseAsString, useQueryStates } from "nuqs";
 
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
 
export function FilterSidebar({ categories = [] }) {
  const [
    { categories: categoryId, "sub-categories": subCategoryId },
    setFilters,
  ] = useQueryStates({
    categories: parseAsString,
    "sub-categories": parseAsString,
  });
 
  const isAnyFilterActive = !!categoryId || !!subCategoryId;
 
  const activeCategory = useMemo(
    () => categories.find((cat) => cat.id === categoryId) ?? null,
    [categories, categoryId],
  );
 
  const subCategories = activeCategory?.sub_categories ?? [];
 
  const selectCategory = (id) => {
    // Selecting a new main category clears sub-categories, since the
    // previously selected sub-category may not belong to it.
    setFilters({
      categories: categoryId === id ? null : id,
      "sub-categories": null,
    });
  };
 
  const selectSubCategory = (id) => {
    setFilters({ "sub-categories": subCategoryId === id ? null : id });
  };
 
  const clearFilters = () => {
    setFilters({ categories: null, "sub-categories": null });
  };
 
  return (
    <div className="space-y-8">
      {isAnyFilterActive && (
        <button
          type="button"
          onClick={clearFilters}
          className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <XCircle className="h-3.5 w-3.5" />
          Clear filters
        </button>
      )}
 
      {/* Category */}
      {categories.length > 0 && (
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
            Category
          </p>
 
          <div className="divide-y divide-neutral-100">
            {categories.map((cat) => {
              const isActive = cat.id === categoryId;
 
              return (
                <div
                  key={cat.id}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <button
                    type="button"
                    onClick={() => selectCategory(cat.id)}
                    className={cn(
                      "truncate text-left text-sm text-neutral-600 transition-colors hover:text-neutral-900",
                      isActive && "font-medium text-neutral-900",
                    )}
                  >
                    {cat.title}
                  </button>
 
                  <Toggle
                    variant="switch"
                    pressed={isActive}
                    onPressedChange={() => selectCategory(cat.id)}
                    aria-label={`Filter by ${cat.title}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
 
      {/* Sub-category — only once a category is selected */}
      {activeCategory && (
        <div>
          <Separator className="mb-8" />
 
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
            Sub-category
          </p>
 
          {subCategories.length === 0 ? (
            <p className="text-sm text-neutral-400">
              No sub-categories for this category.
            </p>
          ) : (
            <div className="divide-y divide-neutral-100">
              {subCategories.map((sub) => {
                const isActive = sub.id === subCategoryId;
 
                return (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between gap-4 py-3"
                  >
                    <button
                      type="button"
                      onClick={() => selectSubCategory(sub.id)}
                      className={cn(
                        "truncate text-left text-sm text-neutral-600 transition-colors hover:text-neutral-900",
                        isActive && "font-medium text-neutral-900",
                      )}
                    >
                      {sub.title}
                    </button>
 
                    <Toggle
                      variant="switch"
                      pressed={isActive}
                      onPressedChange={() => selectSubCategory(sub.id)}
                      aria-label={`Filter by ${sub.title}`}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
 