"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

// RHF + Zod
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import PhoneSelect from "../ui/phone-input";
import { cn } from "@/lib/utils";
import { isValidPhoneNumber } from "react-phone-number-input";

// ✅ Schema
const signupSchema = z
  .object({
    fullname: z.string().min(2, "Full name is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    mobile_number: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    agreedToTerms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.agreedToTerms === true, {
    message: "You must accept terms",
    path: ["agreedToTerms"],
  })
  .superRefine((data, ctx) => {
    if (!isValidPhoneNumber(data.mobile_number || "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["mobile_number"],
        message: "Invalid phone number",
      });
    }
  });

export default function SignupForm({ callback, isLoginDetails = true }) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // ✅ RHF
  const {
    register,
    handleSubmit,
    control,
    setError, // 🔥 for backend errors
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      mobile_number: "",
      password: "",
      confirmPassword: "",
      agreedToTerms: false,
    },
  });

  // ✅ Submit
  const onSubmit = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            fullname: formData.fullname,
            email: formData.email,
            mobile_number: formData.mobile_number,
            password: formData.password,
            confirm_password: formData.confirmPassword,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || data.status === false) {
        const message = data?.message || "Something went wrong";
        toast.error(message);

        if (data?.field) {
          // backend-driven, reliable
          setError(data.field, { type: "server", message });
        } else {
          // fallback: string matching
          if (message.toLowerCase().includes("username")) {
            setError("username", { type: "server", message });
          }
          if (message.toLowerCase().includes("email")) {
            setError("email", { type: "server", message });
          }
        }
        return;
      }

      // ✅ Success
      toast.success("Signup successful!");
      callback?.();
    } catch (err) {
      console.error("Catch Error 👉", err);
      toast.error("Failed to register. Try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Full Name */}
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input {...register("fullname")} className="h-11" />
          {errors.fullname && (
            <p className="text-sm text-red-600">{errors.fullname.message}</p>
          )}
        </div>

        {/* Username */}
        <div className="space-y-2">
          <Label>Username</Label>
          <Input {...register("username")} className="h-11" />
          {errors.username && (
            <p className="text-sm text-red-600">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" {...register("email")} className="h-11" />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Label>Mobile Number *</Label>
          <Controller
            control={control}
            name="mobile_number"
            render={({ field }) => (
              <PhoneSelect
                value={field.value}
                onChange={field.onChange}
                placeholder="Enter your mobile number"
                className={cn({
                  "border-destructive border": errors.mobile_number,
                })}
              />
            )}
          />
          {errors.mobile_number && (
            <p className="text-sm text-red-600">
              {errors.mobile_number.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label>Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="h-11 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label>Confirm Password</Label>
          <Input
            type="password"
            {...register("confirmPassword")}
            className="h-11"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-center space-x-2">
        <Controller
          name="agreedToTerms"
          control={control}
          render={({ field }) => (
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
        <Label className="text-sm">
          I agree to{" "}
          <Link href="/terms" className="text-primary/80">
            Terms
          </Link>{" "}
          &{" "}
          <Link href="/privacy" className="text-primary/80">
            Privacy
          </Link>
        </Label>
      </div>

      {errors.agreedToTerms && (
        <p className="text-sm text-red-600">{errors.agreedToTerms.message}</p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        className="w-full h-11 bg-primary/80 hover:bg-primary/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account..." : "Create Account"}
      </Button>

      {/* Login */}
      {isLoginDetails && (
        <Link href="/login" className="text-sm text-blue-600 hover:underline">
          Already have an account? Login
        </Link>
      )}
    </form>
  );
}
