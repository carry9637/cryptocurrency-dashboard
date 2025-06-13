import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
  baseCurrency: string;
  supportedCurrencies: { code: string; name: string; symbol: string }[];
}

const initialState: CurrencyState = {
  baseCurrency: 'usd',
  supportedCurrencies: [
    { code: 'usd', name: 'US Dollar', symbol: '$' },
    { code: 'eur', name: 'Euro', symbol: '€' },
    { code: 'gbp', name: 'British Pound', symbol: '£' },
    { code: 'jpy', name: 'Japanese Yen', symbol: '¥' },
    { code: 'inr', name: 'Indian Rupee', symbol: '₹' },
    { code: 'cad', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'aud', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'chf', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'cny', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'krw', name: 'South Korean Won', symbol: '₩' },
  ],
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setBaseCurrency: (state, action: PayloadAction<string>) => {
      state.baseCurrency = action.payload;
    },
  },
});

export const { setBaseCurrency } = currencySlice.actions;
export default currencySlice.reducer;