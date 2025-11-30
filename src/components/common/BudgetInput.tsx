import React, { useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { DYNAMIC_COLORS } from '../../constants/colors';

interface BudgetInputProps {
    value: string;
    currency: string;
    onChange: (value: string, currency: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

interface Currency {
    code: string;
    symbol: string;
    name: string;
    flag: string;
    countries: string[]; // ISO2 country codes that use this currency
}

const CURRENCIES: Currency[] = [
    // Americas
    { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', countries: ['US'] },
    { code: 'CAD', symbol: '$', name: 'Canadian Dollar', flag: '🇨🇦', countries: ['CA'] },
    { code: 'MXN', symbol: '$', name: 'Mexican Peso', flag: '🇲🇽', countries: ['MX'] },
    { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', flag: '🇧🇷', countries: ['BR'] },
    { code: 'ARS', symbol: '$', name: 'Argentine Peso', flag: '🇦🇷', countries: ['AR'] },
    { code: 'CLP', symbol: '$', name: 'Chilean Peso', flag: '🇨🇱', countries: ['CL'] },
    { code: 'COP', symbol: '$', name: 'Colombian Peso', flag: '🇨🇴', countries: ['CO'] },
    { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol', flag: '🇵🇪', countries: ['PE'] },

    // Europe
    { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', countries: ['ES', 'DE', 'FR', 'IT', 'PT', 'NL', 'BE', 'AT', 'IE', 'GR'] },
    { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧', countries: ['GB'] },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc', flag: '🇨🇭', countries: ['CH'] },
    { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', flag: '🇸🇪', countries: ['SE'] },
    { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', flag: '🇳🇴', countries: ['NO'] },
    { code: 'DKK', symbol: 'kr', name: 'Danish Krone', flag: '🇩🇰', countries: ['DK'] },
    { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', flag: '🇵🇱', countries: ['PL'] },
    { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', flag: '🇨🇿', countries: ['CZ'] },
    { code: 'RUB', symbol: '₽', name: 'Russian Ruble', flag: '🇷🇺', countries: ['RU'] },

    // Asia-Pacific
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵', countries: ['JP'] },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳', countries: ['CN'] },
    { code: 'KRW', symbol: '₩', name: 'South Korean Won', flag: '🇰🇷', countries: ['KR'] },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳', countries: ['IN'] },
    { code: 'AUD', symbol: '$', name: 'Australian Dollar', flag: '🇦🇺', countries: ['AU'] },
    { code: 'NZD', symbol: '$', name: 'New Zealand Dollar', flag: '🇳🇿', countries: ['NZ'] },
    { code: 'SGD', symbol: '$', name: 'Singapore Dollar', flag: '🇸🇬', countries: ['SG'] },
    { code: 'HKD', symbol: '$', name: 'Hong Kong Dollar', flag: '🇭🇰', countries: ['HK'] },
    { code: 'THB', symbol: '฿', name: 'Thai Baht', flag: '🇹🇭', countries: ['TH'] },
    { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', flag: '🇲🇾', countries: ['MY'] },
    { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', flag: '🇮🇩', countries: ['ID'] },
    { code: 'PHP', symbol: '₱', name: 'Philippine Peso', flag: '🇵🇭', countries: ['PH'] },
    { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', flag: '🇻🇳', countries: ['VN'] },

    // Middle East & Africa
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪', countries: ['AE'] },
    { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', flag: '🇸🇦', countries: ['SA'] },
    { code: 'ILS', symbol: '₪', name: 'Israeli Shekel', flag: '🇮🇱', countries: ['IL'] },
    { code: 'TRY', symbol: '₺', name: 'Turkish Lira', flag: '🇹🇷', countries: ['TR'] },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand', flag: '🇿🇦', countries: ['ZA'] },
    { code: 'EGP', symbol: '£', name: 'Egyptian Pound', flag: '🇪🇬', countries: ['EG'] },
];

/**
 * BudgetInput Component
 * 
 * Currency input with currency selector.
 * Features: search, autofill by country detection.
 */
export const BudgetInput: React.FC<BudgetInputProps> = ({
    value,
    currency,
    onChange,
    placeholder = 'Budget amount',
    disabled = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Autofill currency based on detected country
    useEffect(() => {
        if (!currency || currency === 'USD') {
            fetch('https://ipapi.co/json/')
                .then(res => res.json())
                .then(data => {
                    if (data.country_code) {
                        const detectedCurrency = CURRENCIES.find(
                            c => c.countries.includes(data.country_code)
                        );
                        if (detectedCurrency) {
                            onChange(value, detectedCurrency.code);
                        }
                    }
                })
                .catch(() => {
                    // Silently fail, keep default
                });
        }
    }, []);

    // Filter currencies based on search query
    const filteredCurrencies = CURRENCIES.filter(curr => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            curr.name.toLowerCase().includes(query) ||
            curr.code.toLowerCase().includes(query) ||
            curr.symbol.includes(query)
        );
    });

    const selectedCurrency = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0];

    const handleCurrencyChange = (newCurrency: string) => {
        onChange(value, newCurrency);
        setIsOpen(false);
        setSearchQuery('');
    };

    const handleValueChange = (newValue: string | undefined) => {
        onChange(newValue || '', currency);
    };

    return (
        <div className="relative w-full">
            <div className="flex gap-2">
                {/* Currency Selector */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => !disabled && setIsOpen(!isOpen)}
                        disabled={disabled}
                        className={`h-full px-4 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-2xl text-[var(--text-primary)] focus:outline-none ${DYNAMIC_COLORS.focusBorder} focus:bg-[var(--glass-glow)] transition-all text-sm focus:ring-1 ${DYNAMIC_COLORS.focusRing} disabled:opacity-50 flex items-center gap-2 min-w-[100px]`}
                    >
                        <span className="text-xl">{selectedCurrency.flag}</span>
                        <span className="font-mono text-sm font-bold">{selectedCurrency.symbol}</span>
                        <span className="text-xs text-[var(--text-secondary)]">{selectedCurrency.code}</span>
                        <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Dropdown */}
                    {isOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => {
                                    setIsOpen(false);
                                    setSearchQuery('');
                                }}
                            />
                            <div className="absolute top-full left-0 mt-2 w-64 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-2xl shadow-xl z-20 overflow-hidden">
                                {/* Search Input */}
                                <div className="p-3 border-b border-[var(--card-border)]">
                                    <div className="relative">
                                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search currency..."
                                            className={`w-full pl-9 pr-3 py-2 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none ${DYNAMIC_COLORS.focusBorder}`}
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                {/* Currencies List */}
                                <div className="max-h-48 overflow-y-auto">
                                    {filteredCurrencies.length > 0 ? (
                                        filteredCurrencies.map((curr) => (
                                            <button
                                                key={curr.code}
                                                type="button"
                                                onClick={() => handleCurrencyChange(curr.code)}
                                                className={`w-full px-4 py-3 text-left hover:bg-[var(--input-bg)] transition-colors flex items-center gap-3 ${curr.code === currency ? 'bg-[var(--input-bg)]' : ''
                                                    }`}
                                            >
                                                <span className="text-xl">{curr.flag}</span>
                                                <span className="font-mono text-lg font-bold text-[var(--text-primary)]">{curr.symbol}</span>
                                                <div className="flex-1">
                                                    <div className="text-sm font-semibold text-[var(--text-primary)]">{curr.code}</div>
                                                    <div className="text-xs text-[var(--text-secondary)]">{curr.name}</div>
                                                </div>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="px-4 py-8 text-center text-sm text-[var(--text-tertiary)]">
                                            No currencies found
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Budget Amount Input */}
                <CurrencyInput
                    value={value}
                    onValueChange={handleValueChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    decimalsLimit={2}
                    prefix={selectedCurrency.symbol + ' '}
                    className={`flex-1 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-2xl px-5 py-5 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none ${DYNAMIC_COLORS.focusBorder} focus:bg-[var(--glass-glow)] transition-all text-sm focus:ring-1 ${DYNAMIC_COLORS.focusRing} disabled:opacity-50`}
                />
            </div>
        </div>
    );
};
