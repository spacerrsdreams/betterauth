export interface SendEmailVerificationEmailProps {
  to: string;
  subject: string;
  url: string;
  firstName?: string;
}

export interface SendResetPasswordEmailProps {
  userFirstname: string;
  to: string;
  resetPasswordLink: string;
}
