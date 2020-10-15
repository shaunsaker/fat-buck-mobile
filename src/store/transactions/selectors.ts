import { ApplicationState } from '../reducers';

export const selectTransactions = (state: ApplicationState) =>
  state.transactions.data;

export const selectTransactionsLoading = (state: ApplicationState) =>
  state.transactions.loading;
