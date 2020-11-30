import { Trades, Trade } from '../store/trades/models';
import { getAnnualisedValue } from './getAnnualisedValue';
import moment from 'moment';

describe('getAnnualisedValue', () => {
  it('returns 0 if there were no trades', () => {
    const value = 100;
    const trades: Trades = {};
    const result = getAnnualisedValue(value, trades);

    expect(result).toEqual(0);
  });

  it('returns the annualised value 1', () => {
    const value = 100;
    const years = 1;
    const trades: Trades = {
      '1': {
        closeTimestamp: moment()
          .subtract(365 * years, 'days')
          .valueOf(), // NOTE: if the value is the same one year ago, it should return that value
      } as Trade,
      '2': {
        closeTimestamp: moment().valueOf(),
      } as Trade,
    };
    const result = getAnnualisedValue(value, trades);

    expect(result).toEqual(value / years);
  });

  it('returns the annualised value 2', () => {
    const value = 100;
    const years = 2;
    const trades: Trades = {
      '1': {
        closeTimestamp: moment()
          .subtract(365 * years, 'days')
          .valueOf(), // NOTE: if the value is the same one year ago, it should return that value
      } as Trade,
      '2': {
        closeTimestamp: moment().valueOf(),
      } as Trade,
    };
    const result = getAnnualisedValue(value, trades);

    expect(result).toEqual(value / years);
  });

  it('returns the annualised value when there are active trades', () => {
    const value = 100;
    const years = 2;
    const trades: Trades = {
      '1': {
        closeTimestamp: moment()
          .subtract(365 * years, 'days')
          .valueOf(), // NOTE: if the value is the same one year ago, it should return that value
      } as Trade,
      '2': {
        closeTimestamp: moment().valueOf(),
      } as Trade,
      '3': {
        // NOTE: no closeTimestamp
      } as Trade,
    };
    const result = getAnnualisedValue(value, trades);

    expect(result).toEqual(value / years);
  });
});
