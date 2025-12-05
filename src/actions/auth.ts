"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const signUpWithEmailAndPasswordSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
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

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to sign up",
      email,
      name,
    };
  }

  redirect("/");
}

const signInWithEmailAndPasswordSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
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

  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    console.log("-------");
    console.log(response.user);

    if (!response.user)
      return {
        error: "Invalid email or password",
        email,
      };

    redirect("/");
  } catch {
    return {
      error: "Invalid email or password",
      email,
    };
  }
}

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/");
}
