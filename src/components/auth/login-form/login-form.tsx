"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaType } from "@/schemas";
import { login } from "@/server/actions/login";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError, FormSuccess } from "@/components/auth/form-status";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [validation, setValidation] = useState<{
    status: "awaiting" | "error" | "success";
    message: string;
  }>({
    status: "awaiting",
    message: "",
  });

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
      const res = await login(data);

      if (res.error) {
        setValidation({
          status: "error",
          message: res.error,
        });
      }
      if (res.success) {
        setValidation({
          status: "success",
          message: res.success,
        });
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {validation.status === "error" && <FormError message={validation.message} />}
          {validation.status === "success" && <FormSuccess message={validation.message} />}

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default LoginForm;
