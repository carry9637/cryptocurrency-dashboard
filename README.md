<<<<<<< HEAD
# CryptoTracker Pro - Student Project

A comprehensive cryptocurrency dashboard built with React, Redux, and modern web technologies as part of a college web development project.

## Features

### Core Functionality
- **Real-time Cryptocurrency Data**: Live prices, market caps, and price changes from CoinGecko API
- **Interactive Price Charts**: Line and bar charts with multiple cryptocurrency comparison
- **Portfolio Management**: Visual portfolio breakdown with pie chart representation
- **Currency Exchange Calculator**: Real-time conversion between cryptocurrencies
- **Multi-Currency Support**: Support for USD, EUR, GBP, JPY, INR, and more
- **Advanced Search**: Search and filter cryptocurrencies with autocomplete
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Technical Features
- **Redux State Management**: Centralized state with Redux Toolkit
- **Chart.js Integration**: Professional data visualization
- **Real-time Updates**: Auto-refresh data every 30 seconds  
- **Error Handling**: Comprehensive error handling and validation
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Clean, professional interface with smooth animations

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit with Redux Thunk
- **Charts**: Chart.js with react-chartjs-2
- **Styling**: TailwindCSS for responsive design
- **API**: CoinGecko API for cryptocurrency data
- **Icons**: Lucide React for modern iconography
- **Build Tool**: Vite for fast development and building

## Project Structure

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.tsx
│   │   ├── CurrencyDropdown.tsx
│   │   ├── SearchBar.tsx
│   │   ├── ChartTypeSelector.tsx
│   │   └── CryptocurrencySelector.tsx
│   ├── Chart/
│   │   └── PriceChart.tsx
│   ├── Portfolio/
│   │   └── PortfolioChart.tsx
│   ├── Exchange/
│   │   └── ExchangeCalculator.tsx
│   └── Sidebar/
│       └── CryptoList.tsx
├── store/
│   ├── store.ts
│   └── slices/
│       ├── cryptoSlice.ts
│       ├── portfolioSlice.ts
│       └── exchangeSlice.ts
├── services/
│   └── cryptoApi.ts
└── App.tsx
```

## Installation and Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd crypto-tracker-pro
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Key Components

### Dashboard Features
- **Header Navigation**: Currency selection, search, chart type selector
- **Price Chart**: Interactive charts with multiple cryptocurrency comparison
- **Portfolio Section**: Pie chart showing portfolio distribution
- **Exchange Calculator**: Real-time currency conversion tool
- **Crypto List**: Sidebar with top cryptocurrencies by market cap

### Data Management
- **Redux Store**: Centralized state management for crypto data, portfolio, and exchange
- **API Integration**: Real-time data fetching from CoinGecko API
- **Error Handling**: Comprehensive error handling for API failures
- **Data Validation**: Input validation for exchange calculator

## API Integration

The application uses the CoinGecko API for:
- Cryptocurrency market data
- Historical price charts
- Exchange rates
- Search functionality

## Student Learning Objectives

This project demonstrates proficiency in:
- **React Development**: Modern React with hooks and functional components
- **State Management**: Complex state management with Redux
- **API Integration**: RESTful API consumption and data handling
- **Data Visualization**: Interactive charts and graphs
- **Responsive Design**: Mobile-first responsive web design
- **TypeScript**: Type-safe development practices
- **Modern Web Development**: Current industry standards and best practices

## Future Enhancements

- User authentication and personal portfolios
- Price alerts and notifications
- Advanced technical analysis tools
- News integration
- Social trading features

## License

This project is created for educational purposes as part of a college web development course.

---

**Author**: [Student Name]  
**Course**: Web Development  
**Institution**: [College Name]  
**Year**: 2024
=======
# cryptocurrency-dashboard
A responsive cryptocurrency dashboard to track real-time coin prices, charts, and market trends.

## 🚀 Features

- Live cryptocurrency prices
- Currency selector (INR, USD, etc.)
- Exchange rate converter (Crypto ↔ Currency)
- Market cap list
- Search cryptocurrency by name
- Interactive charts (Line, Bar, Pie)

## 🛠️ Tech Used

- ReactJS
- Redux
- Tailwind CSS
- Chart.js
- CoinGecko API

## 📦 Installation & Run

```bash
git clone https://github.com/cary9637/cryptocurrency-dashboard
cd cryptocurrency dashboard
npm install
npm run dev
>>>>>>> 0df8dbfafcf1659a47a2fd3aa31ec017aeccdaaf
