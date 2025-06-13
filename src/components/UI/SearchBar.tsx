import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { setSearchQuery, setSelectedCrypto } from '../../store/slices/cryptoSlice';
import { Search, X } from 'lucide-react';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cryptocurrencies, searchQuery } = useSelector((state: RootState) => state.crypto);
  const [isOpen, setIsOpen] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredCryptos = cryptocurrencies.filter(crypto =>
    crypto.name.toLowerCase().includes(localQuery.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(localQuery.toLowerCase())
  ).slice(0, 10);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setLocalQuery(value);
    dispatch(setSearchQuery(value));
    setIsOpen(value.length > 0);
  };

  const handleCryptoSelect = (crypto: any) => {
    dispatch(setSelectedCrypto(crypto));
    setLocalQuery('');
    dispatch(setSearchQuery(''));
    setIsOpen(false);
  };

  const clearSearch = () => {
    setLocalQuery('');
    dispatch(setSearchQuery(''));
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={localQuery}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsOpen(localQuery.length > 0)}
          placeholder="Search cryptocurrencies..."
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {localQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && filteredCryptos.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {filteredCryptos.map((crypto) => (
            <button
              key={crypto.id}
              onClick={() => handleCryptoSelect(crypto)}
              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
            >
              <img src={crypto.image} alt={crypto.name} className="w-6 h-6 rounded-full" />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">{crypto.name}</p>
                <p className="text-xs text-gray-500">{crypto.symbol.toUpperCase()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  ${crypto.current_price.toFixed(2)}
                </p>
                <p className={`text-xs ${crypto.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;