"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { requestPasswordReset } from "@/lib/auth/auth-client";
import { useForm } from "@tanstack/react-form";
import { requestPasswordResetSchema } from "@/lib/auth/auth.schema";

export function RequestPasswordResetForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: requestPasswordResetSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      setRequestError(null);
      try {
        const redirectTo = `${process.env.NEXT_PUBLIC_DOMAIN}/reset-password`;
        const { error } = await requestPasswordReset({
          email: value.email,
          redirectTo,
        });

        if (error) {
          setRequestError(error.code ?? "Unknown error");
        } else {
          setEmailSent(true);
          setResendTimer(60); // 1 minute timer
        }
      } catch (err: unknown) {
        setRequestError(
          (err as { error?: { code?: string } })?.error?.code ?? "Unknown error"
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Timer countdown
  useEffect(() => {
    if (emailSent && resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [emailSent, resendTimer]);

  // Start timer when email is sent
  useEffect(() => {
    if (emailSent) {
      setResendTimer(60);
      setRequestError(null);
    }
  }, [emailSent]);

  const handleResend = async () => {
    if (resendTimer > 0 || resendLoading) return;

    setResendLoading(true);
    try {
      const redirectTo = `${process.env.NEXT_PUBLIC_DOMAIN}/reset-password`;
      const { error } = await requestPasswordReset({
        email: form.state.values.email,
        redirectTo,
      });

      if (error) {
        setRequestError(error.code ?? "Unknown error");
      } else {
        setResendTimer(60);
      }
    } catch (err: unknown) {
      setRequestError(
        (err as { error?: { code?: string } })?.error?.code ?? "Unknown error"
      );
    } finally {
      setResendLoading(false);
    }
  };

  const generateErrorMessage = (error: string) => {
    switch (error) {
      case "INVALID_EMAIL":
        return "Invalid email address";
      default:
        return "An error occurred, please try again";
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-sm z-10">
      <Card className="overflow-hidden p-0 w-full">
        <CardContent className="p-6 md:p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Reset your password</h1>
                <p className="text-muted-foreground text-balance">
                  {emailSent
                    ? "We've sent you a password reset link. Check your email."
                    : "Enter your email address and we will send you a link to reset your password"}
                </p>
                {requestError && (
                  <p className="text-red-500">
                    {generateErrorMessage(requestError)}
                  </p>
                )}
                {emailSent && (
                  <p className="text-green-500">
                    If you don&apos;t see the email, check your spam folder.
                  </p>
                )}
              </div>
              {!emailSent && (
                <>
                  <form.Field name="email">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => {
                              field.handleChange(e.target.value);
                              if (requestError) setRequestError(null);
                            }}
                            aria-invalid={isInvalid}
                            placeholder="m@example.com"
                            autoComplete="email"
                            required
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                  <Field>
                    <Button
                      type="submit"
                      isLoading={isLoading}
                      disabled={isLoading}
                    >
                      Send Reset Link
                    </Button>
                  </Field>
                </>
              )}
              {emailSent && (
                <Field>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResend}
                    isLoading={resendLoading}
                    disabled={resendTimer > 0 || resendLoading}
                  >
                    {resendTimer > 0
                      ? `Resend in ${formatTime(resendTimer)}`
                      : "Resend Email"}
                  </Button>
                </Field>
              )}
              <FieldDescription className="text-center">
                Remember your password?{" "}
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => router.push("/login")}
                >
                  Sign in
                </Button>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
