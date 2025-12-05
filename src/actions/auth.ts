"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const MIN_PASSWORD_LENGTH = 6;
const MinPasswordLengthError = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;

const signUpWithEmailAndPasswordSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(MIN_PASSWORD_LENGTH, MinPasswordLengthError),
    confirmPassword: z
      .string()
      .min(MIN_PASSWORD_LENGTH, MinPasswordLengthError),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormState = {
  error?: string;
  email?: string;
  name?: string;
  fieldErrors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
} | null;

export async function signUpWithEmailAndPassword(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const result = signUpWithEmailAndPasswordSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });

  if (!result.success) {
    return {
      email,
      name,
      fieldErrors: z.flattenError(result.error).fieldErrors,
    };
  }

  await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });

  redirect("/");
}

const signInWithEmailAndPasswordSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export async function signInWithEmailAndPassword(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = signInWithEmailAndPasswordSchema.safeParse({
    email,
    password,
  });

  if (!result.success) {
    return {
      fieldErrors: z.flattenError(result.error).fieldErrors,
    };
  }

  const response = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (!response.user) {
    return {
      error: "Invalid email or password",
      email,
    };
  }

  redirect("/");
}

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/");
}
