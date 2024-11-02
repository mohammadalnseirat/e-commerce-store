import express from "express";
import {
  logOutUser,
  refreshToken,
  signInUser,
  signUpUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signUpUser);
router.post("/sign-in", signInUser);
router.post("/log-out", logOutUser);
router.post("/refresh-token", refreshToken);

export default router;
