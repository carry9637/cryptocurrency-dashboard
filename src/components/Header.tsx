import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, Heart, User } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-gray-100 text-center py-2 text-sm">
        <p>Free delivery on orders over $150 | <span className="underline cursor-pointer">Shop now</span></p>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold">
              <span className="bg-black text-white px-2 py-1 rounded">NIKE</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-black transition-colors duration-200 font-medium">New & Featured</a>
            <a href="#" className="text-gray-700 hover:text-black transition-colors duration-200 font-medium">Men</a>
            <a href="#" className="text-gray-700 hover:text-black transition-colors duration-200 font-medium">Women</a>
            <a href="#" className="text-gray-700 hover:text-black transition-colors duration-200 font-medium">Kids</a>
            <a href="#" className="text-gray-700 hover:text-black transition-colors duration-200 font-medium">Sale</a>
          </nav>

          {/* Search and Icons */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-transparent outline-none text-sm w-32"
              />
            </div>
            <Heart className="w-6 h-6 text-gray-700 hover:text-red-500 cursor-pointer transition-colors duration-200" />
            <div className="relative">
              <ShoppingBag className="w-6 h-6 text-gray-700 hover:text-black cursor-pointer transition-colors duration-200" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
            </div>
            <User className="w-6 h-6 text-gray-700 hover:text-black cursor-pointer transition-colors duration-200" />
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-white shadow-lg border-t">
            <nav className="flex flex-col space-y-4 p-4">
              <a href="#" className="text-gray-700 hover:text-black transition-colors duration-200 font-medium">New & Featured</a>
              <a href="#" className="text-gray-700 hover:text-black transition-colors duration-200 font-medium">Men</a>
              <a href="#" className="text-gray-700 hover:text-black transition-colors duration-200 font-medium">Women</a>
              <a href="#" className="text-gray-700 hover:text-black transition-colors duration-200 font-medium">Kids</a>
              <a href="#" className="text-gray-700 hover:text-black transition-colors duration-200 font-medium">Sale</a>
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mt-4">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="bg-transparent outline-none text-sm flex-1"
                />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;