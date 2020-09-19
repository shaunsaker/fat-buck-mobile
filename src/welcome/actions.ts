import { action } from 'typesafe-actions';

import { WelcomeActionTypes } from './models';

export const setHasSeenWelcome = (hasSeenWelcome: boolean) =>
  action(WelcomeActionTypes.SET_HAS_SEEN_WELCOME, {
    hasSeenWelcome,
  });
