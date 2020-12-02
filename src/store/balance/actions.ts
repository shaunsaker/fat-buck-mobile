import { action } from 'typesafe-actions';

import { BalanceActionTypes, BalanceData } from './models';

export const syncBalance = () => action(BalanceActionTypes.SYNC_BALANCE);

export const syncBalanceSuccess = (data: BalanceData) =>
  action(BalanceActionTypes.SYNC_BALANCE_SUCCESS, {
    data,
  });

export const syncBalanceError = () =>
  action(BalanceActionTypes.SYNC_BALANCE_ERROR);

export const setDisplayBalanceAsBTC = (displayBalanceAsBTC: boolean) =>
  action(BalanceActionTypes.SET_DISPLAY_BALANCE_AS_BTC, {
    displayBalanceAsBTC,
  });
