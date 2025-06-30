import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

/**
 * ✅ getCart()
 * Function to get the entire cart for a user by userId
 * Uses populate() to fetch full product details inside items array
 */
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate("items.product");
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✅ addToCart()
 * Function to add an item to the cart
 * - Checks if cart exists for user
 * - If not, creates a new cart
 * - If item exists, increments quantity
 * - Else, pushes new item
 */
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.params.userId });

    if (!cart) {
      cart = new Cart({ user: req.params.userId, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    const updatedCart = await cart.save();
    res.status(201).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✅ removeFromCart()
 * Function to remove an item from cart
 * - Finds cart for user
 * - Filters out the product to delete
 * - Saves and returns updated cart
 */
export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });

    if (cart) {
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== req.params.productId
      );

      const updatedCart = await cart.save();
      res.json(updatedCart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
