import express from "express";
import { AdminRoute, protectedRoute } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
} from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", protectedRoute, AdminRoute, getAllProducts);
router.get("/featured-product", getFeaturedProducts);
router.get('/recommendations',getRecommendedProducts)
router.post("/", protectedRoute, AdminRoute, createProduct);
router.delete("/delete-product/:id", protectedRoute, AdminRoute, deleteProduct);

export default router;
