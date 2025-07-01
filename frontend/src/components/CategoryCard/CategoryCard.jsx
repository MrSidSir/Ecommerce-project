import React, { useState } from 'react';

const CategoryCard = ({ 
  category, 
  isSelected = false, 
  onClick,
  variant = 'default', // 'default' | 'dropdown'
  showCount = true,
  showSubcategories = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onClick && onClick(category._id);
  };

  const cardStyle = {
    background: isSelected ? category.color : 'white',
    color: isSelected ? 'white' : '#333',
    transform: isHovered && !isSelected ? 'translateY(-3px)' : 'translateY(0)',
    boxShadow: isHovered ? '0 8px 25px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    borderRadius: '12px',
    border: '2px solid transparent',
    position: 'relative'
  };

  if (variant === 'dropdown') {
    return (
      <div 
        className="dropdown-category-item"
        onClick={handleClick}
        style={{
          padding: '15px 20px',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          borderRadius: '8px',
          margin: '5px 0',
          background: isSelected ? category.color : 'transparent',
          color: isSelected ? 'white' : '#333',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ fontSize: '20px', marginRight: '12px' }}>
          {category.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: '500', marginBottom: '2px' }}>
            {category.name}
          </div>
          {showCount && (
            <div style={{ fontSize: '12px', opacity: 0.7 }}>
              {category.productCount} products
            </div>
          )}
        </div>
        {isSelected && (
          <div style={{ color: 'currentColor', fontSize: '16px' }}>✓</div>
        )}
      </div>
    );
  }

  return (
    <div 
      style={cardStyle}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 15px',
        minHeight: '100px'
      }}>
        <div style={{ 
          fontSize: '28px', 
          marginBottom: '8px',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.2s ease'
        }}>
          {category.icon}
        </div>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          textAlign: 'center',
          marginBottom: showCount ? '4px' : '0'
        }}>
          {category.name}
        </div>
        {showCount && (
          <div style={{ 
            fontSize: '11px', 
            opacity: 0.8,
            textAlign: 'center'
          }}>
            {category.productCount} items
          </div>
        )}
      </div>
      
      {/* Subcategories tooltip */}
      {showSubcategories && isHovered && category.subcategories?.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '0',
          right: '0',
          background: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          borderRadius: '6px',
          padding: '8px',
          fontSize: '11px',
          color: '#666',
          zIndex: 10,
          marginTop: '5px'
        }}>
          {category.subcategories.join(', ')}
        </div>
      )}
    </div>
  );
};

export default CategoryCard;