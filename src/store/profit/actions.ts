import { action } from 'typesafe-actions';

import { ProfitActionTypes, ProfitData, ProfitTypes } from './models';

export const syncProfit = () => action(ProfitActionTypes.SYNC_PROFIT);

export const syncProfitSuccess = (data: ProfitData) =>
  action(ProfitActionTypes.SYNC_PROFIT_SUCCESS, {
    data,
  });

export const syncProfitError = () =>
  action(ProfitActionTypes.SYNC_PROFIT_ERROR);

export const setProfitType = (profitType: ProfitTypes) =>
  action(ProfitActionTypes.SET_PROFIT_TYPE, {
    profitType,
  });
