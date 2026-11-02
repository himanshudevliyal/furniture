import { cn } from "@/lib/utils";
export function Paragraph({ children, className, as: Component = "p" }) {
  return (
    <Component
      className={cn(
        "mt-6 max-w-2xl font-body type-lead text-muted-foreground",
        className,
      )}
    >
      {children}
    </Component>
  );
}
