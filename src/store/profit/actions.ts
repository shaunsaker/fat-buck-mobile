import { action } from 'typesafe-actions';

import { ProfitActionTypes, ProfitData, ProfitTypes } from './models';

export const syncProfit = (botId: string) =>
  action(ProfitActionTypes.SYNC_PROFIT, { botId });

export const syncProfitSuccess = (botId: string, profitData: ProfitData) =>
  action(ProfitActionTypes.SYNC_PROFIT_SUCCESS, {
    botId,
    profitData,
  });

export const syncProfitError = () =>
  action(ProfitActionTypes.SYNC_PROFIT_ERROR);

export const setProfitType = (profitType: ProfitTypes) =>
  action(ProfitActionTypes.SET_PROFIT_TYPE, {
    profitType,
  });
