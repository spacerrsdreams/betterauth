import { SignOutButton } from "@/components/login/sign-out-button";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="h-screen w-screen flex-col flex gap-8 items-center justify-center">
      User Id : {session.user.id}
      <SignOutButton />
    </div>
  );
}
