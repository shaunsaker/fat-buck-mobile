import { Reducer } from 'redux';
import { FormsActionTypes, FormsState } from './models';

export const initialState: FormsState = {
  signIn: {
    email: __DEV__ ? 'sakershaun@gmail.com' : '',
    password: __DEV__ ? '123123' : '',
    cellphone: __DEV__ ? '+27833771130' : '',
    pinCode: __DEV__ ? '123123' : '',
  },
};

export const formsReducer: Reducer<FormsState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case FormsActionTypes.SET_FORM_FIELD: {
      return {
        ...state,
        [action.payload.form]: {
          ...state[action.payload.form],
          [action.payload.field]: action.payload.text,
        },
      };
    }
    default: {
      return state;
    }
  }
};
