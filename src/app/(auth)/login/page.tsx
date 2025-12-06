import { Background } from "@/components/login/background";
import { LoginForm } from "@/components/login/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Background />
      <LoginForm />
    </div>
  );
}
