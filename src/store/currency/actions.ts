import { action } from 'typesafe-actions';

import { Currency, CurrencyActionTypes } from './models';

export const syncCurrency = () => action(CurrencyActionTypes.SYNC_CURRENCY);

export const syncCurrencySuccess = (currency: Currency) =>
  action(CurrencyActionTypes.SYNC_CURRENCY_SUCCESS, {
    currency,
  });

export const syncCurrencyError = () =>
  action(CurrencyActionTypes.SYNC_CURRENCY_ERROR);

export const setSelectedCurrency = (selectedCurrency: string) =>
  action(CurrencyActionTypes.SET_SELECTED_CURRENCY, {
    selectedCurrency,
  });
