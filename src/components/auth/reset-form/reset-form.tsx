"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetSchema, type ResetSchemaType } from "@/schemas";
import { reset } from "@/server/actions/reset";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError, FormSuccess } from "@/components/auth/form-status";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { env } from "@/env";
import { CredentialsDialog } from "@/components/auth/credentials-dialog";

export function ResetForm() {
  const [isPending, startTransition] = useTransition();
  const [validation, setValidation] = useState<{
    status: "awaiting" | "error" | "success";
    message: string;
  }>({
    status: "awaiting",
    message: "",
  });
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<ResetSchemaType>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const { handleSubmit, control } = form;

  function onSubmit(data: ResetSchemaType) {
    startTransition(async () => {
      if (env.NEXT_PUBLIC_IS_DEMO && window.location.hostname !== "localhost") {
        setOpenDialog(true);
        return;
      }

      try {
        const res = await reset(data);
        if (res?.error) {
          setValidation({
            status: "error",
            message: res.error,
          });
        } else {
          form.reset();
          setValidation({
            status: "success",
            message: res?.success ? res.success : "Success",
          });
        }
      } catch (error) {
        setValidation({ status: "error", message: "An error occurred. Please try again later." });
      }
    });
  }

  return (
    <>
      <CardWrapper headerLabel="Forgot password?" backButtonLabel="Back to sign in" backButtonHref="/sign-in">
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
            </div>

            {validation.status === "error" && <FormError message={validation.message} />}
            {validation.status === "success" && <FormSuccess message={validation.message} />}

            <Button disabled={isPending} type="submit" className="w-full">
              Send reset email
            </Button>
          </form>
        </Form>
      </CardWrapper>
      <CredentialsDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
}

export default ResetForm;
