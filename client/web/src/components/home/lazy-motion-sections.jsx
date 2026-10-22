"use client";

import dynamic from "next/dynamic";
import LoadWhenVisible from "@/components/load-when-visible";
import { IndustriesStatic } from "@/components/industries-content";
import { ParallaxStatic } from "./parallax-static";

// The animated versions of these sections depend on `motion` (~50 KB of JS).
// They are below the fold, so the page first renders a static version and the
// animated one is downloaded only when the visitor scrolls near it.

const IndustriesWeServe = dynamic(
  () => import("@/components/industries-we-serve"),
  { loading: () => <IndustriesStatic /> },
);

const ParallaxShowcase = dynamic(() => import("./parallax-showcase"), {
  loading: () => <ParallaxStatic />,
});

export function LazyIndustriesWeServe() {
  return (
    <LoadWhenVisible fallback={<IndustriesStatic />}>
      <IndustriesWeServe />
    </LoadWhenVisible>
  );
}

export function LazyParallaxShowcase() {
  return (
    <LoadWhenVisible fallback={<ParallaxStatic />}>
      <ParallaxShowcase />
    </LoadWhenVisible>
  );
}
