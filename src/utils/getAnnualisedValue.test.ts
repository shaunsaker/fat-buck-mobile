import { getAnnualisedValue } from './getAnnualisedValue';

describe('getAnnualisedValue', () => {
  it('calculates the annualised value correctly', () => {
    const value = 100;
    const startDate = new Date('23 June 1988').valueOf();
    const endDate = new Date('24 December 1988').valueOf();
    const result = getAnnualisedValue(value, startDate, endDate);
    const expected = 198.36956521739128;
    expect(result).toEqual(expected);
  });
});
