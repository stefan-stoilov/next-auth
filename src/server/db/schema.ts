// Drizzle ORM Adapter - https://authjs.dev/getting-started/adapters/drizzle

import { relations } from "drizzle-orm";
import { boolean, timestamp, pgTable, text, primaryKey, integer, varchar, uuid, pgEnum } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const userRole = pgEnum("userRole", ["admin", "user"]);

export const users = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 255 }).unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: text("password"),
  image: text("image"),
  role: userRole("role").default("user"),
  isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false).notNull(),
});

export const userRelations = relations(users, ({ one }) => ({
  twoFactorConfirmation: one(twoFactorConfirmation, {
    fields: [users.id],
    references: [twoFactorConfirmation.userId],
  }),
}));

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  account => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable("verificationToken", {
  id: uuid("id").defaultRandom().primaryKey(),
  token: text("token").notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const passwordResetTokens = pgTable("passwordResetToken", {
  id: uuid("id").defaultRandom().primaryKey(),
  token: text("token").notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const twoFactorTokens = pgTable("twoFactorToken", {
  id: uuid("id").defaultRandom().primaryKey(),
  token: text("token").notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const twoFactorConfirmation = pgTable("twoFactorConfirmation", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  authenticator => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
);
