import { z } from "zod";

export const userUpdateSchema = z
  .object({
    username: z.string().optional(),
    email: z.string().email().optional(),
  })
  .strict();
