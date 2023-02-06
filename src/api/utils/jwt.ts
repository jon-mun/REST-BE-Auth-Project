import { sign } from "jsonwebtoken";
import { Types } from "mongoose";

interface User {
  _id: Types.ObjectId;
  username: string;
  password: string;
  tokenVersion: number;
  email?: string;
  role: string;
}

export function createAccessToken(user: User) {
  const { _id, role } = user;
  return sign({ userId: _id, role: role }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
}

export function createRefreshToken(user: User) {
  const { _id, role, tokenVersion } = user;
  return sign(
    { userId: _id, role: role, tokenVersion: tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
}
