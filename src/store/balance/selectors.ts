import { ApplicationState } from '../reducers';
import { getFloatString } from '../../utils/getFloatString';
import { BalanceType } from './models';

export const selectBalanceType = (state: ApplicationState) =>
  state.balance.balanceType;

export const selectBalance = (state: ApplicationState) =>
  state.balance.balanceType === BalanceType.btc
    ? getFloatString(state.balance.total, 6)
    : getFloatString(state.balance.value * state.currency.rate);

export const selectBTCPrice = (state: ApplicationState) =>
  getFloatString(
    (state.balance.value * state.currency.rate) / state.balance.total,
  );
