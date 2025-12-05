import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN as string,
});

export const signInWithGoogle = async () => {
  return await authClient.signIn.social({
    provider: "google",
  });
};

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return await authClient.signIn.email({
    email,
    password,
  });
};
