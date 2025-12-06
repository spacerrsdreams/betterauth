"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "@/lib/auth/auth-client";

import { useForm } from "@tanstack/react-form";
import { signInWithEmailAndPasswordSchema } from "@/lib/auth/auth.schema";
import Link from "next/link";

interface SignInFormProps {
  onSignUp: () => void;
}

export function SignInForm({ onSignUp }: SignInFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onSubmit: signInWithEmailAndPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      signInWithEmailAndPassword({
        ...value,
        callbackURL: `${process.env.NEXT_PUBLIC_DOMAIN}`,
      })
        .then((data) => {
          if (data.error) {
            setError(data.error?.code ?? "Unknown error");
          }
        })
        .catch((data) => {
          setError(data.error?.code ?? "Unknown error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  // Sync username field with email for password manager accessibility
  useEffect(() => {
    if (usernameInputRef.current) {
      usernameInputRef.current.value = form.state.values.email;
    }
  }, [form.state.values.email]);

  const handleSignInWithGoogle = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch {
      setGoogleLoading(false);
    } finally {
      setGoogleLoading(false);
    }
  };

  const generateErrorMessage = (error: string) => {
    switch (error) {
      case "INVALID_EMAIL_OR_PASSWORD":
        return "Invalid email or password";
      default:
        return "An error occurred, please try again";
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
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
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Acme Inc account
                </p>
                {error && (
                  <p className="text-red-500">{generateErrorMessage(error)}</p>
                )}
              </div>
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
                          if (error) setError(null);
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
              {/* Hidden username field for password manager accessibility */}
              <input
                ref={usernameInputRef}
                type="text"
                name="username"
                autoComplete="username"
                value={form.state.values.email}
                tabIndex={-1}
                aria-hidden="true"
                className="sr-only"
                readOnly
              />
              <form.Field name="password">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <div className="flex items-center">
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <Link
                          href="/reset-password"
                          className="ml-auto underline-offset-2 text-xs hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                        autoComplete="current-password"
                        required
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                          if (error) setError(null);
                        }}
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
                  disabled={isLoading || googleLoading}
                >
                  Login
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field className="grid grid-cols-1 gap-4">
                <Button
                  variant="outline"
                  type="button"
                  isLoading={googleLoading}
                  disabled={isLoading || googleLoading}
                  onClick={handleSignInWithGoogle}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Login with Google</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <Button variant="link" size="sm" onClick={onSignUp}>
                  Sign up
                </Button>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
