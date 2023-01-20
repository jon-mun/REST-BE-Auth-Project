import { Router } from "express";
import {
  addUser,
  deleteUser,
  getManyUser,
  getUserById,
  updateUser,
} from "../controllers/users";

const router = Router();

router.route("/").get(getManyUser).post(addUser);

router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

export default router;
