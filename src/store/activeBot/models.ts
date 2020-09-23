export enum ActiveBotActionTypes {
  SYNC_ACTIVE_BOT = '@@activeBot/SYNC_ACTIVE_BOT',
  SYNC_ACTIVE_BOT_SUCCESS = '@@activeBot/SYNC_ACTIVE_BOT_SUCCESS',
  SYNC_ACTIVE_BOT_ERROR = '@@activeBot/SYNC_ACTIVE_BOT_ERROR',
}

export interface ActiveBotState {
  loading: boolean;
  botId: string;
}
