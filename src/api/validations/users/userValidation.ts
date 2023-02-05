import { userUpdateSchema } from "./userSchema";
import e from "../../utils/Exceptions/index";

export function validateUserUpdate(body: Object) {
  const result = userUpdateSchema.safeParse(body);

  if (!result.success) {
    // TODO: Zod error handling
    throw new e.BadRequestError(result.error.message);
  }
  return result.data;
}

// TODO: Id Validation
