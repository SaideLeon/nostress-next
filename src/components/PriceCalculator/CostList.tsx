// src/components/PriceCalculator/CostList.tsx
import React from 'react';
import { Trash2 } from 'lucide-react';
import { formatCurrency } from './utils';
import { CurrencyCode } from './constants';

// Interface para o tipo Cost
interface Cost {
  description: string;
  value: number;
}

interface CostListProps {
  costs: Cost[];
  onRemove: (index: number) => void;
  selectedCurrency: CurrencyCode;
}

const CostList: React.FC<CostListProps> = ({ 
  costs, 
  onRemove, 
  selectedCurrency 
}) => {
  if (!costs.length) return null;

  return (
    <div className="mt-6">
      <h4 className="text-lg font-medium text-blue-200 mb-3">
        Custos Cadastrados:
      </h4>
      
      <div className="space-y-2">
        {costs.map((cost, index) => (
          <div 
            key={`${cost.description}-${index}`}
            className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10"
          >
            <div className="flex-1 min-w-0">
              <p className="text-white truncate">
                {cost.description}
              </p>
              <p className="text-sm text-gray-400">
                {formatCurrency(cost.value, selectedCurrency)}
              </p>
            </div>
            
            <button
              onClick={() => onRemove(index)}
              className="ml-4 text-red-400 hover:text-red-300 transition-colors"
              aria-label={`Remover custo ${cost.description}`}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CostList;