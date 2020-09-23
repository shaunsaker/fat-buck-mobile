import { Trade } from './models';

export const getTradeCoin = (trade: Trade) => trade.pair.split('/')[0];

export const getTradeOpenProfit = (trade: Trade) =>
  trade.isOpen && trade.currentProfitAbs >= 0;

export const getTradeOpenLoss = (trade: Trade) =>
  trade.isOpen && trade.currentProfitAbs < 0;
