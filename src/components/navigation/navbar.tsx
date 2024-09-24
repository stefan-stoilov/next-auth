import { auth } from "@/auth";
import { SignOutButton } from "@/components/auth/buttons";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/buttons";
import Link from "next/link";

export async function Navbar() {
  const session = await auth();
  return (
    <nav className="fixed left-0 right-0 top-0 flex h-16 w-full items-center justify-between bg-background px-4 md:px-8">
      <Link
        href="/"
        className="text-gradient flex h-full items-center text-center text-xl font-semibold text-foreground"
      >
        Next Auth App
      </Link>
      {session?.user ? (
        <UserButton />
      ) : (
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      )}
    </nav>
  );
}

export default Navbar;
