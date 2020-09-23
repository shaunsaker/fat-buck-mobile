import { Reducer } from 'redux';
import { FormsActionTypes, FormsState } from './models';

export const initialState: FormsState = {
  signIn: {
    email: '',
    password: '',
    cellphone: '',
    pinCode: '',
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
          ...state[action.payload.form], // FIXME
          [action.payload.field]: action.payload.text,
        },
      };
    }
    default: {
      return state;
    }
  }
};
