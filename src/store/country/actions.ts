import { action } from 'typesafe-actions';

import { CountryActionTypes } from './models';

export const setCountryName = (countryName: string) =>
  action(CountryActionTypes.SET_COUNTRY_NAME, {
    countryName,
  });
