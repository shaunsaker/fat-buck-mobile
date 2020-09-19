import { Reducer } from 'redux';
import { AuthActionTypes, AuthState } from './models';

export const initialState: AuthState = {
  loading: false,
  uid: '',
  email: '',
};

export const authReducer: Reducer<AuthState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case AuthActionTypes.CREATE_USER_WITH_EMAIL_AND_PASSWORD: {
      return {
        ...state,
        loading: true,
      };
    }
    case AuthActionTypes.CREATE_USER_WITH_EMAIL_AND_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
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
    default: {
      return state;
    }
  }
};
