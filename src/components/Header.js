import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { getTotalProducts } = useCart();
  const totalProducts = getTotalProducts();

  return (
    <header className="shadow-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Section */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg">
                <span className="text-xl font-bold text-indigo-600">NB</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-wide text-white">
                  Nadir Brothers
                </h1>
                <p className="text-sm text-indigo-200">Product Catalog</p>
              </div>
            </div>
          </div>
          
          {/* Navigation Info
          <div className="flex items-center space-x-2 text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
              />
            </svg>
            <span className="font-medium">Shop Our Products</span>
          </div> */}

          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="font-medium text-white transition-colors hover:text-indigo-200">
              Products
            </Link>
            
            <Link 
              to="/cart" 
              className="relative p-2 text-white transition-colors hover:text-indigo-200"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" 
                />
              </svg>
              {totalProducts > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {totalProducts}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
