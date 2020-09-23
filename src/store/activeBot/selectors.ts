import { ApplicationState } from '../reducers';

export const selectActiveBotId = (state: ApplicationState) =>
  state.activeBot.botId;
