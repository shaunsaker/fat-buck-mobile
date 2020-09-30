export enum ActiveBotsActionTypes {
  SYNC_ACTIVE_BOTS = '@@activeBots/SYNC_ACTIVE_BOTS',
  SYNC_ACTIVE_BOTS_SUCCESS = '@@activeBots/SYNC_ACTIVE_BOTS_SUCCESS',
  SYNC_ACTIVE_BOTS_ERROR = '@@activeBots/SYNC_ACTIVE_BOTS_ERROR',
}

export interface ActiveBotData {
  id: string;
}

export interface ActiveBotsState {
  loading: boolean;
  botIds: string[];
}
