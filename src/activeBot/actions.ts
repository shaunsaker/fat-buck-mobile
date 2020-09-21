import { action } from 'typesafe-actions';

import { ActiveBotActionTypes } from './models';

export const syncActiveBot = () => action(ActiveBotActionTypes.SYNC_ACTIVE_BOT);

export const syncActiveBotSuccess = (botId: string) =>
  action(ActiveBotActionTypes.SYNC_ACTIVE_BOT_SUCCESS, {
    botId,
  });

export const syncActiveBotError = () =>
  action(ActiveBotActionTypes.SYNC_ACTIVE_BOT_ERROR);
