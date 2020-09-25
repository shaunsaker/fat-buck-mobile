import { ApplicationState } from '../reducers';

export const selectExchangeRate = (state: ApplicationState) =>
  state.currency.rate;

export const selectSelectedCurrency = (state: ApplicationState) =>
  state.currency.selectedCurrency;
