"use client";

import { signUpWithEmailAndPassword } from "@/actions/auth/auth.actions";
import { useActionState } from "react";

export default function AuthPage() {
  const [state, formAction, isPending] = useActionState(
    signUpWithEmailAndPassword,
    null
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <form action={formAction} className="flex flex-col gap-4">
        {state?.error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            {state.error}
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Name"
          disabled={isPending}
        />
        {state?.fieldErrors?.name && (
          <p className="text-red-600 text-sm">{state.fieldErrors.name}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          disabled={isPending}
        />
        {state?.fieldErrors?.email && (
          <p className="text-red-600 text-sm">{state.fieldErrors.email}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          disabled={isPending}
        />
        {state?.fieldErrors?.password && (
          <p className="text-red-600 text-sm">{state.fieldErrors.password}</p>
        )}

        <button
          className="bg-blue-500 rounded-md p-4 border shadow-sm"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
