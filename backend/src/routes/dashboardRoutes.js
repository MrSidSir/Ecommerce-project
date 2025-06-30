import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

/**
 * ✅ Route: GET /api/dashboard/stats
 * Calls getDashboardStats() to fetch dashboard summary
 */
router.get("/stats", getDashboardStats);

export default router;
