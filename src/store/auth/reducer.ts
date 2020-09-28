import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { ActionType, getType } from 'typesafe-actions';
import {
  initiateSignIn,
  initiateSignInSuccess,
  sendPasswordResetEmail,
  sendPasswordResetEmailSuccess,
  sendPasswordResetEmailError,
  signIn,
  signInError,
  signInSuccess,
  signOut,
  signOutError,
  signOutSuccess,
} from './actions';
import { AuthState } from './models';

// TODO: empty Firebase user state
export const initialState: AuthState = {
  loading: false,
  confirmationResult: undefined,
  isNewUser: false,
};

const reducerActions = {
  initiateSignIn,
  initiateSignInSuccess,
  sendPasswordResetEmail,
  sendPasswordResetEmailSuccess,
  sendPasswordResetEmailError,
  signIn,
  signInError,
  signInSuccess,
  signOut,
  signOutError,
  signOutSuccess,
};

export const authReducer: Reducer<AuthState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    // FIXME: how to type this
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload?.auth,
        loading: false,
      };
    }
    case getType(initiateSignIn): {
      return {
        ...state,
        loading: true,
      };
    }
    case getType(initiateSignInSuccess): {
      return {
        ...state,
        loading: false,
        confirmationResult: action.payload.confirmationResult,
      };
    }
    case getType(signIn): {
      return {
        ...state,
        loading: true,
      };
    }
    case getType(signInSuccess): {
      return {
        ...state,
        loading: false,
        confirmationResult: undefined,
        ...action.payload.user,
      };
    }
    case getType(signInError): {
      return {
        ...state,
        loading: false,
      };
    }
    case getType(signOut): {
      return {
        ...state,
        loading: true,
      };
    }
    case getType(signOutSuccess): {
      return initialState;
    }
    case getType(signOutError): {
      return {
        ...state,
        loading: false,
      };
    }
    case getType(sendPasswordResetEmail): {
      return {
        ...state,
        loading: true,
      };
    }
    case getType(sendPasswordResetEmailSuccess): {
      return {
        ...state,
        loading: false,
      };
    }
    case getType(sendPasswordResetEmailError): {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
