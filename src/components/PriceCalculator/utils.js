"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCurrencyFormatter = exports.validateCurrency = exports.parseCurrencyInput = exports.formatCurrency = void 0;
// Arquivo: nostress-next/src/components/PriceCalculator/utils.ts
var constants_1 = require("./constants");
var formatCurrency = function (value, currency) {
    try {
        // Verifica se o valor é um número válido
        if (typeof value !== 'number' || isNaN(value)) {
            throw new Error('Valor inválido para formatação monetária');
        }
        // Verifica se a moeda está configurada
        if (!currency || !constants_1.CURRENCY_CONFIG[currency]) {
            throw new Error('Moeda não configurada ou não suportada');
        }
        var _a = constants_1.CURRENCY_CONFIG[currency], locale = _a.locale, currencyCode = _a.currency;
        // Cria o formatador
        var formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        return formatter.format(value);
    }
    catch (error) {
        console.error('Erro na formatação de moeda:', error);
        // Retorna um fallback (sempre uma string) mesmo em erro
        return '0.00';
    }
};
exports.formatCurrency = formatCurrency;
// Outras funções, como parseCurrencyInput, podem permanecer inalteradas
var parseCurrencyInput = function (input, currency) {
    var cleanValue = input
        .replace(constants_1.CURRENCY_CONFIG[currency].symbol, '')
        .replace(/[^\d,-]/g, '')
        .replace(',', '.');
    return parseFloat(cleanValue) || 0;
};
exports.parseCurrencyInput = parseCurrencyInput;
var validateCurrency = function (currency) {
    return currency in constants_1.CURRENCY_CONFIG;
};
exports.validateCurrency = validateCurrency;
var useCurrencyFormatter = function (currency) {
    var format = function (value) { return (0, exports.formatCurrency)(value, currency); };
    var parse = function (input) { return (0, exports.parseCurrencyInput)(input, currency); };
    return { format: format, parse: parse, validate: function () { return (0, exports.validateCurrency)(currency); } };
};
exports.useCurrencyFormatter = useCurrencyFormatter;
