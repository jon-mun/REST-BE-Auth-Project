import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
    this.message = message;
    this.name = "Not Found";
  }
}
