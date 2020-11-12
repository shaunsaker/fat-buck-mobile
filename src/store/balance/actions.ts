import { action } from 'typesafe-actions';

import { BalanceActionTypes, BalanceData, BalanceTypes } from './models';

export const syncBalance = () => action(BalanceActionTypes.SYNC_BALANCE);

export const syncBalanceSuccess = (data: BalanceData) =>
  action(BalanceActionTypes.SYNC_BALANCE_SUCCESS, {
    data,
  });

export const syncBalanceError = () =>
  action(BalanceActionTypes.SYNC_BALANCE_ERROR);

export const setBalanceType = (balanceType: BalanceTypes) =>
  action(BalanceActionTypes.SET_BALANCE_TYPE, {
    balanceType,
  });
