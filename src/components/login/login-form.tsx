"use client";

import { useState } from "react";
import { SignInForm } from "@/components/login/sign-in";
import SignUpForm from "@/components/login/sign-up";

export function LoginForm() {
  const [currentStep, setCurrentStep] = useState<"sign-in" | "sign-up">(
    "sign-in"
  );

  return (
    <div className="w-full max-w-sm md:max-w-4xl z-10">
      {currentStep === "sign-in" && (
        <SignInForm onSignUp={() => setCurrentStep("sign-up")} />
      )}
      {currentStep === "sign-up" && (
        <SignUpForm onSignIn={() => setCurrentStep("sign-in")} />
      )}
    </div>
  );
}
