import { cn } from "@/lib/utils";

export default function Heading({
  eyebrow,
  heading,
  subheading,
  className,
  eyebrowClassName,
  headingClassName,
  subheadingClassName,
}) {
  return (
    <div className={cn(" text-start  mb-5", className)}>
      {eyebrow && (
        <span
          className={cn(
            "relative inline-flex items-center pl-3 type-eyebrow text-primary",
            eyebrowClassName,
          )}
        >
          <span
            className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary"
            aria-hidden
          />
          {eyebrow}
        </span>
      )}

      <h2
        className={cn(
          "mt-3 font-display type-title text-foreground",
          headingClassName,
        )}
      >
        {heading}
      </h2>

      {subheading && (
        <p
          className={cn(
            "mt-4 font-body type-lead",
            subheadingClassName,
          )}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
