import { v4 as uuid } from 'uuid';

export const getUniqueId = (): string => {
  return uuid();
};
