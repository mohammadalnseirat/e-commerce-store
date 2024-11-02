import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import {
  addProductToCart,
  getProductsCart,
  removeAllItemsFromCart,
  updateQuantity,
} from "../controllers/cart.controller.js";

const router = express.Router();
router.get("/", protectedRoute, getProductsCart);
router.post("/", protectedRoute, addProductToCart);
router.delete("/", protectedRoute, removeAllItemsFromCart);
router.put("/:id", protectedRoute, updateQuantity);

export default router;
