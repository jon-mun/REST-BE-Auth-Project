import { Router } from "express";
import {
  register,
  login,
  refreshToken,
  revokeUserRefreshToken,
} from "../controllers/authController";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh_token", refreshToken);
// TODO: add middleware revoke token
router.post("/refresh_token/revoke", revokeUserRefreshToken);

export default router;
