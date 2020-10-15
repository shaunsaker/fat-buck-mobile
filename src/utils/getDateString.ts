import moment from 'moment';

export const getDateString = (): string => {
  return moment().toISOString();
};
