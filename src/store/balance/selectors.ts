import { ApplicationState } from '../reducers';
import { getFloatString } from '../../utils/getFloatString';
import { BalanceTypes } from './models';

export const selectBalanceType = (state: ApplicationState) =>
  state.balance.balanceType;

export const selectBalance = (state: ApplicationState) => {
  const isBTCBalanceType = state.balance.balanceType === BalanceTypes.btc;

  // sum the total of all active bots
  const balanceTotal = Object.keys(state.balance.data)
    .filter((botId) => state.activeBots.botIds.includes(botId))
    .reduce(
      (total, botId) =>
        isBTCBalanceType
          ? (total += state.balance.data[botId].total)
          : (total += state.balance.data[botId].value * state.currency.rate),
      0,
    );
  const roundedBalanceTotal = getFloatString(
    balanceTotal,
    isBTCBalanceType ? 6 : 2, // digits
  );
  return roundedBalanceTotal;
};

export const selectBTCPrice = (state: ApplicationState) => {
  if (!Object.keys(state.activeBots.botIds).length) {
    return 0;
  }

  // just grab the first active bot's balance and use the value/total
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
