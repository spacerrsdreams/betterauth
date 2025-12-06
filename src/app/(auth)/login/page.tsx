import { Background } from "@/components/login/background";
import { LoginForm } from "@/components/login/login-form";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Background />
      <LoginForm />
    </div>
  );
}
