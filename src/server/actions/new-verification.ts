"use server";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { users, verificationTokens } from "@/server/db/schema";
import { getUserByEmail, getVerificationTokenByToken } from "@/server/lib";

export async function newVerification(token: string) {
  if (!token || typeof token !== "string") return { error: "Provide token!" };

  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasTokenExpired = new Date(existingToken.expires) < new Date();
  if (hasTokenExpired) return { error: "Token has expired!" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "User does not exist!" };

  try {
    await db.update(users).set({ emailVerified: new Date() }).where(eq(users.id, existingUser.id));
    await db.delete(verificationTokens).where(eq(verificationTokens.id, existingToken.id));

    return { success: "Email verified!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
}
