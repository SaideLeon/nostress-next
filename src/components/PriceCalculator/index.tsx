// src/components/PriceCalculator/index.tsx
import React, { useState } from 'react';
import CurrencySelector from './CurrencySelector';
import ProductForm from './ProductForm';
import CostForm from './CostForm';
import ProductList from './ProductList';
import CostList from './CostList';
import CalculationSection from './CalculationSection';
import ResultsSection from './ResultsSection';
import { CurrencyCode } from './constants';
import Navbar from '../Navbar/Navbar';





// Adicione esta interface no início do arquivo
interface Product {
  id: string;
  name: string;
  priceType: 'total' | 'unit';
  quantity: number;
  priceUnitario: number;
  custoTotal: number;
  lastUpdated: Date;
}

interface Cost {
  description: string;
  value: number;
}

interface PricingResults {
  custosFixos: number;
  custosProdutos: number;
  custos: Array<{
    description: string;
    value: number;
  }>;
  detalhes: Array<{
    produto: string;
    quantidade: number;
    custoUnitarioBase: number;
    custoFixoPorUnidade: number;
    precoVendaSugerido1: number;
    valorTotalVendas1: number;
    lucroTotalEsperado1: number;
    precoVendaSugerido2: number;
    valorTotalVendas2: number;
    lucroTotalEsperado2: number;
    custoTotal: number;
  }>;
}

