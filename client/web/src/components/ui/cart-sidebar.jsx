"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Trash, Minus, Plus, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import config from "@/config";

export default function CartSidebar() {
  const router = useRouter();
  const {
    cartItems,
    isCartOpen,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    subtotal,
    closeCart,
    toggleCart,
  } = useCart();

  const hasPricing = cartItems.some((item) => item.price);

  return (
    <Sheet
      open={isCartOpen}
      onOpenChange={(open) => (open ? toggleCart() : closeCart())}
    >
      <SheetContent className="w-full sm:w-[400px] z-[99999] flex flex-col p-4 bg-white">
        <SheetHeader className="mb-4 border-b pb-2">
          <SheetTitle className="text-xl font-bold">Your Cart</SheetTitle>
        </SheetHeader>

        {/* =========================
           CART ITEMS
        ========================= */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground mt-8">
              Your cart is empty
            </p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <div className="relative w-20 h-20 bg-gray-100 rounded">
                  <Image
                    src={`${config.file_base}/${item?.image ?? ""}`}
                    alt={item?.title ?? ""}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  {item.price && <p className="text-sm">₹{item.price}</p>}

                  {item.pack_size && (
                    <p className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full w-fit mt-1">
                      <Package size={14} className="text-primary-500" />
                      <span className="font-medium">{item.pack_size}</span>
                    </p>
                  )}

                  <div className="flex items-center gap-2 mt-2">
                    {/* MINUS */}
                    <Button
                      size="icon"
                      variant="outline"
                      disabled={item.quantity <= 1}
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      <Minus size={14} />
                    </Button>

                    <span>{item.quantity ?? 1}</span>

                    {/* PLUS */}
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      <Plus size={14} />
                    </Button>

                    {/* DELETE */}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="ml-auto text-red-500"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* =========================
           FOOTER
        ========================= */}
        <div className="border-t pt-4 space-y-4">
          {hasPricing && (
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
          )}

          <Button
            disabled={cartItems.length === 0}
            onClick={() => {
              closeCart();
              router.push("/checkout");
            }}
            className="w-full"
          >
            CHECKOUT
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
