// src/components/PriceCalculator/ProductList.tsx
import React from 'react';
import { Trash2 } from 'lucide-react';
import { formatCurrency } from './utils';
import { CurrencyCode } from './constants';

interface Product {
  id: string;
  name: string;
  quantity: number;
  priceUnitario: number;
  lastUpdated: Date;
}

interface ProductListProps {
  products: Product[];
  onRemove: (id: string) => void;
  selectedCurrency: CurrencyCode;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onRemove,
  selectedCurrency
}) => {
  if (!products.length) {
    return (
      <div className="mt-6 text-center text-blue-200">
        Nenhum produto cadastrado
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h4 className="text-lg font-medium text-blue-200 mb-3">
        Produtos Cadastrados:
      </h4>
      
      <div className="space-y-2">
        {products.map((product) => (
          <div 
            key={product.id}
            className="group flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-500/20 transition-colors"
          >
            <div className="flex-1 min-w-0 pr-4">
              <h5 className="text-white font-medium truncate">
                {product.name}
              </h5>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                <span className="text-sm text-emerald-300">
                  {product.quantity} un.
                </span>
                <span className="text-sm text-blue-300">
                  {formatCurrency(product.priceUnitario, selectedCurrency)}/un
                </span>
                {product.lastUpdated && (
                  <span className="text-sm text-gray-400">
                    Atualizado: {product.lastUpdated.toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => onRemove(product.id)}
              className="opacity-70 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all"
              aria-label={`Remover produto ${product.name}`}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;