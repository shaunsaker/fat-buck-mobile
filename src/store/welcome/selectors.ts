import { ApplicationState } from '../reducers';

export const selectHasSeenWelcome = (state: ApplicationState) =>
  state.welcome.hasSeenWelcome;
