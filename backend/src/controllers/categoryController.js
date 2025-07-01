// backend/src/controllers/categoryController.js
import Category from '../models/Category.js';
// import Product from '../models/Product.js'; // Uncomment when you have Product model

// Get all categories with product count
export const getAllCategories = async (req, res) => {
  try {
    const { search, sortBy = 'sortOrder', limit = 20 } = req.query;
    
    let query = { isActive: true };
    
    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { subcategories: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    const categories = await Category.find(query)
      .sort({ [sortBy]: 1 })
      .limit(parseInt(limit));
    
    // 🚀 For now, we'll set random product counts (update when you have Product model)
    const categoriesWithCount = categories.map(category => ({
      ...category.toObject(),
      productCount: Math.floor(Math.random() * 100) + 1 // Random count for demo
    }));
    
    console.log(`✅ Found ${categories.length} categories`);
    
    res.json({
      success: true,
      data: categoriesWithCount,
      message: 'Categories fetched successfully'
    });
  } catch (error) {
    console.error('❌ Error in getAllCategories:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single category
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('❌ Error in getCategoryById:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get category by slug
export const getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ 
      slug: req.params.slug,
      isActive: true 
    });
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    // 🚀 For now, we'll return empty products array (update when you have Product model)
    res.json({
      success: true,
      data: {
        category,
        products: [] // Will be populated when Product model is available
      }
    });
  } catch (error) {
    console.error('❌ Error in getCategoryBySlug:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create new category
export const createCategory = async (req, res) => {
  try {
    const { name, icon, color, subcategories, description } = req.body;
    
    // Validation
    if (!name || !icon) {
      return res.status(400).json({
        success: false,
        message: 'Name and icon are required'
      });
    }
    
    // Create slug from name
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .trim();
    
    // Check if slug already exists
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category with this name already exists'
      });
    }
    
    const category = new Category({
      name,
      slug,
      icon,
      color: color || '#FF5722',
      subcategories: subcategories || [],
      description
    });
    
    await category.save();
    
    console.log(`✅ Category created: ${category.name}`);
    
    res.status(201).json({
      success: true,
      data: category,
      message: 'Category created successfully'
    });
  } catch (error) {
    console.error('❌ Error in createCategory:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    console.log(`✅ Category updated: ${category.name}`);
    
    res.json({
      success: true,
      data: category,
      message: 'Category updated successfully'
    });
  } catch (error) {
    console.error('❌ Error in updateCategory:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    // 🚀 For now, we'll skip product count check (update when you have Product model)
    // const productCount = await Product.countDocuments({ category: category._id });
    // if (productCount > 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Cannot delete category with existing products'
    //   });
    // }
    
    await Category.findByIdAndDelete(req.params.id);
    
    console.log(`✅ Category deleted: ${category.name}`);
    
    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error in deleteCategory:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};