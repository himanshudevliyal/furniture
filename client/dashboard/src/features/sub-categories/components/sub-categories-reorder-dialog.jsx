"use client";

import { useEffect, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortableList } from "@/components/sortable-list";
import { useFormattedCategories } from "@/hooks/use-categories";
import {
  useReorderSubCategories,
  useSubCategories,
} from "@/hooks/use-sub-categories";

export default function SubCategoriesReorderDialog() {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [items, setItems] = useState([]);

  const { data: categories = [] } = useFormattedCategories();
  const { data, isLoading } = useSubCategories(
    categoryId ? `category_id=${categoryId}` : "",
  );
  const reorderMutation = useReorderSubCategories(() => {
    toast.success("Sub category sequence updated.");
    setOpen(false);
  });

  // Default to the first category when the dialog opens
  useEffect(() => {
    if (open && !categoryId && categories.length) {
      setCategoryId(categories[0].value);
    }
  }, [open, categoryId, categories]);

  useEffect(() => {
    if (open && categoryId) setItems(data?.sub_categories ?? []);
  }, [open, categoryId, data]);

  const handleSave = () => {
    reorderMutation.mutate(items.map((item) => item.id), {
      onError: (error) =>
        toast.error(
          error?.response?.data?.message ?? "Failed to update sequence.",
        ),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <ArrowUpDown /> Reorder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sub category sequence</DialogTitle>
          <DialogDescription>
            Pick a category, then drag or use the arrows to set the order its
            sub categories appear in on the website.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={categoryId}
            onValueChange={(value) => {
              setItems([]);
              setCategoryId(value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="max-h-[50vh] overflow-y-auto pr-1">
          {isLoading || !categoryId ? (
            <p className="text-muted-foreground py-6 text-center text-sm">
              Loading...
            </p>
          ) : (
            <SortableList items={items} onChange={setItems} />
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={reorderMutation.isPending || !items.length}
          >
            {reorderMutation.isPending ? "Saving..." : "Save sequence"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
