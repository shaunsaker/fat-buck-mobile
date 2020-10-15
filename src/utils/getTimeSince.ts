import moment from 'moment';

export const getTimeSince = (timestamp: number | string): string =>
  moment(timestamp).fromNow();
