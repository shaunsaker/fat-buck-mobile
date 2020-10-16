type Object = Record<string, any>;

export const objectToArray = (object: Object): Object[] => {
  if (!object) {
    return [];
  }

  return Object.keys(object).map((key) => ({
    ...object[key],
  }));
};
