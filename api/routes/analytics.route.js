import express from "express";
import { AdminRoute, protectedRoute } from "../middlewares/auth.middleware.js";
import {
  getAnalyticsData,
  getSalesDataDaily,
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/", protectedRoute, AdminRoute, async (req, res) => {
  try {
    // ?Get The Data For Card:
    const analyticsData = await getAnalyticsData();

    // ?get the endDate and startDate:
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    // ?get the sales data daily:
    const salesDataDaily = await getSalesDataDaily(startDate, endDate);

    res.status(200).json({ analyticsData, salesDataDaily });
  } catch (error) {
    console.log("Error getting Analytics Data", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
