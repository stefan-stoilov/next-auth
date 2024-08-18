import { Suspense } from "react";
import { NewPasswordForm } from "@/components/auth/new-password-form";

export default function Page() {
  return (
    <Suspense>
      <NewPasswordForm />
    </Suspense>
  );
}
