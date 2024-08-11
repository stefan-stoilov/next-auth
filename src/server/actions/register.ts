"use server";
import { registerSchema, type RegisterSchemaType } from "@/schemas";
import { getUserByEmail } from "@/server/lib/user";
import bcrypt from "bcrypt";

export async function register(values: RegisterSchemaType) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log(validatedFields.error);

    return { error: "Invalid fields!" };
  }

  const { name, email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return { success: "Register successful!" };
}
