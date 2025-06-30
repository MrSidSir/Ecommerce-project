import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

/**
 * ✅ getDashboardStats()
 * - Fetches counts of users, products, orders, and total revenue.
 * - Returns as JSON for admin dashboard overview.
 */
export const getDashboardStats = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const productsCount = await Product.countDocuments();
    const orders = await Order.find();

    const ordersCount = orders.length;
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    res.json({
      usersCount,
      productsCount,
      ordersCount,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
