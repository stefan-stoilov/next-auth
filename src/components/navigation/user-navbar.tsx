"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/buttons";
import ComponentType from "./component-type";

export function UserNavbar() {
  const pathname = usePathname();

  return (
    <nav className="flex w-full max-w-[600px] items-center justify-between gap-20 rounded-xl bg-card p-4 shadow-sm">
      <div className="flex gap-x-2">
        <ComponentType />
        <Button asChild variant={pathname === "/admin" ? "secondary" : "outline"}>
          <Link href="/admin">Admin</Link>
        </Button>
        <Button asChild variant={pathname === "/settings" ? "secondary" : "outline"}>
          <Link href="/settings">Settings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
}
