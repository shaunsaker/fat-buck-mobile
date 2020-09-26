import { ApplicationState } from '../reducers';

export const selectActiveBotIds = (state: ApplicationState) =>
  state.activeBots.botIds;
