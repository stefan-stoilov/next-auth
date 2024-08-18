import { db } from "@/server/db";
import { passwordResetTokens } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getPasswordResetTokenByToken(token: string) {
  const query = await db.select().from(passwordResetTokens).where(eq(passwordResetTokens.token, token));

  const passwordResetToken = query[0];

  return passwordResetToken ? passwordResetToken : null;
}

export async function getPasswordResetTokenByEmail(email: string) {
  const query = await db.select().from(passwordResetTokens).where(eq(passwordResetTokens.email, email));

  const passwordResetToken = query[0];

  return passwordResetToken ? passwordResetToken : null;
}
