import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
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
