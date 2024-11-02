import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/create-product", protectedRoute, createProduct);

export default router;
