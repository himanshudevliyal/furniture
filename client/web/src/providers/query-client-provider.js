"use client";
import { useState } from "react";
import { handleError } from "@/lib/handle-error-toast";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";

export default function QueryProvider({ children }) {
  // Created once per browser session; a new client on every render would
  // throw away the whole query cache.
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        // console.error("Query failed:", query.queryKey, error);
        handleError(error, "Failed to fetch data.");
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, variables, context, mutation) => {
        console.error("Mutation failed:", mutation.options.mutationKey, error);
        handleError(error, "Failed to perform action.");
      },
      onSuccess: (data, variables, context, mutation) => {
        // toast.success("Operation successful!");
      },
    }),
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
