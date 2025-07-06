import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

/**
 * getDashboardStats()
 * - Returns: customers, orders, % change, monthly sales, target, revenue, etc.
 */
export const getDashboardStats = async (req, res) => {
  try {
    // Total counts
    const customers = await User.countDocuments();
    const orders = await Order.find();
    const ordersCount = orders.length;

    // Monthly sales (last 12 months)
    const now = new Date();
    const salesByMonth = Array(12).fill(0);
    orders.forEach(order => {
      const created = order.createdAt ? new Date(order.createdAt) : null;
      if (created && !isNaN(created)) {
        const month = created.getMonth(); // 0-11
        salesByMonth[month] += order.totalPrice;
      }
    });

    // Customers: this month vs last month
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const customersThisMonth = await User.countDocuments({ createdAt: { $gte: startOfThisMonth } });
    const customersLastMonth = await User.countDocuments({ createdAt: { $gte: startOfLastMonth, $lt: startOfThisMonth } });
    const customersChange = customersLastMonth === 0 ? 100 : ((customersThisMonth - customersLastMonth) / customersLastMonth) * 100;

    // Orders: this month vs last month
    const ordersThisMonth = orders.filter(order => {
      const created = order.createdAt ? new Date(order.createdAt) : null;
      return created && created >= startOfThisMonth;
    }).length;
    const ordersLastMonth = orders.filter(order => {
      const created = order.createdAt ? new Date(order.createdAt) : null;
      return created && created >= startOfLastMonth && created < startOfThisMonth;
    }).length;
    const ordersChange = ordersLastMonth === 0 ? 100 : ((ordersThisMonth - ordersLastMonth) / ordersLastMonth) * 100;

    // Revenue (total)
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    // Dummy target/revenue for now
    const target = 20000;
    const revenue = totalRevenue;

    res.json({
      customers,
      customersChange: Number(customersChange.toFixed(2)),
      orders: ordersCount,
      ordersChange: Number(ordersChange.toFixed(2)),
      monthlySales: salesByMonth,
      target,
      revenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
