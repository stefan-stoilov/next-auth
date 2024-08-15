// Drizzle ORM Adapter - https://authjs.dev/getting-started/adapters/drizzle

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/server/db";
import { env } from "@/env";

import bcrypt from "bcryptjs";
import { loginSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/server/lib/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async signIn({ user }) {
      if (!user.id) return false;

      const existingUser = await getUserById(user.id);

      if (existingUser) {
        // Check if user has verified email
        // if (!existingUser.emailVerified) return false;

        return true;
      }

      return false;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
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
  // pages: {
  //   signIn: "/sign-in",
  //   signOut: "/",
  // },
});
