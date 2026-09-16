"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCartItems,
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  increaseQuantity as increaseQuantityAction,
  decreaseQuantity as decreaseQuantityAction,
  clearCart as clearCartAction,
  openCart as openCartAction,
  closeCart as closeCartAction,
  toggleCart as toggleCartAction,
} from "@/lib/features/slice";

const CART_STORAGE_KEY = "cart";

const readLocalCart = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeLocalCart = (items) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

// Single place for all cart logic - localStorage on load, Redux while the
// app is running, localStorage again on every change. No cart API.
export function useCart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const isHydrated = useRef(false);

  // localStorage -> Redux (once, on first mount)
  useEffect(() => {
    dispatch(setCartItems(readLocalCart()));
    isHydrated.current = true;
  }, [dispatch]);

  // Redux -> localStorage (every change, after hydration)
  useEffect(() => {
    if (isHydrated.current) writeLocalCart(items);
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    dispatch(addToCartAction({ product, quantity }));
    dispatch(openCartAction());
  };

  const removeFromCart = (id) => dispatch(removeFromCartAction(id));
  const increaseQuantity = (id) => dispatch(increaseQuantityAction(id));
  const decreaseQuantity = (id) => dispatch(decreaseQuantityAction(id));
  const clearCart = () => dispatch(clearCartAction());
  const openCart = () => dispatch(openCartAction());
  const closeCart = () => dispatch(closeCartAction());
  const toggleCart = () => dispatch(toggleCartAction());

  const cartCount = items.reduce((sum, i) => sum + (i.quantity || 0), 0);

  // Backend has no product pricing yet, so this stays 0 unless an item
  // happens to carry a `price` field.
  const subtotal = items.reduce(
    (sum, i) => sum + (Number(i.price) || 0) * (i.quantity || 0),
    0,
  );

  return {
    cartItems: items,
    isCartOpen,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
    cartCount,
    subtotal,
  };
}
