"use client";

import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";
import { Check, Minus, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

// Shared by the sidebar and the shop grid so both read the URL the same way:
// ?categories=a,b&sub-categories=x,y
export const shopFilterParsers = {
  categories: parseAsArrayOf(parseAsString).withDefault([]),
  "sub-categories": parseAsArrayOf(parseAsString).withDefault([]),
};

function Checkbox({ checked, indeterminate, label, onChange, className }) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 py-2.5 text-sm text-neutral-600 transition-colors hover:text-neutral-900",
        (checked || indeterminate) && "font-medium text-neutral-900",
        className,
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-neutral-300 bg-white transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-neutral-900/30",
          (checked || indeterminate) && "border-neutral-900 bg-neutral-900 text-white",
        )}
      >
        {checked ? (
          <Check className="h-3 w-3" strokeWidth={3} />
        ) : indeterminate ? (
          <Minus className="h-3 w-3" strokeWidth={3} />
        ) : null}
      </span>
      <span className="truncate">{label}</span>
    </label>
  );
}

export function FilterSidebar({ categories = [] }) {
  const [
    { categories: categoryIds, "sub-categories": subCategoryIds },
    setFilters,
  ] = useQueryStates(shopFilterParsers);

  const isAnyFilterActive = categoryIds.length > 0 || subCategoryIds.length > 0;

  const toggleCategory = (cat) => {
    const isSelected = categoryIds.includes(cat.id);
    const ownSubIds = (cat.sub_categories ?? []).map((s) => s.id);
    setFilters({
      categories: isSelected
        ? categoryIds.filter((id) => id !== cat.id)
        : [...categoryIds, cat.id],
      // Unticking a category also drops its ticked sub-categories.
      "sub-categories": isSelected
        ? subCategoryIds.filter((id) => !ownSubIds.includes(id))
        : subCategoryIds,
    });
  };

  const toggleSubCategory = (subId) => {
    setFilters({
      "sub-categories": subCategoryIds.includes(subId)
        ? subCategoryIds.filter((id) => id !== subId)
        : [...subCategoryIds, subId],
    });
  };

  const clearFilters = () => {
    setFilters({ categories: null, "sub-categories": null });
  };

  if (!categories.length) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
          Category
        </p>
        {isAnyFilterActive && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-neutral-500 transition-colors hover:text-neutral-900"
          >
            <XCircle className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </div>

      <div className="divide-y divide-neutral-100">
        {categories.map((cat) => {
          const isSelected = categoryIds.includes(cat.id);
          const subs = cat.sub_categories ?? [];
          const pickedSubs = subs.filter((s) => subCategoryIds.includes(s.id));

          return (
            <div key={cat.id}>
              <Checkbox
                checked={isSelected && pickedSubs.length === 0}
                indeterminate={isSelected && pickedSubs.length > 0}
                label={cat.title}
                onChange={() => toggleCategory(cat)}
              />

              {/* Sub-categories open under each ticked category. None ticked
                  = the whole category is shown. */}
              {isSelected && subs.length > 0 && (
                <div className="mb-2 ml-2 border-l border-neutral-200 pl-4">
                  {subs.map((sub) => (
                    <Checkbox
                      key={sub.id}
                      checked={subCategoryIds.includes(sub.id)}
                      label={sub.title}
                      onChange={() => toggleSubCategory(sub.id)}
                      className="py-2"
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
