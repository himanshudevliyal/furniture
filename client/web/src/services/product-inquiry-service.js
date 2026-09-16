import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";

// Submits the checkout/inquiry form. Payload matches the existing backend
// product-inquiry schema exactly (full_name, company_name, email,
// contact_number, city, state, message, products: [{product_id, quantity}]).
export const createProductInquiry = async (payload) => {
  const { data } = await http().post(endpoints.productInquiries.getAll, payload);
  return data;
};
