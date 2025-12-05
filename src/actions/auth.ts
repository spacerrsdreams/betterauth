"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const signUpWithEmailAndPasswordSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormState = {
  error?: string;
  fieldErrors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
} | null;

export async function signUpWithEmailAndPassword(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = signUpWithEmailAndPasswordSchema.safeParse({
    name,
    email,
    password,
  });

  if (!result.success) {
    return {
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
    };
  }

  redirect("/");
}

const signInWithEmailAndPasswordSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export async function signInWithEmailAndPassword(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { success, error } = signInWithEmailAndPasswordSchema.safeParse({
    email,
    password,
  });

  if (!success) {
    return {
      error,
    };
  }

  await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  redirect("/");
}

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/");
}
