"use client";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaType } from "@/schemas";
import { login } from "@/server/actions/login";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError, FormSuccess } from "@/components/auth/form-status";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import Link from "next/link";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [validation, setValidation] = useState<{
    status: "awaiting" | "error" | "success";
    message: string;
  }>({
    status: "awaiting",
    message: "",
  });
  const [showTwoFactorInput, setShowTwoFactorInput] = useState(false);

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with another provider!" : "";

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  function onSubmit(data: LoginSchemaType) {
    startTransition(async () => {
      try {
        const res = await login(data);

        if (res?.error) {
          setValidation({
            status: "error",
            message: res.error,
          });
        }

        if (res?.success) {
          form.reset();
          setValidation({
            status: "success",
            message: res.success,
          });
        }

        if (res?.twoFactorAuthentication) {
          setShowTwoFactorInput(true);
        }
      } catch (error) {
        setValidation({ status: "error", message: "An error occurred. Please try again later." });
      }
    });
  }

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/sign-up"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {!showTwoFactorInput && (
              <>
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} type="email" placeholder="your.email@example.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} type="password" placeholder="******" />
                      </FormControl>
                      <Button className="px-0 font-normal" size="sm" variant="link" asChild>
                        <Link href="/reset-password">Forgot Password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {showTwoFactorInput && (
              <FormField
                control={form.control}
                name="twoFactorToken"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col items-center gap-3">
                    <FormLabel>Confirmation Code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} pushPasswordManagerStrategy="none" {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          {validation.status === "error" || (urlError && <FormError message={validation.message || urlError} />)}
          {validation.status === "success" && !urlError && <FormSuccess message={validation.message} />}

          <Button disabled={isPending} type="submit" className="w-full">
            {showTwoFactorInput ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default LoginForm;
