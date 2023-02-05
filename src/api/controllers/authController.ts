import { Request, Response } from "express";
import { registerUser, validateUserCredentials } from "../services/authService";
import e from "../utils/Exceptions/index";

export async function register(req: Request, res: Response) {
  try {
    const result = await registerUser(req.body);

    res.status(201).json({
      data: result,
    });
  } catch (error: unknown) {
    res
      .status(e.isCustomError(error) ? error.code : 500)
      .json({ message: e.getErrorMessage(error) });
  }
}

export async function login(req: Request, res: Response) {
  try {
    await validateUserCredentials(req.body);

    // TODO: Create access and refresh jwt token

    res.status(201).json({
      data: "accessToken",
    });
  } catch (error: unknown) {
    res
      .status(e.isCustomError(error) ? error.code : 500)
      .json({ message: e.getErrorMessage(error) });
  }
}
