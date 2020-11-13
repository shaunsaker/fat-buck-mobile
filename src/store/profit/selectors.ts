import { ApplicationState } from '../reducers';
import { getAnnualisedValue } from '../../utils/getAnnualisedValue';
import { getFloatString } from '../../utils/getFloatString';
import { ProfitTypes } from './models';
import { selectBTCPrice } from '../balance/selectors';

export const selectProfitType = (state: ApplicationState) =>
  state.profit.profitType;

export const selectProfitPercent = (state: ApplicationState) => {
  const isToDateProfitType = state.profit.profitType === ProfitTypes.toDate;

  if (isToDateProfitType) {
    return getFloatString(state.profit.data.ratio * 100);
  }

  const annualisedValue = getAnnualisedValue(
    state.profit.data.ratio * 100,
    state.trades.data,
  );

  return getFloatString(annualisedValue);
};

export const selectProfitAmount = (state: ApplicationState) => {
  const isToDateProfitType = state.profit.profitType === ProfitTypes.toDate;

  if (isToDateProfitType) {
    return state.profit.data.amount;
  }

  const annualisedValue = getAnnualisedValue(
    state.profit.data.amount,
    state.trades.data,
  );

  return annualisedValue;
};

export const selectProfitCurrencyValue = (state: ApplicationState) => {
  const profitAmount = selectProfitAmount(state);
  const BTCPrice = Number(selectBTCPrice(state));
  const profitCurrencyValue = getFloatString(profitAmount * BTCPrice);

  return profitCurrencyValue;
};

export const selectProfitLoading = (state: ApplicationState) =>
  state.profit.loading;
