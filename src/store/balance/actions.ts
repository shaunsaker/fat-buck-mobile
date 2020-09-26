import { action } from 'typesafe-actions';

import { BalanceActionTypes, BalanceData, BalanceTypes } from './models';

export const syncBalance = (botId: string) =>
  action(BalanceActionTypes.SYNC_BALANCE, { botId });

export const syncBalanceSuccess = (botId: string, balance: BalanceData) =>
  action(BalanceActionTypes.SYNC_BALANCE_SUCCESS, {
    botId,
    balance,
  });

export const syncBalanceError = () =>
  action(BalanceActionTypes.SYNC_BALANCE_ERROR);

export const setBalanceType = (balanceType: BalanceTypes) =>
  action(BalanceActionTypes.SET_BALANCE_TYPE, {
    balanceType,
  });
