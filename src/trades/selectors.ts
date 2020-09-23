import { ApplicationState } from '../store/reducers';
import { sortArrayOfObjectsByKey } from '../utils/sortArrayOfObjectsByKey';

export const selectTrades = (state: ApplicationState) =>
  sortArrayOfObjectsByKey(state.trades.data, 'closeTimestamp', true);
