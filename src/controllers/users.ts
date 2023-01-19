import { Request, Response } from "express";
import User from "../models/User";

export function test(req: Request, res: Response) {
  const newUser = new User({
    username: "user2",
    password: "user2",
  });

  res.status(200).json({
    data: newUser,
  });
}
