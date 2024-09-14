import { Resend } from "resend";
import { env } from "@/env";
import { AUTH_VERIFICATION, AUTH_NEW_PASSWORD } from "@/routes";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const confirmationLink = `http://localhost:3000${AUTH_VERIFICATION}?token=${token}`;

  const res = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: /* html */ `<p>Click <a href="${confirmationLink}">here</a> to confirm your email</p>`,
  });

  return res.error;
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `http://localhost:3000${AUTH_NEW_PASSWORD}?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: /* html */ `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
}

export async function send2FATokenEmail(email: string, token: string) {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Two factor authentication code",
    html: /* html */ `<p>Your two factor authentication code: ${token}</p>`,
  });
}
