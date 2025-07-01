import express from "express";
import {
  getCart,        // ✅ Function to get cart by userId
  addToCart,      // ✅ Function to add item to cart
  removeFromCart, // ✅ Function to remove item from cart
} from "../controllers/cartController.js";

const router = express.Router();

/**
 * ✅ Route: GET /api/cart/:userId
 * Get user's cart
 */
router.get("/:userId", getCart);

/**
 * ✅ Route: POST /api/cart/:userId
 * Add item to user's cart
 */
router.post("/:userId", addToCart);

/**
 * ✅ Route: DELETE /api/cart/:userId/:productId
 * Remove item from cart
 */
router.delete("/:userId/:productId", removeFromCart);

export default router;