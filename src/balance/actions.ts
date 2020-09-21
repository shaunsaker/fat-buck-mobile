import { action } from 'typesafe-actions';

import { BalanceActionTypes, Balance, BalanceType } from './models';

export const syncBalance = () => action(BalanceActionTypes.SYNC_BALANCE);

export const syncBalanceSuccess = (balance: Balance) =>
  action(BalanceActionTypes.SYNC_BALANCE_SUCCESS, {
    balance,
  });

export const syncBalanceError = () =>
  action(BalanceActionTypes.SYNC_BALANCE_ERROR);

export const setBalanceType = (balanceType: BalanceType) =>
  action(BalanceActionTypes.SET_BALANCE_TYPE, {
    balanceType,
  });
