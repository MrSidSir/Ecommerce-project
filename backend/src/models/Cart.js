import mongoose from "mongoose";

// ✅ cartItemSchema defines each item in cart with product reference and quantity
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // references Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

// ✅ cartSchema defines the entire cart with user and items array
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // references User model
      required: true,
    },
    items: [cartItemSchema], // embeds multiple cart items
  },
  { timestamps: true }
);

// ✅ Cart model creation
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
