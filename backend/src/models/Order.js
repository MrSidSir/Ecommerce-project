import mongoose from "mongoose";

// ✅ Defines each item in order with product ref and quantity
const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // references Product model
    required: true,
  },
  quantity: { type: Number, required: true },
});

// ✅ Defines full order schema with user ref, items array, total price, shipping, and status
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // references User model
      required: true,
    },
    items: [orderItemSchema], // embeds multiple order items
    totalPrice: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

// ✅ Creates Order model
const Order = mongoose.model("Order", orderSchema);
export default Order;
