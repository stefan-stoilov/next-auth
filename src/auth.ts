// Drizzle ORM Adapter - https://authjs.dev/getting-started/adapters/drizzle

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/server/db/drizzle";
import { env } from "./env";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/sign-in",
    signOut: "/",
  },
});
