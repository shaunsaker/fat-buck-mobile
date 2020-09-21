export const getFloatString = (value: number, digits: number = 2) => {
  return Number(value).toFixed(digits);
};
