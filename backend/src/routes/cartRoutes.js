// 📁 backend/routes/cartRoutes.js
import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartCount
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All cart routes require authentication
router.use(protect);

// @route   GET /api/cart
// @desc    Get user cart
router.get('/', getCart);

// @route   GET /api/cart/count
// @desc    Get cart items count
router.get('/count', getCartCount);

// @route   POST /api/cart/add
// @desc    Add item to cart
router.post('/add', addToCart);

// @route   PUT /api/cart/update
// @desc    Update cart item quantity
router.put('/update', updateCartItem);

// @route   DELETE /api/cart/remove/:productId
// @desc    Remove item from cart
router.delete('/remove/:productId', removeFromCart);

// @route   DELETE /api/cart/clear
// @desc    Clear entire cart
router.delete('/clear', clearCart);

export default router;