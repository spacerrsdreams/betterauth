"use client";

import { useState } from "react";
import { SignInForm } from "@/components/login/sign-in";
import SignUpForm from "@/components/login/sign-up";

export function LoginForm() {
  const [currentStep, setCurrentStep] = useState<"sign-in" | "sign-up">(
    "sign-in"
  );

  if (currentStep === "sign-in") {
    return <SignInForm onSignUp={() => setCurrentStep("sign-up")} />;
  }

  return <SignUpForm onSignIn={() => setCurrentStep("sign-in")} />;
}
