import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import User from "../models/User";
import e from "../utils/Exceptions/index";
import {
  validateLoginBody,
  validateRegisterUser,
  validateTokenPayload,
} from "../validations/auth/authValidation";
import { UnauthorizedError } from "../utils/Exceptions/UnauthorizedError";

export async function registerUser(body: Object) {
  const { username, password, email } = validateRegisterUser(body);

  const isDuplicate = await User.exists({ username: username });
  if (isDuplicate)
    throw new e.BadRequestError("Username has already been taken!");

  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS)
  );

  const result = await User.create({
    username: username,
    password: hashedPassword,
    email: email,
  });

  if (!result)
    throw new e.InternalServerError(
      "Failed to add new user! Please try again."
    );

  return result;
}

export async function validateUserCredentials(body: Object) {
  const { username, password } = validateLoginBody(body);

  const user = await User.findOne({ username });

  if (!user) throw new e.BadRequestError("User not found!");

  const result = await bcrypt.compare(password, user.password);

  if (!result) throw new e.UnauthorizedError("Invalid user credentials!");

  return user;
}

export function sendRefreshToken(res: Response, token: string) {
  res.cookie("jid", token, {
    httpOnly: true,
    path: "/api/auth/refresh_token",
    // TODO: add domain and path option
  });
}

export async function verifyRefreshToken(req: Request) {
  const token = req.cookies.jid;
  if (!token) throw new e.BadRequestError("Refresh token not included!");

  const payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);

  const { userId, tokenVersion } = validateTokenPayload(payload);
  const user = await User.findById(userId);
  if (!user) throw new e.BadRequestError("User not found!");

  if (user.tokenVersion !== tokenVersion)
    throw new UnauthorizedError("Invalid refresh token!");

  return user;
}

export async function revokeRefreshToken(userId: string) {
  const user = await User.findByIdAndUpdate(userId, {
    $inc: { tokenVersion: 1 },
  });

  if (!user) throw new e.BadRequestError("User not found!");
}
