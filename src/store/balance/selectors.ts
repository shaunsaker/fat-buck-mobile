import { ApplicationState } from '../reducers';
import { getFloatString } from '../../utils/getFloatString';
import { BalanceTypes } from './models';

export const selectBalanceType = (state: ApplicationState) =>
  state.balance.balanceType;

export const selectBalance = (state: ApplicationState) => {
  const isBTCBalanceType = state.balance.balanceType === BalanceTypes.btc;

  // grab the first active bot's balance (the other ones in the same exchange are exactly the same)
  // CFO assumes one exchange
  const firstActiveBotId = state.activeBots.botIds[0];
  const firstBalanceData = state.balance.data[firstActiveBotId];

  if (isBTCBalanceType) {
    return getFloatString(firstBalanceData.total, 6);
  } else {
    return getFloatString(firstBalanceData.value * state.currency.rate);
  }
};

export const selectBTCPrice = (state: ApplicationState) => {
  if (!Object.keys(state.activeBots.botIds).length) {
    return 0;
  }

  // just grab the first active bot's balance and use the value/total to calculate the current BTC price
  const firstActiveBotId = state.activeBots.botIds[0];
  const firstBalanceData = state.balance.data[firstActiveBotId];

  if (!firstBalanceData) {
    return 0;
  }

  const roundedBTCPrice = getFloatString(
    (firstBalanceData.value * state.currency.rate) / firstBalanceData.total,
  );
  return roundedBTCPrice;
};
