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
      { name: "wishlistRoutes", path: "./routes/wishlist.js", endpoint: "/api/wishlist" },
      { name: "paymentRoutes", path: "./routes/paymentRoutes.js", endpoint: "/api/payment" } // ✅ Added paymentRoutes
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
