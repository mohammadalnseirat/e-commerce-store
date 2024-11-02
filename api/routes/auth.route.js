import express from "express";
import {
  getProfile,
  logOutUser,
  refreshToken,
  signInUser,
  signUpUser,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/sign-up", signUpUser);
router.post("/sign-in", signInUser);
router.post("/log-out", logOutUser);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectedRoute, getProfile);

export default router;
