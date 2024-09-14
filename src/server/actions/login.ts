"use server";
import { loginSchema, type LoginSchemaType } from "@/schemas";
import { db } from "@/server/db";
import { twoFactorTokens, twoFactorConfirmation } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { signIn } from "@/auth";
import {
  getUserByEmail,
  sendVerificationEmail,
  generateVerificationToken,
  generateTwoFactorToken,
  send2FATokenEmail,
  getTwoFactorTokenByEmail,
  getTwoFactorConfirmationByUserId,
} from "@/server/lib";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export async function login(values: LoginSchemaType) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, password, twoFactorToken } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);

    if (!verificationToken) return { error: "Something went wrong!" };

    const error = await sendVerificationEmail(existingUser.email, verificationToken.token);

    return error ? { error: error.message } : { success: "Confirmation email sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (twoFactorToken) {
      const existingToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!existingToken || existingToken.token !== twoFactorToken) {
        return { error: "Invalid token!" };
      }

      const hasExpired = new Date(existingToken.expires) < new Date();
      if (hasExpired) return { error: "Token has expired!" };

      await db.delete(twoFactorTokens).where(eq(twoFactorTokens.id, existingToken.id));

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
      if (existingConfirmation) {
        await db.delete(twoFactorConfirmation).where(eq(twoFactorConfirmation.userId, existingUser.id));
      }

      await db.insert(twoFactorConfirmation).values({ userId: existingUser.id });
    } else {
      const twoFAtoken = await generateTwoFactorToken(existingUser.email);
      if (!twoFAtoken) return { error: "Something went wrong!" };
      await send2FATokenEmail(existingUser.email, twoFAtoken.token);

      return { twoFactorAuthentication: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      // redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.type === "CredentialsSignin" ? "Invalid credentials!" : "Something went wrong!" };
    }

    throw error;
  }
}
