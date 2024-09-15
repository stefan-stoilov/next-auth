/**
 * Created to fix TypeScript errors following NextAuth.js official guide.
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
import type { DefaultSession, DefaultJWT } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    id: string;
    user: { role: "admin" | "user"; isTwoFactorEnabled: boolean; isOAuth: boolean } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "admin" | "user";
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
  }
}
