import { action } from 'typesafe-actions';

import { ProfitActionTypes, Profit, ProfitType } from './models';

export const syncProfit = () => action(ProfitActionTypes.SYNC_PROFIT);

export const syncProfitSuccess = (profit: Profit) =>
  action(ProfitActionTypes.SYNC_PROFIT_SUCCESS, {
    profit,
  });

export const syncProfitError = () =>
  action(ProfitActionTypes.SYNC_PROFIT_ERROR);

export const setProfitType = (profitType: ProfitType) =>
  action(ProfitActionTypes.SET_PROFIT_TYPE, {
    profitType,
  });
