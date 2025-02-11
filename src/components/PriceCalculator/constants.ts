// src/components/PriceCalculator/constants.ts

// Interface principal para configuração de moeda
export interface CurrencyConfig {
  symbol: string;
  name: string;
  locale: string;
  pt: string;
  currency: string; // Código ISO 4217
}

// Tipo para as chaves suportadas
export type CurrencyCode = 'BRL' | 'EUR' | 'AOA' | 'CVE' | 'MZN' | 'STN';

// Configurações completas com type safety
export const CURRENCY_CONFIG: Record<CurrencyCode, CurrencyConfig> = {
  BRL: {
    symbol: 'R$',
    name: 'Real Brasileiro',
    locale: 'pt-BR',
    pt: 'Exemplo: Aluguel',
    currency: 'BRL'
  },
  EUR: {
    symbol: '€',
    name: 'Euro (Portugal)',
    locale: 'pt-PT',
    pt: 'Exemplo: Aluguer',
    currency: 'EUR'
  },
  AOA: {
    symbol: 'Kz',
    name: 'Kwanza Angolano',
    locale: 'pt-AO',
    pt: 'Exemplo: Aluguer',
    currency: 'AOA'
  },
  CVE: {
    symbol: '$',
    name: 'Escudo Cabo-verdiano',
    locale: 'pt-CV',
    pt: 'Exemplo: Aluguer',
    currency: 'CVE'
  },
  MZN: {
    symbol: 'MT',
    name: 'Metical Moçambicano',
    locale: 'pt-MZ',
    pt: 'Exemplo: Aluguer',
    currency: 'MZN'
  },
  STN: {
    symbol: 'Db',
    name: 'Dobra São-tomense',
    locale: 'pt-ST',
    pt: 'Exemplo: Aluguer',
    currency: 'STN'
  }
} as const;

// Tipo auxiliar para chaves válidas
export type ValidCurrency = keyof typeof CURRENCY_CONFIG;

// Lista de moedas suportadas para uso em componentes
export const SUPPORTED_CURRENCIES = Object.keys(CURRENCY_CONFIG) as CurrencyCode[];

// Validador de moeda
export const isValidCurrency = (code: string): code is CurrencyCode => {
  return code in CURRENCY_CONFIG;
};