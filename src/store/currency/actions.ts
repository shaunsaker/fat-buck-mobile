import { action } from 'typesafe-actions';

import { CurrencyData, CurrencyActionTypes, Currency } from './models';

export const syncCurrency = () => action(CurrencyActionTypes.SYNC_CURRENCY);

export const syncCurrencySuccess = (currencyData: CurrencyData) =>
  action(CurrencyActionTypes.SYNC_CURRENCY_SUCCESS, {
    currencyData,
  });

export const syncCurrencyError = () =>
  action(CurrencyActionTypes.SYNC_CURRENCY_ERROR);

export const setSelectedCurrency = (selectedCurrency: string) =>
  action(CurrencyActionTypes.SET_SELECTED_CURRENCY, {
    selectedCurrency,
  });

export const syncAvailableCurrencies = () =>
  action(CurrencyActionTypes.SYNC_AVAILABLE_CURRENCIES);

export const syncAvailableCurrenciesSuccess = (
  availableCurrencies: Currency[],
) =>
  action(CurrencyActionTypes.SYNC_AVAILABLE_CURRENCIES_SUCCESS, {
    availableCurrencies,
  });

export const syncAvailableCurrenciesError = () =>
  action(CurrencyActionTypes.SYNC_AVAILABLE_CURRENCIES_ERROR);
