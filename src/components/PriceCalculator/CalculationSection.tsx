// src/components/PriceCalculator/CalculationSection.tsx
import React from 'react';
import { Calculator } from 'lucide-react';
interface CalculationSectionProps {
  profitMargin: string;
  onProfitMarginChange: (value: string) => void;
  onCalculate: () => void;
  disabled: boolean;
  marginType: 'product' | 'total';
  onMarginTypeChange: (type: 'product' | 'total') => void;
}


const CalculationSection: React.FC<CalculationSectionProps> = ({
  profitMargin,
  onProfitMarginChange,
  onCalculate,
  disabled,
  marginType,
  onMarginTypeChange
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) { // Validação de números decimais
      onProfitMarginChange(value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onCalculate();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    	<select
        value={marginType}
        onChange={(e) => onMarginTypeChange(e.target.value as 'product' | 'total')}
        className="p-2 bg-white/5 border border-white/20 rounded-lg text-white"
      >
        <option value="product">Margem sobre produto</option>
        <option value="total">Margem sobre total</option>
      </select>
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          placeholder="Margem de Lucro (%)"
          value={profitMargin}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-blue-200/70 pr-12"
          aria-label="Digite a margem de lucro desejada"
          disabled={disabled}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200/70">%</span>
      </div>

      <button
        onClick={onCalculate}
        disabled={disabled}
        className={`p-3 rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
          disabled 
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
        }`}
        aria-label={disabled ? "Calcular preços (desabilitado)" : "Calcular preços"}
      >
        <Calculator className="w-5 h-5" />
        <span>Calcular Preços</span>
      </button>
    </div>
  );
};

export default CalculationSection;