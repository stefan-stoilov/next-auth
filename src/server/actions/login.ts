"use server";
import { loginSchema, type LoginSchemaType } from "@/schemas";
// import { db } from "@/server/db";
import { signIn } from "@/auth";
import { getUserByEmail, sendVerificationEmail, generateVerificationToken } from "@/server/lib";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export async function login(values: LoginSchemaType) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, password } = validatedFields.data;

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
