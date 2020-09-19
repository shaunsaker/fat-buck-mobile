export enum WelcomeActionTypes {
  SET_HAS_SEEN_WELCOME = '@@welcome/SET_HAS_SEEN_WELCOME',
}

export interface WelcomeState {
  hasSeenWelcome: boolean;
}
