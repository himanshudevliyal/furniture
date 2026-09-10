"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet, MapPin, Plus, Banknote } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "@/services/order-services";
import { toast } from "sonner";
import { handleError } from "@/lib/handle-error-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { getAddresses } from "@/services/address-services";
import Loader from "@/components/loader";
import { getCartItems } from "@/services/cart-services";
import AddressForm from "@/components/address-form";
import config from "@/config";

export const addressSchema = z.object({
  fullname: z.string().min(1, "fullname is required"),
  street: z.string().min(1, "Street is required"),
  house: z.string().min(1, "House Number is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postal_code: z.string().min(3, "Postal code is required"),
  phone: z.string().min(6).optional(),
});

export const orderItemSchema = z.object({
  item_type: z.enum(["book", "product"]),
  item_id: z.string().uuid({ message: "Invalid item_id" }),
  product_variant_id: z.string().uuid().optional(),
  quantity: z.number().int().positive({ message: "Quantity must be > 0" }),
});

export const createOrderSchema = z.object({
  shipping_address: addressSchema,
  billing_address: addressSchema,
  order_items: z
    .array(orderItemSchema)
    .min(1, "order_items must contain at least one item"),
  payment_method: z.enum(["payu", "cod"]).optional(),
  coupon_code: z.string().trim().optional(),
});

export default function CheckoutPage() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();
  const payuFormRef = useRef(null);

  const [selectedShippingAddressId, setSelectedShippingAddressId] =
    useState(null);
  const [selectedBillingAddressId, setSelectedBillingAddressId] =
    useState(null);
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [isAddressModal, setIsAddressModal] = useState(false);
  const [addressModalType, setAddressModalType] = useState("shipping");
  const [isCodConfirmOpen, setIsCodConfirmOpen] = useState(false);
  const [pendingPaymentMethod, setPendingPaymentMethod] = useState("payu");

  const { register, handleSubmit, formState, setValue, watch } = useForm({
    mode: "onChange",
    resolver: zodResolver(
      createOrderSchema.pick({ billing_address: true, shipping_address: true }),
    ),
    defaultValues: {
      shipping_address: {
        fullname: "",
        street: "",
        city: "",
        state: "",
        postal_code: "",
        phone: "",
        house: "",
      },
      billing_address: {
        fullname: "",
        street: "",
        city: "",
        state: "",
        postal_code: "",
        phone: "",
        house: "",
      },
    },
  });

  const { isValid, errors, isDirty } = formState;
  const {
    data: cartItems,
    isLoading: isCartLoading,
    isError: isCartError,
  } = useQuery({
    queryKey: ["cart-items"],
    queryFn: async () => {
      const { data } = await getCartItems();
      return data;
    },
    enabled: !!user,
  });

  const createMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: async (data) => {
      if (
        data?.order?.payment_method === "cod" ||
        pendingPaymentMethod === "cod"
      ) {
        toast.success("Order placed successfully with Cash on Delivery");
        router.push("/dashboard");
        return;
      }
      setTimeout(() => {
        if (payuFormRef.current) {
          payuFormRef.current.submit();
        }
      }, 100);
    },
    onError: (error) => {
      handleError(error);
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });

  // subtotal now comes from backend cart items response (product_price is authoritative)
  const subtotal = useMemo(() => {
    return (
      cartItems?.reduce(
        (sum, item) =>
          sum +
          Number(String(item.product_price).replace(/[^\d.-]/g, "")) *
            item.quantity,
        0,
      ) ?? 0
    );
  }, [cartItems]);

  const estimatedTaxes = subtotal * 0;
  const total = subtotal + estimatedTaxes;

  const placeOrder = (formData, paymentMethod) => {
    if (!user) {
      toast.error("Please login first to place an order");
      return;
    }

    if (cartItems?.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const order_items = cartItems?.map((item) => ({
      item_type: item.item_type,
      item_id: item.item_id,
      product_variant_id: item.product_variant_id,
      quantity: item.quantity,
    }));

    const order = {
      ...formData,
      order_items,
      payment_method: paymentMethod,
      billing_address: useSameAddress
        ? formData.shipping_address
        : formData.billing_address,
    };

    const toastId = toast.loading(
      paymentMethod === "cod"
        ? "Placing your order..."
        : "Placing your order...",
    );

    createMutation.mutate(order, {
      onSuccess: async (data) => {
        toast.dismiss(toastId);
      },
      onError: (error) => {
        toast.error(error?.message || "Failed to place order");
        toast.dismiss(toastId);
      },
    });
  };

  const onSubmit = (formData) => {
    setPendingPaymentMethod("payu");
    placeOrder(formData, "payu");
  };

  const onCodConfirmSubmit = handleSubmit((formData) => {
    setPendingPaymentMethod("cod");
    setIsCodConfirmOpen(false);
    placeOrder(formData, "cod");
  });

  const handleCodClick = handleSubmit(() => {
    // form is valid, open confirm dialog before actually placing the order
    setIsCodConfirmOpen(true);
  });

  const AddressCard = ({ address, isSelected, onSelect }) => (
    <div
      onClick={onSelect}
      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-md"
          : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{address.fullname}</p>
          <p className="text-sm text-gray-600 mt-1">{address.street}</p>
          <p className="text-sm text-gray-600">
            {address.house}, {address.city}, {address.state} —{" "}
            {address.postal_code}
          </p>
          {address.phone && (
            <p className="text-sm text-gray-600 mt-1">{address.phone}</p>
          )}
        </div>
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
            isSelected
              ? "border-blue-500 bg-blue-500"
              : "border-gray-300 bg-white"
          }`}
        >
          {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
        </div>
      </div>
    </div>
  );
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="section bg-gray-50 min-h-screen py-8"
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* FORM SECTION */}
            <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
              {/* Shipping Address Section */}
              <Card className="shadow-sm border-gray-200 p-4">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-xl text-gray-900">
                      Shipping Address
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  {isLoading ? (
                    <Loader />
                  ) : isError ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      {error?.message || "Failed to load addresses"}
                    </div>
                  ) : data?.addresses?.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p className="mb-4">No addresses found</p>
                      <Button
                        type="button"
                        variant="outline"
                        className="gap-2 bg-transparent"
                        onClick={() => setIsAddressModal(true)}
                      >
                        <Plus className="w-4 h-4" />
                        Add Your First Address
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                        {data.addresses.map((addr) => (
                          <AddressCard
                            key={addr.id}
                            address={addr.address}
                            isSelected={selectedShippingAddressId === addr.id}
                            onSelect={() => {
                              setSelectedShippingAddressId(addr.id);
                              setValue("shipping_address", addr.address);
                              if (useSameAddress) {
                                setSelectedBillingAddressId(addr.id);
                                setValue("billing_address", addr.address);
                              }
                            }}
                          />
                        ))}
                      </div>

                      {errors?.shipping_address && (
                        <p className="text-sm text-red-500 mt-4">
                          {errors.shipping_address.message ||
                            "Address is required"}
                        </p>
                      )}

                      <Button
                        type="button"
                        className=" btn mt-4"
                        onClick={() => {
                          setAddressModalType("shipping");
                          setIsAddressModal(true);
                        }}
                      >
                        <Plus className="w-4 h-4" />
                        Add New Address
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Billing Address Section */}
              {!useSameAddress && (
                <Card className="shadow-sm border-gray-200 p-4">
                  <CardHeader className="border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-purple-600" />
                      <CardTitle className="text-xl text-gray-900">
                        Billing Address
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <>
                        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                          {data.addresses.map((addr) => (
                            <AddressCard
                              key={addr.id}
                              address={addr.address}
                              isSelected={selectedBillingAddressId === addr.id}
                              onSelect={() => {
                                setSelectedBillingAddressId(addr.id);
                                setValue("billing_address", addr.address);
                              }}
                            />
                          ))}
                        </div>

                        {errors?.billing_address && (
                          <p className="text-sm text-red-500 mt-4">
                            {errors.billing_address.message ||
                              "Billing address is required"}
                          </p>
                        )}

                        <Button
                          type="button"
                          variant="outline"
                          className="w-full mt-4 gap-2 bg-transparent"
                          onClick={() => {
                            setAddressModalType("billing");
                            setIsAddressModal(true);
                          }}
                        >
                          <Plus className="w-4 h-4" />
                          Add New Address
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Use Same Address Toggle */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="same-address"
                    checked={useSameAddress}
                    onCheckedChange={(checked) => {
                      setUseSameAddress(checked);
                      if (checked && selectedShippingAddressId) {
                        const shippingAddr = data.addresses.find(
                          (a) => a.id === selectedShippingAddressId,
                        );
                        if (shippingAddr) {
                          setSelectedBillingAddressId(
                            selectedShippingAddressId,
                          );
                          setValue("billing_address", shippingAddr.address);
                        }
                      }
                    }}
                  />
                  <Label
                    htmlFor="same-address"
                    className="text-sm text-gray-700 cursor-pointer font-normal"
                  >
                    Use same address for billing
                  </Label>
                </div>
              </div>

              {/* Address Modal */}

              {/* Payment Section */}
              <Card className="shadow-sm border-gray-200 p-4">
                <CardContent className="pt-6 space-y-3">
                  {!user && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center text-sm font-medium">
                      Please log in first to place an order
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={
                      createMutation.isPending ||
                      !user ||
                      cartItems?.length === 0
                    }
                    className="w-full h-12 text-base font-semibold"
                  >
                    {createMutation.isPending && pendingPaymentMethod === "payu"
                      ? "Processing..."
                      : "Pay Now"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    disabled={
                      createMutation.isPending ||
                      !user ||
                      cartItems?.length === 0
                    }
                    className="w-full h-12 text-base font-semibold gap-2"
                    onClick={handleCodClick}
                  >
                    <Banknote className="w-4 h-4" />
                    {createMutation.isPending && pendingPaymentMethod === "cod"
                      ? "Processing..."
                      : "Cash on Delivery"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* ORDER SUMMARY SECTION */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <Card className="shadow-sm border-gray-200 sticky top-4 p-4">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-xl text-gray-900">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-4 mb-6 max-h-70 overflow-y-auto">
                    {cartItems?.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">
                        Your cart is empty.
                      </p>
                    ) : (
                      cartItems?.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
                        >
                          <div className="relative w-16 h-16 flex-shrink-0 border border-gray-200 rounded-md bg-gray-50 overflow-hidden">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_FILE_BASE}${item?.pictures?.[0]}`}
                              alt={item.title}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Qty: {item.quantity}
                            </p>
                            <p className="text-sm font-semibold text-gray-900 mt-1">
                              ₹
                              {(
                                Number(item.product_price) * item.quantity
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span className="font-medium">
                        ₹{subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span className="font-medium text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between font-bold border-t border-gray-200 pt-3 mt-3 text-base text-gray-900">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </form>

      {createMutation.isSuccess && pendingPaymentMethod === "payu" && (
        <form
          action={process.env.NEXT_PUBLIC_PAYU_URL}
          method="POST"
          ref={payuFormRef}
          style={{ display: "none" }}
        >
          <input type="hidden" name="key" value={createMutation.data.key} />
          <input
            type="hidden"
            name="txnid"
            value={createMutation.data.transaction_id}
          />
          <input
            type="hidden"
            name="amount"
            value={createMutation.data.order.amount}
          />
          <input
            type="hidden"
            name="productinfo"
            value={createMutation.data.order.order_no}
          />
          <input
            type="hidden"
            name="firstname"
            value={createMutation.data.order.first_name}
          />
          <input
            type="hidden"
            name="email"
            value={createMutation.data.order.email}
          />
          <input
            type="hidden"
            name="phone"
            value={createMutation.data.order.phone}
          />
          <input
            type="hidden"
            name="surl"
            value={`${config.api_base}/payments/success`}
          />
          <input
            type="hidden"
            name="furl"
            value={`${config.api_base}/payments/failure`}
          />
          <input type="hidden" name="hash" value={createMutation.data.hash} />
        </form>
      )}

      <Dialog open={isAddressModal} onOpenChange={setIsAddressModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              Add New {addressModalType === "shipping" ? "Shipping" : "Billing"}{" "}
              Address
            </DialogTitle>
          </DialogHeader>
          <AddressForm
            type="create"
            callback={() => setIsAddressModal(false)}
          />
        </DialogContent>
      </Dialog>

      {/* COD Confirm Dialog */}
      <Dialog open={isCodConfirmOpen} onOpenChange={setIsCodConfirmOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Cash on Delivery</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            You have selected Cash on Delivery. Please pay ₹{total.toFixed(2)}{" "}
            in cash when your order is delivered. Would you like to confirm your
            order?
          </p>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCodConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={onCodConfirmSubmit}
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? "Placing Order..." : "Confirm Order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
