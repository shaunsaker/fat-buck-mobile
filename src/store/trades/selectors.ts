import { ApplicationState } from '../reducers';
import { sortArrayOfObjectsByKey } from '../../utils/sortArrayOfObjectsByKey';

export const selectTrades = (state: ApplicationState) => {
  // if no closeTimestamp, it's active, sort by openTimestamp and put at top of list
  // if closeTimestamp, it's closed, sort by closeTimestamp
  const tradesArray = Object.keys(state.trades.data).map(
    (id) => state.trades.data[id],
  );
  const openTrades = tradesArray.filter((trade) => !trade.closeTimestamp);
  const sortedOpenTrades = sortArrayOfObjectsByKey(
    openTrades,
    'openTimestamp',
    true,
  );
  const closedTrades = tradesArray.filter((trade) => trade.closeTimestamp);
  const sortedClosedTrades = sortArrayOfObjectsByKey(
    closedTrades,
    'closeTimestamp',
    true,
  );
  const sortedTrades = [...sortedOpenTrades, ...sortedClosedTrades];

  return sortedTrades;
};
