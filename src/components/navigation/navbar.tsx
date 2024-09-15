import { auth } from "@/auth";
import { SignOutButton } from "@/components/auth/buttons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function Navbar() {
  const session = await auth();
  return (
    <nav className="fixed left-0 right-0 top-0 flex h-16 w-full items-center justify-between bg-background px-8">
      <p className="text-foreground">Navbar</p>
      {session?.user ? (
        <div className="flex h-full items-center gap-4">
          <p className="text-foreground">{session?.user && <span>Welcome back {session.user.name}</span>}</p>
          <SignOutButton />
        </div>
      ) : (
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      )}
    </nav>
  );
}

export default Navbar;
