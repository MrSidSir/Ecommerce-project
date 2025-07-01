// 📁 app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";

// ✅ Initialize environment variables first
dotenv.config();

// ✅ Initialize app
const app = express();

// ✅ Connect Database
connectDB();

// ✅ Security and Logging Middlewares
app.use(helmet());           // Adds secure headers
app.use(morgan("dev"));      // Logs requests in dev

// ✅ CORS configuration
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:3000"];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// ✅ Built-in Middlewares
app.use(express.json()); // Parses incoming JSON
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Load routes function
async function loadRoutes() {
  try {
    // Import all routes using ES modules syntax
    const authRoutes = await import("./routes/authRoutes.js");
    const productRoutes = await import("./routes/productRoutes.js");
    const cartRoutes = await import("./routes/cartRoutes.js");  
    const orderRoutes = await import("./routes/orderRoutes.js");
    const dashboardRoutes = await import("./routes/dashboardRoutes.js");
    const categoryRoutes = await import("./routes/categoryRoutes.js");
    const wishlistRoutes = await import("./routes/wishlist.js"); // Changed to ES import

    // ✅ API Routes
    app.use("/api/auth", authRoutes.default);
    app.use("/api/products", productRoutes.default);
    app.use("/api/cart", cartRoutes.default);
    app.use("/api/orders", orderRoutes.default);
    app.use("/api/dashboard", dashboardRoutes.default);
    app.use("/api/categories", categoryRoutes.default);
    app.use('/api/wishlist', wishlistRoutes.default); // Use .default for ES modules
    
    console.log("✅ All routes loaded successfully");
  } catch (error) {
    console.error("❌ Error loading routes:", error.message);
    console.error("Stack trace:", error.stack);
    
    // Don't exit process, just log error and continue
    console.log("⚠️ Continuing without failed routes...");
  }
}

// ✅ Initialize routes
await loadRoutes();

// ✅ 404 Handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === "development" ? err.message : "Something went wrong!",
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
});