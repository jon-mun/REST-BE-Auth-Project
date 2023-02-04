import { z } from "zod";

export const userSignUpSchema = z
  .object({
    username: z.string(),
    email: z.string().email().optional(),
    password: z.string(),
  })
  .strict();

export const userUpdateSchema = z
  .object({
    username: z.string().optional(),
    email: z.string().email().optional(),
  })
  .strict();
