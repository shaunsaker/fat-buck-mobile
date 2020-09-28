import { ApplicationState } from '../reducers';
import { getAnnualisedValue } from '../../utils/getAnnualisedValue';
import { getFloatString } from '../../utils/getFloatString';
import { ProfitTypes } from './models';
import { createSelector } from 'reselect';
import { selectExchangeRate } from '../currency/selectors';

export const selectProfitType = (state: ApplicationState) =>
  state.profit.profitType;

export const selectProfitPercent = (state: ApplicationState) => {
  const data = state.profit.data;

  if (!Object.keys(data).length) {
    return '0';
  }

  const isToDateProfitType = state.profit.profitType === ProfitTypes.toDate;
  if (isToDateProfitType) {
    // get the average total profit % of all active bots
    let totalProfitPercent = 0;

    Object.keys(data).forEach((botId) => {
      totalProfitPercent += data[botId].profitAllPercent;
    });
    const avgProfitPercent = totalProfitPercent / Object.keys(data).length;
    const roundedProfitPercent = getFloatString(avgProfitPercent);
    return roundedProfitPercent;
  } else {
    // get the annualised average total profit % of all bots
    let totalAnnualisedProfitPercent = 0;
    const now = Date.now();

    Object.keys(data).forEach((botId) => {
      totalAnnualisedProfitPercent += getAnnualisedValue(
        data[botId].profitAllPercent,
        data[botId].firstTradeTimestamp,
        now,
      );
    });
    const avgAnnualisedProfitPercent =
      totalAnnualisedProfitPercent / Object.keys(data).length;
    const roundedAnnualisedProfitPercent = getFloatString(
      avgAnnualisedProfitPercent,
    );
    return roundedAnnualisedProfitPercent;
  }
};

export const selectProfitCurrencyValue = createSelector(
  selectProfitPercent,
  selectExchangeRate,
  (currency, exchangeRate) => getFloatString(Number(currency) * exchangeRate),
);

export const selectProfitLoading = (state: ApplicationState) =>
  state.profit.loading;
