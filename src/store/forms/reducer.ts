import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import { setFormField } from './actions';
import { FormsState } from './models';

export const initialState: FormsState = {
  signIn: {
    email: '',
    password: '',
    cellphone: '',
    pinCode: '',
  },
  countrySelector: {
    search: '',
  },
};

const reducerActions = {
  setFormField,
};

// FIXME
export const formsReducer: Reducer<FormsState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(setFormField): {
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
