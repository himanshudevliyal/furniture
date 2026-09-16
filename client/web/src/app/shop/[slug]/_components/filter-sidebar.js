"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { XCircle, Filter, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";
import { parseAsInteger, useQueryState, useQueryStates } from "nuqs";
import { Slider } from "@/components/ui/slider";

export function FilterSidebar({
  title,
  categories = [],
  categoriesQ,
  onCategoriesChange,
  onClear,
  isAnyFiltterActive,
  price = 20000,
  range,
  setRange,
}) {
  const [localPrice, setLocalPrice] = useState(price);

  const { price_from, price_to } = range;

  const categorySelectedValueSet = useMemo(() => {
    if (!categoriesQ) return new Set();
    const values = categoriesQ.split(".");

    return new Set(values.filter((v) => v !== ""));
  }, [categoriesQ]);

  const toggleCategory = (id) => {
    const idStr = String(id);
    const newSet = new Set(categorySelectedValueSet);
    if (newSet.has(idStr)) {
      newSet.delete(idStr);
    } else {
      newSet.add(idStr);
    }

    onCategoriesChange(Array.from(newSet).join("."));
  };

  const handleSliderChange = (values) => {
    setRange({ price_from: values[0], price_to: values[1] });
  };

  return (
    <div className="rounded-xl border bg-card p-4 md:p-5 space-y-5 sticky top-20">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="mt-2 h-0.5 w-16 bg-primary" />
      </div>

      {/* Clear Filters */}
      {isAnyFiltterActive && (
        <Button
          variant="outline"
          onClick={onClear}
          className={cn(
            "w-full border-destructive text-destructive",
            "hover:bg-destructive/10",
          )}
        >
          <XCircle className="mr-2 h-4 w-4" />
          Clear All Filters
        </Button>
      )}

      <Separator />

      {/* Categories */}
      {categories.length > 0 && (
        <>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4 text-primary" />
              <span className="text-lg font-semibold">Categories</span>
            </div>

            <div className="space-y-2">
              {categories.map((cat) => {
                const checked = categoriesQ.split(".").includes(String(cat.id));

                return (
                  <div
                    key={cat.id}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-2 transition-colors",
                      checked && "bg-primary/5",
                    )}
                  >
                    <span className="capitalize text-sm">{cat.title}</span>
                    <Switch
                      checked={checked}
                      onCheckedChange={() => toggleCategory(cat.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <Separator />
        </>
      )}

      {/* ✅ SINGLE PRICE FILTER */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <IndianRupee className="h-4 w-4 text-primary" />
          <span className="text-lg font-semibold">Price</span>
        </div>

        {/* Price Display */}
        <div className="text-center text-base font-semibold text-primary mb-2">
          ₹{price_from?.toLocaleString() ?? "0"} – ₹
          {price_to?.toLocaleString() ?? "0"}
        </div>

        <div className=" flex">
          <Slider
            value={[price_to, price_from]}
            onValueChange={handleSliderChange}
            orientation="horizontal"
            step={200}
            min={0}
            max={10000}
          />
        </div>
      </div>
    </div>
  );
}
