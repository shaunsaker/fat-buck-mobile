import { ApplicationState } from '../store/reducers';

export const selectTrades = (state: ApplicationState) => state.trades.data;
