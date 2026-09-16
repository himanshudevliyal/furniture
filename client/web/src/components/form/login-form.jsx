"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { getLocalCart } from "@/hooks/useAddToCart";
import Link from "next/link";

export default function LoginForm({ callback, isSignUpDetails = true }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // API request to handle login
  const loginReq = async (data) => {
    setIsLoading(true);

    try {
      const cart = getLocalCart();

      const resp = await axios.post("/api/auth/login", {
        body: JSON.stringify({
          ...data,
          role: "user",
          cart: cart?.map((c) => ({
            product_variant_id: c.product_variant_id,
            quantity: c.quantity,
          })),
        }),
      });

      toast.success("Login successful!");
      callback?.(resp.data?.user_data);
      return resp.data;
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    // setError("");
    await loginReq(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          {...register("username", {
            required: "username is required",
          })}
          className="h-11"
        />
        {errors.username && (
          <p className="text-sm text-red-600 font-medium">
            {errors.username.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        {/* <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary/80 hover:text-primary/200"
                    >
                      Forgot password?
                    </Link>
                  </div> */}
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
            })}
            className="h-11 pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-600 font-medium">
            {errors.password.message}
          </p>
        )}
      </div>

      {isSignUpDetails && (
        <Link
          href="/signup"
          className="text-sm text-blue-600 hover:underline  mb-2   block"
        >
          Don’t have an account? Sign up
        </Link>
      )}

      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

      <Button type="submit" className="btn w-full mb-2" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
