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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/lib/auth/auth-client";
import { useForm } from "@tanstack/react-form";
import { resetPasswordSchema } from "@/lib/auth/auth.schema";

interface ResetPasswordFormProps {
  token: string;
  initialError?: string | null;
}

export function ResetPasswordForm({
  token,
  initialError,
}: ResetPasswordFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [resetError, setResetError] = useState<string | null>(
    initialError || null
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: resetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      setResetError(null);
      try {
        const { error } = await resetPassword({
          newPassword: value.newPassword,
          token,
        });

        if (error) {
          setResetError(error.code ?? "Unknown error");
        } else {
          setSuccessMessage(
            "Password reset successfully! Redirecting to login..."
          );
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        }
      } catch (err: unknown) {
        setResetError(
          (err as { error?: { code?: string } })?.error?.code ?? "Unknown error"
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  const generateErrorMessage = (error: string) => {
    switch (error) {
      case "INVALID_TOKEN":
        return "Invalid or expired token. Please request a new password reset link.";
      case "TOKEN_EXPIRED":
        return "This password reset link has expired. Please request a new one.";
      default:
        return "An error occurred, please try again";
    }
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
                  Enter your new password below
                </p>
                {resetError && (
                  <p className="text-red-500">
                    {generateErrorMessage(resetError)}
                  </p>
                )}
                {successMessage && (
                  <p className="text-green-500">{successMessage}</p>
                )}
              </div>
              <form.Field name="newPassword">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                          if (resetError) setResetError(null);
                        }}
                        aria-invalid={isInvalid}
                        autoComplete="new-password"
                        required
                        placeholder="Enter your new password"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
              <form.Field name="confirmPassword">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Confirm Password
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                          if (resetError) setResetError(null);
                        }}
                        aria-invalid={isInvalid}
                        autoComplete="new-password"
                        required
                        placeholder="Confirm your new password"
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
                  disabled={isLoading || !!successMessage}
                >
                  Reset Password
                </Button>
              </Field>
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
