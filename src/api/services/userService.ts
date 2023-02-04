import mongoose from "mongoose";
import User from "../models/User";
import e from "../utils/Exceptions/index";
import {
  validateUserSignUp,
  validateUserUpdate,
} from "../validations/users/userValidation";

export async function getManyUsers(count: number) {
  if (isNaN(count))
    throw new e.BadRequestError("Invalid query, expecting Number!");

  if (count >= 20) count = 20;

  const users = await User.find().limit(count);

  if (!users) throw new e.InternalServerError("Users not found!");

  return users;
}

export async function getUserById(userId: string) {
  const user = await User.findById(new mongoose.Types.ObjectId(userId));

  if (!user) throw new e.NotFoundError("User not found!");

  const { _id, username, email } = user;

  return {
    _id,
    username,
    email,
  };
}

export async function addNewUser(body: Object) {
  const { username, password, email } = validateUserSignUp(body);

  const user = await User.findOne({ username: username });
  if (user) throw new e.BadRequestError("Username has already been taken!");

  // TODO: hash password

  const result = await User.create({
    username,
    password,
    email,
  });

  if (!result)
    throw new e.InternalServerError(
      "Failed to add new user! Please try again."
    );

  return result;
}

export async function updateUserById(userId: string, body: Object) {
  const { username, email } = validateUserUpdate(body);

  const user = await User.findById(userId);
  if (!user) throw new e.BadRequestError("User doesn't exist!");

  if (username && user?.username !== username) {
    const usernameTaken = await User.exists({ username: username });
    if (usernameTaken)
      throw new e.BadRequestError("Username has already been taken!");
  }

  const result = await User.findOneAndUpdate(
    { _id: userId },
    {
      username,
      email,
    },
    { new: true }
  );

  if (!result) throw new e.InternalServerError("Failed to update user!");
  return result;
}

export async function deleteUserById(userId: string) {
  const userExist = await User.exists({ _id: userId });
  if (!userExist) throw new e.BadRequestError("User doesn't exist!");

  const result = await User.findByIdAndDelete(userId);

  if (!result) throw new e.InternalServerError("Failed to delete user!");

  return result;
}
