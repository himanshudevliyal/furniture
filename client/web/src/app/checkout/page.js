"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageSquare } from "lucide-react";

import { useCart } from "@/hooks/use-cart";
import { createProductInquiry } from "@/services/product-inquiry-service";
import { handleError } from "@/lib/handle-error-toast";
import config from "@/config";

// Matches the existing backend product-inquiry validation schema exactly.
const inquirySchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  company_name: z.string().optional().or(z.literal("")),
  email: z.string().email("Invalid email address"),
  contact_number: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit contact number"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  message: z.string().optional().or(z.literal("")),
});

// Shared input styling, matching the site's existing contact form conventions.
const fieldClass =
  "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/90 focus:border-transparent";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, subtotal, clearCart } = useCart();
  const hasPricing = cartItems.some((item) => item.price);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      full_name: "",
      company_name: "",
      email: "",
      contact_number: "",
      city: "",
      state: "",
      message: "",
    },
  });

  const inquiryMutation = useMutation({
    mutationFn: createProductInquiry,
    onSuccess: () => {
      // Only clear the cart AFTER a successful submission.
      clearCart();
      reset();
    },
    onError: (error) => handleError(error, "Failed to submit inquiry"),
  });

  const onSubmit = (formData) => {
    if (cartItems.length === 0) return;

    inquiryMutation.mutate({
      ...formData,
      products: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    });
  };

  // ---------------- Success state ----------------
  if (inquiryMutation.isSuccess) {
    return (
      <div className="section bg-gray-50 min-h-screen py-8 flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center shadow-sm border-gray-200 p-8">
          <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Inquiry submitted!
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Thanks for reaching out — our team will get back to you shortly.
          </p>
          <Button onClick={() => router.push("/")} className="w-full">
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="section bg-gray-50 min-h-screen py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FORM SECTION */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-2 space-y-6 order-2 lg:order-1"
          >
            <Card className="shadow-sm border-gray-200 p-4">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-xl text-gray-900">
                    Your Details
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      {...register("full_name")}
                      placeholder="Enter your full name"
                      className={fieldClass}
                    />
                    {errors.full_name && (
                      <p className="text-red-500 text-sm">
                        {errors.full_name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input
                      {...register("company_name")}
                      placeholder="Enter your company name"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      {...register("email")}
                      placeholder="Enter your email"
                      className={fieldClass}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Contact Number</Label>
                    <Input
                      {...register("contact_number")}
                      placeholder="10-digit mobile number"
                      className={fieldClass}
                    />
                    {errors.contact_number && (
                      <p className="text-red-500 text-sm">
                        {errors.contact_number.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input
                      {...register("city")}
                      placeholder="Enter your city"
                      className={fieldClass}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input
                      {...register("state")}
                      placeholder="Enter your state"
                      className={fieldClass}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Message</Label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder="Tell us anything else about your requirement..."
                    className={`${fieldClass} resize-none`}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-gray-200 p-4">
              <CardContent className="pt-6">
                {cartItems.length === 0 && (
                  <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-lg text-center text-sm font-medium mb-4">
                    Your cart is empty. Add products before submitting an
                    inquiry.
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={inquiryMutation.isPending || cartItems.length === 0}
                  className="w-full h-12 text-base font-semibold"
                >
                  {inquiryMutation.isPending
                    ? "Submitting..."
                    : "Submit Inquiry"}
                </Button>
              </CardContent>
            </Card>
          </form>

          {/* ORDER SUMMARY SECTION */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <Card className="shadow-sm border-gray-200 sticky top-4 p-4">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-xl text-gray-900">
                  Your Products
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-4 mb-6 max-h-70 overflow-y-auto">
                  {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                      Your cart is empty.
                    </p>
                  ) : (
                    cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0 border border-gray-200 rounded-md bg-gray-50 overflow-hidden">
                          <Image
                            src={`${config.file_base}/${item?.image ?? ""}`}
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
                          {item.price && (
                            <p className="text-sm font-semibold text-gray-900 mt-1">
                              ₹{(Number(item.price) * item.quantity).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {hasPricing && (
                  <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                    <div className="flex justify-between font-bold text-base text-gray-900">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
