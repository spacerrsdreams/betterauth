"use client";

import { useSearchParams } from "next/navigation";
import { Background } from "./background";
import { RequestPasswordResetForm } from "./request-password-reset";
import { ResetPasswordForm } from "./reset-password-form";

export function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");

  return (
    <>
      <Background />
      {token ? (
        <ResetPasswordForm
          token={token}
          initialError={error === "INVALID_TOKEN" ? error : null}
        />
      ) : (
        <RequestPasswordResetForm />
      )}
    </>
  );
}
