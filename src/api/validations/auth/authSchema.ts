import { z } from "zod";

export const registerUserSchema = z
  .object({
    username: z.string(),
    email: z.string().email().optional(),
    password: z.string(),
  })
  .strict();

export const loginUserSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .strict();

export const refreshTokenPayloadSchema = z.object({
  userId: z.string(),
  role: z.string(),
  iat: z.number(),
  exp: z.number(),
  tokenVersion: z.number(),
});
