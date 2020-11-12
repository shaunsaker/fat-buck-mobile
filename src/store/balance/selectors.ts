import { ApplicationState } from '../reducers';
import { getFloatString } from '../../utils/getFloatString';
import { BalanceTypes } from './models';

export const selectBalanceType = (state: ApplicationState) =>
  state.balance.balanceType;

export const selectBalance = (state: ApplicationState) => {
  const isBTCBalanceType = state.balance.balanceType === BalanceTypes.btc;

  if (isBTCBalanceType) {
    return getFloatString(state.balance.data.amount, 6);
  } else {
    return getFloatString(state.balance.data.value * state.currency.rate);
  }
};

export const selectBTCPrice = (state: ApplicationState) => {
  const roundedBTCPrice = getFloatString(
    (state.balance.data.value * state.currency.rate) /
      state.balance.data.amount,
  );
  return roundedBTCPrice;
};

export const selectBalanceLoading = (state: ApplicationState) =>
  state.balance.loading;
