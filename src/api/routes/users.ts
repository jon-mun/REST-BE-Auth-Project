import { Router } from "express";
import {
  addUser,
  deleteUser,
  getManyUser,
  getUser,
  updateUser,
} from "../controllers/userController";

const router = Router();

router.route("/").get(getManyUser).post(addUser);

router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

export default router;
