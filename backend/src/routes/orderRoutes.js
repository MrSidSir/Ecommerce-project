import express from "express";
import {
  createOrder,      // ✅ Function to create new order
  getOrdersByUser,  // ✅ Function to fetch all orders by userId
  updateOrderStatus // ✅ Function to update order status
} from "../controllers/orderController.js";

const router = express.Router();

/**
 * ✅ Route: POST /api/orders
 * Calls createOrder() to add new order to DB
 */
router.route("/").post(createOrder);

/**
 * ✅ Route: GET /api/orders/:userId
 * Calls getOrdersByUser() to fetch user's all orders
 */
router.route("/:userId").get(getOrdersByUser);

/**
 * ✅ Route: PUT /api/orders/status/:orderId
 * Calls updateOrderStatus() to update order status
 */
router.route("/status/:orderId").put(updateOrderStatus);

export default router;
