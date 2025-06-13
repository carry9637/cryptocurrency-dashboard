import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ChartComponent from '../Charts/ChartComponent';
import MarketOverview from './MarketOverview';
import ExchangeRates from './ExchangeRates';
import CryptoDetails from './CryptoDetails';

const MainDashboard: React.FC = () => {
  const { selectedCrypto } = useSelector((state: RootState) => state.crypto);

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Market Overview */}
        <MarketOverview />
        
        {/* Main Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <ChartComponent />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Exchange Rates */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <ExchangeRates />
          </div>
          
          {/* Crypto Details */}
          {selectedCrypto && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <CryptoDetails crypto={selectedCrypto} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;