import { betterAuth, User } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

import { prisma } from "@/lib/prisma";
import {
  sendEmailVerificationEmail,
  sendResetPasswordEmail,
} from "@/actions/email/email.actions";

export const auth = betterAuth({
  plugins: [nextCookies()],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  resetPassword: {
    enabled: true,
  },
  emailAndPassword: {
    requireEmailVerification: true,
    enabled: true,
    sendResetPassword: async ({ user, url }: { user: User; url: string }) => {
      void sendResetPasswordEmail({
        to: user.email,
        userFirstname: user.name,
        resetPasswordLink: url,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void sendEmailVerificationEmail({
        to: user.email,
        subject: "Verify your email address",
        url,
        firstName: user.name,
      });
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
