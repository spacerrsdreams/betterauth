"use server";

import { resend } from "@/lib/resend";
import type { SendEmailProps } from "@/actions/email/email.types";
import EmailVerificationEmailTemplate from "@/components/email/sign-up.template";

export async function sendEmail({
  to,
  subject,
  url,
  firstName,
}: SendEmailProps) {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    react: EmailVerificationEmailTemplate({ firstName, url }),
  });
}
