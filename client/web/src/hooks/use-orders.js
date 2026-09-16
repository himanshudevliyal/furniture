import {
  fetchOrderInvoice,
  fetchOrderShippingLabel,
} from "@/services/order-services";
import { useMutation } from "@tanstack/react-query";

export const useOrderInvoice = (orderId) => {
  return useMutation({
    // queryKey: ["orders-invoice", orderId],
    mutationFn: () => fetchOrderInvoice(orderId),
  });
};

export const useOrderShippingLabel = (orderId) => {
  return useMutation({
    // queryKey: ["orders-shipping-label", orderId],
    mutationFn: () => fetchOrderShippingLabel(orderId),
    // enabled: !!orderId,
  });
};
