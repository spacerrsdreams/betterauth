"use server";

import { resend } from "@/lib/resend";
import type {
  SendEmailVerificationEmailProps,
  SendResetPasswordEmailProps,
} from "@/actions/email/email.types";
import EmailVerificationEmailTemplate from "@/components/email/sign-up.template";
import PasswordResetEmailTemplate from "@/components/email/password-reset-template";

export async function sendEmailVerificationEmail({
  to,
  subject,
  url,
  firstName,
}: SendEmailVerificationEmailProps) {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    react: EmailVerificationEmailTemplate({ firstName, url }),
  });
}

export async function sendResetPasswordEmail({
  userFirstname,
  to,
  resetPasswordLink,
}: SendResetPasswordEmailProps) {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject: "Reset your password",
    react: PasswordResetEmailTemplate({ userFirstname, resetPasswordLink }),
  });
}
