"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoginForm from "@/components/form/login-form";
import { useState } from "react";
import SignupForm from "@/components/form/signup-form";

export default function CheckoutLoginModal({
  open,
  onOpenChange,
  onLoginSuccess,
  form,
  setForm,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Sign In to Checkout</DialogTitle>
        </DialogHeader>
        {form === "login" ? (
          <div>
            <LoginForm callback={onLoginSuccess} isSignUpDetails={false} />

            <div>
              Dont&apos;t have an account?{" "}
              <span
                className="text-primary hover:underline"
                onClick={() => setForm("signup")}
              >
                Sign up
              </span>{" "}
            </div>
          </div>
        ) : form === "signup" ? (
          <div>
            <SignupForm callback={onLoginSuccess} isLoginDetails={false} />
            <div className="mt-4">
              Alreadyt have an account?{" "}
              <span
                className="text-primary hover:underline"
                onClick={() => setForm("login")}
              >
                Login
              </span>{" "}
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
