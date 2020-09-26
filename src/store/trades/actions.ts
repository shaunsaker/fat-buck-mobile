import { action } from 'typesafe-actions';

import { TradesActionTypes, Trades } from './models';

export const syncTrades = (botId: string) =>
  action(TradesActionTypes.SYNC_TRADES, {
    botId,
  });

export const syncTradesSuccess = (trades: Trades) =>
  action(TradesActionTypes.SYNC_TRADES_SUCCESS, {
    trades,
  });

export const syncTradesError = () =>
  action(TradesActionTypes.SYNC_TRADES_ERROR);
