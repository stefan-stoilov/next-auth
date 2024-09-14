import { db } from "@/server/db";
import { twoFactorTokens } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getTwoFactorTokenByToken(token: string) {
  const query = await db.select().from(twoFactorTokens).where(eq(twoFactorTokens.token, token));

  const existingToken = query[0];

  return existingToken ? existingToken : null;
}

export async function getTwoFactorTokenByEmail(email: string) {
  const query = await db.select().from(twoFactorTokens).where(eq(twoFactorTokens.email, email));

  const existingToken = query[0];

  return existingToken ? existingToken : null;
}
