import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/slice";
import productsReducer from "./features/productsSlice";
import ordersReducer from "./features/ordersSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      products: productsReducer,
      // auth: authReducer,
      orders: ordersReducer,
    },
  });
};
