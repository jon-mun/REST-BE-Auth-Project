export class CustomError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super();
    this.message = message;
    this.code = code;
  }

  static isError(error: unknown): error is CustomError {
    return error instanceof CustomError;
  }

  public getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return String(error);
  }
}
