"use client";
import { User } from "@/components/auth/user";
import { useUserSession } from "@/hooks";

function Page() {
  const user = useUserSession();
  return <User user={user} label="Client Component Data Access" />;
}

export default Page;
