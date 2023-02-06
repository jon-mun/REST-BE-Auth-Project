import { NextFunction, Request, Response } from "express";
import e from "../utils/Exceptions/index";
import { verify } from "jsonwebtoken";

export function isUserAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers["authorization"];

    if (!authorization)
      throw new e.BadRequestError("Authorization header not included!");

    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);

    res.locals.user = payload;

    return next();
  } catch (error: unknown) {
    res
      .status(e.isCustomError(error) ? error.code : 500)
      .json({ message: e.getErrorMessage(error) });
  }
}
