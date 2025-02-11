// src/components/PriceCalculator/PDFExportButton.tsx
import React from 'react';
import { FileDown } from 'lucide-react';
import { formatCurrency } from './utils';
import { CURRENCY_CONFIG, CurrencyCode } from './constants';

// Interface para os resultados de precificação
interface PricingResult {
  produto: string;
  quantidade: number;
  custoUnitarioBase: number;
  precoVendaSugerido1: number;
  valorTotalVendas1: number;
  lucroTotalEsperado1: number;
  precoVendaSugerido2: number;
  valorTotalVendas2: number;
  lucroTotalEsperado2: number;
}

interface PDFExportProps {
  results: {
    custosFixos: number;
    custosProdutos: number;
    detalhes: PricingResult[];
  };
  selectedCurrency: CurrencyCode;
}

const PDFExportButton: React.FC<PDFExportProps> = ({ results, selectedCurrency }) => {
  const generatePDF = async () => {
    try {
      const jsPDF = (await import('jspdf')).default;
      const doc = new jsPDF();
      const margin = 15;
      let yPos = margin;
      const lineHeight = 7;
      const pageWidth = doc.internal.pageSize.getWidth();

      // Configurações iniciais
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(18);
      doc.setTextColor(40, 180, 150);
      doc.text('Relatório de Precificação - NoStress', margin, yPos);
      yPos += lineHeight * 2;

      // Função auxiliar para adicionar seções
      const addSection = (title: string, content: string[][]) => {
        if (yPos > 280) {
          doc.addPage();
          yPos = margin;
        }
        
        doc.setFontSize(14);
        doc.setTextColor(30, 120, 200);
        doc.text(title, margin, yPos);
        yPos += lineHeight;

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        content.forEach(([label, value]) => {
          doc.text(`${label}:`, margin, yPos);
          doc.text(value, pageWidth - margin - doc.getTextWidth(value), yPos, { align: 'right' });
          yPos += lineHeight;
        });
        yPos += lineHeight;
      };

      // Seção de Resumo Geral
      addSection('Resumo Geral', [
        ['Custos Fixos Totais', formatCurrency(results.custosFixos, selectedCurrency)],
        ['Custo Total Produtos', formatCurrency(results.custosProdutos, selectedCurrency)],
        ['Custo Total', formatCurrency(results.custosFixos + results.custosProdutos, selectedCurrency)]
      ]);

      // Seção por Produto
      results.detalhes.forEach(produto => {
        addSection(`Produto: ${produto.produto}`, [
          ['Quantidade', `${produto.quantidade} unidades`],
          ['Custo Unitário Base', formatCurrency(produto.custoUnitarioBase, selectedCurrency)],
          ['Preço Venda (Unitário)', formatCurrency(produto.precoVendaSugerido1, selectedCurrency)],
          ['Lucro Esperado (Unitário)', formatCurrency(produto.lucroTotalEsperado1, selectedCurrency)],
          ['Preço Venda (Total)', formatCurrency(produto.precoVendaSugerido2, selectedCurrency)],
          ['Lucro Esperado (Total)', formatCurrency(produto.lucroTotalEsperado2, selectedCurrency)]
        ]);
      });

      // Rodapé
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(
        `Gerado em ${new Date().toLocaleDateString()} - Moeda: ${CURRENCY_CONFIG[selectedCurrency].name}`,
        margin,
        290,
        { align: 'left' }
      );

      doc.save(`relatorio-precificacao-${Date.now()}.pdf`);
    } catch (error) {
      console.error('Erro na geração do PDF:', error);
      alert('Erro ao gerar o PDF. Verifique o console para mais detalhes.');
    }
  };

  return (
    <button
      onClick={generatePDF}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
      aria-label="Exportar relatório em PDF"
    >
      <FileDown className="w-5 h-5" />
      <span className="hidden sm:inline">Exportar PDF</span>
    </button>
  );
};

export default PDFExportButton;