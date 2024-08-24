ALTER TABLE "user" RENAME COLUMN "testBoolean" TO "isTwoFactorEnabled";--> statement-breakpoint
ALTER TABLE "twoFactorConfirmation" DROP COLUMN IF EXISTS "isTwoFactorEnabled";