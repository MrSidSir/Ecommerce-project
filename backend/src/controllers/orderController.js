import Order from "../models/Order.js";

/**
 * ✅ createOrder()
 * - Receives userId, items array, totalPrice, shippingAddress from req.body
 * - Creates new Order document and saves to DB
 * - Returns created order as JSON response
 */
export const createOrder = async (req, res) => {
  const { userId, items, totalPrice, shippingAddress } = req.body;

  try {
    const newOrder = new Order({
      user: userId,
      items,
      totalPrice,
      shippingAddress,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✅ getOrdersByUser()
 * - Fetches all orders placed by a specific user using req.params.userId
 * - Uses populate to fetch product details inside items
 * - Returns orders array as JSON
 */
export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate("items.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✅ updateOrderStatus()
 * - Finds order by req.params.orderId
 * - Updates status field to req.body.status (e.g. Shipped, Delivered)
 * - Saves updated order and returns it as JSON
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
