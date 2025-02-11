// src/components/PriceCalculator/ResultsSection.tsx
import React from 'react';
import { formatCurrency } from './utils';
import { CURRENCY_CONFIG, CurrencyCode } from './constants';
import PDFExportButton from './PDFExportButton';

interface ProductResult {
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
  abordagem: 'product' | 'total';
}

interface PricingResults {
  custosFixos: number;
  custosProdutos: number;
  detalhes: ProductResult[];
}

interface ResultsSectionProps {
  results: PricingResults | null;
  selectedCurrency: CurrencyCode;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  results, 
  selectedCurrency 
}) => {
  if (!results) return null;

  const getApproachLabel = (type: 'product' | 'total') => {
    return type === 'product' 
      ? 'Margem sobre o Custo do Produto' 
      : 'Margem sobre o Custo Total';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-medium text-blue-200">
          Resultados
        </h3>
        <PDFExportButton 
          results={results} 
          selectedCurrency={selectedCurrency} 
        />
      </div>

      {/* Resumo Geral */}
      <div className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10">
        <div className="text-white">
          <p className="text-xl font-medium text-blue-200 mb-3">
            Resumo Geral
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-lg">
                Custos Fixos Totais: {' '}
                <span className="font-semibold text-emerald-300">
                  {formatCurrency(results.custosFixos, selectedCurrency)}
                </span>
              </p>
              <p className="text-lg mt-2">
                Custo Total Produtos: {' '}
                <span className="font-semibold text-blue-300">
                  {formatCurrency(results.custosProdutos, selectedCurrency)}
                </span>
              </p>
            </div>
            <div className="md:text-right">
              <p className="text-lg">
                Custo Total: {' '}
                <span className="font-semibold text-purple-300">
                  {formatCurrency(
                    results.custosFixos + results.custosProdutos, 
                    selectedCurrency
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detalhes por Produto */}
      {results.detalhes.map((produto, index) => (
        <div 
          key={`${produto.produto}-${index}`}
          className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10 space-y-6"
        >
          <div className="flex justify-between items-start">
            <h4 className="text-xl font-medium text-blue-200">
              {produto.produto}
            </h4>
            <span className="text-sm bg-emerald-900/30 px-3 py-1 rounded-full">
              {getApproachLabel(produto.abordagem)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dados Básicos */}
            <div className="space-y-2 text-white/90">
              <p className="flex justify-between">
                <span>Quantidade:</span>
                <span className="font-medium">
                  {produto.quantidade} unidades
                </span>
              </p>
              <p className="flex justify-between">
                <span>Custo Unitário Base:</span>
                <span className="font-medium">
                  {formatCurrency(produto.custoUnitarioBase, selectedCurrency)}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Custo Fixo por Unidade:</span>
                <span className="font-medium">
                  {formatCurrency(produto.custoFixoPorUnidade, selectedCurrency)}
                </span>
              </p>
            </div>

            {/* Abordagem de Cálculo */}
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="text-lg font-medium text-blue-200 mb-3">
                {produto.abordagem === 'product' 
                  ? 'Cálculo Unitário' 
                  : 'Cálculo Total'}
              </p>
              <div className="space-y-2 text-white/90">
                <p className="flex justify-between">
                  <span>Preço de Venda:</span>
                  <span className="font-medium">
                    {formatCurrency(produto.precoVendaSugerido1, selectedCurrency)}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>Total de Vendas:</span>
                  <span className="font-medium">
                    {formatCurrency(produto.valorTotalVendas1, selectedCurrency)}
                  </span>
                </p>
                <p className="flex justify-between text-emerald-300">
                  <span>Lucro Esperado:</span>
                  <span className="font-medium">
                    {formatCurrency(produto.lucroTotalEsperado1, selectedCurrency)}
                  </span>
                </p>
              </div>
            </div>

            {/* Comparação de Abordagens */}
            <div className="md:col-span-2 bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="text-lg font-medium text-blue-200 mb-3">
                Comparação de Métodos
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90">
                <div>
                  <span className="block mb-1 text-sm text-blue-200">Método Unitário:</span>
                  <span className="font-medium">
                    {formatCurrency(produto.precoVendaSugerido1, selectedCurrency)}
                  </span>
                </div>
                <div>
                  <span className="block mb-1 text-sm text-blue-200">Método Total:</span>
                  <span className="font-medium">
                    {formatCurrency(produto.precoVendaSugerido2, selectedCurrency)}
                  </span>
                </div>
                <div className="text-emerald-300">
                  <span className="block mb-1 text-sm">Diferença de Lucro:</span>
                  <span className="font-medium">
                    {formatCurrency(
                      Math.abs(produto.lucroTotalEsperado1 - produto.lucroTotalEsperado2), 
                      selectedCurrency
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsSection;