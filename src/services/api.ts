import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for rate limiting
api.interceptors.request.use(
  (config) => {
    // Initialize retry count if not present
    config.retryCount = config.retryCount || 0;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling with retry logic
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;
    const maxRetries = 3;
    const retryDelay = 2000;

    // Don't retry if we've exceeded max retries or if config is missing
    if (!config || config.retryCount >= maxRetries) {
      return Promise.reject(error);
    }

    // Increment retry count
    config.retryCount = (config.retryCount || 0) + 1;

    // Check for rate limit (429) or network errors (no response)
    if (error.response?.status === 429 || !error.response) {
      const errorType = error.response?.status === 429 ? 'Rate limit exceeded' : 'Network error';
      console.warn(`${errorType}, retrying (${config.retryCount}/${maxRetries}) after delay...`);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      
      // Retry the request
      return api.request(config);
    }

    return Promise.reject(error);
  }
);

export const fetchCryptocurrencies = async (currency: string = 'usd') => {
  try {
    // Add delay to prevent rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const [coinsResponse, globalResponse] = await Promise.allSettled([
      api.get(`/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`),
      api.get('/global')
    ]);
    
    const coins = coinsResponse.status === 'fulfilled' ? coinsResponse.value.data : [];
    const globalData = globalResponse.status === 'fulfilled' ? globalResponse.value.data.data : {
      total_market_cap: { [currency]: 0 },
      total_volume: { [currency]: 0 },
      market_cap_percentage: {}
    };
    
    return {
      coins,
      ...globalData
    };
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error);
    // Return fallback data instead of throwing
    return {
      coins: [],
      total_market_cap: { [currency]: 0 },
      total_volume: { [currency]: 0 },
      market_cap_percentage: {}
    };
  }
};

export const fetchCryptoDetails = async (id: string, currency: string = 'usd') => {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    const response = await api.get(`/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto details:', error);
    throw error;
  }
};

export const fetchMarketChart = async (id: string, currency: string = 'usd', days: number = 7) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    const response = await api.get(`/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=${days > 30 ? 'daily' : 'hourly'}`);
    return {
      success: true,
      data: response.data,
      error: null
    };
  } catch (error) {
    console.error(`Error fetching market chart for ${id}:`, error);
    
    // Determine error type for better user feedback
    let errorMessage = 'Unknown error occurred';
    if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      errorMessage = 'Network connection failed. Please check your internet connection and try again.';
    } else if (error.response?.status === 429) {
      errorMessage = 'Too many requests. Please wait a moment and try again.';
    } else if (error.response?.status >= 500) {
      errorMessage = 'Server error. The service may be temporarily unavailable.';
    } else if (error.response?.status === 404) {
      errorMessage = `Cryptocurrency "${id}" not found.`;
    }
    
    return {
      success: false,
      data: {
        prices: [],
        market_caps: [],
        total_volumes: []
      },
      error: errorMessage
    };
  }
};

export const fetchExchangeRates = async (ids: string, currencies: string) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    const response = await api.get(`/simple/price?ids=${ids}&vs_currencies=${currencies}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return {};
  }
};

export const searchCryptocurrencies = async (query: string) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    const response = await api.get(`/search?query=${query}`);
    return response.data.coins;
  } catch (error) {
    console.error('Error searching cryptocurrencies:', error);
    return [];
  }
};