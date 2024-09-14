import { db } from "@/server/db";
import { twoFactorConfirmation } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getTwoFactorConfirmationByUserId(userId: string) {
  const query = await db.select().from(twoFactorConfirmation).where(eq(twoFactorConfirmation.userId, userId));

  const existingConfirmation = query[0];

  return existingConfirmation ? existingConfirmation : null;
}
