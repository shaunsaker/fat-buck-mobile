import { action } from 'typesafe-actions';

import { TradesActionTypes, Trades, TradesSortTypes } from './models';

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

export const setTradesSortBy = (sortType: TradesSortTypes) =>
  action(TradesActionTypes.SET_TRADES_SORT_TYPE, {
    sortType,
  });
