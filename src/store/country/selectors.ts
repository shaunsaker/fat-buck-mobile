import { ApplicationState } from '../reducers';
import countriesInfo from 'countries-information';
import { CountryInfo } from './models';

export const selectCountry = (state: ApplicationState): CountryInfo =>
  countriesInfo.getCountryInfoByName(state.country.countryName);
