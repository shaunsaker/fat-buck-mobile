import { ApplicationState } from '../reducers';
import { sortArrayOfObjectsByKey } from '../../utils/sortArrayOfObjectsByKey';

export const selectTrades = (state: ApplicationState) =>
  sortArrayOfObjectsByKey(state.trades.data, 'openTimestamp', true);
