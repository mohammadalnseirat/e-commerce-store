import express from "express";
import { AdminRoute, protectedRoute } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getRecommendedProducts,
  toggleFeaturedProduct,
} from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", protectedRoute, AdminRoute, getAllProducts);
router.get("/featured-product", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations", getRecommendedProducts);
router.post("/", protectedRoute, AdminRoute, createProduct);
router.patch("/:id", protectedRoute, AdminRoute, toggleFeaturedProduct); // toggle featured products
router.delete("/delete-product/:id", protectedRoute, AdminRoute, deleteProduct);

export default router;
