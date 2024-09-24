"use client";
import { useState, useTransition } from "react";
import { useUserSession } from "@/hooks";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSettingsSchema, type UserSettingsSchemaType } from "@/schemas";
import { updateUserSettings } from "@/server/actions/user-settings";

import { FormSuccess, FormError } from "@/components/auth/form-status";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Form, FormField, FormControl, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

function Page() {
  const user = useUserSession();
  const { update } = useSession();
  const [validation, setValidation] = useState<{
    status: "awaiting" | "error" | "success";
    message: string;
  }>({
    status: "awaiting",
    message: "",
  });
  const [isPending, startTransition] = useTransition();

  const form = useForm<UserSettingsSchemaType>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: user?.name ?? undefined,
      email: user?.email ?? undefined,
      role: user?.role ?? undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled ?? undefined,
    },
  });

  const onSubmit = async (data: UserSettingsSchemaType) => {
    startTransition(async () => {
      try {
        const res = await updateUserSettings(data);

        if (res.error) {
          setValidation({
            status: "error",
            message: res.error,
          });
          toast.error(res.error);
        }

        if (res.success) {
          update();
          setValidation({
            status: "success",
            message: res.success,
          });
          toast.success("Settings updated successfully.");
        }
      } catch (error) {
        setValidation({ status: "error", message: "An error occurred. Please try again later." });
      }
    });
  };

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John Doe" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {user?.isOAuth === false && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="john.doe@example.com" type="email" disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="******" type="password" disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="******" type="password" disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"admin"}>Admin</SelectItem>
                        <SelectItem value={"user"}>User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {user?.isOAuth === false && (
                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>Enable two factor authentication for your account</FormDescription>
                      </div>
                      <FormControl>
                        <Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>

            {validation.status === "error" && <FormError message={validation.message} />}
            {validation.status === "success" && <FormSuccess message={validation.message} />}
            <Button disabled={isPending} type="submit">
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default Page;
