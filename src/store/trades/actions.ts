import { action } from 'typesafe-actions';

import { TradesActionTypes, Trades } from './models';

export const syncTrades = () => action(TradesActionTypes.SYNC_TRADES);

export const syncTradesSuccess = (trades: Trades) =>
  action(TradesActionTypes.SYNC_TRADES_SUCCESS, {
    trades,
  });

export const syncTradesError = () =>
  action(TradesActionTypes.SYNC_TRADES_ERROR);
