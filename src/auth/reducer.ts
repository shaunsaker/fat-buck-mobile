import { Reducer } from 'redux';
import { WelcomeActionTypes } from '../welcome/models';
import { AuthActionTypes, AuthState } from './models';

export const initialState: AuthState = {
  loading: false,
  confirmationResult: undefined,
  isNewUser: false,
};

export const authReducer: Reducer<AuthState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case AuthActionTypes.INITIATE_SIGN_IN: {
      return {
        ...state,
        loading: true,
      };
    }
    case AuthActionTypes.INITIATE_SIGN_IN_SUCCESS: {
      return {
        ...state,
        loading: false,
        confirmationResult: action.payload.confirmationResult,
      };
    }
    case AuthActionTypes.FINALISE_SIGN_IN: {
      return {
        ...state,
        loading: true,
      };
    }
    case AuthActionTypes.FINALISE_SIGN_IN_SUCCESS: {
      return {
        ...state,
        loading: false,
        confirmationResult: undefined,
        ...action.payload.user,
      };
    }
    case AuthActionTypes.SIGN_IN_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case AuthActionTypes.SIGN_OUT: {
      return {
        ...state,
        loading: true,
      };
    }
    case AuthActionTypes.SIGN_OUT_SUCCESS: {
      return initialState;
    }
    case AuthActionTypes.SIGN_OUT_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case AuthActionTypes.SEND_PASSWORD_RESET_EMAIL: {
      return {
        ...state,
        loading: true,
      };
    }
    case AuthActionTypes.SEND_PASSWORD_RESET_EMAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case WelcomeActionTypes.SET_HAS_SEEN_WELCOME: {
      return {
        ...state,
        isNewUser: true,
      };
    }
    default: {
      return state;
    }
  }
};
