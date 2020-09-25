export enum CurrencyActionTypes {
  SYNC_CURRENCY = '@@currency/SYNC_CURRENCY',
  SYNC_CURRENCY_SUCCESS = '@@currency/SYNC_CURRENCY_SUCCESS',
  SYNC_CURRENCY_ERROR = '@@currency/SYNC_CURRENCY_ERROR',
  SET_SELECTED_CURRENCY = '@@currency/SET_SELECTED_CURRENCY',
}

type Symbol = string;

export interface Currency {
  base: string;
  dateUpdated: string;
  symbol: Symbol;
  rate: number;
  id: Symbol;
}

export interface CurrencyState extends Currency {
  loading: boolean;
  selectedCurrency: Symbol;
}
