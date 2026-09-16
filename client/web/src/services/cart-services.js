import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";

export const addToCart = async (item) => {
  return await http().post(endpoints.carts.getAll, item);
};

export const updateCartItem = async (id, item) => {
  return await http().put(`${endpoints.carts.getAll}/${id}`, item);
};

export const deleteCartItem = async (id) => {
  return await http().delete(`${endpoints.carts.getAll}/${id}`);
};

export const getCartItems = async () => {
  return await http().get(endpoints.carts.getAll);
};
