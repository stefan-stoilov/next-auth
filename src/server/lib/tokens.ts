import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { verificationTokens } from "@/server/db/schema";
import { getVerificationTokenByEmail } from "@/server/lib";

export async function generateToken(email: string) {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // expires in 1h

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.delete(verificationTokens).where(eq(verificationTokens.id, existingToken.id));
  }

  const verificationToken = await db
    .insert(verificationTokens)
    .values({
      email,
      token,
      expires,
    })
    .returning({ token: verificationTokens.token });

  return verificationToken[0];
}
