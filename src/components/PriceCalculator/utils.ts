// Arquivo: nostress-next/src/components/PriceCalculator/utils.ts
import { CURRENCY_CONFIG } from './constants';

export const formatCurrency = (
  value: number | undefined,
  currency: keyof typeof CURRENCY_CONFIG
): string => {
  try {
    // Verifica se o valor é um número válido
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error('Valor inválido para formatação monetária');
    }

    // Verifica se a moeda está configurada
    if (!currency || !CURRENCY_CONFIG[currency]) {
      throw new Error('Moeda não configurada ou não suportada');
    }

    const { locale, currency: currencyCode } = CURRENCY_CONFIG[currency];

    // Cria o formatador
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    return formatter.format(value);
  } catch (error) {
    console.error('Erro na formatação de moeda:', error);
    // Retorna um fallback (sempre uma string) mesmo em erro
    return '0.00';
  }
};

// Outras funções, como parseCurrencyInput, podem permanecer inalteradas
export const parseCurrencyInput = (
  input: string,
  currency: keyof typeof CURRENCY_CONFIG
): number => {
  const cleanValue = input
    .replace(CURRENCY_CONFIG[currency].symbol, '')
    .replace(/[^\d,-]/g, '')
    .replace(',', '.');

  return parseFloat(cleanValue) || 0;
};

export const validateCurrency = (
  currency: string
): currency is keyof typeof CURRENCY_CONFIG => {
  return currency in CURRENCY_CONFIG;
};

export const useCurrencyFormatter = (currency: keyof typeof CURRENCY_CONFIG) => {
  const format = (value: number) => formatCurrency(value, currency);
  const parse = (input: string) => parseCurrencyInput(input, currency);

  return { format, parse, validate: () => validateCurrency(currency) };
};
