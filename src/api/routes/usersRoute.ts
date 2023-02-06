import { Router } from "express";
import {
  deleteUser,
  getManyUser,
  getUser,
  updateUser,
} from "../controllers/userController";
import { isUserAuth } from "../middlewares/authMiddleware";

const router = Router();

router.route("/").get(getManyUser);

router
  .route("/:userId")
  .get(getUser)
  .put(isUserAuth, updateUser)
  .delete(deleteUser);

export default router;
