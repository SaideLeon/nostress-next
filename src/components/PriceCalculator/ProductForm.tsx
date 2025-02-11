// src/components/PriceCalculator/ProductForm.tsx
import React from 'react';
import { Plus } from 'lucide-react';
import { CURRENCY_CONFIG, CurrencyCode } from './constants';

interface ProductFormProps {
  form: {
    name: string;
    priceType: 'total' | 'unit';
    price: string;
    quantity: string;
  };
  onFormChange: React.Dispatch<React.SetStateAction<{
    name: string;
    priceType: 'total' | 'unit';
    price: string;
    quantity: string;
  }>>;
  onAddProduct: () => void;
  selectedCurrency: CurrencyCode;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  form, 
  onFormChange, 
  onAddProduct, 
  selectedCurrency 
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFormChange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct();
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        name="name"
        placeholder="Nome do produto"
        value={form.name}
        onChange={handleInputChange}
        className="p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-blue-200/70"
        aria-label="Nome do produto"
      />

      <select
        name="priceType"
        value={form.priceType}
        onChange={handleInputChange}
        className="p-3 bg-white/5 border border-white/20 rounded-lg text-white"
        aria-label="Tipo de preço"
      >
        <option value="total" className="bg-blue-900">Preço Total</option>
        <option value="unit" className="bg-blue-900">Preço Unitário</option>
      </select>

      <input
        type="number"
        name="price"
        placeholder={`Preço (${CURRENCY_CONFIG[selectedCurrency].symbol})`}
        value={form.price}
        onChange={handleInputChange}
        className="p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-blue-200/70"
        aria-label="Valor do produto"
        min="0"
        step="0.01"
      />

      <input
        type="number"
        name="quantity"
        placeholder="Quantidade"
        value={form.quantity}
        onChange={handleInputChange}
        className="p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-blue-200/70"
        aria-label="Quantidade do produto"
        min="1"
      />

      <button 
        type="submit" 
        className="col-span-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
        aria-label="Adicionar produto"
      >
        <Plus className="w-5 h-5" />
        Adicionar Produto
      </button>
    </form>
  );
};

export default ProductForm;