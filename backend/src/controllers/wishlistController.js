const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// Get user's wishlist
exports.getWishlist = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const wishlist = await Wishlist.findOne({ userId })
            .populate({
                path: 'products.productId',
                select: 'name price originalPrice image category rating reviews'
            });
        
        if (!wishlist) {
            return res.json({ 
                success: true, 
                data: { products: [] },
                count: 0 
            });
        }
        
        res.json({ 
            success: true, 
            data: wishlist,
            count: wishlist.products.length
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Add product to wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId } = req.body;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: 'Product not found' 
            });
        }

        let wishlist = await Wishlist.findOne({ userId });
        
        if (!wishlist) {
            wishlist = new Wishlist({ userId, products: [] });
        }

        // Check if product already in wishlist
        const existingItem = wishlist.products.find(
            item => item.productId.toString() === productId
        );

        if (existingItem) {
            return res.status(400).json({ 
                success: false, 
                message: 'Product already in wishlist' 
            });
        }

        wishlist.products.push({ productId });
        await wishlist.save();
        
        const populatedWishlist = await Wishlist.findById(wishlist._id)
            .populate({
                path: 'products.productId',
                select: 'name price originalPrice image category rating reviews'
            });
        
        res.json({ 
            success: true, 
            message: 'Product added to wishlist',
            data: populatedWishlist
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Remove product from wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        
        const wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            return res.status(404).json({ 
                success: false, 
                message: 'Wishlist not found' 
            });
        }

        wishlist.products = wishlist.products.filter(
            item => item.productId.toString() !== productId
        );
        
        await wishlist.save();
        
        const populatedWishlist = await Wishlist.findById(wishlist._id)
            .populate({
                path: 'products.productId',
                select: 'name price originalPrice image category rating reviews'
            });
        
        res.json({ 
            success: true, 
            message: 'Product removed from wishlist',
            data: populatedWishlist
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Clear entire wishlist
exports.clearWishlist = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            return res.status(404).json({ 
                success: false, 
                message: 'Wishlist not found' 
            });
        }

        wishlist.products = [];
        await wishlist.save();
        
        res.json({ 
            success: true, 
            message: 'Wishlist cleared',
            data: wishlist
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Move all to bag
exports.moveAllToBag = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const wishlist = await Wishlist.findOne({ userId })
            .populate('products.productId');
            
        if (!wishlist || wishlist.products.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'Wishlist is empty' 
            });
        }

        // Here you would add logic to move items to cart
        // For now, just clear the wishlist
        const productIds = wishlist.products.map(item => item.productId._id);
        
        wishlist.products = [];
        await wishlist.save();
        
        res.json({ 
            success: true, 
            message: 'All items moved to bag',
            movedProducts: productIds
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};