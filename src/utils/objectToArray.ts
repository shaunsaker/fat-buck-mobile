type Object = Record<string, any>;

export const objectToArray = (object: Object): Object[] => {
  return Object.keys(object).map((key) => ({
    ...object[key],
  }));
};
