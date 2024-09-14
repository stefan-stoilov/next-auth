// Drizzle ORM Adapter - https://authjs.dev/getting-started/adapters/drizzle

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/server/db";
import { users, twoFactorConfirmation } from "@/server/db/schema";

import { env } from "@/env";

import bcrypt from "bcryptjs";
import { loginSchema } from "@/schemas";
import { getUserByEmail, getUserById, getTwoFactorConfirmationByUserId } from "@/server/lib";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    /**
     * @see https://next-auth.js.org/configuration/callbacks#sign-in-callback
     */
    async signIn({ user, account }) {
      if (!user.id) return false;

      if (account?.provider !== "credentials") return true; // Allow OAuth without email verification

      const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConf = await getTwoFactorConfirmationByUserId(existingUser.id);

        console.log({ twoFAconf: twoFactorConf });

        if (!twoFactorConf) return false;

        await db.delete(twoFactorConfirmation).where(eq(twoFactorConfirmation.userId, existingUser.id));
      }

      return true;
    },
    /**
     * @see https://next-auth.js.org/configuration/callbacks#jwt-callback
     */
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role ? existingUser.role : undefined;

      return token;
    },
    /**
     * @see https://next-auth.js.org/configuration/callbacks#session-callback
     */
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
    // async redirect({ baseUrl, url }) {
    //   // Allows callback URLs on the same origin
    //   if (new URL(url).origin === baseUrl) return url;

    //   return baseUrl;
    // },
  },
  events: {
    /**
     * @see https://next-auth.js.org/configuration/events#linkaccount
     */
    async linkAccount({ user }) {
      const { id } = user;

      if (id) {
        await db.update(users).set({ emailVerified: new Date() }).where(eq(users.id, id));
      }
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
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

          if (!user || !user.password) {
            // There is either no user with this email,
            // or there is a user with the email using OAuth, therefore missing password in DB.
            // In either case, we should not authorize the user.
            return null;
          }

          const doPasswordsMatch = await bcrypt.compare(password, user.password);

          if (doPasswordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  /**
   * @see https://next-auth.js.org/configuration/options#pages
   */
  pages: {
    signIn: "/sign-in",
    error: "/auth-error",
  },
});
