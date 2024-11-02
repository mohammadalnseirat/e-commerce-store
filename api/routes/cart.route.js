import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import {
  addProductToCart,
  removeAllItemsFromCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/", protectedRoute, addProductToCart);
router.delete("/", protectedRoute, removeAllItemsFromCart);

export default router;
