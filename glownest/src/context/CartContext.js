import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartAPI } from '../services/api';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load cart items from backend on mount
  useEffect(() => {
    loadCartFromAPI();
  }, []);

  // Load cart from API
  const loadCartFromAPI = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cartAPI.getItems();
      // Transform API data to match our local structure
      const transformedItems = await Promise.all(
        data.map(async (item) => {
          try {
            // Fetch product details for each cart item
            const productResponse = await fetch(`http://localhost:5000/api/products/${item.productId}`);
            if (!productResponse.ok) {
              console.warn(`Failed to fetch product ${item.productId}`);
              return null;
            }
            const product = await productResponse.json();
            return {
              ...product,
              quantity: item.quantity
            };
          } catch (err) {
            console.error('Error fetching product details:', err);
            return null;
          }
        })
      );
      
      // Filter out any null items (failed to fetch)
      const validItems = transformedItems.filter(item => item !== null);
      setCartItems(validItems);
    } catch (err) {
      console.error('Error loading cart from API:', err);
      // Don't set error for API unavailability - just use local state
      if (err.message.includes('fetch') || err.message.includes('network')) {
        console.log('Backend API not available, using local cart state');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart (both local state and API)
  const addToCart = async (product, quantity = 1) => {
    try {
      setError(null);
      
      // Update local state immediately for better UX
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
          );
        } else {
          return [...prevItems, { ...product, quantity }];
        }
      });

      // Try to sync with backend API (but don't fail if unavailable)
      try {
        await cartAPI.addItem(product.id, quantity);
      } catch (apiErr) {
        console.warn('Failed to sync with backend API:', apiErr.message);
        // Continue with local state only
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError(err.message);
      
      // Revert local state if there's a critical error
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        if (existingItem && existingItem.quantity > quantity) {
          return prevItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity - quantity } : item
          );
        } else if (existingItem && existingItem.quantity === quantity) {
          return prevItems.filter((item) => item.id !== product.id);
        }
        return prevItems;
      });
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      setError(null);
      
      // Update local state immediately
      setCartItems((prevItems) =>
        prevItems.reduce((acc, item) => {
          if (item.id === productId) {
            if (item.quantity > 1) {
              acc.push({ ...item, quantity: item.quantity - 1 });
            }
            // If quantity becomes 0, don't add to accumulator (removes item)
          } else {
            acc.push(item);
          }
          return acc;
        }, [])
      );

      // Try to sync with backend API (but don't fail if unavailable)
      try {
        await cartAPI.removeItem(productId);
      } catch (apiErr) {
        console.warn('Failed to sync with backend API:', apiErr.message);
        // Continue with local state only
      }
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError(err.message);
      // Reload cart from API to ensure consistency
      await loadCartFromAPI();
    }
  };

  // Remove entire item from cart
  const removeItemCompletely = async (productId) => {
    try {
      setError(null);
      
      // Update local state immediately
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));

      // Try to sync with backend API (but don't fail if unavailable)
      try {
        await cartAPI.removeItem(productId);
      } catch (apiErr) {
        console.warn('Failed to sync with backend API:', apiErr.message);
        // Continue with local state only
      }
    } catch (err) {
      console.error('Error removing item completely:', err);
      setError(err.message);
      // Reload cart from API to ensure consistency
      await loadCartFromAPI();
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      setError(null);
      setCartItems([]);
      
      // Clear cart in backend (you might need to implement this endpoint)
      // For now, we'll just clear local state
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError(err.message);
    }
  };

  // Calculate total items in cart
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    cartItems,
    loading,
    error,
    addToCart,
    removeFromCart,
    removeItemCompletely,
    clearCart,
    getTotalItems,
    getTotalPrice,
    loadCartFromAPI
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}; 