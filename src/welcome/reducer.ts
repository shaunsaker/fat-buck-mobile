import { Reducer } from 'redux';
import { WelcomeActionTypes, WelcomeState } from './models';

export const initialState: WelcomeState = {
  hasSeenWelcome: false,
};

export const welcomeReducer: Reducer<WelcomeState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case WelcomeActionTypes.SET_HAS_SEEN_WELCOME: {
      return { ...state, hasSeenWelcome: action.payload.hasSeenWelcome };
    }
    default: {
      return state;
    }
  }
};
