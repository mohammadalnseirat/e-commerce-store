import express from "express";
import {
  logOutUser,
  signInUser,
  signUpUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signUpUser);
router.post("/sign-in", signInUser);
router.post("/log-out", logOutUser);

export default router;
