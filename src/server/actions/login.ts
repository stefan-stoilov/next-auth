"use server";
import { loginSchema, type LoginSchemaType } from "@/schemas";

export async function login(values: LoginSchemaType) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log(validatedFields.error);

    return { error: "Invalid fields!" };
  }

  return { success: "Login successful!" };
}
