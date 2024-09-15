"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function ComponentType() {
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={pathname === "/server" || pathname === "/client" ? "secondary" : "outline"}>
          Component Type
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex w-36 flex-col gap-2 px-3 py-4">
        <DropdownMenuItem asChild>
          <Button asChild variant={pathname === "/server" ? "secondary" : "link"} className="cursor-pointer">
            <Link href={"/server"}>Server</Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button asChild variant={pathname === "/client" ? "secondary" : "link"} className="cursor-pointer">
            <Link href={"/client"}>Client</Link>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ComponentType;
