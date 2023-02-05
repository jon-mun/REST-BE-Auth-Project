import bcrypt from "bcrypt";
import User from "../models/User";
import e from "../utils/Exceptions/index";
import {
  validateLoginBody,
  validateRegisterUser,
} from "../validations/auth/authValidation";

export async function registerUser(body: Object) {
  const { username, password, email } = validateRegisterUser(body);

  const user = await User.exists({ username: username });
  if (user) throw new e.BadRequestError("Username has already been taken!");

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

  return result;
}
