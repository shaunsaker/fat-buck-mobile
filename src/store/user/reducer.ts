import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { ActionType, getType } from 'typesafe-actions';
import { saveUser, saveUserError, saveUserSuccess } from './actions';
import { UserState } from './models';

export const initialState: UserState = {
  loading: false,
  uid: '',
  email: '',
  cellphone: '',
  country: '',
  dateLastSignedIn: '',
};

const reducerActions = {
  saveUser,
  saveUserError,
  saveUserSuccess,
};

export const userReducer: Reducer<UserState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    // FIXME: how to type this
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload?.user,
        loading: false,
      };
    }
    case getType(saveUser): {
      return {
        ...state,
        loading: true,
        ...action.payload.user,
      };
    }
    case getType(saveUserSuccess): {
      return {
        ...state,
        loading: false,
      };
    }
    case getType(saveUserError): {
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
