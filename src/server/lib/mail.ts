import { Resend } from "resend";
import { env } from "@/env";
import { AUTH_VERIFICATION } from "@/routes";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const confirmationLink = `http://localhost:3000${AUTH_VERIFICATION}?token=${token}`;

  const res = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmationLink}">here</a> to confirm your email</p>`,
  });

  return res.error;
}
