"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface VerificationSentProps {
  email: string;
  error: string | null;
  resendTimer: number;
  resendLoading: boolean;
  onResend: () => void;
  onBackToSignIn: () => void;
}

export function VerificationSent({
  email,
  error,
  resendTimer,
  resendLoading,
  onResend,
  onBackToSignIn,
}: VerificationSentProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Card className="overflow-hidden p-0 w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2">
                <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h1 className="text-xl font-bold">Check your email</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  We&apos;ve sent a verification link to{" "}
                  <span className="font-semibold text-foreground">{email}</span>
                </p>
                <p className="text-muted-foreground text-xs text-balance">
                  Please check your email and click the verification link to
                  complete your account setup.
                </p>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  onClick={onResend}
                  disabled={resendTimer > 0 || resendLoading}
                  isLoading={resendLoading}
                >
                  {resendTimer > 0
                    ? `Resend email (${resendTimer}s)`
                    : "Resend verification email"}
                </Button>
                <Button variant="link" size="sm" onClick={onBackToSignIn}>
                  Back to sign in
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
