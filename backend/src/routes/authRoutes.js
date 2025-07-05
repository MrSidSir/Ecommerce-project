import express from "express";
import { signup, login, getUserProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ POST /api/auth/signup - Register new user
router.post("/signup", signup);

// ✅ POST /api/auth/login - Login user
router.post("/login", login);

// ✅ GET /api/auth/profile - Get user profile (protected route)
router.get("/profile", protect, getUserProfile);

export default router;
