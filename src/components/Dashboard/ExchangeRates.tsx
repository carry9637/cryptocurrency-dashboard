import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import {
  setFromCurrency,
  setToCurrency,
  setAmount,
  calculateExchange,
  fetchExchangeRatesAsync,
} from '../../store/slices/exchangeSlice';
import { ArrowRightLeft, AlertCircle } from 'lucide-react';

const ExchangeRates: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { fromCurrency, toCurrency, amount, result, loading, error } = useSelector(
    (state: RootState) => state.exchange
  );
  const { cryptocurrencies } = useSelector((state: RootState) => state.crypto);
  const { supportedCurrencies } = useSelector((state: RootState) => state.currency);

  const allCurrencies = [
    ...supportedCurrencies.map(c => ({ id: c.code, name: c.name, type: 'fiat' })),
    ...cryptocurrencies.slice(0, 20).map(c => ({ id: c.id, name: c.name, type: 'crypto' })),
  ];

  useEffect(() => {
    const cryptoIds = cryptocurrencies.slice(0, 20).map(c => c.id).join(',');
    const currencies = supportedCurrencies.map(c => c.code).join(',');
    
    if (cryptoIds && currencies) {
      dispatch(fetchExchangeRatesAsync({ ids: cryptoIds, currencies }));
    }
  }, [dispatch, cryptocurrencies, supportedCurrencies]);

  useEffect(() => {
    dispatch(calculateExchange());
  }, [dispatch, amount, fromCurrency, toCurrency]);

  const handleAmountChange = (value: string) => {
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      dispatch(setAmount(value));
    }
  };

  const swapCurrencies = () => {
    dispatch(setFromCurrency(toCurrency));
    dispatch(setToCurrency(fromCurrency));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Exchange Calculator</h3>
      
      <div className="space-y-4">
        {/* From Currency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="Enter amount"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={fromCurrency}
              onChange={(e) => dispatch(setFromCurrency(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {allCurrencies.map((currency) => (
                <option key={currency.id} value={currency.id}>
                  {currency.name} ({currency.type})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapCurrencies}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
          >
            <ArrowRightLeft className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* To Currency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={result !== null ? result.toFixed(8) : ''}
              readOnly
              placeholder="Result"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
            <select
              value={toCurrency}
              onChange={(e) => dispatch(setToCurrency(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {allCurrencies.map((currency) => (
                <option key={currency.id} value={currency.id}>
                  {currency.name} ({currency.type})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center space-x-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center text-gray-500 text-sm">
            Fetching latest exchange rates...
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangeRates;