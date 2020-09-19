import { ApplicationState } from '../store/reducers';

export const selectHasSeenWelcome = (state: ApplicationState) =>
  state.welcome.hasSeenWelcome;
