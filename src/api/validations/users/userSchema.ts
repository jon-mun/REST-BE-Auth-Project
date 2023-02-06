import { z } from "zod";

export const userSchema = z.object({
  _id: z.string(),
  username: z.string(),
  password: z.string(),
  tokenVersion: z.number(),
  email: z.string().email(),
  role: z.string(),
});

export const userUpdateSchema = z
  .object({
    username: z.string().optional(),
    email: z.string().email().optional(),
  })
  .strict();
