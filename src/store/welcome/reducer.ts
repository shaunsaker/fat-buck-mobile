import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import { setHasSeenWelcome } from './actions';
import { WelcomeState } from './models';

export const initialState: WelcomeState = {
  hasSeenWelcome: false,
};

const reducerActions = {
  setHasSeenWelcome,
};

// FIXME
export const welcomeReducer: Reducer<WelcomeState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(setHasSeenWelcome): {
      return { ...state, hasSeenWelcome: action.payload.hasSeenWelcome };
    }
    default: {
      return state;
    }
  }
};
