"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  LoginFormState,
  signInWithEmailAndPasswordSchema,
  signUpWithEmailAndPasswordSchema,
} from "@/actions/auth/auth.schemas";
import z from "zod";

export async function signUpWithEmailAndPassword(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
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

export async function signInWithEmailAndPassword(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
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
