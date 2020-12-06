import { ApplicationState } from '../reducers';
import { getFloatString } from '../../utils/getFloatString';

export const selectDisplayBalanceAsBTC = (state: ApplicationState) =>
  state.balance.displayBalanceAsBTC;

export const selectBalance = (state: ApplicationState) => {
  if (state.balance.displayBalanceAsBTC) {
    return getFloatString(state.balance.data.amount, 6);
  } else {
    return getFloatString(state.balance.data.value * state.currency.rate);
  }
};

export const selectBTCPrice = (state: ApplicationState) => {
  if (
    !state.balance.data.amount ||
    !state.balance.data.amount ||
    !state.currency.rate
  ) {
    return '0.00';
  }

  const roundedBTCPrice = getFloatString(
    (state.balance.data.value * state.currency.rate) /
      state.balance.data.amount,
  );

  return roundedBTCPrice;
};

export const selectBalanceLoading = (state: ApplicationState) =>
  state.balance.loading;
