// src/components/PriceCalculator/CurrencySelector.tsx
import React from 'react';
import { CURRENCY_CONFIG, CurrencyCode } from './constants';

interface CurrencySelectorProps {
  selectedCurrency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency,
  onCurrencyChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as CurrencyCode;
    if (Object.keys(CURRENCY_CONFIG).includes(value)) {
      onCurrencyChange(value);
    }
  };

  return (
    <select
      value={selectedCurrency}
      onChange={handleChange}
      className="p-2 bg-white/5 border border-white/20 rounded-lg text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
      aria-label="Seletor de moeda"
    >
      {Object.entries(CURRENCY_CONFIG).map(([code, config]) => (
        <option 
          key={code} 
          value={code}
          className="bg-gray-900 text-white hover:bg-emerald-500"
        >
          {config.name} ({code})
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;