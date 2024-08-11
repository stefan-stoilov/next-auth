"use server";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { registerSchema, type RegisterSchemaType } from "@/schemas";
import { getUserByEmail } from "@/server/lib/user";
import bcrypt from "bcryptjs";

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

  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  });

  return { success: "Registered successfully!" };
}
