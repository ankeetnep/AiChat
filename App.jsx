import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Logo from './Header/Logo.jsx';
import Sign from './Header/Sign.jsx';
import Services from './Header/Services.jsx';
import Foot from './Foot/Foot.jsx';
import Cart from './Header/Cart.jsx';
import { useSelector } from "react-redux"

const App = () => {
  const select = useSelector(state => state.cart.count)
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Responsive Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            {/* Logo - responsive text size */}
            <div className="flex items-center">
              <Link
                to="/"
                className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
              >
                CODEWITHANKIT
              </Link>
            </div>
            
            {/* Navigation Links - responsive layout */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <Link
                to="/sign"
                className="text-sm sm:text-base text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-100"
              >
                SignIn
              </Link>
              <Link
                to="/services"
                className="text-sm sm:text-base text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Services
              </Link>
              <Link
                to="/cart"
                className="text-sm sm:text-base text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Cart <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs ml-1">{select}</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - responsive padding */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Logo />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/services" element={<Services />} />
          <Route path="/foot" element={<Foot />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>

      {/* Floating Action Button - responsive positioning */}
      <Link to="/foot">
        <button className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center text-xl sm:text-2xl hover:scale-110">
          💬
        </button>
      </Link>
    </div>
  );
};

export default App;