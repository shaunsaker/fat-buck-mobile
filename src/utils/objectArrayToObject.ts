export const objectArrayToObject = <T extends { name: string }>(array: T[]) => {
  const object: Record<string, T> = {};

  array.forEach((item) => {
    object[item.name] = item;
  });

  return object;
};
