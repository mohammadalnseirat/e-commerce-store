import express from "express";
import { AdminRoute, protectedRoute } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  getAllProducts,
  getFeaturedProducts,
} from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", protectedRoute, AdminRoute, getAllProducts);
router.get("/featured-product", getFeaturedProducts);
router.post("/", protectedRoute, AdminRoute, createProduct);

export default router;
