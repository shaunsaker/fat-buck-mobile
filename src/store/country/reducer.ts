import { Reducer } from 'redux';
import { CountryActionTypes, CountryState } from './models';

export const initialState: CountryState = {
  countryName: 'South Africa',
};

export const countryReducer: Reducer<CountryState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case CountryActionTypes.SET_COUNTRY_NAME: {
      return { ...state, countryName: action.payload.countryName };
    }
    default: {
      return state;
    }
  }
};
