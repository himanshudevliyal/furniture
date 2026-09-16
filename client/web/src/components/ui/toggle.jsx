"use client";

import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-transparent hover:bg-muted hover:text-foreground data-[state=on]:bg-neutral-900 data-[state=on]:text-white",
        outline:
          "border border-neutral-300 bg-transparent hover:bg-muted data-[state=on]:border-neutral-900 data-[state=on]:bg-neutral-900 data-[state=on]:text-white",
        // Pill/switch look (label + sliding knob) — a styling variant of
        // the same Toggle component/API, used for the filter rows.
        switch:
          "relative rounded-full border border-neutral-300 bg-neutral-200 p-0 transition-colors data-[state=on]:border-neutral-900 data-[state=on]:bg-neutral-900",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2",
        lg: "h-10 px-4",
        switch: "h-6 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef(function Toggle(
  {
    className,
    variant,
    size,
    pressed,
    defaultPressed = false,
    onPressedChange,
    disabled,
    children,
    ...props
  },
  ref,
) {
  const [uncontrolledPressed, setUncontrolledPressed] =
    React.useState(defaultPressed);

  const isControlled = pressed !== undefined;
  const isPressed = isControlled ? pressed : uncontrolledPressed;
  const isSwitch = variant === "switch";
  const resolvedSize = size ?? (isSwitch ? "switch" : "default");

  const handleClick = (event) => {
    props.onClick?.(event);
    if (disabled || event.defaultPrevented) return;

    const next = !isPressed;
    if (!isControlled) setUncontrolledPressed(next);
    onPressedChange?.(next);
  };

  return (
    <button
      ref={ref}
      type="button"
      data-slot="toggle"
      data-state={isPressed ? "on" : "off"}
      disabled={disabled}
      aria-pressed={!isSwitch ? isPressed : undefined}
      role={isSwitch ? "switch" : undefined}
      aria-checked={isSwitch ? isPressed : undefined}
      {...props}
      onClick={handleClick}
      className={cn(toggleVariants({ variant, size: resolvedSize, className }))}
    >
      {isSwitch ? (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none block h-5 w-5 translate-x-0 rounded-full bg-white shadow transition-transform",
            isPressed && "translate-x-5",
          )}
        />
      ) : (
        children
      )}
    </button>
  );
});
Toggle.displayName = "Toggle";

export { Toggle, toggleVariants };
