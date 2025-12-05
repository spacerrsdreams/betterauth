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
import { ShipIllustration } from "@/components/illustrations/ship.illustration";
import { useState, useRef, useEffect } from "react";
import {
  signUpWithEmailAndPassword,
  signInWithGoogle,
} from "@/lib/auth/auth-client";

import { useForm } from "@tanstack/react-form";
import { signUpWithEmailAndPasswordSchema } from "@/lib/auth/auth.schema";
import { useRouter } from "next/navigation";

interface SignUpFormProps {
  onSignIn: () => void;
}

export default function SignUpForm({ onSignIn }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: signUpWithEmailAndPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      signUpWithEmailAndPassword(value.name, value.email, value.password)
        .then((data) => {
          if (data.error) {
            setError(data.error?.code ?? "Unknown error");

            return;
          }

          router.push("/");
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

  const handleSignUpWithGoogle = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle({
        callbackURL: `${process.env.NEXT_PUBLIC_DOMAIN}`,
      });
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
      case "EMAIL_ALREADY_EXISTS":
        return "An account with this email already exists";
      case "PASSWORD_TOO_SHORT":
        return "Password must be at least 7 characters";
      default:
        return "An error occurred, please try again";
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2 md:items-stretch">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="p-4 md:p-6"
          >
            <FieldGroup className="gap-4">
              <div className="flex flex-col items-center gap-1.5 text-center mb-1">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-muted-foreground text-balance text-sm">
                  Sign up for your Acme Inc account
                </p>
                {error && (
                  <p className="text-red-500 text-sm">
                    {generateErrorMessage(error)}
                  </p>
                )}
              </div>
              <form.Field name="name">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
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
                        placeholder="John Doe"
                        autoComplete="name"
                        required
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
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
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                          if (error) setError(null);
                        }}
                        aria-invalid={isInvalid}
                        autoComplete="new-password"
                        required
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
                          if (error) setError(null);
                        }}
                        aria-invalid={isInvalid}
                        autoComplete="new-password"
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
                  disabled={isLoading || googleLoading}
                >
                  Sign up
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card my-2">
                Or continue with
              </FieldSeparator>
              <Field className="grid grid-cols-1 gap-4">
                <Button
                  variant="outline"
                  type="button"
                  isLoading={googleLoading}
                  disabled={isLoading || googleLoading}
                  onClick={handleSignUpWithGoogle}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Sign up with Google</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Already have an account?{" "}
                <Button variant="link" size="sm" onClick={onSignIn}>
                  Sign in
                </Button>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden md:block h-full bg-white">
            <ShipIllustration className="absolute inset-0 h-full w-full dark:brightness-[0.2] dark:grayscale" />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-4 text-center text-xs">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
