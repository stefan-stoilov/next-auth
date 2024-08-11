"use server";
import { registerSchema, type RegisterSchemaType } from "@/schemas";

export async function register(values: RegisterSchemaType) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log(validatedFields.error);

    return { error: "Invalid fields!" };
  }

  return { success: "Register successful!" };
}
