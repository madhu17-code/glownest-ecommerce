import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, addToCart } = useCart();

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price.replace('₹', '') * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">{item.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={() => removeFromCart(item.id)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => addToCart(item)} className="px-2 py-1 bg-gray-200 rounded">+</button>
              </div>
            </div>
          ))}
          <div className="mt-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Total: ₹{getTotalPrice()}</h2>
            <button onClick={clearCart} className="btn btn-secondary">
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 