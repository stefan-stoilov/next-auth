"use client";
import { FaUser } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUserSession } from "@/hooks";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@/components/auth/buttons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const UserButton = () => {
  const user = useUserSession();
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image ?? ""} />
          <AvatarFallback className="bg-gradient">
            <FaUser className="text-foreground" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex w-40 flex-col gap-2 px-3 py-4" align="end">
        <DropdownMenuItem asChild>
          <Button asChild variant={"link"} className="cursor-pointer">
            {pathname === "/" ? <Link href="settings/">Settings</Link> : <Link href="/">Home</Link>}
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
