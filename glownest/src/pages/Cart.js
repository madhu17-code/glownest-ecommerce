import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    removeItemCompletely,
    clearCart, 
    addToCart, 
    getTotalPrice, 
    getTotalItems,
    loading,
    error 
  } = useCart();

  if (loading) {
    return (
      <div className="page-container">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading cart...</p>
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
            <h3 className="error-title">Error loading cart</h3>
            <p className="error-message">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-container">
          <h1 className="cart-title">Your Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">
                <svg className="empty-cart-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="empty-cart-title">Your cart is empty</h3>
              <p className="empty-cart-message">Looks like you haven't added any products to your cart yet.</p>
              <Link to="/products" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="cart-content">
              {/* Cart Items */}
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    {/* Product Info */}
                    <div className="cart-item-info">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="cart-item-image"
                      />
                      <div className="cart-item-details">
                        <h3 className="cart-item-name">{item.name}</h3>
                        <p className="cart-item-description">{item.description}</p>
                        <p className="cart-item-price">₹{item.price}</p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="quantity-btn"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button 
                          onClick={() => addToCart(item, 1)} 
                          className="quantity-btn"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Remove Item */}
                      <button 
                        onClick={() => removeItemCompletely(item.id)}
                        className="remove-btn"
                        title="Remove item"
                      >
                        <svg className="remove-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="cart-item-total">
                      <p className="item-total-price">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="cart-summary">
                <div className="cart-summary-content">
                  <div className="cart-summary-info">
                    <p className="cart-total-items">Total Items: {getTotalItems()}</p>
                    <p className="cart-total-price">₹{getTotalPrice().toFixed(2)}</p>
                  </div>
                  <div className="cart-summary-actions">
                    <button 
                      onClick={clearCart} 
                      className="btn btn-secondary"
                    >
                      Clear Cart
                    </button>
                    <button className="btn btn-primary">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart; 