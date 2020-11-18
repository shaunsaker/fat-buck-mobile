import { action } from 'typesafe-actions';
import { ServicesActionsTypes } from './models';

export const restartApp = () => action(ServicesActionsTypes.RESTART_APP);

export const clearCache = () => action(ServicesActionsTypes.CLEAR_CACHE);

export const openLink = (link: string) =>
  action(ServicesActionsTypes.OPEN_LINK, { link });
