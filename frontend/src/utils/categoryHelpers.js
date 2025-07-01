// utils/categoryHelpers.js

/**
 * Category API Service Functions
 */
export class CategoryService {
  static async fetchCategories() {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: categoriesData,
          message: 'Categories fetched successfully'
        });
      }, 1000);
    });
  }

  static async fetchCategoryProducts(categoryId) {
    // Simulate fetching products for specific category
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockProducts = Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          name: `Product ${i + 1}`,
          price: Math.floor(Math.random() * 1000) + 100,
          image: `https://picsum.photos/200/200?random=${i}`,
          rating: (Math.random() * 2 + 3).toFixed(1)
        }));
        
        resolve({
          success: true,
          data: mockProducts,
          category: categoryId
        });
      }, 800);
    });
  }

  static async updateCategoryPreferences(preferences) {
    // Save user preferences
    localStorage.setItem('categoryPreferences', JSON.stringify(preferences));
    return { success: true };
  }
}

/**
 * Category Helper Functions
 */
export const CategoryHelpers = {
  // Filter categories by search term
  filterCategories: (categories, searchTerm) => {
    if (!searchTerm) return categories;
    
    const term = searchTerm.toLowerCase();
    return categories.filter(category => 
      category.name.toLowerCase().includes(term) ||
      category.slug.toLowerCase().includes(term) ||
      category.subcategories.some(sub => 
        sub.toLowerCase().includes(term)
      )
    );
  },

  // Sort categories by different criteria
  sortCategories: (categories, sortBy = 'name') => {
    const sorted = [...categories];
    
    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      
      case 'productCount':
        return sorted.sort((a, b) => b.productCount - a.productCount);
      
      case 'popularity':
        // Mock popularity based on product count and random factor
        return sorted.sort((a, b) => {
          const popularityA = a.productCount * Math.random();
          const popularityB = b.productCount * Math.random();
          return popularityB - popularityA;
        });
      
      default:
        return sorted;
    }
  },

  // Get category statistics
  getCategoryStats: (categories) => {
    const totalProducts = categories.reduce((sum, cat) => sum + cat.productCount, 0);
    const avgProducts = totalProducts / categories.length;
    const mostPopular = categories.reduce((max, cat) => 
      cat.productCount > max.productCount ? cat : max
    );
    
    return {
      totalCategories: categories.length,
      totalProducts,
      avgProducts: Math.round(avgProducts),
      mostPopular: mostPopular.name,
      activeCategory: categories.find(cat => cat.isActive)?.name || 'None'
    };
  },

  // Generate category breadcrumbs
  generateBreadcrumbs: (categories, selectedId) => {
    const selected = categories.find(cat => cat.id === selectedId);
    if (!selected) return [];
    
    return [
      { name: 'Home', slug: '/', id: 0 },
      { name: 'Categories', slug: '/categories', id: -1 },
      { name: selected.name, slug: `/categories/${selected.slug}`, id: selected.id }
    ];
  },

  // Get related categories
  getRelatedCategories: (categories, currentId, limit = 3) => {
    const current = categories.find(cat => cat.id === currentId);
    if (!current) return [];
    
    // Simple related logic based on similar product counts
    return categories
      .filter(cat => cat.id !== currentId)
      .sort((a, b) => {
        const diffA = Math.abs(a.productCount - current.productCount);
        const diffB = Math.abs(b.productCount - current.productCount);
        return diffA - diffB;
      })
      .slice(0, limit);
  },

  // Format category data for export
  exportCategories: (categories, format = 'json') => {
    const data = categories.map(cat => ({
      name: cat.name,
      slug: cat.slug,
      productCount: cat.productCount,
      subcategories: cat.subcategories.join(', ')
    }));

    switch (format) {
      case 'csv':
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(row => Object.values(row).join(','));
        return [headers, ...rows].join('\n');
      
      case 'json':
      default:
        return JSON.stringify(data, null, 2);
    }
  }
};

/**
 * Category Analytics Functions
 */
export const CategoryAnalytics = {
  // Track category clicks
  trackCategoryClick: (categoryId, categoryName) => {
    const event = {
      type: 'category_click',
      categoryId,
      categoryName,
      timestamp: new Date().toISOString(),
      sessionId: generateSessionId()
    };
    
    // Store in localStorage for demo (use real analytics in production)
    const analytics = JSON.parse(localStorage.getItem('categoryAnalytics') || '[]');
    analytics.push(event);
    localStorage.setItem('categoryAnalytics', JSON.stringify(analytics));
    
    console.log('📊 Category Analytics:', event);
  },

  // Get category performance data
  getCategoryPerformance: () => {
    const analytics = JSON.parse(localStorage.getItem('categoryAnalytics') || '[]');
    const performance = {};
    
    analytics.forEach(event => {
      if (event.type === 'category_click') {
        if (!performance[event.categoryName]) {
          performance[event.categoryName] = {
            clicks: 0,
            lastClicked: null
          };
        }
        performance[event.categoryName].clicks++;
        performance[event.categoryName].lastClicked = event.timestamp;
      }
    });
    
    return Object.entries(performance)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.clicks - a.clicks);
  },

  // Clear analytics data
  clearAnalytics: () => {
    localStorage.removeItem('categoryAnalytics');
  }
};

/**
 * Category Validation Functions
 */
export const CategoryValidation = {
  // Validate category data structure
  validateCategory: (category) => {
    const required = ['id', 'name', 'slug', 'icon', 'color'];
    const errors = [];
    
    required.forEach(field => {
      if (!category[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    });
    
    if (category.productCount && category.productCount < 0) {
      errors.push('Product count cannot be negative');
    }
    
    if (category.color && !isValidHexColor(category.color)) {
      errors.push('Invalid color format. Use hex format (#RRGGBB)');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Validate category array
  validateCategories: (categories) => {
    if (!Array.isArray(categories)) {
      return { isValid: false, errors: ['Categories must be an array'] };
    }
    
    const errors = [];
    const slugs = new Set();
    const ids = new Set();
    
    categories.forEach((category, index) => {
      const validation = CategoryValidation.validateCategory(category);
      if (!validation.isValid) {
        errors.push(`Category ${index}: ${validation.errors.join(', ')}`);
      }
      
      // Check for duplicate slugs
      if (slugs.has(category.slug)) {
        errors.push(`Duplicate slug found: ${category.slug}`);
      }
      slugs.add(category.slug);
      
      // Check for duplicate IDs
      if (ids.has(category.id)) {
        errors.push(`Duplicate ID found: ${category.id}`);
      }
      ids.add(category.id);
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};

/**
 * Utility Functions
 */

// Generate unique session ID
function generateSessionId() {
  return 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

// Validate hex color
function isValidHexColor(color) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

// Debounce function for search
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Local storage with error handling
export const Storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  },

  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  }
};

/**
 * Category Theme Functions
 */
export const CategoryThemes = {
  // Predefined color schemes
  colorSchemes: {
    default: ['#FF5722', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3'],
    warm: ['#FF6B35', '#F7931E', '#FFD23F', '#06FFA5', '#118AB2', '#073B4C'],
    cool: ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51', '#8B5CF6'],
    pastel: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E6BAFF']
  },

  // Apply theme to categories
  applyTheme: (categories, themeName = 'default') => {
    const colors = CategoryThemes.colorSchemes[themeName] || CategoryThemes.colorSchemes.default;
    
    return categories.map((category, index) => ({
      ...category,
      color: colors[index % colors.length]
    }));
  },