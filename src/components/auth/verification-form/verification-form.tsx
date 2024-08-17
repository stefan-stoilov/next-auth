"use client";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError, FormSuccess } from "@/components/auth/form-status";
import { BeatLoader } from "react-spinners";
import { newVerification } from "@/server/actions/new-verification";

export function VerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [validation, setValidation] = useState<{
    status: "awaiting" | "error" | "success";
    message: string;
  }>({
    status: "awaiting",
    message: "",
  });

  const onSubmit = useCallback(() => {
    if (!token) {
      setValidation({
        status: "error",
        message: "Missing token!",
      });
      return;
    }

    newVerification(token)
      .then(res => {
        if (res.error) {
          setValidation({
            status: "error",
            message: res.error,
          });
        } else if (res.success) {
          setValidation({
            status: "success",
            message: res.success,
          });
          router.push("/sign-in");
        }
      })
      .catch(() => {
        setValidation({
          status: "error",
          message: "Something went wrong.",
        });
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper headerLabel="Confirming your verification" backButtonLabel="Back to sign in" backButtonHref="/sign-in">
      <div className="flex w-full items-center justify-center">
        {validation.status === "awaiting" && <BeatLoader />}
        {validation.status === "success" && <FormSuccess message={validation.message} />}
        {validation.status === "error" && <FormError message={validation.message} />}
      </div>
    </CardWrapper>
  );
}

export default VerificationForm;
