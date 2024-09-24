"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/buttons";
import ComponentType from "./component-type";

export function UserNavbar() {
  const pathname = usePathname();

  return (
    <nav className="flex w-full max-w-[600px] flex-wrap-reverse items-center justify-between gap-4 rounded-xl bg-card p-4 shadow-sm md:gap-20">
      <div className="flex flex-wrap gap-2">
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
