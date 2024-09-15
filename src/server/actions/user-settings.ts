"use server";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { userSettingsSchema, type UserSettingsSchemaType } from "@/schemas";
import { getCurrentUser } from "@/lib";
import { getUserById } from "@/server/lib";

export async function updateUserSettings(values: UserSettingsSchemaType) {
  const user = await getCurrentUser();

  if (typeof user === "undefined" || typeof user.id === "undefined") return { error: "Unauthorized" };

  const validatedFields = userSettingsSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields" };

  const data = validatedFields.data;

  const existingUser = await getUserById(user.id);
  if (!existingUser) return { error: "Unauthorized" };

  await db.update(users).set(data).where(eq(users.id, user.id));

  return { success: "User settings updated successfully" };
}
