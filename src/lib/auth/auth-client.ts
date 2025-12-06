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

export const sendVerificationEmail = async (props: {
  email: string;
  callbackURL?: string;
}) => {
  return await authClient.sendVerificationEmail({
    email: props.email,
    callbackURL: props.callbackURL || "/",
  });
};

export const requestPasswordReset = async (props: {
  email: string;
  redirectTo?: string;
}) => {
  return await authClient.requestPasswordReset({
    email: props.email,
    redirectTo: props.redirectTo,
  });
};

export const resetPassword = async (props: {
  newPassword: string;
  token: string;
}) => {
  return await authClient.resetPassword({
    newPassword: props.newPassword,
    token: props.token,
  });
};
