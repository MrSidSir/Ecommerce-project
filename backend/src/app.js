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

// ✅ CORS configuration - Updated with more permissive settings
const allowedOrigins = [
  process.env.FRONTEND_URL, 
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Built-in Middlewares
app.use(express.json()); // Parses incoming JSON
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// ✅ Test Route
app.get("/", (req, res) => {
  res.json({ 
    message: "API is running...",
    status: "success",
    timestamp: new Date().toISOString()
  });
});

// ✅ Load routes function with better error handling
async function loadRoutes() {
  try {
    console.log("🔄 Loading routes...");
    
    // Import routes one by one with individual error handling
    const routesToLoad = [
      { name: "authRoutes", path: "./routes/authRoutes.js", endpoint: "/api/auth" },
      { name: "productRoutes", path: "./routes/productRoutes.js", endpoint: "/api/products" },
      { name: "cartRoutes", path: "./routes/cartRoutes.js", endpoint: "/api/cart" },
      { name: "orderRoutes", path: "./routes/orderRoutes.js", endpoint: "/api/orders" },
      { name: "dashboardRoutes", path: "./routes/dashboardRoutes.js", endpoint: "/api/dashboard" },
      { name: "categoryRoutes", path: "./routes/categoryRoutes.js", endpoint: "/api/categories" },
      { name: "wishlistRoutes", path: "./routes/wishlist.js", endpoint: "/api/wishlist" }
    ];

    for (const route of routesToLoad) {
      try {
        const routeModule = await import(route.path);
        app.use(route.endpoint, routeModule.default);
        console.log(`✅ ${route.name} loaded successfully at ${route.endpoint}`);
      } catch (error) {
        console.error(`❌ Failed to load ${route.name}:`, error.message);
        console.log(`⚠️ Continuing without ${route.name}...`);
      }
    }
    
    console.log("✅ Route loading completed");
    
    // Log all available routes for debugging
    console.log("\n📍 Available API endpoints:");
    console.log("- GET  /");
    console.log("- POST /api/auth/signup");
    console.log("- POST /api/auth/login");
    console.log("- GET  /api/auth/profile");
    console.log("- And other routes if loaded successfully...\n");
    
  } catch (error) {
    console.error("❌ Critical error in route loading:", error.message);
    console.error("Stack trace:", error.stack);
    
    // Don't exit process, just log error and continue
    console.log("⚠️ Continuing with basic server setup...");
  }
}

// ✅ Initialize routes
await loadRoutes();

// ✅ 404 Handler with more detailed response
app.use("*", (req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
    availableRoutes: [
      "GET /",
      "POST /api/auth/signup",
      "POST /api/auth/login",
      "GET /api/auth/profile"
    ]
  });
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  console.error("Stack trace:", err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === "development" ? err.message : "Something went wrong!",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 Test API: http://localhost:${PORT}/`);
  console.log(`🔗 Signup endpoint: http://localhost:${PORT}/api/auth/signup`);
});