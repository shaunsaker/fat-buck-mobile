export enum CurrencyActionTypes {
  SYNC_CURRENCY = '@@currency/SYNC_CURRENCY',
  SYNC_CURRENCY_SUCCESS = '@@currency/SYNC_CURRENCY_SUCCESS',
  SYNC_CURRENCY_ERROR = '@@currency/SYNC_CURRENCY_ERROR',
  SET_SELECTED_CURRENCY = '@@currency/SET_SELECTED_CURRENCY',
}

type Symbol = string;

export interface CurrencyData {
  base: string;
  dateUpdated: string;
  symbol: Symbol;
  rate: number;
  id: Symbol;
}

export interface CurrencyState extends CurrencyData {
  loading: boolean;
  selectedCurrency: Symbol;
}
