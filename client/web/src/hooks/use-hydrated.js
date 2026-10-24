import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

// false during server render and hydration, true afterwards. Use it to keep
// the first client render identical to the server HTML when client-only data
// (e.g. an already-filled React Query cache) would otherwise differ.
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
