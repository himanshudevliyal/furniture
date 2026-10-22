import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProjectQuotes,
  fetchProjectQuote,
  updateProjectQuoteStatus,
  updateProjectQuote,
  deleteProjectQuote,
} from "@/services/project-quote-service";

export const useProjectQuotes = (searchParams = "") => {
  return useQuery({
    queryKey: ["project-quotes", searchParams],
    queryFn: () => fetchProjectQuotes(searchParams),
  });
};

export const useProjectQuote = (id) => {
  return useQuery({
    queryKey: ["project-quotes", id],
    queryFn: () => fetchProjectQuote(id),
    enabled: !!id,
  });
};

export const useUpdateProjectQuoteStatus = (id, callback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["project-quotes", id],
    mutationFn: (status) => updateProjectQuoteStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-quotes"] });
      callback?.();
    },
  });
};

export const useDeleteProjectQuote = (id, callback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["project-quotes", id],
    mutationFn: () => deleteProjectQuote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-quotes"] });
      callback?.();
    },
  });
};

export const useUpdateProjectQuote = (id, callback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["project-quotes", id],
    mutationFn: (data) => updateProjectQuote(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-quotes"] });
      callback?.();
    },
  });
};
