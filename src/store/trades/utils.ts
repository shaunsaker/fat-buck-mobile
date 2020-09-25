import { getFloatString } from '../../utils/getFloatString';
import { Trade } from './models';

export const getTradeCoin = (trade: Trade) => trade.pair.split('/')[0];

export const getTradeProfit = (trade: Trade) =>
  trade.isOpen ? trade.currentProfitAbs >= 0 : trade.closeProfitAbs >= 0;

export const getTradeLoss = (trade: Trade) =>
  trade.isOpen ? trade.currentProfitAbs < 0 : trade.closeProfitAbs < 0;

export const getTradeProfitPercentage = (trade: Trade) =>
  trade.isOpen
    ? getFloatString(trade.currentProfit * 100)
    : getFloatString(trade.closeProfit * 100);

export const getTradeProfitCurrencyValue = (
  trade: Trade,
  exchangeRate: string,
) =>
  trade.isOpen
    ? getFloatString(trade.currentProfitAbs * exchangeRate)
    : getFloatString(trade.closeProfitAbs * exchangeRate);
