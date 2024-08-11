import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: string) {
  const query = await db.select().from(users).where(eq(users.email, email));

  const user = query[0];

  return user ? user : null;
}
