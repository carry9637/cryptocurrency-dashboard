import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { TrendingUp, DollarSign, BarChart3, Activity } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const MarketOverview: React.FC = () => {
  const { marketData, cryptocurrencies } = useSelector((state: RootState) => state.crypto);
  const { baseCurrency, supportedCurrencies } = useSelector((state: RootState) => state.currency);

  const currencySymbol = supportedCurrencies.find(c => c.code === baseCurrency)?.symbol || '$';

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

  const pieChartData = {
    labels: cryptocurrencies.slice(0, 10).map(crypto => crypto.name),
    datasets: [
      {
        data: cryptocurrencies.slice(0, 10).map(crypto => crypto.market_cap),
        backgroundColor: [
          '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
          '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16'
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.parsed;
            return `${context.label}: ${formatLargeNumber(value)}`;
          },
        },
      },
    },
  };

  const totalMarketCap = marketData?.total_market_cap?.[baseCurrency] || 0;
  const totalVolume = marketData?.total_volume?.[baseCurrency] || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Market Stats */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Market Cap</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatLargeNumber(totalMarketCap)}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">24h Volume</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatLargeNumber(totalVolume)}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Cryptos</p>
              <p className="text-2xl font-bold text-gray-900">
                {cryptocurrencies.length.toLocaleString()}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Market Cap Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Cap Distribution</h3>
        <div className="h-64">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;