"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";

export function NuqsProvider({ children }) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
