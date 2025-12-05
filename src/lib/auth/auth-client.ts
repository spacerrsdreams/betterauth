import { createAuthClient } from "better-auth/react";
import { SignInWithEmailAndPasswordProps } from "./auth.schema";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN as string,
});

export const signInWithGoogle = async (props?: { callbackURL?: string }) => {
  return await authClient.signIn.social({
    provider: "google",
    ...(props ? props : {}),
  });
};

export const signInWithEmailAndPassword = async (
  props: SignInWithEmailAndPasswordProps
) => await authClient.signIn.email(props);

export const signUpWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  return await authClient.signUp.email({
    name,
    email,
    password,
  });
};
