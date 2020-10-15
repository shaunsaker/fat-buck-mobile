export const getFloatString = (value: number, digits: number = 2): string => {
  return Number(value).toFixed(digits);
};
