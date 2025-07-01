"use client";
import React, { useRef, useEffect } from 'react';
import CategoryCard from '../CategoryCard';
import { useCategories } from '../../hooks/useCategories';
import '../category/categorydropdown/CategoryDropdown.css';

const CategoryDropdown = () => {
  const {
    categories,
    selectedCategory,
    isDropdownOpen,
    handleCategorySelect,
    toggleDropdown
  } = useCategories();

  const dropdownRef = useRef(null);

  // Debug: Console mein data check karo
  console.log('Categories:', categories);
  console.log('Categories length:', categories?.length);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isDropdownOpen) {
          toggleDropdown();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen, toggleDropdown]);

  // Loading state
  if (!categories) {
    return (
      <div className="category-dropdown-container">
        <div className="category-dropdown-header">
          <h3 className="category-title">
            <i className="icon-category"></i>
            Loading Categories...
          </h3>
        </div>
      </div>
    );
  }

  // Empty state
  if (categories.length === 0) {
    return (
      <div className="category-dropdown-container">
        <div className="category-dropdown-header">
          <h3 className="category-title">
            <i className="icon-category"></i>
            No Categories Found
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="category-dropdown-container" ref={dropdownRef}>
      {/* Dropdown Header */}
      <div className="category-dropdown-header">
        <h3 className="category-title">
          <i className="icon-category"></i>
          Browse Categories ({categories.length})
        </h3>
        <button 
          className="dropdown-toggle"
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
        >
          <i className={`icon-chevron ${isDropdownOpen ? 'up' : 'down'}`}></i>
        </button>
      </div>

      {/* Category Grid - Always visible */}
      <div className="category-grid">
        {categories.slice(0, 6).map(category => (
          <CategoryCard
            key={category.id}
            category={category}
            isSelected={category.isActive}
            onClick={handleCategorySelect}
          />
        ))}
      </div>

      {/* Dropdown Menu - Only when open */}
      {isDropdownOpen && (
        <div className="category-dropdown-menu">
          <div className="dropdown-header">
            <span>All Categories ({categories.length})</span>
            <button 
              className="close-btn"
              onClick={toggleDropdown}
            >
              <i className="icon-close"></i>
            </button>
          </div>
          <div className="dropdown-list">
            {categories.map(category => (
              <CategoryCard
                key={`dropdown-${category.id}`}
                category={category}
                isSelected={category.isActive}
                onClick={handleCategorySelect}
                variant="dropdown"
              />
            ))}
          </div>
        </div>
      )}

      {/* Debug Info - Remove karna production mein */}
      <div style={{ 
        position: 'absolute', 
        bottom: '-20px', 
        left: '0', 
        fontSize: '10px', 
        color: '#666',
        background: '#f0f0f0',
        padding: '2px 6px',
        borderRadius: '3px'
      }}>
        Debug: {categories.length} categories loaded
      </div>
    </div>
  );
};

export default CategoryDropdown;