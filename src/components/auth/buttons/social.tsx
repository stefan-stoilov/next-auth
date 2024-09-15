"use client";
import { useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export function Social() {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  function onProviderSignIn(provider: "github") {
    startTransition(async () => {
      await signIn(provider, { callbackUrl: callbackUrl ?? DEFAULT_LOGIN_REDIRECT });
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
