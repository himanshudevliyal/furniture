"use client";

import { useEffect, useRef, useState } from "react";

// Renders `fallback` (static, server-rendered markup) until the block comes
// within `rootMargin` of the viewport, then swaps in `children`. Pair it with
// next/dynamic so heavy, below-the-fold client code (e.g. motion) is only
// downloaded when the visitor scrolls near it.
export default function LoadWhenVisible({
  fallback,
  children,
  rootMargin = "400px 0px",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return <div ref={ref}>{visible ? children : fallback}</div>;
}
