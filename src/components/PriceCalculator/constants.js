"use strict";
// src/components/PriceCalculator/constants.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidCurrency = exports.SUPPORTED_CURRENCIES = exports.CURRENCY_CONFIG = void 0;
// Configurações completas com type safety
exports.CURRENCY_CONFIG = {
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
};
// Lista de moedas suportadas para uso em componentes
exports.SUPPORTED_CURRENCIES = Object.keys(exports.CURRENCY_CONFIG);
// Validador de moeda
var isValidCurrency = function (code) {
    return code in exports.CURRENCY_CONFIG;
};
exports.isValidCurrency = isValidCurrency;
