import { ApplicationState } from '../reducers';
import { sortArrayOfObjectsByKey } from '../../utils/sortArrayOfObjectsByKey';
import { Trade, TradesSortTypes } from './models';

export const selectTrades = (
  state: ApplicationState,
  swopSortDirection?: boolean,
) => {
  const sortType = selectTradesSortType(state);
  const reverseSort = selectTradesReverseSort(state);

  let trades = Object.keys(state.trades.data).map((id) => ({
    ...state.trades.data[id],
  }));

  if (sortType === TradesSortTypes.closed) {
    let closedTrades = trades.filter((trade) => trade.closeTimestamp);
    let activeTrades = trades.filter((trade) => !trade.closeTimestamp);

    closedTrades = sortArrayOfObjectsByKey(
      closedTrades,
      'closeTimestamp',
      reverseSort,
    );
    activeTrades = sortArrayOfObjectsByKey(activeTrades, 'openTimestamp', true);

    if (reverseSort) {
      trades = [...activeTrades, ...closedTrades];
    } else {
      // active trades are the oldest, place them at the end
      trades = [...closedTrades, ...activeTrades];
    }
  } else {
    const fieldToSortBy: keyof Trade =
      sortType === TradesSortTypes.opened
        ? 'openTimestamp'
        : sortType === TradesSortTypes.coin
        ? 'pair'
        : sortType === TradesSortTypes.amount
        ? 'closeProfitAbs'
        : 'closeProfit';
    trades = sortArrayOfObjectsByKey(trades, fieldToSortBy, reverseSort);
  }

  if (swopSortDirection) {
    trades = trades.reverse();
  }

  return trades;
};

export const selectTradesLoading = (state: ApplicationState) =>
  state.trades.loading;

export const selectTradesSortType = (state: ApplicationState) =>
  state.trades.sortType;

export const selectTradesReverseSort = (state: ApplicationState) =>
  state.trades.reverseSort;
