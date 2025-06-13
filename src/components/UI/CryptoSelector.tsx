import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ChevronDown, X, Plus } from 'lucide-react';

interface CryptoSelectorProps {
  selectedCryptos: string[];
  onSelectionChange: (cryptos: string[]) => void;
}

const CryptoSelector: React.FC<CryptoSelectorProps> = ({ selectedCryptos, onSelectionChange }) => {
  const { cryptocurrencies } = useSelector((state: RootState) => state.crypto);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCryptos = cryptocurrencies.filter(crypto =>
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 20);

  const selectedCryptoData = cryptocurrencies.filter(crypto => 
    selectedCryptos.includes(crypto.id)
  );

  const handleCryptoToggle = (cryptoId: string) => {
    if (selectedCryptos.includes(cryptoId)) {
      onSelectionChange(selectedCryptos.filter(id => id !== cryptoId));
    } else if (selectedCryptos.length < 5) {
      onSelectionChange([...selectedCryptos, cryptoId]);
    }
  };

  const removeCrypto = (cryptoId: string) => {
    onSelectionChange(selectedCryptos.filter(id => id !== cryptoId));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Select Cryptocurrencies for Comparison (Max 5)
      </label>
      
      {/* Selected Cryptos */}
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedCryptoData.map((crypto) => (
          <div
            key={crypto.id}
            className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
          >
            <img src={crypto.image} alt={crypto.name} className="w-4 h-4 rounded-full" />
            <span>{crypto.name}</span>
            <button
              onClick={() => removeCrypto(crypto.id)}
              className="hover:bg-blue-200 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Crypto Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={selectedCryptos.length >= 5}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Cryptocurrency</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-3 border-b border-gray-100">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cryptocurrencies..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filteredCryptos.map((crypto) => {
                const isSelected = selectedCryptos.includes(crypto.id);
                const isDisabled = !isSelected && selectedCryptos.length >= 5;
                
                return (
                  <button
                    key={crypto.id}
                    onClick={() => !isDisabled && handleCryptoToggle(crypto.id)}
                    disabled={isDisabled}
                    className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isSelected ? 'bg-blue-50' : ''
                    }`}
                  >
                    <img src={crypto.image} alt={crypto.name} className="w-6 h-6 rounded-full" />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-gray-900">{crypto.name}</p>
                      <p className="text-xs text-gray-500">{crypto.symbol.toUpperCase()}</p>
                    </div>
                    {isSelected && (
                      <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {isOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CryptoSelector;