"use client";
import type { PropsWithChildren } from "react";
import type { Session } from "next-auth";
import { useUserSession } from "@/hooks";
import { FormError } from "@/components/auth/form-status";

type RoleAccessProps = {
  role: Session["user"]["role"];
} & PropsWithChildren;

export function RoleAccess({ role, children }: RoleAccessProps) {
  const user = useUserSession();

  if (!user || user.role !== role) return <FormError message="Access to content denied." />;

  return <>{children}</>;
}

export default RoleAccess;
