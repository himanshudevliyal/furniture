"use client";

import { useState } from "react";
import Image from "next/image";

// next/image with a fallback when the source fails to load (e.g. a deleted
// upload). Inline data: URIs (placeholders) are passed through unoptimized.
export default function FallbackImage({ src, fallbackSrc, alt = "", ...props }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const current = src && failedSrc !== src ? src : fallbackSrc;

  return (
    <Image
      {...props}
      src={current}
      alt={alt}
      unoptimized={String(current).startsWith("data:")}
      onError={() => {
        if (current !== fallbackSrc) setFailedSrc(src);
      }}
    />
  );
}
