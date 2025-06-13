import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { setBaseCurrency } from '../../store/slices/currencySlice';
import { ChevronDown, Check } from 'lucide-react';

const CurrencySelector: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { baseCurrency, supportedCurrencies } = useSelector((state: RootState) => state.currency);
  const [isOpen, setIsOpen] = useState(false);

  const selectedCurrency = supportedCurrencies.find(c => c.code === baseCurrency);

  const handleCurrencyChange = (currencyCode: string) => {
    dispatch(setBaseCurrency(currencyCode));
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
      >
        <span className="font-medium text-gray-900">
          {selectedCurrency?.symbol} {selectedCurrency?.code.toUpperCase()}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-2 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-900">Select Base Currency</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {supportedCurrencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => handleCurrencyChange(currency.code)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{currency.symbol}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{currency.name}</p>
                    <p className="text-xs text-gray-500">{currency.code.toUpperCase()}</p>
                  </div>
                </div>
                {baseCurrency === currency.code && (
                  <Check className="w-4 h-4 text-blue-600" />
                )}
              </button>
            ))}
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
  );
};

export default CurrencySelector;