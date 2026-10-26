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
import { SortableList } from "@/components/sortable-list";
import { useCategories, useReorderCategories } from "@/hooks/use-categories";

export default function CategoriesReorderDialog() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  // No limit -> all categories, in their current sequence
  const { data, isLoading } = useCategories("");
  const reorderMutation = useReorderCategories(() => {
    toast.success("Category sequence updated.");
    setOpen(false);
  });

  useEffect(() => {
    if (open) setItems(data?.categories ?? []);
  }, [open, data]);

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
          <DialogTitle>Category sequence</DialogTitle>
          <DialogDescription>
            Drag or use the arrows to set the order categories appear in on
            the website.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-1">
          {isLoading ? (
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
