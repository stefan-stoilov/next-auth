import { db } from "@/server/db";
import { verificationTokens } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getVerificationTokenByToken(token: string) {
  const query = await db.select().from(verificationTokens).where(eq(verificationTokens.token, token));

  const verificationToken = query[0];

  return verificationToken ? verificationToken : null;
}

export async function getVerificationTokenByEmail(email: string) {
  const query = await db.select().from(verificationTokens).where(eq(verificationTokens.email, email));

  const token = query[0];

  return token ? token : null;
}
