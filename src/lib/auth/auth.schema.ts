import z from "zod";

export const signInWithEmailAndPasswordSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

const MIN_PASSWORD_LENGTH = 7;
const MinPasswordLengthError = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;

export const signUpWithEmailAndPasswordSchema = z
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

export interface SignInWithEmailAndPasswordProps {
  email: string;
  password: string;
  callbackURL?: string;
}
