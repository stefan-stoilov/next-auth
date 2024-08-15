"use client";
import { useTransition } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export function Social() {
  const [isPending, startTransition] = useTransition();

  function onProviderSignIn(provider: "github" | "google") {
    startTransition(async () => {
      await signIn(provider);
    });
  }

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button size="lg" className="w-full" variant="outline" disabled>
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        onClick={e => {
          e.preventDefault();
          onProviderSignIn("github");
        }}
        size="lg"
        className="w-full"
        variant="outline"
        disabled={isPending}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
}

export default Social;
