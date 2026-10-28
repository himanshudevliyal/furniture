// hooks/useProducts.ts
import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchProducts,
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/product-service";

export const useProducts = (searchParams = "") => {
  return useQuery({
    queryKey: ["products", searchParams],
    queryFn: () => fetchProducts(searchParams),
  });
};

// Page-by-page loading for the shop grid (infinite scroll).
// `searchParams` must not contain page/limit — they are added per page.
export const useInfiniteProducts = (searchParams = "", pageSize = 12) => {
  return useInfiniteQuery({
    queryKey: ["products", "infinite", searchParams, pageSize],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", String(pageParam));
      params.set("limit", String(pageSize));
      return fetchProducts(params.toString());
    },
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce(
        (sum, page) => sum + (page?.products?.length ?? 0),
        0,
      );
      const total = lastPage?.total ?? 0;
      return lastPage?.products?.length && loaded < total
        ? allPages.length + 1
        : undefined;
    },
  });
};

export const useFormattedProducts = (searchParams = "") => {
  return useQuery({
    queryKey: ["products", searchParams],
    queryFn: () => fetchProducts(searchParams),
    select: ({ products }) => {
      return products?.map((b) => ({
        value: b.id,
        label: b.title,
      }));
    },
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });
};

export const useCreateProduct = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      callback?.();
    },
  });
};

export const useUpdateProduct = (id, callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product) => updateProduct(id, product),
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      callback?.();
    },
  });
};

export const useDeleteProduct = (id, callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      callback?.();
    },
  });
};
