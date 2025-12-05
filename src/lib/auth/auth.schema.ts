import z from "zod";

export const signInWithEmailAndPasswordSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});
