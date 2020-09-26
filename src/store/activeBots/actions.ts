import { action } from 'typesafe-actions';

import { ActiveBotsActionTypes } from './models';

export const syncActiveBots = () =>
  action(ActiveBotsActionTypes.SYNC_ACTIVE_BOTS);

export const syncActiveBotsSuccess = (botIds: string[]) =>
  action(ActiveBotsActionTypes.SYNC_ACTIVE_BOTS_SUCCESS, {
    botIds,
  });

export const syncActiveBotsError = () =>
  action(ActiveBotsActionTypes.SYNC_ACTIVE_BOTS_ERROR);
