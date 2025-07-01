import { useState, useEffect, useCallback } from 'react';
import categoryService from '../services/categoryService';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories from API
  const fetchCategories = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await categoryService.getCategories(params);
      
      if (response.success) {
        setCategories(response.data);
        
        // Set first category as selected if none selected
        if (!selectedCategory && response.data.length > 0) {
          setSelectedCategory(response.data[0]);
        }
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  // Initialize categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Handle category selection
  const handleCategorySelect = useCallback(async (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    if (category) {
      setSelectedCategory(category);
      setIsDropdownOpen(false);
      
      // Optional: Fetch category details
      try {
        await categoryService.getCategoryBySlug(category.slug);
      } catch (err) {
        console.error('Failed to fetch category details:', err);
      }
    }
  }, [categories]);

  // Toggle dropdown
  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev);
  }, []);

  // Search categories
  const searchCategories = useCallback(async (term) => {
    setSearchTerm(term);
    
    if (term.trim()) {
      await fetchCategories({ search: term });
    } else {
      await fetchCategories();
    }
  }, [fetchCategories]);

  return {
    categories,
    selectedCategory,
    isDropdownOpen,
    searchTerm,
    loading,
    error,
    handleCategorySelect,
    toggleDropdown,
    searchCategories,
    refetchCategories: fetchCategories
  };
};