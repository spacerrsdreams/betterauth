"use server";

import { resend } from "@/lib/resend";
import type { SendEmailProps } from "@/actions/email/email.types";

export async function sendEmail({ to, subject, text }: SendEmailProps) {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    html: text,
  });
}
