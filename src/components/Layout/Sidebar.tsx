import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchCryptocurrenciesAsync, setSelectedCrypto } from '../../store/slices/cryptoSlice';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cryptocurrencies, loading, selectedCrypto } = useSelector((state: RootState) => state.crypto);
  const { baseCurrency, supportedCurrencies } = useSelector((state: RootState) => state.currency);

  const currencySymbol = supportedCurrencies.find(c => c.code === baseCurrency)?.symbol || '$';

  useEffect(() => {
    dispatch(fetchCryptocurrenciesAsync(baseCurrency));
  }, [dispatch, baseCurrency]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: baseCurrency.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price);
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `${currencySymbol}${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `${currencySymbol}${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `${currencySymbol}${(marketCap / 1e6).toFixed(2)}M`;
    }
    return `${currencySymbol}${marketCap.toFixed(2)}`;
  };

  const getPriceChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  if (loading) {
    return (
      <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Top Cryptocurrencies</h2>
        </div>
        <div className="p-4 space-y-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Top Cryptocurrencies</h2>
        <p className="text-sm text-gray-500">Sorted by market cap</p>
      </div>
      
      <div className="divide-y divide-gray-100">
        {cryptocurrencies.slice(0, 50).map((crypto) => (
          <div
            key={crypto.id}
            onClick={() => dispatch(setSelectedCrypto(crypto))}
            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
              selectedCrypto?.id === crypto.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="absolute -top-1 -right-1 bg-gray-100 text-xs font-medium text-gray-600 px-1 rounded">
                  {crypto.market_cap_rank}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {crypto.name}
                  </h3>
                  <span className="text-xs text-gray-500 uppercase">
                    {crypto.symbol}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-semibold text-gray-900">
                    {formatPrice(crypto.current_price)}
                  </span>
                  <div className="flex items-center space-x-1">
                    {getPriceChangeIcon(crypto.price_change_percentage_24h)}
                    <span className={`text-xs font-medium ${getPriceChangeColor(crypto.price_change_percentage_24h)}`}>
                      {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                    </span>
                  </div>
                </div>
                
                <div className="mt-1">
                  <span className="text-xs text-gray-500">
                    Market Cap: {formatMarketCap(crypto.market_cap)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;