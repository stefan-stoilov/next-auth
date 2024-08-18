"use client";
import { useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordSchema, type NewPasswordSchemaType } from "@/schemas";
import { newPassword } from "@/server/actions/new-password";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError, FormSuccess } from "@/components/auth/form-status";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [validation, setValidation] = useState<{
    status: "awaiting" | "error" | "success";
    message: string;
  }>({
    status: "awaiting",
    message: "",
  });

  const form = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  function onSubmit(data: NewPasswordSchemaType) {
    startTransition(async () => {
      try {
        const res = await newPassword(data, token);
        if (res?.error) {
          setValidation({
            status: "error",
            message: res.error,
          });
        } else if (res?.success) {
          setValidation({
            status: "success",
            message: res.success,
          });
          router.push("/sign-in");
        }
      } catch (error) {
        setValidation({ status: "error", message: "An error occurred. Please try again later." });
      }
    });
  }

  return (
    <CardWrapper headerLabel="Enter a new password" backButtonLabel="Back to sign in" backButtonHref="/sign-in">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {validation.status === "error" && <FormError message={validation.message} />}
          {validation.status === "success" && <FormSuccess message={validation.message} />}

          <Button disabled={isPending} type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default NewPasswordForm;
