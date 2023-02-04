import { Router } from "express";
import usersRoute from "./users";

const router = Router();

router.use("/api/users", usersRoute);

export default router;
