import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  const handleQuantityChange = (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mb-8">
          <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Start shopping to add items to your cart!</p>
        <Link 
          to="/" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <div key={item._id} className="p-6 flex items-center space-x-4">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <p className="text-gray-600">Rs {item.price}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity, -1)}
                  disabled={item.quantity <= 1}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    item.quantity <= 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  -
                </button>
                
                <span className="w-12 text-center font-medium">{item.quantity}</span>
                
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity, 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                >
                  +
                </button>
              </div>
              
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  Rs {(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold text-gray-900">Total:</span>
            <span className="text-2xl font-bold text-blue-600">
              Rs {getTotalPrice().toFixed(2)}
            </span>
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium text-center transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              to="/checkout"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-center transition-colors"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
