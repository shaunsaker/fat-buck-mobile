import { getFloatString } from './getFloatString';

export const getAnnualisedValue = (value: number, startDate: number) => {
  // calculate the annualised %
  // TODO: test this
  const now = Date.now();
  const diffInDays = (now - startDate) / (1000 * 60 * 60 * 24); // ms * s * min * hrs in one day
  const profitPerDay = value / diffInDays;
  const profitPerYear = profitPerDay * 365;

  return getFloatString(profitPerYear, 2);
};
