import express from "express";
import {
  getCart,        // ✅ Function to get cart by userId
  addToCart,      // ✅ Function to add item to cart
  removeFromCart, // ✅ Function to remove item from cart
} from "../controllers/cartController.js";

const router = express.Router();

/**
 * ✅ Route: /api/cart/:userId
 * - GET: getCart() to get user's cart
 * - POST: addToCart() to add item to user's cart
 */
router.route("/:userId").get(getCart).post(addToCart);

/**
 * ✅ Route: /api/cart/:userId/:productId
 * - DELETE: removeFromCart() to delete item from cart
 */
router.route("/:userId/:productId").delete(removeFromCart);

export default router;
