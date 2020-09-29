import { action } from 'typesafe-actions';

import { CurrencyData, CurrencyActionTypes } from './models';

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
