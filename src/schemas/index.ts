import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  twoFactorToken: z.optional(
    z.string().min(6, {
      message: "Code must be 6 characters.",
    }),
  ),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.string().email().max(255, { message: "Email must be less than 255 characters." }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(255, { message: "Name must be less than 255 characters." }),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const resetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export type ResetSchemaType = z.infer<typeof resetSchema>;

export const newPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export type NewPasswordSchemaType = z.infer<typeof newPasswordSchema>;
