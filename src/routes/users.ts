import { Router } from "express";
import { test } from "../controllers/users";

const router = Router();

router.get("/", test);

export default router;
