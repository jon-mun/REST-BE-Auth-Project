import { CustomError } from "./CustomError";

export class InternalServerError extends CustomError {
  constructor(message: string) {
    super(message, 500);
    this.message = message;
    this.name = "Internal Server Error";
  }
}
