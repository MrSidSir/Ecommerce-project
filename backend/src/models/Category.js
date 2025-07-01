// backend/src/models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [50, 'Category name cannot exceed 50 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  icon: {
    type: String,
    required: [true, 'Category icon is required']
  },
  color: {
    type: String,
    required: true,
    default: '#FF5722'
  },
  productCount: {
    type: Number,
    default: 0
  },
  subcategories: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  image: {
    type: String
  }
}, {
  timestamps: true
});

// Index for better search performance
categorySchema.index({ name: 'text', slug: 'text' });
categorySchema.index({ slug: 1 });
categorySchema.index({ isActive: 1 });

// Virtual for products (when Product model is available)
categorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category',
  justOne: false
});

// Transform JSON output
categorySchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model('Category', categorySchema);