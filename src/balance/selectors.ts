import { ApplicationState } from '../store/reducers';
import { getFloatString } from '../utils/getFloatString';
import { BalanceType } from './models';

export const selectBalanceType = (state: ApplicationState) =>
  state.balance.balanceType;

export const selectBalance = (state: ApplicationState) =>
  state.balance.balanceType === BalanceType.btc
    ? getFloatString(state.balance.total, 6)
    : getFloatString(state.balance.value);

export const selectBalanceBTCValue = (state: ApplicationState) =>
  getFloatString(state.balance.value / state.balance.total);
