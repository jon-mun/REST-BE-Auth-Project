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
