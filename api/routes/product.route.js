import express from "express";
import { AdminRoute, protectedRoute } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  getAllProducts,
} from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", protectedRoute, AdminRoute, getAllProducts);
router.post("/create-product", protectedRoute, createProduct);

export default router;
