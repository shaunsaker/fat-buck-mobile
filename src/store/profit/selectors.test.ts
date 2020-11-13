import { getFloatString } from '../../utils/getFloatString';
import rootReducer, { initialState } from '../reducers';
import { syncTradesSuccess } from '../trades/actions';
import { Trade } from '../trades/models';
import { setProfitType, syncProfitSuccess } from './actions';
import { ProfitTypes } from './models';
import {
  selectProfitAmount,
  selectProfitCurrencyValue,
  selectProfitPercent,
} from './selectors';
import moment from 'moment';
import { getAnnualisedValue } from '../../utils/getAnnualisedValue';
import { syncBalanceSuccess } from '../balance/actions';
import { setSelectedCurrency, syncCurrencySuccess } from '../currency/actions';
import { CurrencyData } from '../currency/models';

describe('profit selectors', () => {
  describe('selectProfitPercent', () => {
    it('returns the ratio if TO DATE is selected', () => {
      let state = rootReducer(initialState, setProfitType(ProfitTypes.toDate));
      const ratio = 0.33;
      const amount = 1;
      state = rootReducer(
        state,
        syncProfitSuccess({
          ratio,
          amount,
          lastUpdated: '',
        }),
      );

      const result = selectProfitPercent(state);

      expect(result).toEqual(getFloatString(ratio * 100));
    });

    it('returns the annualised ratio if ANNUAL is selected', () => {
      let state = rootReducer(initialState, setProfitType(ProfitTypes.annual));
      const ratio = 0.33;
      const amount = 1;
      state = rootReducer(
        state,
        syncProfitSuccess({
          ratio,
          amount,
          lastUpdated: '',
        }),
      );
      state = rootReducer(
        state,
        syncTradesSuccess({
          1: {
            closeTimestamp: moment().subtract(365, 'days').valueOf(),
          } as Trade,
          2: {
            closeTimestamp: moment().valueOf(),
          } as Trade,
        }),
      );

      const result = selectProfitPercent(state);

      expect(result).toEqual(
        getFloatString(
          getAnnualisedValue(state.profit.data.ratio * 100, state.trades.data),
        ),
      );
    });
  });

  describe('selectProfitAmount', () => {
    it('returns the amount if TO DATE is selected', () => {
      let state = rootReducer(initialState, setProfitType(ProfitTypes.toDate));
      const ratio = 0.33;
      const amount = 1;
      state = rootReducer(
        state,
        syncProfitSuccess({
          ratio,
          amount,
          lastUpdated: '',
        }),
      );

      const result = selectProfitAmount(state);

      expect(result).toEqual(amount);
    });

    it('returns the annualised amount if ANNUAL is selected', () => {
      let state = rootReducer(initialState, setProfitType(ProfitTypes.annual));
      const ratio = 0.33;
      const amount = 1;
      state = rootReducer(
        state,
        syncProfitSuccess({
          ratio,
          amount,
          lastUpdated: '',
        }),
      );
      state = rootReducer(
        state,
        syncTradesSuccess({
          1: {
            closeTimestamp: moment().subtract(365, 'days').valueOf(),
          } as Trade,
          2: {
            closeTimestamp: moment().valueOf(),
          } as Trade,
        }),
      );

      const result = selectProfitAmount(state);

      expect(result).toEqual(
        getAnnualisedValue(state.profit.data.amount, state.trades.data),
      );
    });
  });

  describe('selectProfitCurrencyValue', () => {
    it('returns the currency value of the profit amount', () => {
      let state = rootReducer(initialState, setProfitType(ProfitTypes.toDate));
      const ratio = 0.33;
      const amount = 1; // NOTE 1 BTC
      state = rootReducer(
        state,
        syncProfitSuccess({
          ratio,
          amount,
          lastUpdated: '',
        }),
      );
      const BTCPrice = 16316; // USD price
      state = rootReducer(
        state,
        syncBalanceSuccess({
          amount: 1, // NOTE 1 BTC
          value: BTCPrice,
          lastUpdated: '',
        }),
      );
      state = rootReducer(state, setSelectedCurrency('USD'));
      state = rootReducer(
        state,
        syncCurrencySuccess({
          rate: 1,
        } as CurrencyData),
      );

      const result = selectProfitCurrencyValue(state);

      expect(result).toEqual(getFloatString(BTCPrice));
    });
  });
});
