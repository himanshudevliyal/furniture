"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import config from "@/config";
import { Minus, Plus } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import { useDispatch } from "react-redux";
import { toggleCart, addItem, setCartItems } from "@/lib/features/slice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  getCartItems,
  updateCartItem,
} from "@/services/cart-services";
import { getLocalCart, setLocalCart } from "@/components/cart-button";
import { toast } from "sonner";

export default function ProductActionBar({ product, price }) {
  const [showBar, setShowBar] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { user } = useAuth();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  /* ================= Scroll handler ================= */
  useEffect(() => {
    const handleScroll = () => setShowBar(window.scrollY > 800);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= CART DATA ================= */
  const { data: cartItems } = useQuery({
    queryKey: ["cart-items"],
    queryFn: async () => {
      const { data } = await getCartItems();
      return data;
    },
    enabled: !!user,
  });

  const cartItem = useMemo(() => {
    if (user) {
      return cartItems?.find((c) => c.product_id === product.id);
    } else {
      const local = getLocalCart();
      return local.find((c) => c.id === product.id);
    }
  }, [cartItems, user, product.id]);

  /* ================= Sync quantity ================= */
  useEffect(() => {
    if (cartItem?.quantity) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItem]);

  /* ================= MUTATIONS ================= */
  const addMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      queryClient.invalidateQueries(["cart-items"]);
      dispatch(toggleCart());
      toast.success("Added to cart!");
    },
    onError: (err) => toast.error("Failed to add to cart"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, quantity }) =>
      updateCartItem(id, { quantity, product_price: price }),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      queryClient.invalidateQueries(["cart-items"]);
      toast.success("Cart updated!");
    },
    onError: (err) => toast.error("Failed to update cart"),
  });

  /* ================= HANDLER ================= */
  const handleAddOrUpdate = () => {
    if (user) {
      // Logged-in user
      if (cartItem) {
        updateMutation.mutate({ id: cartItem.id, quantity });
      } else {
        addMutation.mutate({
          product_id: product.id,
          product_price: price,
          quantity,
          slug: product.slug,
        });
      }
    } else {
      // Guest user - localStorage + Redux
      const local = getLocalCart();
      const existing = local.find((i) => i.id === product.id);

      if (existing) {
        existing.quantity = quantity;
      } else {
        local.push({
          id: product.id,
          title: product.title,
          product_price: price,
          pictures: product.pictures,
          slug: product.slug,
          quantity,
        });
      }

      setLocalCart(local);
      dispatch(setCartItems(local)); // Update Redux store for guest
      dispatch(toggleCart());
      toast.success(cartItem ? "Cart updated!" : "Added to cart!");
    }
  };

  /* ================= UI ================= */
  return (
    <div
      className={`hidden lg:flex fixed bottom-0 left-0 w-full z-[999]
      transition-all duration-500
      ${showBar ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
    >
      <div className="border-t bg-white shadow-2xl w-full">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <Image
              src={`${config.file_base}${product.pictures?.[0]}`}
              alt={product.title}
              width={64}
              height={64}
              className="w-16 h-16 rounded-lg object-cover border"
            />
            <div>
              <p className="font-semibold line-clamp-1">{product.title}</p>
              <p className="text-primary font-bold">₹{price}</p>
            </div>
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity === 1}
              className="w-9 h-9 border rounded-md disabled:opacity-40"
            >
              <Minus size={16} />
            </button>

            <span className="w-8 text-center font-semibold">{quantity}</span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-9 h-9 border rounded-md"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* CTA */}
          <button
            onClick={handleAddOrUpdate}
            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold"
          >
            {cartItem ? "Update Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
