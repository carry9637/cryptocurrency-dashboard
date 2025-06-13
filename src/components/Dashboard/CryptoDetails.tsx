import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Cryptocurrency } from '../../store/slices/cryptoSlice';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Coins } from 'lucide-react';

interface CryptoDetailsProps {
  crypto: Cryptocurrency;
}

const CryptoDetails: React.FC<CryptoDetailsProps> = ({ crypto }) => {
  const { baseCurrency, supportedCurrencies } = useSelector((state: RootState) => state.currency);
  const currencySymbol = supportedCurrencies.find(c => c.code === baseCurrency)?.symbol || '$';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: baseCurrency.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(price);
  };

  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) {
      return `${currencySymbol}${(num / 1e12).toFixed(2)}T`;
    } else if (num >= 1e9) {
      return `${currencySymbol}${(num / 1e9).toFixed(2)}B`;
    } else if (num >= 1e6) {
      return `${currencySymbol}${(num / 1e6).toFixed(2)}M`;
    }
    return `${currencySymbol}${num.toFixed(2)}`;
  };

  const formatSupply = (supply: number) => {
    if (supply >= 1e9) {
      return `${(supply / 1e9).toFixed(2)}B`;
    } else if (supply >= 1e6) {
      return `${(supply / 1e6).toFixed(2)}M`;
    } else if (supply >= 1e3) {
      return `${(supply / 1e3).toFixed(2)}K`;
    }
    return supply.toFixed(0);
  };

  const priceChangeColor = crypto.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600';
  const priceChangeIcon = crypto.price_change_percentage_24h >= 0 ? 
    <TrendingUp className="w-4 h-4" /> : 
    <TrendingDown className="w-4 h-4" />;

  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <img src={crypto.image} alt={crypto.name} className="w-10 h-10 rounded-full" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{crypto.name}</h3>
          <p className="text-sm text-gray-500 uppercase">{crypto.symbol}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-2xl font-bold text-gray-900">{formatPrice(crypto.current_price)}</p>
          <div className={`flex items-center space-x-1 ${priceChangeColor}`}>
            {priceChangeIcon}
            <span className="text-sm font-medium">
              {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Market Cap</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {formatLargeNumber(crypto.market_cap)}
          </p>
          <p className="text-xs text-gray-500">Rank #{crypto.market_cap_rank}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">24h Volume</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {formatLargeNumber(crypto.total_volume)}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Coins className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Circulating Supply</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {formatSupply(crypto.circulating_supply)}
          </p>
          <p className="text-xs text-gray-500">{crypto.symbol.toUpperCase()}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Coins className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Max Supply</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {crypto.max_supply ? formatSupply(crypto.max_supply) : 'N/A'}
          </p>
          <p className="text-xs text-gray-500">{crypto.symbol.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;