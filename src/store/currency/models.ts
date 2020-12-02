export enum CurrencyActionTypes {
  SYNC_CURRENCY = '@@currency/SYNC_CURRENCY',
  SYNC_CURRENCY_SUCCESS = '@@currency/SYNC_CURRENCY_SUCCESS',
  SYNC_CURRENCY_ERROR = '@@currency/SYNC_CURRENCY_ERROR',
  SET_SELECTED_CURRENCY = '@@currency/SET_SELECTED_CURRENCY',
  SYNC_AVAILABLE_CURRENCIES = '@@currency/SYNC_AVAILABLE_CURRENCIES',
  SYNC_AVAILABLE_CURRENCIES_SUCCESS = '@@currency/SYNC_AVAILABLE_CURRENCIES_SUCCESS',
  SYNC_AVAILABLE_CURRENCIES_ERROR = '@@currency/SYNC_AVAILABLE_CURRENCIES_ERROR',
}

export type Currency = string;

export interface CurrencyData {
  base: string;
  dateUpdated: string;
  symbol: Currency;
  rate: number;
  id: Currency;
}

export interface CurrencyState extends CurrencyData {
  loading: boolean;
  selectedCurrency: Currency;
  availableCurrencies: Currency[];
}

export const DEFAULT_CURRENCY = 'USD';
