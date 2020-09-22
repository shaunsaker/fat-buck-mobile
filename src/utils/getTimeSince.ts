import moment from 'moment';

export const getTimeSince = (timestamp: number) => moment(timestamp).fromNow();
