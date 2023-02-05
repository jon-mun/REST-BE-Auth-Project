import { Router } from "express";
import usersRoute from "./users";
import authRoute from "./auth";

const router = Router();

router.use("/api/users", usersRoute);
router.use("/api/auth", authRoute);

export default router;
