import { getCurrentUser } from "@/lib";
import { User } from "@/components/auth/user";

async function Page() {
  const user = await getCurrentUser();

  return <User user={user} label="Server Component Data Access" />;
}

export default Page;
