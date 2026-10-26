"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const move = (list, from, to) => {
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

// Drag & drop (or arrow buttons) list. items: [{ id, title }]
export function SortableList({ items, onChange }) {
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);

  const handleDrop = (index) => {
    if (dragIndex !== null && dragIndex !== index) {
      onChange(move(items, dragIndex, index));
    }
    setDragIndex(null);
    setOverIndex(null);
  };

  if (!items.length) {
    return (
      <p className="text-muted-foreground py-6 text-center text-sm">
        Nothing to reorder.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li
          key={item.id}
          draggable
          onDragStart={() => setDragIndex(index)}
          onDragOver={(e) => {
            e.preventDefault();
            setOverIndex(index);
          }}
          onDragLeave={() => setOverIndex(null)}
          onDrop={() => handleDrop(index)}
          onDragEnd={() => {
            setDragIndex(null);
            setOverIndex(null);
          }}
          className={cn(
            "bg-background flex items-center gap-3 rounded-md border px-3 py-2",
            dragIndex === index && "opacity-50",
            overIndex === index && dragIndex !== index && "border-primary",
          )}
        >
          <GripVertical className="text-muted-foreground size-4 shrink-0 cursor-grab" />
          <span className="text-muted-foreground w-6 text-sm tabular-nums">
            {index + 1}
          </span>
          <span className="flex-1 truncate text-sm capitalize">
            {item.title}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7"
            disabled={index === 0}
            onClick={() => onChange(move(items, index, index - 1))}
          >
            <ArrowUp className="size-4" />
            <span className="sr-only">Move up</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7"
            disabled={index === items.length - 1}
            onClick={() => onChange(move(items, index, index + 1))}
          >
            <ArrowDown className="size-4" />
            <span className="sr-only">Move down</span>
          </Button>
        </li>
      ))}
    </ul>
  );
}
