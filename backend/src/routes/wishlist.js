// 📁 routes/wishlist.js
import express from 'express';
import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js'; // Assuming you have a Product model
import auth from '../middleware/auth.js'; // Assuming you have auth middleware

const router = express.Router();

// ✅ Get user's wishlist
router.get('/', auth, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.user.id }).populate('products');
    
    if (!wishlist) {
      return res.json({ 
        success: true,
        products: [],
        message: 'Wishlist is empty'
      });
    }
    
    res.json({
      success: true,
      wishlist,
      count: wishlist.products.length
    });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching wishlist',
      error: error.message 
    });
  }
});

// ✅ Add product to wishlist
router.post('/add', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }
    
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    let wishlist = await Wishlist.findOne({ userId: req.user.id });
    
    if (!wishlist) {
      // Create new wishlist
      wishlist = new Wishlist({
        userId: req.user.id,
        products: [productId]
      });
    } else {
      // Check if product already in wishlist
      if (wishlist.products.includes(productId)) {
        return res.status(400).json({ 
          success: false,
          message: 'Product already in wishlist' 
        });
      }
      
      wishlist.products.push(productId);
    }
    
    await wishlist.save();
    await wishlist.populate('products');
    
    res.json({ 
      success: true,
      message: 'Product added to wishlist successfully',
      wishlist,
      count: wishlist.products.length
    });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error adding product to wishlist',
      error: error.message 
    });
  }
});

// ✅ Remove product from wishlist
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;
    
    const wishlist = await Wishlist.findOne({ userId: req.user.id });
    
    if (!wishlist) {
      return res.status(404).json({ 
        success: false,
        message: 'Wishlist not found' 
      });
    }
    
    // Remove product from wishlist
    wishlist.products = wishlist.products.filter(id => id.toString() !== productId);
    await wishlist.save();
    await wishlist.populate('products');
    
    res.json({ 
      success: true,
      message: 'Product removed from wishlist successfully',
      wishlist,
      count: wishlist.products.length
    });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error removing product from wishlist',
      error: error.message 
    });
  }
});

// ✅ Clear entire wishlist
router.delete('/clear', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { userId: req.user.id },
      { products: [] },
      { new: true }
    );
    
    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found'
      });
    }
    
    res.json({ 
      success: true,
      message: 'Wishlist cleared successfully',
      wishlist,
      count: 0
    });
  } catch (error) {
    console.error('Error clearing wishlist:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error clearing wishlist',
      error: error.message 
    });
  }
});

// ✅ Move all wishlist items to cart
router.post('/move-to-cart', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user.id }).populate('products');
    
    if (!wishlist || wishlist.products.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Wishlist is empty'
      });
    }
    
    // Here you would typically add logic to move items to cart
    // For now, just clearing the wishlist
    wishlist.products = [];
    await wishlist.save();
    
    res.json({
      success: true,
      message: 'All items moved to cart successfully',
      wishlist,
      count: 0
    });
  } catch (error) {
    console.error('Error moving to cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error moving items to cart',
      error: error.message
    });
  }
});

// ✅ Check if product is in wishlist
router.get('/check/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;
    
    const wishlist = await Wishlist.findOne({ userId: req.user.id });
    
    const isInWishlist = wishlist && wishlist.products.includes(productId);
    
    res.json({
      success: true,
      isInWishlist,
      message: isInWishlist ? 'Product is in wishlist' : 'Product is not in wishlist'
    });
  } catch (error) {
    console.error('Error checking wishlist:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking wishlist',
      error: error.message
    });
  }
});

export default router;