"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  LoginFormState,
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

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/");
}
