"use client";

import { RoleAccess } from "@/components/auth/user";
import { FormSuccess } from "@/components/auth/form-status";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

function Page() {
  const checkPermissions = async () => {
    const res = await fetch("/api/admin");
    if (res.ok) {
      toast.success("Allowed API Route!");
    } else {
      toast.error("Forbidden API Route!");
    }
  };

  return (
    <>
      <Card className="w-full max-w-[600px]">
        <CardHeader>
          <p className="text-center text-2xl font-semibold">Admin Panel</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <RoleAccess role={"admin"}>
            <FormSuccess message="Access to content granted!" />
          </RoleAccess>
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
            <p className="text-sm font-medium">Admin-only API Route</p>
            <Button onClick={checkPermissions}>Click to test</Button>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </>
  );
}

export default Page;
