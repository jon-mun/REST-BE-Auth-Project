import { Router } from "express";
import usersRoute from "./usersRoute";
import authRoute from "./authRoute";

const router = Router();

router.get("/", (req, res) => {
  res.json("Hello world!");
});

router.use("/api/users", usersRoute);
router.use("/api/auth", authRoute);

export default router;
