import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CurrencySelector from '../UI/CurrencySelector';
import SearchBar from '../UI/SearchBar';
import { TrendingUp, BarChart3 } from 'lucide-react';

const Header: React.FC = () => {
  const { baseCurrency, supportedCurrencies } = useSelector((state: RootState) => state.currency);
  const selectedCurrency = supportedCurrencies.find(c => c.code === baseCurrency);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CryptoDash</h1>
              <p className="text-xs text-gray-500">Real-time crypto analytics</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* Currency Selector */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <BarChart3 className="w-4 h-4" />
              <span>Base Currency:</span>
            </div>
            <CurrencySelector />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;