import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import { setCountryName } from './actions';
import { CountryState } from './models';

export const initialState: CountryState = {
  countryName: 'South Africa',
};

const reducerActions = {
  setCountryName,
};

// FIXME:
export const countryReducer: Reducer<CountryState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(setCountryName): {
      return { ...state, countryName: action.payload.countryName };
    }
    default: {
      return state;
    }
  }
};
