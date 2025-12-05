import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN as string,
});

export const { signIn, signUp, useSession } = createAuthClient();
