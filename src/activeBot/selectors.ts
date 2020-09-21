import { ApplicationState } from '../store/reducers';

export const selectActiveBotId = (state: ApplicationState) =>
  state.activeBot.botId;
