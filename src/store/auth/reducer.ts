import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { AuthActionTypes, AuthState } from './models';

// TODO: empty Firebase user state
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
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload.auth,
        loading: false,
      };
    }
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
    default: {
      return state;
    }
  }
};
