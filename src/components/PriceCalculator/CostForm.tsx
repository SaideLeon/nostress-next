// src/components/PriceCalculator/CostForm.tsx
import React from 'react';
import { Plus } from 'lucide-react';
import { CURRENCY_CONFIG, CurrencyCode } from './constants';

// Tipos para o estado do formulário
interface CostFormState {
  description: string;
  value: string;
}

// Props do componente
interface CostFormProps {
  form: CostFormState;
  onFormChange: React.Dispatch<React.SetStateAction<CostFormState>>;
  onSubmit: (e: React.FormEvent) => void;
  selectedCurrency: CurrencyCode;
}

const CostForm: React.FC<CostFormProps> = ({
  form,
  onFormChange,
  onSubmit,
  selectedCurrency
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    onFormChange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        name="description"
        placeholder={CURRENCY_CONFIG[selectedCurrency].pt}
        value={form.description}
        onChange={handleInputChange}
        className="p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-blue-200/70"
        aria-label="Descrição do custo"
      />
      
      <input
        type="number"
        name="value"
        placeholder={`Valor (${CURRENCY_CONFIG[selectedCurrency].symbol})`}
        value={form.value}
        onChange={handleInputChange}
        className="p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-blue-200/70"
        aria-label="Valor do custo"
        min="0"
        step="0.01"
      />

      <button 
        type="submit" 
        className="col-span-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-3 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
        aria-label="Adicionar custo"
      >
        <Plus className="w-5 h-5" />
        Adicionar Custo
      </button>
    </form>
  );
};

export default CostForm;