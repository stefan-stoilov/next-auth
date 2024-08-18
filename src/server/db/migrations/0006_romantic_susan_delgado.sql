CREATE TABLE IF NOT EXISTS "passwordResetToken" (
	"id" text PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"email" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "passwordResetToken_token_unique" UNIQUE("token"),
	CONSTRAINT "passwordResetToken_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "verificationToken" ADD PRIMARY KEY ("id");