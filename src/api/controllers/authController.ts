import { Request, Response } from "express";
import {
  registerUser,
  revokeRefreshToken,
  sendRefreshToken,
  validateUserCredentials,
  verifyRefreshToken,
} from "../services/authService";
import e from "../utils/Exceptions/index";
import { createAccessToken, createRefreshToken } from "../utils/jwt";

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
    const user = await validateUserCredentials(req.body);

    sendRefreshToken(res, createRefreshToken(user));

    res.status(200).json({
      data: { accessToken: createAccessToken(user) },
    });
  } catch (error: unknown) {
    res
      .status(e.isCustomError(error) ? error.code : 500)
      .json({ message: e.getErrorMessage(error) });
  }
}

export async function refreshToken(req: Request, res: Response) {
  try {
    const user = await verifyRefreshToken(req);

    sendRefreshToken(res, createRefreshToken(user));

    res.status(200).json({
      data: { accessToken: createAccessToken(user) },
    });
  } catch (error: unknown) {
    res
      .status(e.isCustomError(error) ? error.code : 500)
      .json({ message: e.getErrorMessage(error) });
  }
}

export async function revokeUserRefreshToken(req: Request, res: Response) {
  try {
    const { userId } = req.body;

    await revokeRefreshToken(userId);

    res.status(200).json({
      message: "Successfully revoke refresh token",
    });
  } catch (error: unknown) {
    res
      .status(e.isCustomError(error) ? error.code : 500)
      .json({ message: e.getErrorMessage(error) });
  }
}
