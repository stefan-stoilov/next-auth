import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/login-form";

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return <LoginForm />;
}
