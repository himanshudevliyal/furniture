// store/ordersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
    shippingInfo: null, // <-- yeh add kiya
  },
  reducers: {
    addOrder: (state, action) => {
      state.items.push(action.payload);
      state.shippingInfo = actison.payload.shipping; // last shipping save karlo
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload; // manually bhi save kar sakte ho
    },
    clearOrders: (state) => {
      state.items = [];
      state.shippingInfo = null;
    },
  },
});

export const { addOrder, clearOrders, saveShippingInfo } = ordersSlice.actions;
export default ordersSlice.reducer;
