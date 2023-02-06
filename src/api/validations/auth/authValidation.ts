import {
  loginUserSchema,
  registerUserSchema,
  refreshTokenPayloadSchema,
} from "./authSchema";
import e from "../../utils/Exceptions/index";

export function validateRegisterUser(body: Object) {
  const result = registerUserSchema.safeParse(body);

  if (!result.success) {
    // TODO: Zod error handling
    throw new e.BadRequestError(result.error.message);
  }
  return result.data;
}

export function validateLoginBody(body: Object) {
  const result = loginUserSchema.safeParse(body);

  if (!result.success) {
    // TODO: Zod error handling
    throw new e.BadRequestError(result.error.message);
  }
  return result.data;
}

export function validateTokenPayload(body: Object) {
  const result = refreshTokenPayloadSchema.safeParse(body);

  if (!result.success) {
    // TODO: Zod error handling
    throw new e.BadRequestError(result.error.message);
  }
  return result.data;
}
