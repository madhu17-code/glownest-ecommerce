import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { productsAPI } from '../services/api';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'cleanser', name: 'Cleansers' },
    { id: 'serum', name: 'Serums' },
    { id: 'moisturizer', name: 'Moisturizers' },
    { id: 'sunscreen', name: 'Sunscreen' },
    { id: 'facemask', name: 'Masks' },
    { id: 'toner', name: 'Toners' },
    { id: 'eyecream', name: 'Eye Care' },
    { id: 'nightcream', name: 'Night Care' },
    { id: 'hair', name: 'Hair Care' }
  ];

  // Fetch products from API
  const fetchProducts = async (category = null) => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsAPI.getAll(category);
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      fetchProducts();
    } else {
      fetchProducts(categoryId);
    }
  };

  // Handle add to cart with API integration
  const handleAddToCart = async (product) => {
    try {
      await addToCart(product);
      // You can also call cartAPI.addItem(product.id, 1) here if you want to sync with backend
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="container">
          <div className="error-container">
            <div className="error-icon">
              <svg className="error-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="error-title">Error loading products</h3>
            <p className="error-message">{error}</p>
            <button 
              onClick={() => fetchProducts()} 
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      {/* Header */}
      <div className="products-header">
        <div className="container">
          <div className="products-header-content">
            <h1 className="products-title">
              Our Products
            </h1>
            <p className="products-subtitle">
              Discover our complete range of natural skincare products designed to 
              enhance your natural beauty and promote healthy, glowing skin.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        <div className="container">
          <div className="category-buttons">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`category-btn ${selectedCategory === category.id ? 'category-btn-active' : ''}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container">
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              {/* Product Image */}
              <div className="product-image-container">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-image"
                />
                {!product.inStock && (
                  <div className="out-of-stock-badge">
                    Out of Stock
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="product-info">
                <h3 className="product-name">
                  {product.name}
                </h3>
                <p className="product-description">
                  {product.description}
                </p>
                
                <div className="product-meta">
                  <span className="product-price">
                    ₹{product.price}
                  </span>
                  <div className="product-rating">
                    <span className="star">★</span>
                    <span className="rating-value">{product.rating}</span>
                    <span className="rating-count">({product.reviews})</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleAddToCart(product)} 
                  className="btn btn-primary product-btn"
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <svg className="empty-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="empty-title">No products found</h3>
            <p className="empty-message">
              We couldn't find any products in this category. Try selecting a different category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products; 