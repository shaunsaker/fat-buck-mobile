export const getAnnualisedValue = (
  value: number,
  startDate: number,
  endDate: number,
): number => {
  // calculate the annualised value from startDate to now
  const diffInDays = (endDate - startDate) / (1000 * 60 * 60 * 24); // ms * s * min * hrs in one day
  const changePerDay = value / diffInDays;
  const changePerYear = changePerDay * 365;

  return changePerYear;
};
