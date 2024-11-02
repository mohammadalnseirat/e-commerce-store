import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware";
import { getCoupon, validateCoupon } from "../controllers/coupon.controller";

const router = express.Router();

router.get("/", protectedRoute, getCoupon);
router.post("/verified", protectedRoute, validateCoupon);

export default router;
