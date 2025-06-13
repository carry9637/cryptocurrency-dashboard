import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { RootState, AppDispatch } from '../../store/store';
import { fetchChartData } from '../../store/slices/cryptoSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PriceChart() {
  const dispatch = useDispatch<AppDispatch>();
  const { chartData, chartType, selectedCrypto, baseCurrency, cryptocurrencies } = useSelector(
    (state: RootState) => state.crypto
  );

  const chartRef = useRef<any>(null);
  const [selectedDays, setSelectedDays] = useState(7);

  // Limit selectedCrypto to one item for chart data fetching
  const selectedCryptoLimited = selectedCrypto.length > 0 ? [selectedCrypto[0]] : [];

  useEffect(() => {
    if (selectedCryptoLimited.length > 0) {
      // Fetch data for the first selected crypto with selectedDays
      dispatch(fetchChartData({ 
        cryptoId: selectedCryptoLimited[0], 
        currency: baseCurrency, 
        days: selectedDays 
      }));
    }
  }, [dispatch, selectedCryptoLimited, baseCurrency, selectedDays]);

  if (!chartData) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const selectedCryptoData = cryptocurrencies.filter(crypto => 
    selectedCrypto.includes(crypto.id)
  );

  const colors = ['#3B82F6', '#14B8A6', '#F97316', '#EF4444', '#8B5CF6', '#F59E0B'];

  const data = {
    labels: chartData.labels,
    datasets: selectedCryptoData.map((crypto, index) => ({
      label: crypto.name,
      data: chartData.prices, // In a real app, you'd fetch data for each crypto
      borderColor: colors[index % colors.length],
      backgroundColor: chartType === 'bar' 
        ? colors[index % colors.length] + '20'
        : colors[index % colors.length] + '10',
      borderWidth: 2,
      fill: chartType === 'line',
      tension: 0.4,
    })),
  };

  const options: ChartOptions<'line' | 'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1F2937',
        bodyColor: '#1F2937',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: function(context) {
            const currencySymbol = baseCurrency === 'usd' ? '$' : baseCurrency.toUpperCase();
            return `${context.dataset.label}: ${currencySymbol}${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#6B7280',
          callback: function(value) {
            const currencySymbol = baseCurrency === 'usd' ? '$' : baseCurrency.toUpperCase();
            return `${currencySymbol}${Number(value).toLocaleString()}`;
          },
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  const ChartComponent = chartType === 'line' ? Line : Bar;

  const buttonClass = (days: number) =>
    `px-3 py-1 rounded-md transition-colors ${
      selectedDays === days ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-500'
    }`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Price Chart</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <button className={buttonClass(7)} onClick={() => setSelectedDays(7)}>
            7D
          </button>
          <button className={buttonClass(30)} onClick={() => setSelectedDays(30)}>
            30D
          </button>
          <button className={buttonClass(90)} onClick={() => setSelectedDays(90)}>
            90D
          </button>
          <button className={buttonClass(365)} onClick={() => setSelectedDays(365)}>
            1Y
          </button>
        </div>
      </div>
      
      <div className="h-80">
        <ChartComponent ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
}
