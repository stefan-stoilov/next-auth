"use server";
import { resetSchema, type ResetSchemaType } from "@/schemas";
import { generatePasswordResetToken, getUserByEmail, sendPasswordResetEmail } from "@/server/lib";

export async function reset(data: ResetSchemaType) {
  const validatedFields = resetSchema.safeParse(data);

  if (!validatedFields.success) return { error: "Invalid email!" };

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: "User not found!" };

  // Check if account was registered via provider.
  if (!existingUser.password) return { error: "Cannot change password if account was registered via OAuth provider!" };

  const passwordResetToken = await generatePasswordResetToken(email);
  if (!passwordResetToken) return { error: "Error something went wrong!" };

  await sendPasswordResetEmail(email, passwordResetToken.token);

  return { success: "Reset email sent!" };
}
