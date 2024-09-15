import { getCurrentUser } from "@/lib";
import { User } from "@/components/auth/user";

async function Page() {
  const user = await getCurrentUser();

  return user ? <User user={user} label="Server Component Data Access" /> : null;
}

export default Page;
