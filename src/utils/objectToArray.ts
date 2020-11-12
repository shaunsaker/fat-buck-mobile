type Object = Record<string, any>;

export const objectToArray = <T>(object: Object): T[] => {
  if (!object) {
    return [];
  }

  return Object.keys(object).map((key) => ({
    ...object[key],
  }));
};
