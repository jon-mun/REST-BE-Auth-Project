import { Router } from "express";
import {
  deleteUser,
  getManyUser,
  getUser,
  updateUser,
} from "../controllers/userController";

const router = Router();

router.route("/").get(getManyUser);

router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

export default router;
