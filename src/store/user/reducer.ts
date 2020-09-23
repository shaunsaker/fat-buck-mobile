import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { UserActionTypes, UserState } from './models';

export const initialState: UserState = {
  loading: false,
  uid: '',
  email: '',
  phoneNumber: '',
};

export const userReducer: Reducer<UserState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload?.user,
        loading: false,
      };
    }
    case UserActionTypes.SAVE_USER: {
      return {
        ...state,
        loading: true,
        ...action.payload.user,
      };
    }
    case UserActionTypes.SAVE_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case UserActionTypes.SAVE_USER_ERROR: {
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
