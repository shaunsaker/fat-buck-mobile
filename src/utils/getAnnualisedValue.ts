import { objectToArray } from './objectToArray';
import { sortArrayOfObjectsByKey } from './sortArrayOfObjectsByKey';
import moment from 'moment';
import { Trade, Trades } from '../store/trades/models';

export const getAnnualisedValue = (value: number, trades: Trades): number => {
  const tradesArray = objectToArray<Trade>(trades);

  if (!tradesArray.length) {
    return 0;
  }

  // CFO: here we are using the first and last trade dates but what be more accurate is using the date of the first deposit and now
  const sortedTrades = sortArrayOfObjectsByKey(tradesArray, 'closeTimestamp');
  const firstTradeTimestamp = sortedTrades[0].closeTimestamp;
  const lastTradeTimestamp = sortedTrades.reverse()[0].closeTimestamp;
  const firstTradeDate = moment(firstTradeTimestamp);
  const lastTradeDate = moment(lastTradeTimestamp);

  const diffInDays = lastTradeDate.diff(firstTradeDate, 'days');
  const changePerDay = value / diffInDays;
  const changePerYear = changePerDay * 365;

  return changePerYear;
};
