import express from "express";
import {
  getProducts,       // 📝 Function to get all products
  getProductById,    // 📝 Function to get a product by its ID
  createProduct,     // 📝 Function to create a new product
  updateProduct,     // 📝 Function to update an existing product by ID
  deleteProduct,     // 📝 Function to delete a product by ID
} from "../controllers/productController.js";

const router = express.Router();

/**
 * ✅ Route: GET /api/products
 * 👉 Calls getProducts() to fetch all products from DB
 *
 * ✅ Route: POST /api/products
 * 👉 Calls createProduct() to add a new product to DB
 */
router.route("/")
  .get(getProducts)       // Calls getProducts function from controller
  .post(createProduct);   // Calls createProduct function from controller

/**
 * ✅ Route: GET /api/products/:id
 * 👉 Calls getProductById() to fetch single product by its ID
 *
 * ✅ Route: PUT /api/products/:id
 * 👉 Calls updateProduct() to update product details by ID
 *
 * ✅ Route: DELETE /api/products/:id
 * 👉 Calls deleteProduct() to remove product by ID
 */
router.route("/:id")
  .get(getProductById)    // Calls getProductById function from controller
  .put(updateProduct)     // Calls updateProduct function from controller
  .delete(deleteProduct); // Calls deleteProduct function from controller

export default router;

