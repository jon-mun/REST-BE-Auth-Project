import { Request, Response } from "express";
import {
  addNewUser,
  deleteUserById,
  getManyUsers,
  getUserById,
  updateUserById,
} from "../services/userService";
import e from "../utils/Exceptions/index";

export async function getManyUser(req: Request, res: Response) {
  try {
    const count = Number(req.query.count);

    const users = await getManyUsers(count);

    res.status(200).json({
      data: users,
    });
  } catch (error: unknown) {
    res
      .status(e.isCustomError(error) ? error.code : 500)
      .json({ message: e.getErrorMessage(error) });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const user = await getUserById(userId);

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res
      .status(e.isCustomError(error) ? error.code : 500)
      .json({ message: e.getErrorMessage(error) });
  }
}

export async function addUser(req: Request, res: Response) {
  try {
    const result = await addNewUser(req.body);

    res.status(201).json({
      data: result,
      message: "Successfully created a user!",
    });
  } catch (error) {
    res
      .status(e.isCustomError(error) ? error.code : 500)
      .json({ message: e.getErrorMessage(error) });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const result = await updateUserById(userId, req.body);

    res.status(200).json({
      message: "Updated user successfully!",
      data: result,
    });
  } catch (error) {
    res
      .status(e.isCustomError(error) ? error.code : 500)
      .json({ message: e.getErrorMessage(error) });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const result = await deleteUserById(userId);

    res.status(200).json({
      message: "Successfully delete user!",
      data: result,
    });
  } catch (error) {
    res
      .status(e.isCustomError(error) ? error.code : 500)
      .json({ message: e.getErrorMessage(error) });
  }
}
