import { Request, Response } from "express";
import User from "../models/User";
import {
  InternalServerError,
  BadRequestError,
  NotFoundError,
  isCustomError,
  getErrorMessage,
} from "../utils/Exceptions/index";
import mongoose from "mongoose";

export async function getManyUser(req: Request, res: Response) {
  try {
    const users = await User.find();

    if (!users) throw new InternalServerError("Users not found!");

    res.status(200).json({
      data: users,
    });
  } catch (error: unknown) {
    res
      .status(isCustomError(error) ? error.code : 500)
      .json({ message: getErrorMessage(error) });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const user = await User.findById(new mongoose.Types.ObjectId(userId));

    if (!user) throw new NotFoundError("User not found!");

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res
      .status(isCustomError(error) ? error.code : 500)
      .json({ message: getErrorMessage(error) });
  }
}

export async function addUser(req: Request, res: Response) {
  try {
    const { username, password, email } = req.body;

    if (!(username || password))
      throw new BadRequestError("Both username and password required!");

    const user = await User.findOne({ username: username });
    if (user) throw new BadRequestError("Username has already been taken!");

    // TODO hash password

    const newUser = new User({
      username,
      password,
      email,
    });

    await newUser.save();

    const result = await User.findOne({ username: username });
    if (!result)
      throw new InternalServerError(
        "Failed to add new user! Please try again."
      );

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    res
      .status(isCustomError(error) ? error.code : 500)
      .json({ message: getErrorMessage(error) });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { username, password, email } = req.body;

    const user = await User.findById(userId);
    if (!user) throw new BadRequestError("User doesn't exist!");

    if (username && user?.username !== username) {
      const usernameTaken = await User.exists(username);
      if (usernameTaken)
        throw new BadRequestError("Username has already been taken!");
    }

    // TODO check other duplicate input

    const result = await User.findOneAndUpdate(
      { _id: userId },
      {
        username,
        password,
        email,
      }
    );

    if (!result) throw new InternalServerError("Failed to update user!");

    res.status(200).json({
      message: "Updated user successfully!",
    });
  } catch (error) {
    res
      .status(isCustomError(error) ? error.code : 500)
      .json({ message: getErrorMessage(error) });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const userExist = await User.exists({ _id: userId });
    if (!userExist) throw new BadRequestError("User doesn't exist!");

    const result = await User.findByIdAndDelete(userId);

    if (!result) throw new InternalServerError("Failed to delete user!");

    res.status(200).json({
      message: "Successfully delete user!",
    });
  } catch (error) {
    res
      .status(isCustomError(error) ? error.code : 500)
      .json({ message: getErrorMessage(error) });
  }
}
