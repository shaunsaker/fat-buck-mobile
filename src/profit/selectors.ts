import { ApplicationState } from '../store/reducers';
import { getAnnualisedValue } from '../utils/getAnnualisedValue';
import { getFloatString } from '../utils/getFloatString';
import { ProfitType } from './models';

export const selectProfitType = (state: ApplicationState) =>
  state.profit.profitType;

export const selectProfitPercent = (state: ApplicationState) => {
  const isToDateProfitType = state.profit.profitType === ProfitType.toDate;

  if (isToDateProfitType) {
    return getFloatString(state.profit.profitAllPercent);
  } else {
    return getAnnualisedValue(
      state.profit.profitAllPercent,
      state.profit.firstTradeTimestamp,
    );
  }
};

export const selectProfitCurrency = (state: ApplicationState) =>
  getFloatString(state.profit.profitAllFiat);
