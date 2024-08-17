import { Suspense } from "react";
import { VerificationForm } from "@/components/auth/verification-form";

export default function Page() {
  return (
    <Suspense>
      <VerificationForm />
    </Suspense>
  );
}
