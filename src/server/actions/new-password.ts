"use server";
import { db } from "@/server/db";
import { users, passwordResetTokens } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { newPasswordSchema, type NewPasswordSchemaType } from "@/schemas";
import { getPasswordResetTokenByToken, getUserByEmail } from "@/server/lib";
import bcrypt from "bcryptjs";

export async function newPassword(data: NewPasswordSchemaType, token?: string | null) {
  if (!token) return { error: "Missing token!" };

  const validatedFields = newPasswordSchema.safeParse(data);
  if (!validatedFields.success) return { error: "Invalid fields" };

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) return { error: "Invalid token" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token expired" };

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return { error: "User does not exist" };
  if (!existingUser.password) return { error: "Cannot change password if account was registered via OAuth provider!" };

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.update(users).set({ password: hashedPassword }).where(eq(users.id, existingUser.id));
    await db.delete(passwordResetTokens).where(eq(passwordResetTokens.id, existingToken.id));

    return { success: "Password updated successfully!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
}
