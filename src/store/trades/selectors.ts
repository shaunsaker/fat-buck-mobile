import { ApplicationState } from '../reducers';
import { sortArrayOfObjectsByKey } from '../../utils/sortArrayOfObjectsByKey';

export const selectTrades = (
  state: ApplicationState,
  oldestToLatest?: boolean,
) => {
  // closed trades have a closeTimestamp while active trades don't
  // save a _date for sorting
  const tradesArray = Object.keys(state.trades.data).map((id) => ({
    ...state.trades.data[id],
    _date:
      state.trades.data[id].closeTimestamp ||
      state.trades.data[id].openTimestamp,
  }));

  // sort by internal _date
  const sortedTrades = sortArrayOfObjectsByKey(
    tradesArray,
    '_date',
    oldestToLatest ? false : true,
  );

  return sortedTrades;
};

export const selectTradesLoading = (state: ApplicationState) =>
  state.trades.loading;
