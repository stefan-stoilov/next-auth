import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: string) {
  const query = await db.select().from(users).where(eq(users.email, email));

  const user = query[0];

  return user ? user : null;
}

export async function getUserPasswordByEmail(email: string) {
  const query = await db.select({ password: users.password }).from(users).where(eq(users.email, email));

  const user = query[0];

  return user ? user.password : null;
}

export async function getUserById(id: string) {
  const query = await db.select().from(users).where(eq(users.id, id));

  const user = query[0];

  return user ? user : null;
}