const PriceCalculator: React.FC = () => {
  // Estados principais
  const [marginType, setMarginType] = useState<'product' | 'total'>('product');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('BRL');
  const [products, setProducts] = useState<Product[]>([]);
  const [costs, setCosts] = useState<Cost[]>([]);
  const [profitMargin, setProfitMargin] = useState('');
  const [results, setResults] = useState<PricingResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Estado do formulário de produto
  const [productForm, setProductForm] = useState({
    name: '',
    priceType: 'total' as 'total' | 'unit',
    price: '',
    quantity: '',
  });

  // Estado do formulário de custos
  const [costForm, setCostForm] = useState({
    description: '',
    value: '',
  });

  // Manipulador de adição de produto
  const handleAddProduct = () => {
    const { name, priceType, price, quantity } = productForm;

    // Validações
    if (!name || !price || !quantity) {
      alert('Por favor, preencha todos os campos do produto');
      return;
    }

    const numPrice = parseFloat(price);
    const numQuantity = parseInt(quantity);

    if (isNaN(numPrice) || isNaN(numQuantity) || numPrice <= 0 || numQuantity <= 0) {
      alert('Preços e quantidades devem ser números válidos maiores que zero!');
      return;
    }

    // Cria novo produto
    const newProduct = {
    id: Date.now().toString(), // ID único
    name,
    priceType,
    quantity: numQuantity,
    priceUnitario: priceType === 'total' ? numPrice / numQuantity : numPrice,
    custoTotal: priceType === 'total' ? numPrice : numPrice * numQuantity,
    lastUpdated: new Date() // Adiciona a data atual
  };

  setProducts(prev => [...prev, newProduct]);
  setProductForm({ name: '', priceType: 'total', price: '', quantity: '' });
  };

  // Manipulador de adição de custo
  const handleAddCost = (e: React.FormEvent) => {
    e.preventDefault();
    const { description, value } = costForm;

    try {
      if (!description || !value) {
        alert('Por favor, preencha todos os campos do custo');
        return;
      }

      const numValue = parseFloat(value);
      if (isNaN(numValue) || numValue <= 0) {
        alert('O valor deve ser um número válido maior que zero!');
        return;
      }

      setCosts(prev => [...prev, { description, value: numValue }]);
      setCostForm({ description: '', value: '' });
    } catch (error) {
      console.error('Erro ao adicionar custo:', error);
      alert('Erro ao adicionar custo. Verifique os dados.');
    }
  };

  // Função de cálculo principal
  const calculatePrices = () => {
    try {
      if (!products.length) {
        alert('Adicione pelo menos um produto!');
        return;
      }

      const marginValue = parseFloat(profitMargin);
      if (!profitMargin || isNaN(marginValue) || marginValue <= 0) {
        alert('Margem de lucro inválida!');
        return;
      }

      const marginDecimal = marginValue / 100;
      const totalCustosProdutos = products.reduce((sum, p) => sum + p.custoTotal, 0);
      const totalCustosFixos = costs.reduce((sum, c) => sum + c.value, 0);
		const detalhes = products.map(produto => {
		        const custoFixoPorUnidade = totalCustosFixos / produto.quantity;
		        const custoTotal = produto.custoTotal + totalCustosFixos;
		
		        // Nova lógica condicional
		        let precoVenda1, precoVenda2;
		        
		        if (marginType === 'product') {
		          // Margem apenas sobre o custo do produto
		          precoVenda1 = produto.priceUnitario * (1 + marginDecimal);
		          precoVenda2 = (produto.custoTotal / produto.quantity) * (1 + marginDecimal);
		        } else {
		          // Margem sobre o custo total (produto + fixos)
		          precoVenda1 = (produto.priceUnitario + custoFixoPorUnidade) * (1 + marginDecimal);
		          precoVenda2 = (custoTotal / produto.quantity) * (1 + marginDecimal);
		        }
		
		        return {
		          produto: produto.name,
		          quantidade: produto.quantity,
		          custoUnitarioBase: produto.priceUnitario,
		          custoFixoPorUnidade,
		          precoVendaSugerido1: precoVenda1,
		          valorTotalVendas1: precoVenda1 * produto.quantity,
		          lucroTotalEsperado1: precoVenda1 * produto.quantity - custoTotal,
		          precoVendaSugerido2: precoVenda2,
		          valorTotalVendas2: precoVenda2 * produto.quantity,
		          lucroTotalEsperado2: precoVenda2 * produto.quantity - custoTotal,
		          custoTotal,
		          abordagem: marginType // Novo campo para rastrear a abordagem
		        };
		      });
		      

      setResults({
        custosFixos: totalCustosFixos,
        custosProdutos: totalCustosProdutos,
        custos: costs,
        detalhes,
      });
      setShowResults(true);
    } catch (error) {
      console.error('Erro no cálculo:', error);
      alert('Erro ao calcular. Verifique os dados.');
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-blue-900 text-white overflow-hidden">
      <Navbar />
      
      <div className="max-w-4xl mx-auto space-y-6 mt-11">
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-xl overflow-hidden border border-white/20">
          <div className="p-8">
            {/* Cabeçalho */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-200">
                Sistema de Cálculo de Preço
              </h1>
              <CurrencySelector 
                selectedCurrency={selectedCurrency} 
                onCurrencyChange={setSelectedCurrency} 
              />
            </div>

            {/* Conteúdo principal */}
            <div className="space-y-8">
              {/* Seção de Produtos */}
              <div className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-medium text-blue-200 mb-4">
                  Adicionar Produto
                </h3>
                <ProductForm
                  form={productForm}
                  onFormChange={setProductForm}
                  onAddProduct={handleAddProduct}
                  selectedCurrency={selectedCurrency}
                />
                <ProductList 
				  products={products} 
				  onRemove={(id) => setProducts(products.filter(p => p.id !== id))} 
				  selectedCurrency={selectedCurrency}
				/>
              </div>

              {/* Seção de Custos */}
              <div className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-medium text-blue-200 mb-4">
                  Custos Adicionais
                </h3>
                <CostForm
                  form={costForm}
                  onFormChange={setCostForm}
                  onSubmit={handleAddCost}
                  selectedCurrency={selectedCurrency}
                />
                <CostList
                  costs={costs}
                  onRemove={(index) => setCosts(costs.filter((_, i) => i !== index))}
                  selectedCurrency={selectedCurrency}
                />
              </div>

              {/* Seção de Cálculo */}
              <CalculationSection
      profitMargin={profitMargin}
      onProfitMarginChange={setProfitMargin}
      onCalculate={calculatePrices}
      disabled={!products.length}
      marginType={marginType}
      onMarginTypeChange={setMarginType}
    />
              {/* Resultados */}
              {showResults && results && (
                <ResultsSection
                  results={results}
                  selectedCurrency={selectedCurrency}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;