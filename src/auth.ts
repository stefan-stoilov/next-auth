// Drizzle ORM Adapter - https://authjs.dev/getting-started/adapters/drizzle

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/server/db";
import { env } from "@/env";

import bcrypt from "bcryptjs";
import { loginSchema } from "@/schemas";
import { getUserByEmail } from "@/server/lib/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user?.password) {
            // There is either no user with this email,
            // or there is a user with the email using OAuth, therefore missing password in DB.
            // In either case, we should not authorize the user.
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    signOut: "/",
  },
});
