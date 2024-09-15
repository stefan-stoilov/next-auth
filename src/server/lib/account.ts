import { db } from "@/server/db";
import { accounts } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getAccountById(id: string) {
  const query = await db.select().from(accounts).where(eq(accounts.userId, id));

  const account = query[0];

  return account ? account : null;
}
