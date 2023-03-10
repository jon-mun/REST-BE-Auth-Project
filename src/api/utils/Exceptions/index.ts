import { CustomError } from "./CustomError";
import { InternalServerError } from "./InternalServerError";
import { BadRequestError } from "./BadRequestError";
import { NotFoundError } from "./NotFoundError";
import { UnauthorizedError } from "./UnauthorizedError";

function isCustomError(error: unknown): error is CustomError {
  return error instanceof CustomError;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export default {
  CustomError,
  InternalServerError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  isCustomError,
  getErrorMessage,
};
