"use server";
import { loginSchema } from "@/schemas";
// import { db } from "@/server/db";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/server/lib/user";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export async function login(values: unknown) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials!" };
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
